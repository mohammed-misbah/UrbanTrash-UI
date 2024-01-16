import React,{useState, useEffect} from 'react'
import Navbar from '../Navbar/Navbar';
import Swal from 'sweetalert2';
import axios from '../../../utils/axios';
// import Cookies from 'js-cookie';
import {bookingWaste} from '../../../utils/constants'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Footer from '../Footer/Footer';

const WastePickup = () => {

  const [SelectedAddress, setSelectedAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [wasteCat, setWasteCat] = useState([]);
  const [message, setMessage] = useState('');
  const [wastetype, setWasteType] = useState('')
  const [wastePrice, setWastePrice] = useState("");
  const [addAddress, setaddAddress] = useState([])
  // const [selectedWaste, setSelectedWaste] = useState(null);
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.user);

  

  useEffect(() =>{
    fetchaddAddress();
    fetchWasteCategory();
  },[user])

  useEffect(() => {
    console.log("uhuhs", wastePrice)
    // setWastePrice(wasteCat?.price)
  },[wastetype])

  const fetchaddAddress = () =>{
    // const id = user?.id
    const id = user && user.id
    axios
    .get(`api/listAddress/${id}`)
    .then((response) => {
      const fetchAddress = response.data.map((address) => ({
        id: address.id, 
        firstname: address.firstname,
        lastname: address.lastname,
        email: address.email,
        phone: address.phone,
        address1: address.address1,
        address2: address.address2,
        pincode: address.pincode,
      }))
      setaddAddress(fetchAddress);
    })
    .catch((error) => {
      console.log("Error fetching address", error);
    });
  };
  const fetchWasteCategory = () =>{
    axios
    .get('adminapi/biowastelist/')
    .then((response)=>{
      const fetchBioWaste = response.data.map((waste) =>({
        id:waste.id,
        name:waste.name,
        price:waste.price,
      }))
      setWasteCat(fetchBioWaste);
      // console.log(wasteCat,"waste caaaaaaaaategory fieeeeeeeeeld");
    })
    .catch((error) => {
      console.error("Error fetching waste categories:", error);
    });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!time){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Select Time.!",
        text: 'Please fill in all the fields',
        showConfirmButton: false,
        timer: 1500,
      })
    }
    if(!date){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Select Date.!",
        text: 'Please fill in all the fields',
        showConfirmButton: false,
        timer: 1500,
      })
    }
    if(!SelectedAddress){
      Swal.fire({
        position:"center",
        icon:"error",
        title:"Select Address..!",
        text: 'Please fill in all the fields',
        showConfirmButton:false,
        timer:1500,
      });
    }
    if (!wastetype) {
      Swal.fire({
        position:"center",
        icon: 'error',
        title: 'Select waste type.!',
        text: 'Please fill in all the fields',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    const Bookingdata = {
      customer: user.id,
      biowaste: wastetype,
      address: SelectedAddress,
      pickup_date: date,
      pickup_time:time,
      notes:message,
    };
    axios
    .post("api/waste_booking/ ", Bookingdata,{
      headers:{"Content-Type": "application/json"},
    })
    .then((response) => {
        Swal.fire({
          position: "center",
          icon: 'success',
          title: 'Booking Successful',
          text: 'Your booking has been successfully submitted!',
          showConfirmButton: false,
          timer: 1500,
        });
        setWasteType("");
        setDate("");
        setMessage("")
        navigate('/pickupdetails')
    })
    .catch((error) => {
      console.error("",error);

    });

  };

  const loadScript = (src) =>{
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src

      script.onload = () => {
        resolve (true)  
      }

      script.onerror = () => {
        resolve (false)
      }

      document.body.appendChild(script)
    })
  }

  const RazorpayPayment = async (payment) => {
    try {
      const isLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      
      if (!isLoaded) {
        alert('Failed to load Razorpay. Please check your network connection.');
        return;
      }
  
      const options = {
        key: 'rzp_test_tBT9s69IVb6TFk',
        currency: 'INR',
        name: 'URBAN TRASH',
        description: 'Thanks for booking',
        amount: wastePrice*100,
        handler: function (response) {
          alert(response.rezorpay_payment_id);
          alert('Payment Successful');
        },
        prefill: {
          name: 'mizba ulhaq',
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Failed to load Razorpay:', error);
      alert('Failed to load Razorpay. Please try again later.');
    }
  };
  
    return (
        <div>
        <Navbar />
        <div className="min-h-screen  flex flex-col  ">
          <div className="flex justify-center items-center mt-20">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-4xl w-full">
              <form onSubmit={handleSubmit}>
              <h1 className='flex justify-center items-center py-6 px-20 font-bold text-xl text-gray-500'>Waste Pickup</h1>

              <div className="flex flex-col mb-6">
                <label htmlFor="wastetype" className="font-bold mb-2">
                  Waste Type:
                </label>
                <select
                  id="wastetype"
                  value={wastetype}
                  onChange={(e) => {
                    setWasteType(e.target.value);
                    console.log(e.target.value, wasteCat)
                    const selectedWaste = wasteCat.find((waste) => waste.id == e.target.value);
                    console.log(selectedWaste)
                    if (selectedWaste) {
                      setWastePrice(selectedWaste.price);
                    } else {
                      setWastePrice("");
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Select waste type</option>
                  {wasteCat.map((waste) => (
                    <option key={waste.id} value={waste.id}>
                      {waste.name}
                    </option>
                  ))}
                </select>

              </div>

              <div className="flex flex-col mb-6">
                <label htmlFor="wasteprice" className="font-bold mb-2">
                  Waste Price:
                </label>
                <input
                  id="wasteprice"
                  value={wastePrice}
                  onChange={(e) => setWastePrice(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                   {/* <option value="">{wastePrice}</option> */}
                {/* </select> */}

              </div>

                <div className="flex flex-col mb-6">
                  <label htmlFor="address" className="font-bold mb-2">
                    Address:
                  </label>
                  <div className="flex items-center">
                    {addAddress ? (
                      <select
                        id="addressSelection"
                        name="addressSelection"
                        value={SelectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md mr-2"
                      >
                        <option value="">Select an address</option>
                        {addAddress.map((address) => (
                          <option value={address.id} key={address.id}>
                            {address.firstname} {address.lastname} - {address.address1}, {address.address2}, {address.pincode}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <h1
                        className="addaddress text-blue-600 cursor-pointer"
                        onClick={() => {
                          navigate("/address");
                        }}
                      >
                        Add Address
                      </h1>
                    )}
                    <button
                      className="addaddress bg-blue-500 text-white py-3 px-5 rounded-md"
                      onClick={() => {
                        navigate("/address");
                      }}
                    >
                      AddAddress
                    </button>
                  </div>
                </div>
      
                <div className="flex flex-col mb-6">
                  <div className="flex">
                    <div className="w-1/2 pr-2">
                      <label htmlFor="date" className="font-bold mb-2">
                        Pickup date:
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="w-1/2 pl-2">
                      <label htmlFor="time" className="font-bold mb-2">
                        Pickup time:
                      </label>
                      <input
                        id="time"
                        name="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
      
                <div className="flex flex-col mb-6">
                  <label htmlFor="message" className="font-bold mb-2">
                    Additional Notes:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  >
                  </textarea>
                </div>
                <button
                  type="submit"
                  className="bg-green-700 text-white py-3.5 px-14 rounded-md mb-8"
                  onClick={() => RazorpayPayment()}>
                  Pickup Now
                </button>
      
                <div className="flex justify-between items-center">
                      
                  <a href="/" className="text-blue-600">
                    Back
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    );
  };

export default WastePickup;


