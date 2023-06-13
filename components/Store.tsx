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

    const purchaseArticle = async (articleId: Number) => {
        // Check if article is available
        const article = await storeContract.articles(articleId)
        if (article.creator === ethers.constants.AddressZero) return

        // Get article price
        const articlePrice = article.price


        const purchaseArticleTx = await storeContract.populateTransaction.purchaseArticle(articleId)

        const tx = {
            to: storeAddress,
            value: ethers.utils.parseEther(articlePrice.toString()),
            data: purchaseArticleTx.data,
        }
        const txResponse = await smartAccount.sendTransaction( {transaction: tx} )
        console.log(txResponse)
    }

    const withdrawRoyalties = async () => {
        const withdrawRoyaltiesTx = await storeContract.populateTransaction.withdrawRoyalties()
        const tx = {
            to: storeAddress,
            data: withdrawRoyaltiesTx,
        }
        const txResponse = await smartAccount.sendTransaction( {transaction: tx} )
        console.log(txResponse)
    }

    const getRoyaltiesData = async () => {
        const royaltiesData = await storeContract.royalties(smartAccount.address)
        return royaltiesData
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