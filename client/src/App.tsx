import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Shop from './pages/Shop';
import MyProfile from './pages/MyProfile';
import BuyLibel from './pages/BuyLibel';
import Sellers from './pages/Sellers';
import ViewProduct from './pages/ViewProduct';
import CookiesPolicy from './pages/CookiesPolicy';
import FAQ from './pages/FAQ';
import Checkout from './pages/Checkout';
import Billing from './pages/Billing';
import OrderConfirmation from './pages/OrderConfirmation';
import NotFound from './pages/NotFound';

import './App.css';

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

function App() {

  const [products, setProducts] = useState<ProductData[][]>([]);
  const [productsDef, setProductsDef] = useState<ProductData[]>([]);

  const [bag, setBag] = useState(() => {
    const savedBag = localStorage.getItem('bag');
    return savedBag ? JSON.parse(savedBag) : [];
  });
  const [deliveryPrice, setDeliveryPrice] = useState(2.99);
  const [selectProduct, setSelectProduct] = useState<ProductData>({
    ventasTotales: 0, code:"", link:"", date: [2023,9,27], type: "", collection: "", name:"", price: 0, img:[""],
    size: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
    color: { khaki: 0, white: 0, black: 0 }
});
  const [smartContract, setSmartContract] = useState("0xF1874c7BF36c02267A3B201fd318eB4A0aD5de68");

  const [recentlyViewed, setRecentlyViewed] = useState<ProductData[]>([]);

  const [myAddress, setMyAddress] = useState(() => {
    const savedAddress = localStorage.getItem('myAddress');
    return savedAddress || '';
  });
  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : {
      _id: "",
      nickname: "",
      firstName: "",
      lastName: "",
      dateOfBirth: { day: "", month: "", year: "" },
      country: "",
      houseNumberAndStreet: "",
      city: "",
      region: "",
      postalCode: "",
      phoneNumber: "",
      address: "",
      email: "",
      orders: [],
    };
  });
  
    useEffect(() => {
      localStorage.setItem('bag', JSON.stringify(bag));
    }, [bag]);

    useEffect(() => {
      localStorage.setItem('myAddress', myAddress);
    }, [myAddress]);

    useEffect(() => {
      localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    useEffect(() => {
      const savedBag = localStorage.getItem('bag');
      if (savedBag) {
        setBag(JSON.parse(savedBag));
      }
      const savedAddress = localStorage.getItem('myAddress');
      console.log(localStorage)
      if (savedAddress) {
        setMyAddress(savedAddress);
      }
      const savedUserData = localStorage.getItem('userData');
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      }
    }, []);

  async function requestAccount() {
    console.log(window.ethereum.chainId)
    let address = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setMyAddress(address[0]);
  }

  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home bag={bag} setBag={setBag} setSelectProduct={setSelectProduct} myAddress={myAddress} requestAccount={requestAccount}/>}/>
          <Route path='/shop' element={<Shop bag={bag} setBag={setBag} setSelectProduct={setSelectProduct} myAddress={myAddress} requestAccount={requestAccount} productsDef={productsDef} products={products} setProductsDef={setProductsDef} setProducts={setProducts}/>}/>
          <Route path='/myprofile' element={<MyProfile bag={bag} setBag={setBag} smartContract={smartContract} myAddress={myAddress} requestAccount={requestAccount} userData={userData} setUserData={setUserData}/>}/>
          <Route path='/checkout' element={<Checkout bag={bag} setBag={setBag} smartContract={smartContract} myAddress={myAddress} requestAccount={requestAccount} deliveryPrice={deliveryPrice} setDeliveryPrice={setDeliveryPrice} userData={userData} setUserData={setUserData}/>}/>
          <Route path='/billing' element={<Billing bag={bag} setBag={setBag} smartContract={smartContract} myAddress={myAddress} requestAccount={requestAccount} deliveryPrice={deliveryPrice} setDeliveryPrice={setDeliveryPrice} userData={userData} setUserData={setUserData}/>}/>
          <Route path='/order-confirmation' element={<OrderConfirmation bag={bag} setBag={setBag} smartContract={smartContract} myAddress={myAddress} requestAccount={requestAccount} deliveryPrice={deliveryPrice} setDeliveryPrice={setDeliveryPrice} userData={userData} setUserData={setUserData}/>}/>
          <Route path='/sellers' element={<Sellers bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}/>
          <Route path='/product' element={<ViewProduct bag={bag} setBag={setBag} selectProduct={selectProduct} myAddress={myAddress} requestAccount={requestAccount} productsDef={productsDef} setSelectProduct={setSelectProduct} recentlyViewed={recentlyViewed} setRecentlyViewed={setRecentlyViewed}/>}/>
          <Route path='/FAQ' element={<FAQ bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}/>
          <Route path='/Cookies-policy' element={<CookiesPolicy bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
    </Router>
  )
}

export default App
