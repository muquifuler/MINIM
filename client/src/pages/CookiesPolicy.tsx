import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import NavMobile from '../components/NavMobile'
import Footer from '../components/Footer'

import '../styles/Sellers.css'

export default function FAQCookiesPolicy({ bag, setBag, myAddress, requestAccount }: { bag: Array<100>, setBag: Function, myAddress: string, requestAccount: Function  }) {

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

  return (
    <div className='sellersBody'>
      {windowDimensions.width > 700 && <Nav bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
      {windowDimensions.width <= 700 && <NavMobile bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
      <div className='sellers'>
        <h1 className='sellers-h1'>Cookies policy</h1>

        <p className='p-2'>Effective date: 13/09/2023</p>
        <p className='p-2'>Last update: 20/09/2023</p>

        <h2 className='sellers-title2'>1. Introduction</h2>
        <p className='p-1'>Welcome to MINIM. This cookie policy is intended to inform you about how we use cookies and similar technologies on our website, which operates on the Binance Smart Chain and Ethereum Mainnet blockchains.</p>
        
        <h2 className='sellers-title2'>2. What are cookies?</h2>
        <p className='p-1'>Cookies are small text files that are stored on your device (computer, smartphone, tablet, etc.) when you visit a website. Cookies are used to improve user experience, remember preferences and provide information about interaction with the website.</p>
      
        <h2 className='sellers-title2'>3. Why do we use cookies?</h2>
        <p className='p-2'>We use cookies on our website for the following reasons:</p>
        <p className='p-1'><b>Improving user experience:</b> We use cookies to remember your preferences and provide a personalized user experience.</p>
        <p className='p-1'><b>Analytics and statistics:</b> We use cookies to collect data about how users interact with our website. This helps us improve and optimize our site.</p>
        <p className='p-1'><b>Advertising:</b> We may use cookies to offer relevant advertising based on your interests and browsing behavior.</p>

        <h2 className='sellers-title2'>4. Types of cookies we use</h2>
        <p className='p-2'>The types of cookies we use on our website are described below:</p>
        <p className='p-1'><b>Essential cookies:</b> These cookies are necessary for the website to function properly. You cannot disable these cookies.</p>
        <p className='p-1'><b>Performance cookies:</b> These cookies allow us to collect data about how users use our website. This helps us improve site speed and performance.</p>
        <p className='p-1'><b>Functionality cookies:</b> These cookies are used to remember your preferences and provide a personalized user experience.</p>
        <p className='p-1'><b>Advertising Cookies:</b> We may use third-party cookies to show relevant advertisements on our website and other websites you visit.</p>
      
        <h2 className='sellers-title2'>5. How to manage your cookie preferences</h2>
        <p className='p-1'>You can manage your cookie preferences through your browser settings. Most browsers allow you to accept, reject or delete cookies. However, please note that disabling certain cookies may affect the functionality of our website.</p>
      
        <h2 className='sellers-title2'>6. Changes to our cookie policy</h2>
        <p className='p-1'>We reserve the right to modify this cookie policy at any time. Any changes will be posted on this page with a new effective date.</p>
      
        <h2 className='sellers-title2'>7. Contact us</h2>
        <p className='p-1'>If you have any questions or concerns about our cookie policy, please do not hesitate to contact us at minimsoftware@outlook.com</p>
      
      </div>
      {windowDimensions.width > 700 && <Footer/>}
    </div>
  )
}
