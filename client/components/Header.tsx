import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {FiArrowUpRight} from 'react-icons/fi'
import {AiOutlineDown} from 'react-icons/ai'
import {HiOutlineDotsVertical} from 'react-icons/hi'
import ethLogo from '../assets/eth.png'
import uniswapLogo from '../assets/uniswap.png'
import {useContext} from 'react'
import {TransactionContext} from '../context/TransactionContext'
import {client} from '../lib/sanityClient'

const style={
  wrapper: ` p-4 w-screen flex justify-between items-center`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  nav: `flex-1 flex justify-center item-center`,
  navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
  activeNavItem: `bg-[#20242A]`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  buttonPadding: `p-2`,
  buttonTextContainer: `h-8 flex items-center`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  buttonAccent: `w-40 bg-[#172A42] boader boader-[#163256] hover:boarder-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA]`,
}

const Header = () => {
  const[SelectNav, setSelectNav] = useState('swap')
  const [userName, setUserName] = useState<string>()
  const { connectWallet, currentAccount } = useContext(TransactionContext)

  console.log(connectWallet, currentAccount)

  useEffect(() => {
    if (currentAccount) {
      ;(async () => {
        const query = `
        *[_type=="users" && _id == "${currentAccount}"] {
          userName,
        }
        `
        const clientRes = await client.fetch(query)

        if (!(clientRes[0].userName == 'Unnamed')) {
          setUserName(clientRes[0].userName)
        } else {
          setUserName(
            `${currentAccount.slice(0, 7)}...${currentAccount.slice(35)}`,
          )
        }
      })()
    }
  }, [currentAccount])
  

  return (
    <div className={style.wrapper}>
      <div className={style.headerLogo}>
        <Image src={uniswapLogo} alt='uniswap' height={40} width={40}/>
      </div>
      <div className={style.nav}>
        <div className={style.navItemsContainer}>
          <div
            onClick={()=>setSelectNav('swap')}
            className = {`${style.navItem} ${
              SelectNav === `swap` && style.activeNavItem
            }`}
          >
            Swap
          </div>
          <div
            onClick={()=>setSelectNav('pool')}
            className = {`${style.navItem} ${
              SelectNav === `pool` && style.activeNavItem
            }`}
          >
            Pool
          </div>
          <div
            onClick={()=>setSelectNav('vote')}
            className = {`${style.navItem} ${
              SelectNav === "vote" && style.activeNavItem
            }`}
          >
            Vote
          </div>
          <a
            href = 'https://info.uniswap.org/#/'
            target = '_blank'
            rel = 'noreferrer'
          >
            <div
            className = {style.navItem}
          >
            Charts<FiArrowUpRight />  
          </div>
          </a>
        </div>
      </div>
      <div className={style.buttonsContainer}>
        <div className={`${style.button} ${style.buttonPadding}`}>
          <div className={style.buttonIconContainer}>
            <Image src={ethLogo} alt='eth logo' height={20} width={20} />
          </div>
          <p>Ethereum</p>
          <div className = {style.buttonIconContainer}>
            <AiOutlineDown />
          </div>
        </div>
        {currentAccount ? (
          <div className={`${style.button} ${style.buttonPadding}`}>
            <div className={style.buttonTextContainer}>{userName}</div>
          </div>
        ):(
          <div
            onClick={()=>connectWallet()}
            className={`${style.button} ${style.buttonPadding}`}
          >
            <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
              Connect Wallet
            </div>
          </div>
        )}
        <div className={`${style.button} ${style.buttonPadding}`}>
          <div className={`${style.buttonIconContainer} mx-2`}>
            <HiOutlineDotsVertical/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header