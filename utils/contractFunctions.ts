import { ethers } from 'ethers';
import SmartAccount from "@biconomy/smart-account";

const storeAddress = "0x6123a1D498fED2E89BC311B79E9edF61AEBf137c"

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
        ethers.utils.parseEther(price.toString()),
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
    console.log(article)
    if (article.creator === ethers.constants.AddressZero) return

    // Get article price
    const articlePrice = article.price

    const purchaseArticleTx = await storeContract.populateTransaction.purchaseArticle(articleId)

    const tx = {
        to: storeAddress,
        value: articlePrice,
        data: purchaseArticleTx.data,
        gasLimit: 1000000,
    }
    const txResponse = await smartAccount.sendTransaction( {transaction: tx} )
    await txResponse.wait()
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

export const getArticleOwner = async (
        articleId: Number,
        storeContract: ethers.Contract,
        smartAccount: SmartAccount,
        setArticleOwner: Function
) => {
    if (!smartAccount) return
    const articleHash = ethers.utils.solidityKeccak256(["uint", "address"], [articleId, smartAccount.address])
    const articleOwner = await storeContract.ownedArticles(articleHash)
    setArticleOwner(articleOwner[1].toString())
}