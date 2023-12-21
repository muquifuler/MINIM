import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import LibellulaContract from '../json/contract.json'
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Checkout.css'
import Nav from '../components/Nav';
import NavMobile from '../components/NavMobile';

export default function Checkout({ bag, setBag, smartContract, myAddress, requestAccount, deliveryPrice, setDeliveryPrice, userData, setUserData }: { bag: Array<100>, setBag: Function, smartContract: string, myAddress: string, requestAccount: Function, deliveryPrice: number, setDeliveryPrice: Function, userData: any, setUserData: Function  }) {

    const [downloadData, setDownloadData] = useState(true);
    const [deliveryName, setDeliveryName] = useState("Spain Standard");
    const [subtotal, setSubtotal] = useState(0);
    //const [userData, setUserData] = useState({ address: "", city: "", country: "", dateOfBirth: { day: "", month: "", year: "" }, email: "", firstName: "", houseNumberAndStreet: "", lastName: "", nickname: "", orders: [], phoneNumber: "", postalCode: 0, region: "", _id: "" });
    const [windowDimensions, setWindowDimensions] = useState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  
    const navigate = useNavigate();

    useEffect(() => {

      if(bag.length <= 0){
        navigate(-1);
      }

      if(myAddress){
        fetch('http://localhost:3000/users/'+myAddress)
        .then((response) => response.json())
        .then((responseData) => {
          setUserData(responseData)
          setDownloadData(false);
        })
        .catch((error) => {
          console.error('Error al realizar la solicitud:', error);
          setUserData({
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
          })
        });
      }
    }, [myAddress]); 

    useEffect(() => {
      console.log("AQUI")
      console.log(bag)
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

      setSubtotal(parseFloat(newSubtotal.toFixed(2)))
    }, [bag])

    const handleSubmit = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userData._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          setUserData(responseData);
        } else {
          console.error('Error en la solicitud al servidor');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    const handleSelectChangeGen = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      const updateduserData = {
        ...userData,
        [name]: value
      };
      setUserData(updateduserData);
    };

    const handleSelectChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      const updateduserData = {
        ...userData,
        dateOfBirth: {
          ...userData.dateOfBirth,
          [name]: value,
        },
      };
      setUserData(updateduserData);
    };

    return (<>
        {windowDimensions.width > 700 && <Nav bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
        {windowDimensions.width <= 700 && <NavMobile bag={bag} setBag={setBag} myAddress={myAddress} requestAccount={requestAccount}/>}
        <div className='checkout'>
            <div className='etapas'>
              {(windowDimensions.width > 1000 || window.location.pathname == "/checkout") &&  <span className={window.location.pathname == "/checkout" ? 'checkoutSel' : '' }>1. DELIVERY</span>}
              {(windowDimensions.width > 1000 || window.location.pathname == "/billing") && <span className={window.location.pathname == "/billing" ? 'checkoutSel' : '' }>2. BILLING & PAYMENT</span>}
              {(windowDimensions.width > 1000 || window.location.pathname == "/order-confirmation") && <span className={window.location.pathname == "/order-confirmation" ? 'checkoutSel' : '' }>3. ORDER CONFIRMATION</span>}
            </div>
            <div className='contentCheck'>
              {downloadData && <div className='deliveryLoading'>
                <h3>ENTER A DELIVERY ADDRESS</h3>
                <div>
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
                </div>
              </div>}
              {!downloadData && <div className='deliveryAddress'>
                <h3>ENTER A DELIVERY ADDRESS</h3>
                <div>
                  <span>First Name: <i>*</i></span>
                  <input type="text" name="firstName" value={userData.firstName} onChange={handleSelectChangeGen}/>
                </div>
                <div>
                  <span>Last Name: <i>*</i></span>
                  <input type="text" name="lastName" value={userData.lastName} onChange={handleSelectChangeGen}/>
                </div>
                <div className='dateOfBirth'>
                  <span>Date of Birth: <i>*</i></span>
                  <select name="day" id="day" value={userData.dateOfBirth.day} onChange={handleSelectChange}>
                    <option value="Day">Day</option>
                    {/* Días del mes */}
                    {Array.from({ length: 31 }, (_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <select name="month" id="month" value={userData.dateOfBirth.month} onChange={handleSelectChange}>
                    <option value="Month">Month</option>
                    {/* Meses del año */}
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                  <select name="year" id="year" value={userData.dateOfBirth.year} onChange={handleSelectChange}>
                    <option value="Year">Year</option>
                    {/* Años - Ajusta el rango según tus necesidades */}
                    {Array.from({ length: 100 }, (_, index) => (
                      <option key={index} value={2023 - index}>
                        {2023 - index}
                      </option>
                    ))}
                  </select>
                </div>
                <p className='information'>You must be 16 or above to use MINIM.</p>
                <div className='country'>
                  <span>Country: <i>*</i></span>
                  <select name="country" id="country" value={userData.country} onChange={handleSelectChangeGen}>
                    <option value="Spain">Spain</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="India">India</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Argentina">Argentina</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Russia">Russia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Egypt">Egypt</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Norway">Norway</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Austria">Austria</option>
                    <option value="Greece">Greece</option>
                    <option value="Turkey">Turkey</option>
                  </select>
                </div>
                <div>
                  <span>Street, Number: <i>*</i></span>
                  <input type="text" name="houseNumberAndStreet" value={userData.houseNumberAndStreet} onChange={handleSelectChangeGen}/>
                </div>
                <div>
                  <span>City: <i>*</i></span>
                  <input type="text" name="city" value={userData.city} onChange={handleSelectChangeGen}/>
                </div>
                <div>
                  <span>Region: <i>*</i></span>
                  <input type="text" name="region" value={userData.region} onChange={handleSelectChangeGen}/>
                </div>
                <div>
                  <span>Postal Code: <i>*</i></span>
                  <input type="text" name="postalCode" value={userData.postalCode} onChange={handleSelectChangeGen}/>
                </div>
                <div>
                  <span>Phone Number: <i>*</i></span>
                  <input type="text" name="phoneNumber" value={userData.phoneNumber} onChange={handleSelectChangeGen}/>
                </div>
                <p className='information'>This is so we can send delivery updates or if we need to contact you about your order.</p>
                
              </div>}
              <div className='orderSummaryDiv'>
                <h3>ORDER SUMMARY</h3>
                <div className='orderSummary'>
                  {bag.map((e, i) => (
                      <div key={i}>
                        <img src={e.image} alt="" />
                        <div>
                          <h1>{e.name}</h1>
                          <p style={{ display: 'flex', alignItems: 'center' }}>COLOUR: <div className='osColour' style={{ backgroundColor: e.color}}></div></p>
                          <p style={{ marginBottom: '.5vh', marginTop: '.3vh'}}>SIZE: <i>{e.size}</i></p>
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
                      <p>{deliveryName}:</p>
                      <span>€{deliveryPrice}</span>
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
              </div>
            </div>
            <div className='selectDeliveryOp'>
                <h3>SELECT A DELIVERY OPTION</h3>
                {userData.country && <>
                  <div className='chooseSend'>
                    <input type="radio" name="delivery" id="spain0" onClick={() => {
                      setDeliveryPrice(5.99);
                      setDeliveryName("Spain Premium")
                    }}/>
                    <div>
                      <span style={{ fontWeight: '600'}}>{userData.country} Standard: €5.99</span>
                      <span style={{ fontSize: '1.5vh' }}>(1-2 working days)</span>
                    </div>
                  </div>
                  <div className='chooseSend'>
                    <input type="radio" name="delivery" id="spain1" onClick={() => {
                      setDeliveryPrice(2.99);
                      setDeliveryName("Spain Standard")
                    }} checked/>
                    <div>
                      <span style={{ fontWeight: '600'}}>{userData.country} Standard: €2.99</span>
                      <span style={{ fontSize: '1.5vh' }}>(1-2 working days)</span>
                    </div>
                  </div>
                </>}
            </div>
            <div className='proceedTo'>
              <NavLink to="/billing" onClick={() => handleSubmit}>PROCEED TO BILLING</NavLink>
            </div>
        </div>
      </>)
}
  