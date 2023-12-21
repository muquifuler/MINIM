import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import NavMobile from '../components/NavMobile'
import Footer from '../components/Footer'

import '../styles/Sellers.css'

export default function Sellers({ bag, setBag, myAddress, requestAccount }: { bag: Array<100>, setBag: Function, myAddress: string, requestAccount: Function  }) {

  const [consultationData, setConsultationData] = useState({ type: "Sellers", name: "", surname: "", email: "", consultation: "", date: "" });
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaActual.getFullYear();
    const hora = fechaActual.getHours().toString().padStart(2, '0');
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
    const fechaFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}`;

    setConsultationData({
      ...consultationData,
      date: fechaFormateada,
    });

    try {
      const response = await fetch(`http://localhost:3000/consultations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultationData),
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

    setConsultationData({ type: "Sellers", name: "", surname: "", email: "", consultation: "", date: Date.now()});
  };

  const handleSelectChangeGen = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    const updatedConsultationData = {
      ...consultationData,
      [name]: value
    };
    setConsultationData(updatedConsultationData);
  };

  return (
    <div className='sellersBody'>
      {windowDimensions.width > 700 && <Nav bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
      {windowDimensions.width <= 700 && <NavMobile bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
      <div className='sellers'>
        <h1 className='sellers-h1'>PUBLISH AND SELL YOUR CLOTHING BRAND</h1>

        <h2 className='sellers-title2'>I HAVE SUBMITTED MY <a href='#APPLICATION TO BECOME A SELLER'>APPLICATION</a> TO <b>BECOME A SELLER</b>, NOW WHAT?</h2>
        <p className='p-1'>Our support team reviews requests frequently to select the profiles that best fit the <b>MINIM</b> brand.</p>
        <p className='p-1'>So if you have <b>submitted your request to be a seller</b>, please wait and our support team will send you an email with the result.</p>

        <h2 className='sellers-title2'>WHAT <b>REQUIREMENTS</b> DO WE ASK TO BECOME A SELLER?</h2>
        <p className='p-1'>1. That the <b>style</b> and quality of your clothes are in tune with the brand.</p>
        <p className='p-1'>2. Have more than 5000 followers or a <b>notable relevance</b> in the fashion industry.</p>
        <p className='p-1'>3. Be selling or have <b>previously sold</b> clothing.</p>

        <h2 className='sellers-title2'>WHAT CAN MINIM <b>OFFER YOU</b>?</h2>
        <p className='p-1'>MINIM is a clothing store where payments are made on blockchains such as Ethereum and Binance Smart Chain. This allows sellers to <b>receive payment instantly</b> in their respective wallets.</p>
        <p className='p-1'>Make collaborations with other brands, take out exclusive and limited collections, you receive a <b>participation in MINIM</b> the more sales you make, accept payments in crypto, gain visibility, etc</p>
        <p className='p-1'>Meet other professionals who belong to DAO MINIM, <b>gain access to the private contact platform</b> and create your network with which to cooperate and boost your business</p>

        <h1 className='sellers-h1' id='APPLICATION TO BECOME A SELLER'>APPLICATION TO BECOME A SELLER</h1>
        
        <form className='formFaq' onSubmit={handleSubmit}>
          <div className='faq-name'>
            <div>
              <p>Nombre <i>*</i></p>
              <input type="text" name="name" value={consultationData.name} onChange={handleSelectChangeGen}/>
            </div>
            <div>
              <p>Apellidos</p>
              <input type="text" name="surname" value={consultationData.surname} onChange={handleSelectChangeGen}/>
            </div>
          </div>
          <div className='faq-email'>
            <p>Email <i>*</i></p>
            <input type="text" name="email" value={consultationData.email} onChange={handleSelectChangeGen}/>
          </div>
          <div className='faq-consulta'>
            <p>Tu consulta <i>*</i></p>
            <textarea id="" name="consultation" value={consultationData.consultation} onChange={handleSelectChangeGen}></textarea>
          </div>
          <input className='btnSubmit' type="submit" value="Send" />
        </form>
      </div>
      {windowDimensions.width > 700 && <Footer/>}
    </div>
  )
}
