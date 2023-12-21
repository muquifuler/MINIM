import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ethers } from 'ethers';
import Bag from './Bag'
import '../App.css'

export default function Nav({ bag, setBag, myAddress, requestAccount }: { bag: Array<100>, setBag: Function, myAddress: string, requestAccount: Function }) {
  
  const [totalClothes, setTotalClothes] = useState(0);
  const [totalStores, setTotalStores] = useState(0);
  const [showBag, setShowBag] = useState(false);
  const [totalC, setTotalC] = useState(0);

  useEffect(() => {
    if(bag.length > 0){
      const totalStock = bag.reduce((accumulator, currentItem) => { 
        if (currentItem.hasOwnProperty('stock')) {
          // @ts-ignore
          return accumulator + currentItem.stock;
        }
        return accumulator;
      }, 0);
      setTotalC(totalStock);
    }
  }, [bag])


  return (
    <div className="top">
        <div className='superheader'>
          <span>M</span>
          {myAddress == "" && <a href="#" onClick={() => requestAccount()}>Connect to BSC</a>}
          {myAddress != "" && <span className='address'>{myAddress}</span>}
          <span>M</span>
        </div>
        <header>
          
          <div className='margin-top'>
            <div className='top-header'>
              <NavLink className='navLink' to='/'>HOME</NavLink>
              <NavLink className='navLink' to='/shop'>SHOP</NavLink>
              <NavLink className='navLink' to='/myprofile'>MY PROFILE</NavLink>
             
              <NavLink className='navLink' to='/sellers'>SELLERS</NavLink>
            </div>
            <hr></hr>
            <div className='bot-header'>
              <a href='#'>Instagram</a>
              <hr></hr>
              <NavLink className='navLink' to='/FAQ'>Support</NavLink>
              <hr></hr>
              <NavLink className='navLink' to='/Cookies-policy'>Cookies policy</NavLink>
            </div>
          </div>
          <button className='bag-header' onClick={() => { setShowBag(true); }}>
            <span>{totalC}</span>
          </button>
        </header>
        <Bag bag={bag} setShowBag={setShowBag} showBag={showBag} setBag={setBag}/>
    </div>
  )
}