import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import NavMobile from '../components/NavMobile';
import { NavLink, useNavigate } from 'react-router-dom';
import ConnectMetamask from '../components/ConnectMetamask';
import Product from '../components/Product';
import Footer from '../components/Footer';
import '../styles/ViewProduct.css'

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

export default function ViewProduct({ bag, setBag, selectProduct, myAddress, requestAccount, productsDef, setSelectProduct, recentlyViewed, setRecentlyViewed }: { bag: Array<100>, setBag: Function, selectProduct: ProductData, myAddress: string, requestAccount: Function, productsDef: ProductData[], setSelectProduct: Function, recentlyViewed: ProductData[], setRecentlyViewed: Function  }) {
  
    const [reSel, setReSel] = useState(0);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [image, setImage] = useState("");
    const [imgSel, setImgSel] = useState(0);
    const [colors, setColors] = useState<string[]>([]);
    const [productsDefRe, setProductsDefRe] = useState<ProductData[]>([]);
    const [connectWallet, setConnectWallet] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
      });
      const navigate = useNavigate();

      useEffect(() => {
        console.log(selectProduct)
        if(!selectProduct){
          navigate(-1)
        }
      }, [])

      useEffect(() => {
        if (selectProduct != undefined && selectProduct != null && selectProduct.color != undefined) {
          const coloresConCantidadMayorQueCero = Object.entries(selectProduct.color)
            .filter(([color, cantidad]) => cantidad > 0)
            .map(([color]) => color);
      
          const coloresHexadecimales = coloresConCantidadMayorQueCero.map((color) => {
            const coloresHex: { [key: string]: string } = {
              khaki: "#8B4513",
              white: "#FFFFFF",
              black: "#000000",
            };
            return coloresHex[color];
          });
      
          setColors(coloresHexadecimales);
        }

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
        if(selectProduct.img != undefined){
          setImage(selectProduct.img[imgSel]);
        }else{
          navigate(-1)
        }
   
      },[imgSel])

      useEffect(() => {
        const max = productsDef.length;
        let numR1 = -1;
        let numR2 = -1;
        let numR3 = -1;

        while(true){
          const numRand = Math.floor(Math.random() * max);
          if(numRand != numR1 && numRand != numR2 && numRand != numR3) {
            if(numR1 == -1){
              numR1 = numRand
            } else if(numR2 == -1){
              numR2 = numRand
            } else if(numR3 == -1) {
              numR3 = numRand
              break
            }
          }
        }
        setProductsDefRe([productsDef[numR1], productsDef[numR2], productsDef[numR3]])

        let arrF = [...recentlyViewed]
        arrF.push(selectProduct)

        if(arrF.length >= 4) arrF.shift()
        console.log(arrF)
        setRecentlyViewed(arrF)
      }, [selectProduct])

      function handleAddBag(){

        if(myAddress){
          let name = selectProduct.name;
          let collection = selectProduct.collection;
          let price = selectProduct.price;
          let stock = 1;
          // @ts-ignore
          const objetoEncontrado = bag.find(item => item.name == name && item.collection == collection && item.size == size && item.color == color);
  
          if(!objetoEncontrado) setBag([...bag, { image, name, collection, price, stock, size, color }])
        }else{
          if(window.ethereum){
            setConnectWallet(true)
          }else{
            // Necesitas tener metamask en tu ordenador
          }

        }

      }



    return (
    <>
        {connectWallet && <div className='CW' onClick={() => setConnectWallet(false)}>
            <ConnectMetamask myAddress={myAddress} requestAccount={requestAccount} setConnectWallet={setConnectWallet}/>
          </div>}
        {windowDimensions.width > 700 && <Nav bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
        {windowDimensions.width <= 700 && <NavMobile bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
        <div className='viewproduct'>
          {selectProduct.img != undefined && <img src={selectProduct.img[imgSel]} alt="" />}
          {windowDimensions.width > 700 && <div className='imgs'>
            {selectProduct != undefined && selectProduct.img != undefined && selectProduct.img.map((e: string | undefined, i: React.Key | null | undefined) => (
              <img key={i} src={e} alt="" onClick={() => setImgSel(i)}/>
            ))}
          </div>}
          {windowDimensions.width <= 700 && <div className='imgsMovil'>
            {selectProduct != undefined && selectProduct.img != undefined && selectProduct.img.map((e: string | undefined, i: React.Key | null | undefined) => (
              <img key={i} src={e} alt="" onClick={() => setImgSel(i)}/>
            ))}
            </div>
          }
          {windowDimensions.width > 700 && <div className='infoView'>
            <p className='title'>{selectProduct.name}</p>
            <p className='code'>Product code: {selectProduct.code}</p>
            <p className='disccount'>50% OFF EVERYTHING!*</p>
            <div className='prices'>
              <span>{"€"+(selectProduct.price/2)+" ( -50% )"}</span>
              <span className='disccount-price'>{"€"+selectProduct.price}</span>
            </div>
            <p className='selectColor'>COLOUR: WHITE</p>
            <div className='selectColorDiv'>
              {colors.map((e, i) => (
                <span key={i} style={{backgroundColor: e}} className={color == e ? 'colorSel' : ''} onClick={() => {
                  setColor(e);
                  setImgSel(i);
                }}></span>
              ))}
            </div>
            <p className='selectSize'>SIZE: PLEASE SELECT</p>
            <div className='sizes'>
              <button className={size == "XS" ? 'sizesSel' : ''} onClick={() => setSize("XS")}>XS</button>
              <button className={size == "S" ? 'sizesSel' : ''} onClick={() => setSize("S")}>S</button>
              <button className={size == "M" ? 'sizesSel' : ''} onClick={() => setSize("M")}>M</button>
              <button className={size == "L" ? 'sizesSel' : ''} onClick={() => setSize("L")}>L</button>
              <button className={size == "XL" ? 'sizesSel' : ''} onClick={() => setSize("XL")}>XL</button>
              <button className={size == "XXL" ? 'sizesSel' : ''} onClick={() => setSize("XXL")}>XXL</button>
            </div>
            {size == "" && <button className='btnView' disabled>SELECT SIZE</button>}
            {size != "" && <button className='btnView' onClick={() => { handleAddBag() }}>ADD TO BAG</button>}
          </div>}
          {windowDimensions.width <= 700 && <div className='infoMovil'>
            <p className='title'>{selectProduct.name}</p>
            <p className='code'>Product code: {selectProduct.code}</p>
            <p className='disccount'>50% OFF EVERYTHING!*</p>
            <div className='prices'>
              <span>{"€"+(selectProduct.price/2)+" ( -50% )"}</span>
              <span className='disccount-price'>{"€"+selectProduct.price}</span>
            </div>
            <p className='selectColor'>COLOUR: WHITE</p>
            <div className='selectColorDiv'>
              {colors.map((e, i) => (
                <span key={i} style={{backgroundColor: e}} className={color == e ? 'colorSel' : ''} onClick={() => {
                  setColor(e);
                  setImgSel(i);
                }}></span>
              ))}
            </div>
            <p className='selectSize'>SIZE: PLEASE SELECT</p>
            <div className='sizes'>
              <button className={size == "XS" ? 'sizesSel' : ''} onClick={() => setSize("XS")}>XS</button>
              <button className={size == "S" ? 'sizesSel' : ''} onClick={() => setSize("S")}>S</button>
              <button className={size == "M" ? 'sizesSel' : ''} onClick={() => setSize("M")}>M</button>
              <button className={size == "L" ? 'sizesSel' : ''} onClick={() => setSize("L")}>L</button>
              <button className={size == "XL" ? 'sizesSel' : ''} onClick={() => setSize("XL")}>XL</button>
              <button className={size == "XXL" ? 'sizesSel' : ''} onClick={() => setSize("XXL")}>XXL</button>
            </div>
            {size == "" && <button className='btnView' disabled>SELECT SIZE</button>}
            {size != "" && <button className='btnView' onClick={() => { handleAddBag() }}>ADD TO BAG</button>}
          </div>}
        </div>
        <div className='reDad'>
          <div className='reBtn'>
            <button onClick={() => setReSel(0)} className={reSel == 0 ? 'reBtnSel' : ''}>WE THINK YOU'LL LIKE</button>
            <button onClick={() => setReSel(1)} className={reSel == 1 ? 'reBtnSel' : ''}>RECENTLY VIEWED ITEMS</button>
          </div>
          <div className='recommended'>
            <div className='recommendedDiv'></div>
                {reSel == 0 && productsDefRe.map((e, i) => (
                  <div key={i} style={{ marginBottom: '1vh' }}>
                    {i < 3 &&
                    <Product setBag={setBag} img={e.img} name={e.name} collection={e.collection} price={e.price} date={e.date} code={e.code} setSelectProduct={setSelectProduct} color={e.color}></Product>}
                  </div>
                ))}
                {reSel == 1 && recentlyViewed.map((e, i) => (
                  <div key={i} style={{ marginBottom: '1vh' }}>
                    {i < 3 &&
                    <Product setBag={setBag} img={e.img} name={e.name} collection={e.collection} price={e.price} date={e.date} code={e.code} setSelectProduct={setSelectProduct} color={e.color}></Product>}
                  </div>
                ))}
          </div>
        </div>
        {windowDimensions.width > 700 && <Footer/>}
    </>
  )
}
