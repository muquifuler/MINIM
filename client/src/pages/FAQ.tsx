import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import NavMobile from '../components/NavMobile'
import Footer from '../components/Footer'

import '../styles/Sellers.css'
import '../styles/FAQ.css'

export default function FAQ({ bag, setBag, myAddress, requestAccount }: { bag: Array<100>, setBag: Function, myAddress: string, requestAccount: Function  }) {

  const [consultationData, setConsultationData] = useState({ type: "FAQ", name: "", surname: "", email: "", consultation: "", date: ""});
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

    setConsultationData({ type: "FAQ", name: "", surname: "", email: "", consultation: "", date: Date.now()});
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
        <h1 className='sellers-h1'>FAQ</h1>

        <h2 className='sellers-title2'>How does the payment process with BNB work?</h2>
        <p className='p-1'>The payment process with Binance Coin (BNB) is simple. When you select the items you want to purchase and proceed to checkout in our store, you will see the option to pay with BNB. You will need to provide your BNB address and confirm the transaction. Once completed, you will receive a payment confirmation.</p>
        
        <h2 className='sellers-title2'>What is Binance Coin (BNB)?</h2>
        <p className='p-1'>Binance Coin (BNB) is a digital cryptocurrency developed by the Binance cryptocurrency exchange. It is used to make transactions on the Binance platform and elsewhere, including our online clothing store. It is a secure and efficient way to make payments online.</p>

        <h2 className='sellers-title2'>How can I buy BNB to make payments in my store?</h2>
        <p className='p-1'>You can buy BNB on cryptocurrency exchanges like Binance, using bank transfers, credit cards, or other payment methods accepted on the exchange. Once you have BNB in ​​your wallet, you can use it to make purchases in our store.</p>

        <h2 className='sellers-title2'>Is it safe to pay with BNB in ​​your store?</h2>
        <p className='p-1'>Yes, it is safe to pay with BNB in ​​our store. We have implemented advanced security measures to protect your personal and financial data. Additionally, cryptocurrency transactions are inherently secure due to their blockchain technology.</p>

        <h2 className='sellers-title2'>What do I do if I have problems making a payment with BNB?</h2>
        <p className='p-1'>If you encounter problems when making a payment with BNB, we recommend contacting our support team via email minimsoftware@outlook.com We will be happy to help you resolve any issues you may face during the checkout process.</p>
        
        <h2 className='sellers-title2'>Can I make returns or exchanges if I pay with BNB?</h2>
        <p className='p-1'>Yes, we accept returns and exchanges for purchases made with BNB following our standard returns policy. Please see our returns policy at [link to return policy] for detailed information on terms and conditions.</p>

        <h1 className='sellers-h1' style={{ marginTop: '10vh' }}>Contact us</h1>

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
