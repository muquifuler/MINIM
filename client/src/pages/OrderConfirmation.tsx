import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Nav from "../components/Nav"
import NavMobile from "../components/NavMobile"
import truck from '../assets/icons8-entrega.gif'

import '../styles/OrderConfirmation.css'

interface selProd { 
    collection: string; 
    color: string; 
    image: string; 
    name: string; 
    price: number; 
    size: string; 
    stock: number 
  }

  interface OrderData {
    status: string,
    userAddress: string,
    transactionHash: string,
    network: string,
    products: selProd[],
    date: string,
    total: number
}

export default function OrderConfirmation({ bag, setBag, smartContract, myAddress, requestAccount, deliveryPrice, setDeliveryPrice, userData, setUserData}: { bag: Array<100>, setBag: Function, smartContract: string, myAddress: string, requestAccount: Function, deliveryPrice: number, setDeliveryPrice: Function, userData: any, setUserData: Function }) {

    const [orderTotal, setOrderTotal] = useState(0);
    const [order, setOrder] = useState<OrderData>({
        status: "",
        userAddress: "",
        transactionHash: "",
        network: "",
        products: [],
        date: "",
        total: 0
    });
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
      });

      const navigate = useNavigate()

      useEffect(() => {
        fetch('http://localhost:3000/users/'+myAddress)
        .then((response) => response.json())
        .then((obj) => {
          setUserData(obj);
          if(Array.isArray(obj.orders)){
            setOrder(obj.orders[obj.orders.length-1]);
          }
        })
        .catch((error) => {
          console.error('Error al realizar la solicitud:', error);
        });
        //setOrder(userData.orders[userData.orders.length-1])
      }, [])

return (<>
        {windowDimensions.width > 700 && <Nav bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
        {windowDimensions.width <= 700 && <NavMobile bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
        <div className='checkout'>
            <div className='etapas'>
              {(windowDimensions.width > 1000 || window.location.pathname == "/checkout") &&  <span className={window.location.pathname == "/checkout" ? 'checkoutSel' : '' }>1. DELIVERY</span>}
              {(windowDimensions.width > 1000 || window.location.pathname == "/billing") &&  <span className={window.location.pathname == "/billing" ? 'checkoutSel' : '' }>2. BILLING & PAYMENT</span>}
              {(windowDimensions.width > 1000 || window.location.pathname == "/order-confirmation") &&  <span className={window.location.pathname == "/order-confirmation" ? 'checkoutSel' : '' }>3. ORDER CONFIRMATION</span>}
            </div>
            <div className='oc-Thanks'>
                <p>Thank you for your order</p>
                <img src={truck} alt="truck" />
                <button onClick={() => navigate("/myprofile")}>TRACK YOUR ORDER</button>
                <p style={{ fontSize: '1.8vh', marginTop: '2vh'}}>Please allow 24 hours to track your order.</p>
            </div>
            <div className='oc-Info'>
                <div>
                    <span className='oc-InfoTitle'>SUMMARY:</span>
                    <div>
                        <span>Order tx:</span>
                        <span>{order.transactionHash.substring(0, 20)}</span>
                    </div>
                    <div>
                        <span>Order Date:</span>
                        <span>{order.date}</span>
                    </div>
                    <div>
                        <span>Order Total:</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>
                </div>
                <div>
                    <span className='oc-InfoTitle'>SHIPPING ADDRESS:</span>
                    <p>{userData?.city}</p>
                    <p>{userData?.firstName+' '+userData?.lastName}</p>
                    <p>{userData?.houseNumberAndStreet}</p>
                    <p>{userData?.region+', '+userData?.postalCode}</p>
                    <p>{userData?.country}</p>
                    <p>Phone Number {userData?.phoneNumber}</p>
                </div>
            </div>
        </div>
      </>)
}