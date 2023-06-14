import { ethers } from 'ethers';
import SmartAccount from "@biconomy/smart-account";

const storeAddress = "0x13b759f63D80323F4517A4A000a94F96a71c3443"

export const createArticle = async (
        uid: Number, 
        price: Number, 
        title: string,
        storeContract: ethers.Contract,
        smartAccount: SmartAccount
    ) => {
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

export const purchaseArticle = async (
        articleId: Number,
        storeContract: ethers.Contract,
        smartAccount: SmartAccount
    ) => {
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

// const withdrawRoyalties = async (
//         storeContract: ethers.Contract,
//         smartAccount: SmartAccount
// ) => {
//     const withdrawRoyaltiesTx = await storeContract.populateTransaction.withdrawRoyalties()
//     const tx = {
//         to: storeAddress,
//         data: withdrawRoyaltiesTx,
//     }
//     const txResponse = await smartAccount.sendTransaction( {transaction: tx} )
//     console.log(txResponse)
// }

export const getRoyaltiesData = async (
        storeContract: ethers.Contract,
        smartAccount: SmartAccount
) => {
    const royaltiesData = await storeContract.royalties(smartAccount.address)
    return royaltiesData
}
