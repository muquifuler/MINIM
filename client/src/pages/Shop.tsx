import React, { Component, useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Product from '../components/Product'
import NavMobile from '../components/NavMobile';

import '../styles/Shop.css'

interface ProductData {
  code: string;
  ventasTotales: number, 
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

export default function Shop({ bag, setBag, setSelectProduct, myAddress, requestAccount, productsDef, products, setProductsDef, setProducts }: { bag: Array<100>, setBag: Function, setSelectProduct: Function, myAddress: string, requestAccount: Function, productsDef: ProductData[], products: ProductData[][], setProductsDef: Function, setProducts: Function   }) {


  const [orderBy, setOrderby] = useState("Newest");
  const [typeBy, setTypeby] = useState("All Clothes");
  const [collectionBy, setCollectionby] = useState("All Shops");

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    if(productsDef.length <= 0){
      fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((responseData) => {
        setProductsDef(responseData)
        
        let arrFinal = []
        for(let i=0; i<responseData.length; i++){
          let arrInter = []
          for(let j=i; j<(i+4); j++){
            if(!responseData[j]) break
            arrInter.push(responseData[j])
            
          }
          arrFinal.push(arrInter)
          i+=3
        }
        console.log(arrFinal)
        setProducts(arrFinal)
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });
    }

  }, []); 

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

  useEffect(() => {
    let copy = [...products];

    for(let i=0; i<products.length; i++){
      // @ts-ignore
      if(typeBy != "All Clothes") copy[i] = copy[i].filter((item) => item.type == typeBy)
      // @ts-ignore
      if(collectionBy != "All Shops") copy[i] = copy[i].filter((item) => item.collection == collectionBy)
    }

    setProducts(copy);

    copy = [...products];
    let fullArr = copy[0];

    for(let i=1; i<copy.length; i++){
      // @ts-ignore
      fullArr.concat(fullArr, copy[i]);
    }
    // @ts-ignore
    if(typeBy != "All Clothes") fullArr = fullArr.filter((item) => item.type == typeBy)
    // @ts-ignore
    if(collectionBy != "All Shops") fullArr = fullArr.filter((item) => item.collection == collectionBy)
    // @ts-ignore
    setProductsDef(fullArr);

  }, [orderBy, typeBy, collectionBy])

  return (
    <>
      {windowDimensions.width > 700 && <Nav bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
      {windowDimensions.width <= 700 && <NavMobile bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}

      <div className="shop-options">

        <span>SHOWING THE {productsDef?.length} RESULTS</span>
        <div>
        <select aria-label="collection" onChange={(e) => {setCollectionby(e.target.value)}}>
          <option value="All Shops">All Shops</option>
          <option value="MINIM COLLECTION">MINIM COLLECTION</option>
          <option value="LIBEL">LIBEL</option>
          <option value="Antidoto28">Antidoto28</option>
        </select>
        <select aria-label="Type" onChange={(e) => {setTypeby(e.target.value)}}>
          <option value="All Clothes">All Clothes</option>
          <option value="T-Shirt">T-Shirt</option>
          <option value="Hoodies">Hoodies</option>
          <option value="Sweatshirts">Sweatshirts</option>
          <option value="Trousers">Trousers</option>
          <option value="Jackets">Jackets</option>
          <option value="Sneakers">Sneakers</option>
        </select>
        <select aria-label="Order" style={{ marginRight: '0'}} onChange={(e) => {setOrderby(e.target.value)}}>
          <option value="Newest">Newest</option>
          <option value="Best sellers">Best sellers</option>
          <option value="High to low">High to low</option>
          <option value="Low to high">Low to high</option>
        </select>
        </div>

      </div>
      {windowDimensions.width > 700 && <div className='SHOP'>
        <hr />
          {products.length == 0 && <div className='shopLoader'><div className="loader">
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
          </div></div>}
          {products.length > 0 && products.map((e, i) => 
          <div className='productsShop' key={i}>
            {e.map((e_, i_) => i_ < 4 && // @ts-ignore
              <div key={i_}>
                  <Product setBag={setBag} img={e_.img} name={e_.name} collection={e_.collection} price={e_.price} date={e_.date} code={e_.code} setSelectProduct={setSelectProduct} color={e_.color}></Product>
              </div>

            )}
          </div>)}
      </div>}

      {windowDimensions.width <= 700 && <div className='SHOP'>
        {Array.isArray(productsDef) && productsDef.map((e, i) => 
        <div className='productsMobile' key={i}>
          {// @ts-ignore
          <Product setBag={setBag} img={e.img} name={e.name} collection={e.collection} price={e.price} date={e.date} code={e.code} setSelectProduct={setSelectProduct} color={e.color}></Product>}
        </div>
        )}
      </div>}
      {windowDimensions.width <= 700 && !Array.isArray(productsDef) && <div className='productsMobile'>
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
      
      {windowDimensions.width > 700 && <Footer/>}
    </>
  )
}
