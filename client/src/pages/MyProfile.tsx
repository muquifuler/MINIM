import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import LibellulaContract from '../json/contract.json'
import Nav from '../components/Nav';
import NavMobile from '../components/NavMobile';
import Footer from '../components/Footer';
import '../styles/MyProfile.css'

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

export default function MyProfile({ bag, setBag, smartContract, myAddress, requestAccount, userData, setUserData }: { bag: Array<100>, setBag: Function, smartContract: string, myAddress: string, requestAccount: Function, userData: { _id: string; nickname: string; firstName: string; lastName: string, dateOfBirth: { day: string, month: string, year: string }, country: string, houseNumberAndStreet: string, city: string, region: string, postalCode: string, phoneNumber: string, address: string, email: string, orders: Array<999> }, setUserData: Function }) {

  const [myOrders, setMyOrders] = useState<{ _id: string; status: string; userAddress: string; products: selProd[]; date: string; }[]>([]);
  const [downloadData, setDownloadData] = useState(true);
  const [myBalance, setMyBalance] = useState("");
 
  const [myProfile_, setMyProfile_] = useState(true);
  const [myOrders_, setMyOrders_] = useState(true);
  
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    if(myAddress){
      fetch('http://localhost:3000/users/'+myAddress)
      .then((response) => response.json())
      .then((obj) => {
        setUserData(obj);
        if(Array.isArray(obj.orders)){
          setMyOrders(obj.orders.reverse());
        }
        setDownloadData(false)
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });
    }

  }, [myAddress]); 

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
  
  const handleSubmit = async () => {

    let a = { ...userData }
    a = { ...a, address: myAddress }
    // @ts-ignore
    a = { ...a, orders: myOrders }
    a = { ...a, dateOfBirth: { day: "12", month: "11", year: "1996" } }

    setUserData(a)

    try {
      const response = await fetch(`http://localhost:3000/users/${myAddress}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(a),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
        setUserData(responseData);
      } else {
        console.error('Error en la solicitud al servidor');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  
  return (
    <div>
      {windowDimensions.width > 700 && <Nav bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
      {windowDimensions.width <= 700 && <NavMobile bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
      <div className='myProfile'>
          <aside>
            <p>MY PROFILE</p>
            {!myProfile_ && <svg style={{ transform: 'rotate(90deg)'}} onClick={() => setMyProfile_(!myProfile_)} width="216px" height="216px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#0f0f0f" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#0f0f0f"></path> </g></svg>}
            {myProfile_ && <svg onClick={() => setMyProfile_(!myProfile_)} width="216px" height="216px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#0f0f0f" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#0f0f0f"></path> </g></svg>}
          </aside>
          {myAddress == "" && <div className='profileConnect'>
            <button onClick={() => requestAccount()}>Connect wallet</button>
          </div>}
          {myProfile_ && downloadData && myAddress != "" && <div className='noOrders'>
            <div className="loader">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
              <div className="bar4"></div>
              <div className="bar5"></div>
              <div className="bar6"></div>
              <div className="bar7"></div>
              <div className="bar8"></div>
              <div className="bar9"></div>
              <div className="bar10"></div>
              <div className="bar11"></div>
              <div className="bar12"></div>
          </div>
          </div>}
          {myProfile_ && !downloadData && myAddress != "" && <form onSubmit={ (e) =>  e.preventDefault() }>
            <div style={{ marginTop: '2vh'}}>
              <span>Nombre <i>*</i></span>
              <span>Apellidos</span>
            </div>
            <div style={{ marginBottom: '2.5vh'}}>
              <input className="inputNormal" type='text' name='name' value={userData?.firstName} onChange={e => setUserData({ ...userData, firstName: e.target.value })}></input>
              <input className="inputNormal" type='text' name='name2' value={userData?.lastName} onChange={e => setUserData({ ...userData, lastName: e.target.value })}></input>
            </div>
            
            <div>
              <span>Email <i>*</i></span>
            </div>
            <div style={{ marginBottom: '2.5vh'}}>
              <input className='inputEmail' type='text' name='email' value={userData?.email} onChange={e => setUserData({ ...userData, email: e.target.value })}></input>
            </div>

            <div>
              <span>Dirección <i>*</i></span>
              <span>País <i>*</i></span>
            </div>
            <div style={{ marginBottom: '2.5vh'}}>
              <input className="inputNormal" type='text' name='street' value={userData?.houseNumberAndStreet} onChange={e => setUserData({ ...userData, houseNumberAndStreet: e.target.value })}></input>
              <select value={userData?.country} aria-label="Divisa" onChange={e => setUserData({ ...userData, country: e.target.value })}>
                <option value="1">España (Península y Baleares)</option>
                <option value="2">Antidoto28</option>
                <option value="3">ETH</option>
                <option value="4">BNB</option>
              </select>
            </div>

            <div>
              <span>Codigo postal <i>*</i></span>
              <span>Móvil</span>
            </div>
            <div style={{ marginBottom: '2.5vh'}}>
              <input className="inputNormal" type='text' name='postalcode' value={userData?.postalCode} onChange={e => setUserData({ ...userData, postalCode: e.target.value })}></input>
              <input className="inputNormal" type='text' name='movil' value={userData?.phoneNumber} onChange={e => setUserData({ ...userData, phoneNumber: e.target.value })}></input>
            </div>

            <div>
              <span>Region <i>*</i></span>
              <span>Población <i>*</i></span>
            </div>
            <div style={{ marginBottom: '1vh'}}>
              <input className="inputNormal" type='text' name='province' value={userData?.region} onChange={e => setUserData({ ...userData, region: e.target.value })}></input>
              <input className="inputNormal" type='text' name='city' value={userData?.city} onChange={e => setUserData({ ...userData, city: e.target.value })}></input>
            </div>
            <br />
            <div className='text'>
              <p>Data is stored on a private, centralized server to keep it private and safe.</p>
              <p>By creating your account you agree to our <a href="#">Terms & Conditions.</a></p>
              <p>Find out more, please read our <a href="#">Privacy Notice.</a></p>
            </div>
            <br />
            <div>
              <button className='btn-Save' onClick={() => handleSubmit()}>Save</button>
            </div>

          </form>}
          <aside>
            <p>MY ORDERS</p>
            {!myOrders_ && <svg style={{ transform: 'rotate(90deg)'}} onClick={() => setMyOrders_(!myOrders_)} width="216px" height="216px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#0f0f0f" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#0f0f0f"></path> </g></svg>}
            {myOrders_ && <svg onClick={() => setMyOrders_(!myOrders_)} width="216px" height="216px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#0f0f0f" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#0f0f0f"></path> </g></svg>}
          </aside>
          {myOrders_ && downloadData && myAddress != "" && <div className='noOrders'>
            <div className="loader">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
              <div className="bar4"></div>
              <div className="bar5"></div>
              <div className="bar6"></div>
              <div className="bar7"></div>
              <div className="bar8"></div>
              <div className="bar9"></div>
              <div className="bar10"></div>
              <div className="bar11"></div>
              <div className="bar12"></div>
          </div>
          </div>}
          {myOrders_ && !downloadData && myOrders.length <= 0 && <span className='noOrders'>There are no orders in history...</span>}
          {myOrders_ && myOrders.map((e, i) => (
            <div className='order' key={i}>
              <div className='state'>
                <div className='stateColor' style={{ backgroundColor: e.status == "Complete" ? "green" : e.status == "The package is arriving..." || e.status == "Preparing your order..." ? "yellow" : e.status == "Cancelled" ? "red" : ""}}></div>
                <span className='stateName'>{e.status}</span>
              </div>
              <div className='state'>
                <span>Date: {e.date}</span>
              </div>
              {e.products.map((ee: { image: string | undefined; }, ii: React.Key | null | undefined) => ( 
                <div key={ii} className='productOrder'>
                  <img src={ee.image} alt="" />
                  <div>
                    <p className='or-name'>{
                    // @ts-ignore
                    ee.name}</p>
                    <p className='or-shop'>{
                    // @ts-ignore
                    ee.collection}</p>
                    <p className='or-size'>SIZE: {
                    // @ts-ignore
                    ee.size}</p>
                    <p className='or-price'>€{
                    // @ts-ignore
                    ee.price}</p>
                  </div>
                </div>
              ))}
              {windowDimensions.width > 700 && <p>
                  {// @ts-ignore
                    e.network == "BSC" && <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none"> <circle cx="16" cy="16" r="16" fill="#F3BA2F"></circle> <path fill="#FFF" d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z"></path> </g> </g></svg>}
                  {// @ts-ignore
                  e.network == "ETH" && <svg viewBox="-80.5 0 417 417" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon fill="#343434" points="127.9611 0 125.1661 9.5 125.1661 285.168 127.9611 287.958 255.9231 212.32"> </polygon> <polygon fill="#8C8C8C" points="127.962 0 0 212.32 127.962 287.959 127.962 154.158"> </polygon> <polygon fill="#3C3C3B" points="127.9611 312.1866 126.3861 314.1066 126.3861 412.3056 127.9611 416.9066 255.9991 236.5866"> </polygon> <polygon fill="#8C8C8C" points="127.962 416.9052 127.962 312.1852 0 236.5852"> </polygon> <polygon fill="#141414" points="127.9611 287.9577 255.9211 212.3207 127.9611 154.1587"> </polygon> <polygon fill="#393939" points="0.0009 212.3208 127.9609 287.9578 127.9609 154.1588"> </polygon> </g> </g></svg>}
                  {// @ts-ignore
                  e.network+" - Txn hash: "}
                  <span>{// @ts-ignore
                  e.transactionHash.substring(0, 23)+"..."}</span>
                  <svg style={{ marginLeft: 'auto'}} onClick={
                    // @ts-ignore
                    async () => await navigator.clipboard.writeText(e.transactionHash)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10 8V7C10 6.05719 10 5.58579 10.2929 5.29289C10.5858 5 11.0572 5 12 5H17C17.9428 5 18.4142 5 18.7071 5.29289C19 5.58579 19 6.05719 19 7V12C19 12.9428 19 13.4142 18.7071 13.7071C18.4142 14 17.9428 14 17 14H16M7 19H12C12.9428 19 13.4142 19 13.7071 18.7071C14 18.4142 14 17.9428 14 17V12C14 11.0572 14 10.5858 13.7071 10.2929C13.4142 10 12.9428 10 12 10H7C6.05719 10 5.58579 10 5.29289 10.2929C5 10.5858 5 11.0572 5 12V17C5 17.9428 5 18.4142 5.29289 18.7071C5.58579 19 6.05719 19 7 19Z" stroke="#0f0f0fcb" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
                </p>}
              {windowDimensions.width <= 700 && <p>
                  {// @ts-ignore
                    e.network == "BSC" && <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none"> <circle cx="16" cy="16" r="16" fill="#F3BA2F"></circle> <path fill="#FFF" d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z"></path> </g> </g></svg>}
                  {// @ts-ignore
                  e.network == "ETH" && <svg viewBox="-80.5 0 417 417" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon fill="#343434" points="127.9611 0 125.1661 9.5 125.1661 285.168 127.9611 287.958 255.9231 212.32"> </polygon> <polygon fill="#8C8C8C" points="127.962 0 0 212.32 127.962 287.959 127.962 154.158"> </polygon> <polygon fill="#3C3C3B" points="127.9611 312.1866 126.3861 314.1066 126.3861 412.3056 127.9611 416.9066 255.9991 236.5866"> </polygon> <polygon fill="#8C8C8C" points="127.962 416.9052 127.962 312.1852 0 236.5852"> </polygon> <polygon fill="#141414" points="127.9611 287.9577 255.9211 212.3207 127.9611 154.1587"> </polygon> <polygon fill="#393939" points="0.0009 212.3208 127.9609 287.9578 127.9609 154.1588"> </polygon> </g> </g></svg>}
                  {// @ts-ignore
                  e.network+" - Txn hash: "}
                  <span>{// @ts-ignore
                  e.transactionHash.substring(0, 13)+"..."}</span>
                  <svg style={{ marginLeft: 'auto'}} onClick={
                    // @ts-ignore
                    async () => await navigator.clipboard.writeText(e.transactionHash)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10 8V7C10 6.05719 10 5.58579 10.2929 5.29289C10.5858 5 11.0572 5 12 5H17C17.9428 5 18.4142 5 18.7071 5.29289C19 5.58579 19 6.05719 19 7V12C19 12.9428 19 13.4142 18.7071 13.7071C18.4142 14 17.9428 14 17 14H16M7 19H12C12.9428 19 13.4142 19 13.7071 18.7071C14 18.4142 14 17.9428 14 17V12C14 11.0572 14 10.5858 13.7071 10.2929C13.4142 10 12.9428 10 12 10H7C6.05719 10 5.58579 10 5.29289 10.2929C5 10.5858 5 11.0572 5 12V17C5 17.9428 5 18.4142 5.29289 18.7071C5.58579 19 6.05719 19 7 19Z" stroke="#0f0f0fcb" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
                </p>}
            </div>
          ))}
            <div className='text'>
              {myOrders.length > 0 && <p>The data is stored on the blockchain to increase visibility and confidence in the traceability of your orders.</p>}
            </div>

      </div>
      {windowDimensions.width > 700 && <Footer/>}
    </div>
  )
}
