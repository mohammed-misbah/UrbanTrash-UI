import React,{useState, useEffect} from 'react'
import Navbar from '../Navbar/Navbar';
import Swal from 'sweetalert2';
import axios from '../../../utils/axios';
// import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Footer from '../Footer/Footer';

const ScrapBooking = () => {

  const [SelectedAddress, setSelectedAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [scrapCat, setScrapCat] = useState([]);
  const [message, setMessage] = useState('');
  const [wastetype, setWasteType] = useState('')
  const [addAddress, setaddAddress] = useState([])

  const navigate = useNavigate()

  const {user} = useSelector((state) => state.user);
  console.log(user, "userrrrrrrrrr entered..!!!!!!");

  useEffect(() =>{
    fetchaddAddress();
    fetchScrapCategory();
  },[user])

  const fetchaddAddress = () =>{
    const id = user?.id
    axios
    .get(`api/listAddress/${id}`)
    .then((response) => {
      console.log(response,"Address arrrrrrrrrrrived");
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
  console.log(addAddress,"Adddddressssssssssssss");

  const fetchScrapCategory = () =>{
    axios
    .get('adminapi/scrapwastelist/')
    .then((response)=>{
      console.log(response,"Scrap is arrrrrrrrrrrived");
      const fetchScrap = response.data.map((scrap) =>({
        id: scrap.id,
        name:scrap.name,
      }))
      setScrapCat(fetchScrap);
    })
    .catch((error) => {
      console.error("Error fetching waste categories:", error);
    });
  };
  console.log(scrapCat,"scraaaaaaaaaaape");


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
      scrapwaste: wastetype,
      address: SelectedAddress,
      pickup_date: date,
      pickup_time:time,
      note:message,
    };
    console.log(Bookingdata);
    axios
    .post("api/scrap_booking/ ", Bookingdata,{
      headers:{"Content-Type": "application/json"},
    })
    .then((response) => {
      console.log("Booking placed Sucsessfullllly",response.data);
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
    return (
    <div>
        <Navbar />
        <div className="min-h-screen  flex flex-col  ">
          <div className="flex justify-center items-center mt-20">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-4xl w-full">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-6">
                  <label htmlFor="wastetype" className="font-bold mb-2">
                    Waste Type:
                  </label>
                  <select
                    id="wastetype"
                    value={wastetype}
                    onChange={(e) => setWasteType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  >
                    <option>Select waste type</option>
                    {scrapCat.map((scrap) => (
                      <option key={scrap.id} value={scrap.id}>
                        {scrap.name}
                      </option>
                    ))}
                  </select>
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
                      className="addaddress bg-green-600 text-white py-2 px-4 rounded-md"
                      onClick={() => {
                        navigate("/address");
                      }}
                    >
                      Add Address
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
                  ></textarea>
                </div>
      
                <button
                  type="submit"
                  className="bg-green-600 text-white py-3 px-6 rounded-md mb-4"
                >
                  Book Now
                </button>
      
                <div className="flex justify-between items-center">
                  <div></div>
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

export default ScrapBooking;







//  <div>
//             <Navbar/>
//         <div class={styles.bookingForm}>
//       <form onSubmit={handleSubmit}>
//           <div class={styles.bookingCard}>
//             <div class={styles.formColumn}>
//               <div class={styles.formRow}>

//                 <label for="name">Waste Type:</label>
//                 <select  id="wastetype" value={wastetype}
//                 onChange={(e) => setWasteType(e.target.value)} >

//                   <option>Select waste type</option>
//                   {wasteCat.map((waste) =>(
//                     <option key={waste.id} value={waste.id} >
//                       {waste.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
      
//             </div>
//             <div className={styles.formRow}>
//           <p><label for="address">Address:</label>   </p>
//             <div className={styles.addressSelection}>  
//               {addAddress ? (
//               <select id="addressSelection" name="addressSelection"
//                 value={SelectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>

//                 <option value="">Select an address</option>
//                 {addAddress.map((address) =>(
//                 <option value={address.id} key={address.id} >
//                  {address.firstname} {address.lastname} -{address.address1},{address.address2},{address.pincode}
//                 </option>
//                 ))}
//               </select>
//                ) : ( 
//                  <h1 className={styles.addaddress} onClick={()=>{navigate("/address")}}>Add Address</h1> 
//                  ) }
//             </div>
//            <button className={styles.addaddress} onClick={()=>{navigate("/address")}}>Add Address</button> 
//         </div>
//             <div className={styles.formRow}>
//               <div className={styles.datetimeContainer}>
//                 <label htmlFor="date">Pickup date:</label>
//                   <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
//               </div>

//               <div className={styles.datetimeContainer}>
//                 <label htmlFor="time">Pickup time:</label>
//                   <input id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
//               </div>

//             </div>
//             <div className={styles.formRow}>
//               <label htmlFor="message">Additional Notes:</label>
//               <textarea id="message" name="message"
//                 placeholder="Enter your message" value={message}
//                 onChange={(e) => setMessage(e.target.value)}></textarea>
//             </div>

//           <button type="submit">Book Now</button>
//           <div class={styles.formRow}>
//         </div>
//           <a className={styles.back} href='/'>back</a>
//         </div>
//       </form>
//   </div>
//   <Footer/>
// </div>