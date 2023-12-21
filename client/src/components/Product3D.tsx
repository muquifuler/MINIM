import React from 'react'
import { NavLink } from 'react-router-dom';
import '../styles/Product3D.css'

export default function Product({ bag, setBag, img, name, href, shopName, price, setSelectProduct}: { bag: Array<100>, setBag: Function, img: string, name: string, href: string, shopName: string, price: string, setSelectProduct: Function}) {

  return (
        <NavLink className='p' onClick={() => {
          setSelectProduct({img,name,href,shopName,price});
        }} to='/product'>
          <img src={img} className='p-img'></img>
          <span className='p-title'>{name.substring(0, 30)}</span>
          <p className='p-shop'>{shopName}</p>
          <div className='flex'>
              <span className='p-price'>{price}</span>
          </div>
        </NavLink>
  )
}

