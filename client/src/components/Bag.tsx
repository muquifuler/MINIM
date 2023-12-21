import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import '../styles/Bag.css'

interface selProd { 
    collection: string; 
    color: string; 
    image: string; 
    name: string; 
    price: number; 
    size: string; 
    stock: number 
  }

export default function Bag({ bag, setShowBag, showBag, setBag }: { bag: selProd[], setShowBag: Function, showBag: boolean, setBag: Function }) {

    const [subtotal, setSubtotal] = useState(0);

    function deleteItemBag(selectProduct: Object){
        // @ts-ignore
        let name = selectProduct.name;
        // @ts-ignore
        let size = selectProduct.size;
        // @ts-ignore
        let color = selectProduct.color;
        // @ts-ignore
        const newBag = bag.filter(item => item.name != name || item.size != size || item.color != color);

        setBag(newBag);
    }
    // @ts-ignore
    const incrementarStock = (e, sum) => {

        const newBag = bag.map((item) => {
            // @ts-ignore
          if (item.name == e.name && item.size == e.size && item.color == e.color) {
            // @ts-ignore
            if(item.stock + sum > 0) return { ...item, stock: item.stock + sum };
          }
          return item;
        });

        setBag(newBag);
      };

      useEffect(() => {
        let newSubtotal = bag.reduce((acc, item) => {
            // @ts-ignore
            return acc + (item.stock * parseFloat(item.price/2));
        }, 0);

        setSubtotal(parseFloat(newSubtotal.toFixed(2)))
      }, [bag])

    return (
        <div className={`bag ${showBag ? 'openBag' : ''}`}>
            <header className='bag-header-'>
                <span className='bag-title-'>M</span>
                <svg onClick={() => setShowBag(false)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 6L18 18M18 6L6 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </header>
            {bag.length == 0 && <span className='bagNone'>Your shopping bag is empty</span>}
            {
                bag.map((e, i) =>
                    <div className='p-tocart' key={i}>
                        <div className='img-tocart'>
                            <img src={// @ts-ignore
                                e.image}></img>
                        </div>
                        <div className='p-tocart-string'>
                            <svg onClick={() => deleteItemBag(e) } viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"></path></g></svg>
                            <p style={{ fontSize: '1.5vh', fontWeight: '600'}}>{// @ts-ignore
                            e.name.substring(0, 70)+"..."}</p>
                            <p className='shopNameP'>{// @ts-ignore
                            e.collection}</p>
                            <p style={{ fontSize: '1.4vh', marginBottom: '.5vh'}}>Tamaño: {// @ts-ignore
                            e.size}</p>
                            <span style={{ fontSize: '1.4vh', display: 'flex', alignItems: 'center', marginBottom: 'auto'}}>Color: 
                                <div style={{ backgroundColor: e.color, width: '1.5vh', height: '1.5vh', marginLeft: '.5vh', borderRadius: '3px', border: 'solid 1px #e1e1e1'}}></div>
                            </span>
                            <div className='flex tocart-div'>
                                <div className='moreMinus'>
                                    <button onClick={() => incrementarStock(e, -1)}>-</button>
                                    <span>{// @ts-ignore
                                    e.stock}</span>
                                    <button onClick={() => incrementarStock(e, 1)}>+</button>
                                </div>
                                <span className='tocart-price'>{// @ts-ignore
                                (e.stock * parseFloat(e.price/2)).toFixed(2)}€</span>
                                <span className='tocart-price-disc'>{// @ts-ignore
                                (e.stock * parseFloat(e.price)).toFixed(2)}€</span>
                            </div>
                        </div>
                    </div>
                )
            }
            {bag.length > 0 && <div className='bag-pay'>
                <div>
                    <span>SUBTOTAL</span>
                    <span style={{ marginLeft: 'auto', marginRight: '1vh'}}>{subtotal}€</span>
                    <span style={{ textDecoration: 'line-through', fontSize: '1.3vh', color: 'rgb(204, 0, 0)'}}>{subtotal*2}€</span>
                </div>
                <NavLink to="/checkout" className="nvLink">BUY</NavLink>
            </div>}
        </div>
    )
  }