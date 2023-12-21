import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import '../styles/Product.css'

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

export default function Product({ setBag, img, name, collection, price, date, code, setSelectProduct, color }: { setBag: Function, img: string[], name: string, collection: string, price: number, date: number[], code: string, setSelectProduct: Function, color: Object}) {

  const handleNavLinkClick = () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Realiza un desplazamiento suave
    });

    setSelectProduct({ img, name, collection, price, date, code, color });
  };

  const [viewImg, setViewImg] = useState(img[0]);
  return (
    <div className='p'>
      <div style={{ position: 'relative'}}  >
        <NavLink onClick={handleNavLinkClick} to='/product' >
          <img src={viewImg} className='p-img'></img>
        </NavLink>
        <div className='colorBa'>
          {
            img.map((e, i) => (
              <img onClick={() => {
                setViewImg(e); 
                
              }} key={i} src={e} className='p-img'></img>
            ))
          }
        </div>
      </div>
      <div className='content-product'>
        <span className='p-title'>{name.substring(0, 35)}</span>
        <p className='p-shop'>{!collection ? "MINIM COLLECTION" : collection}</p>
        <div>
          <span>{"€"+(price/2)+" (-50%)"}</span>
          <span className='second-span'>{"€"+price}</span>
        </div>
      </div>

    </div>
  )
}
