import React from 'react'
import Link from 'next/link'
import * as data from '../utils/articles.json'
import ArticleCard from './ArticleCard'

const PageBody = ({ smartAccount, storeContract, provider }) => (
    <div className="container mx-auto flex flex-wrap py-6">
            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    {data.map((article) => {
                        return (
                            <ArticleCard 
                                article={article} 
                                storeContract={storeContract}
                                smartAccount={smartAccount}
                                provider={provider}    
                            />
                        )
                    })}
                </div>
            </div>
    </div>
)

export default PageBody