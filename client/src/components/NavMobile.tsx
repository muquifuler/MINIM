import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Bag from './Bag';

export default function NavMobile({ bag, setBag, myAddress, requestAccount }: { bag: Array<100>, setBag: Function, myAddress: string, requestAccount: Function }) {

    const [menuDesplegable, setMenuDesplegable] = useState(false);
    const [showBag, setShowBag] = useState(false);
    const [totalC, setTotalC] = useState(0);

  const navigate = useNavigate();

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
    <>
    <div className={`menuDesplegable ${menuDesplegable ? 'open' : ''}`}>
      <div className='menuHead'>
        <span>M</span>
        <svg onClick={() => setMenuDesplegable(false)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 6L18 18M18 6L6 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      </div>
      <div className='menuList'>
        <NavLink className='navLink' to='/'>HOME</NavLink>
        <NavLink className='navLink' to='/shop'>SHOP</NavLink>
        <NavLink className='navLink' to='/myprofile'>MY PROFILE</NavLink>
        
        <NavLink className='navLink' to='/sellers'>SELLERS</NavLink>
      </div>
      <div className='menuFooter'>
        <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M15.5 5H9.5C7.29086 5 5.5 6.79086 5.5 9V15C5.5 17.2091 7.29086 19 9.5 19H15.5C17.7091 19 19.5 17.2091 19.5 15V9C19.5 6.79086 17.7091 5 15.5 5Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12.5 15C10.8431 15 9.5 13.6569 9.5 12C9.5 10.3431 10.8431 9 12.5 9C14.1569 9 15.5 10.3431 15.5 12C15.5 12.7956 15.1839 13.5587 14.6213 14.1213C14.0587 14.6839 13.2956 15 12.5 15Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <rect x="15.5" y="9" width="2" height="2" rx="1" transform="rotate(-90 15.5 9)" fill="#000000"></rect> <rect x="16" y="8.5" width="1" height="1" rx="0.5" transform="rotate(-90 16 8.5)" stroke="#000000" strokeLinecap="round"></rect> </g></svg>
        {myAddress == "" && <p className='conectarMetamask' onClick={() => requestAccount()}>Connect to Metamask</p>}
        {myAddress != "" && <p style={{ textDecoration: "none", margin: '1vh 0'}}>{myAddress.substring(0, 15)+"..."}</p>}
        <p onClick={() => navigate("")}>Privacy policy</p>
        <p onClick={() => navigate("/FAQ")}>Shipping and return policy</p>
        <p >Terms and Conditions</p>
      </div>
      <div className='mobileFooter'>
        <span>MINIM</span>
      </div>
    </div>
    <div className='navMobile'>
      <svg onClick={() => setMenuDesplegable(true)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 17H20M4 12H20M4 7H20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      <span>MINIM</span>
      <div className='lenghtBag'>
        <span>{totalC}</span>
      </div>
      <svg onClick={() => setShowBag(true)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M17 6.99998C16.4067 4.69999 14.3267 3 11.84 3C9.35334 3 7.27334 4.69999 6.68 6.99998H3V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V6.99998H17ZM15.6067 6.99998C15.06 5.44666 13.58 4.33333 11.84 4.33333C10.1 4.33333 8.62001 5.44666 8.07334 6.99998H15.6067ZM5 8.99998H19V19H5V8.99998Z" fill="#000000"></path> </g></svg>
      <Bag bag={bag} setShowBag={setShowBag} showBag={showBag} setBag={setBag}/>
    </div>
  </>
  )
}

