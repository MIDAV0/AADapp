import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'


type Props = {
  connectWallet: () => void
  disconnectWallet: () => void
  account?: string
  scwAddress?: string
  title?: string
}

const NavBar = ({ connectWallet, disconnectWallet, account, scwAddress, title = 'Navbar' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CryptoNews</span>
          </div>

          <div className="flex items-center justify-center" id="navbar-default">
            <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
              </li>
            </ul>
            <div className='flex'>
              {
                !account ?
                  <button className='btn my-auto ml-4' onClick={connectWallet}> Connect Wallet </button>
                  :   
                  !scwAddress ?  
                    <span className="loading loading-bars loading-sm my-auto ml-4"></span>
                  :
                  <div className="join my-auto ml-4">
                      <div className="join-item dropdown dropdown-hover">
                        <label tabIndex={0} className="btn">{`${scwAddress?.slice(0,6)}...${scwAddress?.slice(-5)}`}</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 mt-2 border-2 border-cyan-500 rounded-md shadow bg-base-100">
                          <li>{scwAddress}</li>
                        </ul>
                      </div>
                      <button onClick={disconnectWallet} className="btn join-item bg-red-500">✕</button>
                  </div>
              }              
            </div>
          </div>
        </div>
      </nav>
    </header>
        <hr />
    </div>
)

export default NavBar