import React, { Component, useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Nav from '../components/Nav'
import Product from '../components/Product'
import NavMobile from '../components/NavMobile';

import img_preview from '../assets/model8.jpg'
import img_preview2 from '../assets/model6.jpg'
import img_preview3 from '../assets/model9.jpg'
import img_preview4 from '../assets/model4.webp'
import img_preview5 from '../assets/model3.webp'
import img_preview6 from '../assets/model2.webp'
import img_preview7 from '../assets/model7.jpg'
import img_preview8 from '../assets/model1.webp'

interface selProd { 
  collection: string; 
  color: string; 
  image: string; 
  name: string; 
  price: number; 
  size: string; 
  stock: number 
}

export default function Home({ bag, setBag, setSelectProduct, myAddress, requestAccount }: { bag: selProd[], setBag: Function, setSelectProduct: Function, myAddress: string, requestAccount: Function }) {
  
  const [point, setPoint] = useState(900);

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const navigate = useNavigate();

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

  return (
      <div className='Home'>
        {windowDimensions.width > point && <>
          <Nav bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>
        </>}
        {windowDimensions.width <= point && <NavMobile bag={bag} setBag={setBag}  myAddress={myAddress} requestAccount={requestAccount}/>}
        
        {windowDimensions.width > point && <div className='pack-products'>
          <div className='effect2'></div>
          <div className='effect'></div>
          <img src={img_preview}/>
          <img src={img_preview2}/>
          <img src={img_preview3}/>
          <img src={img_preview4}/>
          <img src={img_preview5}/>
          <img src={img_preview6}/>
          <div className='decoration'>
            <div>
              <p>MINIM</p>
              <button onClick={() => navigate("/shop")}>
                <span>SHOPPING</span> 
                <svg fill="#f4f4f4" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>go</title> <path d="M27.728 16.024l-8.485 8.482-2.828-2.835 3.656-3.671h-14.071v-4h14.071l-3.657-3.644 2.828-2.816 8.486 8.484z"></path> </g></svg>
              </button>
            </div>
          </div>
        </div>}
        {windowDimensions.width <= point && <div className='pack-products'>
          <div className='effect2'></div>
          <div className='effect'></div>
          <img src={img_preview2}/>
          <img src={img_preview2}/>
          <img src={img_preview2}/>
          <div className='decoration'>
            <div>
              <p>MINIM</p>
              <button onClick={() => navigate("/shop")}>
                <span>SHOP</span> 
                <svg fill="#f4f4f4" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>go</title> <path d="M27.728 16.024l-8.485 8.482-2.828-2.835 3.656-3.671h-14.071v-4h14.071l-3.657-3.644 2.828-2.816 8.486 8.484z"></path> </g></svg>
              </button>
            </div>
          </div>
        </div>}
      </div>

    )
  }


