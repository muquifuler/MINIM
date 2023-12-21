import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Nav from "../components/Nav"
import NavMobile from "../components/NavMobile"
import { ethers } from 'ethers';

import '../styles/Billing.css'

interface ProductData {
    ventasTotales: number, 
    code: string;
    link: string,
    date: number[],
    type: string,
    collection: string, 
    name: string,
    price: number,
    img: string[],
    size: {
      XS: number,
      S: number,
      M: number,
      L: number,
      XL: number,
      XXL: number
    },
    color: {
        khaki: number,
        white: number,
        black: number
    }
  }

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

export default function Billing({ bag, setBag, smartContract, myAddress, requestAccount, deliveryPrice, setDeliveryPrice, userData, setUserData }: { bag: selProd[], setBag: Function, smartContract: string, myAddress: string, requestAccount: Function, deliveryPrice: number, setDeliveryPrice: Function, userData: any, setUserData: Function  }) {
    
    const [subtotal, setSubtotal] = useState(0);
    const [btnSelCr, setBtnSelCr] = useState("crypto");
    const [totalBnb, setTotalBnb] = useState(0); // (euro)
    const [totalEth, setTotalEth] = useState(0); // (euro)
    const [transactionHash, setTransactionHash] = useState('');
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
      });

      const navigate = useNavigate();

      if(bag.length <= 0){
        navigate(-1);
      }

      useEffect(() => {
        if(window.ethereum.chainId == '0x1'){ // Eth
            fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHEUR')
            .then((res) => res.json())
            .then((dataObject) => {
                let newSubtotal = bag.reduce((acc, item) => {
                    // @ts-ignore
                    return acc + (item.stock * parseFloat(item.price/2));
                }, 0);
                let p = parseFloat(newSubtotal.toFixed(2))
                setTotalEth((p+deliveryPrice)/dataObject.price)
            })
        }else if(window.ethereum.chainId == '0x38' || window.ethereum.chainId == '0x61'){ // Para Bnb y tBnb
            fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBEUR')
            .then((res) => res.json())
            .then((dataObject) => {
                let newSubtotal = bag.reduce((acc, item) => {
                    // @ts-ignore
                    return acc + (item.stock * parseFloat(item.price/2));
                }, 0);
                let p = parseFloat(newSubtotal.toFixed(2))
                setTotalBnb((p+deliveryPrice)/dataObject.price)
            })
        }

      }, []) 

      useEffect(() => {
        let newSubtotal = bag.reduce((acc, item) => {
            // @ts-ignore
            return acc + (item.stock * parseFloat(item.price/2));
        }, 0);
        let p = parseFloat(newSubtotal.toFixed(2))
        setSubtotal(p)

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
    
      useEffect(() => {
        let newSubtotal = bag.reduce((acc, item) => {
            // @ts-ignore
            return acc + (item.stock * parseFloat(item.price/2));
        }, 0);
  
        let p = parseFloat(newSubtotal.toFixed(2))
        setSubtotal(p)
      }, [bag])


      const getUserBalance = (accountAddress: any) => {
        window.ethereum.request({method: 'eth_getBalance', params: [String(accountAddress), "latest"]})
        .then((balance: any) => {
            ethers.formatEther(balance)
        })
      }

      async function sendTransaction(){
        
        let params = [{
            from: myAddress,
            to: "0xC0527FD0C6b743439e06a4d40c9f6E880F871354",
            value: ethers.parseEther(totalBnb.toString()).toString(16)
        }]

        try {
            let result = await window.ethereum.request({ method: "eth_sendTransaction", params });
           
            const fechaActual = new Date();
            const dia = fechaActual.getDate().toString().padStart(2, '0');
            const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
            const año = fechaActual.getFullYear();
            const hora = fechaActual.getHours().toString().padStart(2, '0');
            const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
            const fechaFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}`;

            const orders: OrderData[] = [...userData.orders];
            const order: OrderData = {
                status: "Preparing your order...",
                userAddress: myAddress,
                transactionHash: result,
                network: window.ethereum.chainId == '0x1' ? 'ETH' : 'BNB',
                products: bag,
                total: subtotal+deliveryPrice,
                date: fechaFormateada
            }
            orders.push(order);
            const newUserData = {...userData, orders: orders };
            delete newUserData._id;

            try {
                const response = await fetch(`http://localhost:3000/users/${myAddress}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newUserData),
                });
          
                if (response.ok) {
                  const responseData = await response.json();
                  console.log('Respuesta del servidor:', responseData);
                } else {
                  console.error('Error en la solicitud al servidor');
                }
            } catch (error) {
              console.error('Error al realizar la solicitud:', error);
            }

            // Añadir Order
/*
            try {
                const response = await fetch(`http://localhost:3000/orders/`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(order),
                });
          
                if (response.ok) {
                  const responseData = await response.json();
                  console.log('Respuesta del servidor:', responseData);
                } else {
                  console.error('Error en la solicitud al servidor');
                }
            } catch (error) {
              console.error('Error al realizar la solicitud:', error);
            }
*/

            setBag([]);
            navigate("/order-confirmation")
        } catch (err) {
            console.error("Error al enviar la transacción:", err);
        }


        
      }

    return (<>
        {windowDimensions.width > 700 && <Nav bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
        {windowDimensions.width <= 700 && <NavMobile bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
        <div className='checkout'>
            <div className='etapas'>
            {(windowDimensions.width > 1000 || window.location.pathname == "/checkout") &&  <span className={window.location.pathname == "/checkout" ? 'checkoutSel' : '' }>1. DELIVERY</span>}
            {(windowDimensions.width > 1000 || window.location.pathname == "/billing") &&  <span className={window.location.pathname == "/billing" ? 'checkoutSel' : '' }>2. BILLING & PAYMENT</span>}
            {(windowDimensions.width > 1000 || window.location.pathname == "/order-confirmation") &&  <span className={window.location.pathname == "/order-confirmation" ? 'checkoutSel' : '' }>3. ORDER CONFIRMATION</span>}
            </div>
            <div className='contentCheck'>
              <div className='deliveryAddress'>
                <h3>DELIVERY ADDRESS
                    <NavLink to="/checkout">Edit address</NavLink>
                </h3>
                <div>
                    <p>{userData.city}</p>
                    <p>{userData.firstName+' '+userData.lastName}</p>
                    <p>{userData.houseNumberAndStreet}</p>
                    <p>{userData.region+', '+userData.postalCode}</p>
                    <p>{userData.country}</p>
                    <p>Phone Number {userData.phoneNumber}</p>
                </div>
                <h3>SELECT PAYMENT METHOD</h3>
                <div className='payMethods'>
                    <div className='btnCrypto'>
                      
                        <button onClick={() => setBtnSelCr("crypto")} className={btnSelCr == "crypto" ? 'btnSelCr': ''}>
                            <svg style={{ height: '80%', marginRight: '.5vh', fill: "none", stroke:"#000000", strokeLinecap:"round", strokeLinejoin:"round"}} viewBox="0 0 48 48" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><defs></defs><path className="cls-1" d="M24,4.5,7.11,14.25v19.5L24,43.5l16.89-9.75V14.25Zm14.29,13"></path><line className="cls-1" x1="7.11" y1="14.25" x2="24" y2="24"></line><line className="cls-1" x1="24" y1="43.5" x2="24" y2="24"></line><line className="cls-1" x1="40.89" y1="14.25" x2="24" y2="24"></line></g></svg>
                            CRYPTO
                        </button>
                        <button onClick={() => setBtnSelCr("card")} className={btnSelCr == "card" ? 'btnSelCr': ''}>
                            <svg style={{ height: '80%', marginRight: '.5vh', fill:"none", stroke:"#000000", strokeLinecap:"round", strokeLinejoin:"round" }} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><defs></defs><rect className="a" x="4.5" y="9.5" width="39" height="29" rx="3"></rect><line className="a" x1="4.5" y1="16.5" x2="43.5" y2="16.5"></line><line className="a" x1="33.5" y1="34.5" x2="33.5" y2="32.5"></line><line className="a" x1="36.5" y1="34.5" x2="36.5" y2="32.5"></line><line className="a" x1="39.5" y1="34.5" x2="39.5" y2="32.5"></line></g></svg>
                            CARD
                        </button>
                    </div>    
                    {btnSelCr == "crypto" && <div className='payCrypto'>
                        <div className='topCr'>
                            <div>
                                {(window.ethereum.chainId == '0x38' || window.ethereum.chainId == '0x61') && <svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>binance</title> <path d="M15.986 1.019l9.189 9.159-3.396 3.393-5.793-5.793-5.793 5.823-3.396-3.393 9.189-9.189zM4.399 12.605l3.365 3.395-3.363 3.365-3.396-3.365zM15.986 12.607l3.394 3.363-3.395 3.395-3.395-3.365 3.395-3.393zM27.572 12.605l3.423 3.395-3.393 3.395-3.395-3.395zM21.778 18.399l3.396 3.393-9.189 9.189-9.189-9.187 3.396-3.395 5.793 5.823 5.793-5.823z"></path> </g></svg>}
                                {(window.ethereum.chainId == '0x38' || window.ethereum.chainId == '0x61') && <p>Binance Smart Chain</p>}
                                {window.ethereum.chainId == '0x1' && <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 226.777 226.777" enableBackground="new 0 0 226.777 226.777" xmlSpace="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon fill="#121212" points="112.553,157 112.553,86.617 44.158,116.937 "></polygon> <polygon fill="#121212" points="112.553,82.163 112.553,-0.056 46.362,111.156 "></polygon> <polygon fill="#121212" points="116.962,-0.09 116.962,82.163 184.083,111.566 "></polygon> <polygon fill="#121212" points="116.962,86.617 116.962,157.002 185.405,116.957 "></polygon> <polygon fill="#121212" points="112.553,227.406 112.553,171.085 44.618,131.31 "></polygon> <polygon fill="#121212" points="116.962,227.406 184.861,131.31 116.962,171.085 "></polygon> </g> </g></svg>}
                                {window.ethereum.chainId == '0x1' && <p>Ethereum Mainnet</p>}
                            </div>
                            <p>{myAddress.substring(0, 8)+'...'+myAddress.substring(35)}</p>
                        </div>
                        <div className='sendCr'>
                            {(window.ethereum.chainId == '0x38' || window.ethereum.chainId == '0x61') && <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none"> <circle cx="16" cy="16" r="16" fill="#F3BA2F"></circle> <path fill="#FFF" d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z"></path> </g> </g></svg>}
                            {(window.ethereum.chainId == '0x38' || window.ethereum.chainId == '0x61') && <span>BNB</span>}
                            {window.ethereum.chainId == '0x1' && <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fillRule="evenodd"> <circle cx="16" cy="16" r="16" fill="#627EEA"></circle> <g fill="#FFF" fillRule="nonzero"> <path fillOpacity=".602" d="M16.498 4v8.87l7.461 3.35z"></path> <path d="M16.498 4L9 16.22l7.498-3.35z"></path> <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z"></path> <path d="M16.498 27.995v-6.028L9 17.616z"></path> <path fillOpacity=".2" d="M16.498 20.573l7.461-4.353-7.461-3.348z"></path> <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z"></path> </g> </g> </g></svg>}
                            {window.ethereum.chainId == '0x1' && <span>ETH</span>}
                            {(window.ethereum.chainId == '0x38' || window.ethereum.chainId == '0x61') && <input type="text" onChange={(e) => setTotalBnb(parseFloat(e.target.value))} value={totalBnb} placeholder='0.0'/>}
                            {window.ethereum.chainId == '0x1' && <input type="text" onChange={(e) => setTotalEth(parseFloat(e.target.value))} value={totalEth} placeholder='0.0'/>}
                        </div>
                    </div>}
                    {btnSelCr == "card" && <div className='payCard'>
                        <p>Coming soon...</p>
                    </div>}
                </div>
              </div>
              {windowDimensions.width > 1000 && <div className='orderSummaryDiv'>
                <h3>ORDER SUMMARY</h3>
                <div className='orderSummary'>
                  {bag.map((e, i) => (
                      <div key={i}>
                        <img src={e.image} alt="" />
                        <div>
                          <h1>{e.name}</h1>
                          <p style={{ display: 'flex', alignItems: 'center' }}>COLOUR: <div className='osColour' style={{ backgroundColor: e.color}}></div></p>
                          <p>SIZE: <i>{e.size}</i></p>
                          <p>QTY: <i>{e.stock}</i></p>
                          <div className='orPrices'>
                            <p>€{e.price/2}</p>
                            <span>€{e.price}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  }

                </div>
                <div className='ordenTotal'>
                    <div>
                      <p>Subtotal:</p>
                      <span>€{subtotal*2}</span>
                    </div>
                    <div>
                      <p>Spain Standard:</p>
                      <span>€5.99</span>
                    </div>
                    <div style={{ marginBottom: '2vh'}}>
                      <p>Discount:</p>
                      <span>- €{subtotal}</span>
                    </div>
                    <p>Discounts included</p>
                    <p style={{ color: 'rgb(204, 0, 0)', fontWeight: '600'}}>50% OFF! - €{subtotal}</p>
                    <div style={{ marginTop: '2vh'}}>
                      <p style={{ fontSize: '2vh'}}>Estimated Total:</p>
                      <span style={{ fontSize: '2vh', fontWeight: '600'}}>€{(subtotal+deliveryPrice).toFixed(2)}</span>
                    </div>
                    <p>*All taxes are included in product prices</p>
                </div>
              </div>}

            </div>
            <div className='proceedTo'>
              <a onClick={() => sendTransaction()}>PROCEED TO BILLING</a>
            </div>
        </div>
      </>)
}