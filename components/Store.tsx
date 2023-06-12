import React, { useState, useEffect } from "react";
import SmartAccount from "@biconomy/smart-account";
import abi from "../utils/storeAbi.json";
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    smartAccount: SmartAccount
    provider: any
}

const Store: React.FC<Props> = ({ smartAccount, provider }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [storeContract, setStoreContract] = useState<any>(null)

    const storeAddress = "0x13b759f63D80323F4517A4A000a94F96a71c3443"

    useEffect(() => {
        setIsLoading(true)
        const contract = new ethers.Contract(
            storeAddress,
            abi,
            provider,
        )
        setStoreContract(contract)
    }, [])

    const createArticle = async (uid: Number, price: Number, title: string) => {
        const convertedTitle = ethers.utils.formatBytes32String(title)
        const createArticleTx = await storeContract.populateTransaction.createArticle(
            uid,
            price,
            convertedTitle
        )
        const tx = {
            to: storeAddress,
            data: createArticleTx.data,
        }
        const txResponse = await smartAccount.sendTransaction( {transaction: tx} )
        console.log(txResponse)
    }

    return (
        <div>
            <button onClick={() => createArticle(1, 10, "First article")}>
                create article
            </button>
        </div>
    )
}

export default Store;