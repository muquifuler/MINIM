import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import NavMobile from '../components/NavMobile'
import Footer from '../components/Footer'
import LibellulaContract from '../json/contract.json'
import { ethers } from 'ethers';

import '../styles/BuyLibel.css'
import e from 'express';

export default function BuyLibel({ bag, setBag, smartContract, myAddress, requestAccount }: { bag: Array<100>, setBag: Function, smartContract: string, myAddress: string, requestAccount: Function }) {
  
  const [myBalance, setMyBalance] = useState("0");

  const [input, setInput] = useState("0");
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 
/*
  async function getBalanceBNB() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getBalance(myAddress).then((balance) => {
      const balanceInEth = ethers.utils.formatEther(balance)
      setMyBalance(balanceInEth);
     })
  }
  getBalanceBNB()

  async function buyLibel(){
    if(typeof window.ethereum !== 'undefined'){
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(smartContract, LibellulaContract.abi, signer);
      console.log(contract)
      const transaction = await contract.buyLibel(BigNumber.from(Math.floor((Number(input)/0.003)*100000)), {value: ethers.utils.parseEther(input)});
      await transaction.wait();
    }
  }
*/
  return (
    <div className='Libel'>
      {windowDimensions.width > 700 && <Nav bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
      {windowDimensions.width <= 700 && <NavMobile bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
      <form className='buyLibel'>
        <p className='bl-title'>Intercambio</p>
        <p className='bl-subtitle'>Realiza negociaciones con los tokens al instante</p>
        <div className='first-saldo'>
          <select className='bl-select'>
            <option className='USDT'>BNB</option>
            <option className='USDT'>BUSD</option>
          </select>
          <span className='second-saldo'>Saldo: {myBalance}</span>
        </div>
        <div className='flex'>
          <button className='bl-btn' onClick={(e)=>{
            e.preventDefault();
            setInput(myBalance)
          }}>MAX</button>
          <input type='number' className='bl-input' placeholder='0.003' value={input} onChange={e => {
            setInput(e.target.value)
          }}></input>
        </div>
        <img className='bl-img' src="https://img.icons8.com/ios/100/000000/down--v1.png"/>
        <div className='block-libel'>
          <span>LIBEL</span>
          <span className='span-libel'>Saldo: 231</span>
        </div>
        <div className='flex'>
          <input type='number' className='bl-input-2' placeholder='1' value={Math.floor(Number(input)/0.003)} onChange={ ()=>{setInput(input)} }></input>
        </div>
        <p className='perLibel'>1 BUSD = 0.003 BNB = 1 LIBEL </p>
        <button className='btn-inter' onClick={(e) => {
          e.preventDefault();
        }}>Intercambio</button>
      </form>
      {windowDimensions.width > 700 && <Footer/>}
    </div>
  )
}
