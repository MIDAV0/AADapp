import styles from "../styles/Home.module.css";
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import SocialLogin from "@biconomy/web3-auth";
import SmartAccount from "@biconomy/smart-account";
import Counter from "./Counter";
import Store from "./Store";
import NavBar from "./navbar";
import PageBody from "./homePageBody";
import abi from "../utils/storeAbi.json";

const Home = () => {
  const [provider, setProvider] = useState<any>();
  const [account, setAccount] = useState<string>();
  const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null);
  const [scwAddress, setScwAddress] = useState("");
  const [scwLoading, setScwLoading] = useState(false);
  const [socialLoginSDK, setSocialLoginSDK] = useState<SocialLogin | null>(
    null
  );
  const [balance, setBalance] = useState<any>();
  const [storeContract, setStoreContract] = useState<any>(null)

  const storeAddress = "0x6123a1D498fED2E89BC311B79E9edF61AEBf137c"


  const connectWeb3 = useCallback(async () => {
    if (typeof window === "undefined") return;
    console.log("socialLoginSDK", socialLoginSDK);
    if (socialLoginSDK?.provider) {
      const web3Provider = new ethers.providers.Web3Provider(
        socialLoginSDK.provider
      );
      setProvider(web3Provider);
      const accounts = await web3Provider.listAccounts();
      setAccount(accounts[0]);
      return;
    }
    if (socialLoginSDK) {
      socialLoginSDK.showWallet();
      return socialLoginSDK;
    }
    const sdk = new SocialLogin();
    await sdk.init({
      chainId: ethers.utils.hexValue(ChainId.POLYGON_MUMBAI),
    });
    setSocialLoginSDK(sdk);
    sdk.showWallet();
    return socialLoginSDK;
  }, [socialLoginSDK]);

  // if wallet already connected close widget
  useEffect(() => {
    console.log("hidelwallet");
    if (socialLoginSDK && socialLoginSDK.provider) {
      socialLoginSDK.hideWallet();
    }
  }, [account, socialLoginSDK]);

  // after metamask login -> get provider event
  useEffect(() => {
    const interval = setInterval(async () => {
      if (account) {
        clearInterval(interval);
      }
      if (socialLoginSDK?.provider && !account) {
        connectWeb3();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [account, connectWeb3, socialLoginSDK]);

  const disconnectWeb3 = async () => {
    if (!socialLoginSDK || !socialLoginSDK.web3auth) {
      console.error("Web3Modal not initialized.");
      return;
    }
    await socialLoginSDK.logout();
    socialLoginSDK.hideWallet();
    setProvider(undefined);
    setAccount(undefined);
    setScwAddress("");
  };

  useEffect(() => {
    async function setupSmartAccount() {
      setScwAddress("");
      setScwLoading(true);
      const smartAccount = new SmartAccount(provider, {
        activeNetworkId: ChainId.POLYGON_MUMBAI,
        supportedNetworksIds: [ChainId.POLYGON_MUMBAI],
        networkConfig: [
            {
              chainId: ChainId.POLYGON_MUMBAI,
              dappAPIKey: "Dm7hO0c-9.cb2b7dad-4d6f-4f6a-9523-009830266c36",
            },
          ],
      });
      setInterval(async () => {}, 1000);
      await smartAccount.init();
      const context = smartAccount.getSmartAccountContext();
      setScwAddress(context.baseWallet.getAddress());
      setSmartAccount(smartAccount);
      setScwLoading(false);
      //getBalance(smartAccount);
    }
    if (!!provider && !!account) {
      setupSmartAccount();
      console.log("Provider...", provider);
    }
  }, [account, provider]);

  useEffect(() => {
    if (!provider) return
    const contract = new ethers.Contract(
        storeAddress,
        abi,
        provider,
    )
    setStoreContract(contract)
  }, [provider])


  async function getBalance(sma: SmartAccount) {
    if (!sma) return
    console.log('smartAccount: ', sma)
    /* this function fetches the balance of the connected smart wallet */
    const balanceParams =  {
      chainId: ChainId.POLYGON_MUMBAI,
      eoaAddress: sma.address,
      tokenAddresses: [],
    }
    console.log('smartAccount: ', sma)
    /* use getAlltokenBalances and getTotalBalanceInUsd query the smartAccount */
    const balFromSdk = await sma.getAlltokenBalances(balanceParams)
    console.log('balFromSdk::: ', balFromSdk)
    const usdBalFromSdk = await sma.getTotalBalanceInUsd(balanceParams)
    setBalance(balFromSdk.data)
  }

  // { scwAddress && smartAccount && provider &&
  //   <div>
  //       <h1>Article</h1>
  //       <Store smartAccount={smartAccount} provider={provider}/>
  //   </div>
  // }

  return (
    <div>
      <NavBar 
        connectWallet={connectWeb3}
        disconnectWallet={disconnectWeb3}
        account={account}
        scwAddress={scwAddress}
      />
      <div className={styles.container}>
        <div className="p-8">
          <h1>Welcome to Crypto News</h1>
          {!provider &&
            <div className="flex">
              <p className="bg-red-600 rounded-lg p-2 text-white font-bold text-xl">Connect Wallet to continue</p>
            </div>
          }
        </div>
      </div>
      <PageBody 
        smartAccount={smartAccount}
        storeContract={storeContract}
        provider={provider}
      />
    </div>
  );
};

export default Home;