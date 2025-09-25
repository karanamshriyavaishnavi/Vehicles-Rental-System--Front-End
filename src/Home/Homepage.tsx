import React, { useState, useEffect, useRef } from 'react';
import { IoCarSportSharp } from "react-icons/io5";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import Footer from './Footer';
import { TbCarSuv } from "react-icons/tb";
import { HiUsers } from "react-icons/hi";
import { Link } from 'react-router-dom';
import AxiosApi from '../AxiosApi';

const Homepage: React.FC = () => {
  const [usecss, setUsecss] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('car');
  const vehicleSectionRef = useRef<HTMLDivElement | null>(null);
  const [filteredVehicles, setFilteredVehicles] = useState([]); // Filtered vehicles state

  useEffect(() => {
    const secondDiv = document.querySelector('.second');
    if (secondDiv) {
      const handleMouseEnter = () => setUsecss(true);
      secondDiv.addEventListener('mouseenter', handleMouseEnter);
      return () => {
        secondDiv.removeEventListener('mouseenter', handleMouseEnter);
      };
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMail = () => {
    window.location.href = "mailto:cse.takeoff@gmail.com";
  };

  const handleFacebook = () => {
    window.location.href = "https://www.facebook.com/marketplace";
  };

  const handleInstagram = () => {
    window.location.href = "https://www.instagram.com/";
  };

  const handleWhatsapp = () => {
    window.location.href = "https://whatsapp.com";
  };

  const [vehicle, setvehicle] = useState([])

  useEffect(() => {
    const FetchData = async () => {
      const resp = await AxiosApi.get("/api/customer/");
      console.log(resp.data.VehicalData);
      setvehicle(resp.data.VehicalData)
    }
    FetchData()
  }, [])

  const filtervehicles = () => {
    const filterd = vehicle.filter(v =>
      v.vehicalType.toLowerCase() === selectedVehicle.toLowerCase() &&
      v.city.toLowerCase().includes(searchInput.toLowerCase())
    )
    setFilteredVehicles(filterd as never[]);
  }

  const handleSearch = () => {
    filtervehicles()
    console.log('Searching for', selectedVehicle, 'in', searchInput);
    if (vehicleSectionRef.current) {
      vehicleSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setFilteredVehicles(vehicle as never[]);
  }, [vehicle]);

  const [isOpen, setIsOpen] = useState(false);
  const [withoutDriver, setWithoutDriver] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    useremail: '',
    userphoneNumber: '',
    hours: 0,
    amount: 0,
    totalAmount: 0,
    date: null,
    driverName: '',
    driverAge: 0,
    lisence: '',
  });

  const [vehicalid, SetVehicleid] = useState("");

  const toggleModal = (id: string, initialAmount: number) => {
    setIsOpen(!isOpen);
    SetVehicleid(id);
    
    setFormData((prevState) => ({
      ...prevState,
      amount: initialAmount, // Set the amount to the correct value of the selected vehicle
    }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'hours' || name === 'amount') {
      const hours = name === 'hours' ? value : formData.hours;
      const amount = name === 'amount' ? value : formData.amount;
      setFormData((prevState) => ({
        ...prevState,
        totalAmount: hours * amount,
      }));
    }
  };

  const UserJson = localStorage.getItem("customer");
  const userid = JSON.parse(UserJson)._id
  const userImage = JSON.parse(UserJson).image

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.useremail || !formData.userphoneNumber || !formData.hours || !formData.amount || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }

    const bookingData = new FormData();
    bookingData.append('Username', formData.username);
    bookingData.append('Useremmail', formData.useremail);
    bookingData.append('UserphoneNumber', formData.userphoneNumber);
    bookingData.append('hours', formData.hours.toString());

    const driverType = withoutDriver ? 'withdriver' : 'withoutdriver';
    console.log(driverType);

    bookingData.append('DriverType', driverType);
    bookingData.append('amount', formData.amount.toString());
    bookingData.append('totalamount', formData.totalAmount.toString());
    bookingData.append('date', formData.date.toString());
    bookingData.append('DriverName', formData.driverName);
    bookingData.append('DriverAge', formData.driverAge.toString());

    if (withoutDriver && formData.lisence) {
      bookingData.append('Lisence', formData.lisence);
    }

    try {
      const response = await AxiosApi.post(`/api/customer/book/${userid}/${vehicalid}`, bookingData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);

      if (response.data.success) {
        alert("Booking successful!");
        setIsOpen(false);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("There was an error. Please try again.");
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="fixed top-0 w-full bg-white shadow-md z-50 py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">Vehicle Rent</div>
          <Link to='/dash'>
            <img
              src={`http://localhost:8080/upload/Customerimages/${userImage}`}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </Link>
        </div>
      </div>

      <div className=" fixed top-20 right-10 space-y-5  z-50">
        <FaFacebook className='text-4xl text-blue-800 cursor-pointer pulse-icon' onClick={handleFacebook} />
        <FaWhatsapp className='text-4xl text-green-600 cursor-pointer pulse-icon' onClick={handleWhatsapp} />
        <FaInstagram className='text-4xl text-red-500 cursor-pointer pulse-icon' onClick={handleInstagram} />
        <IoMdMail className='text-4xl text-blue-600 cursor-pointer pulse-icon' onClick={handleMail} />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 mt-20">
        <div ref={vehicleSectionRef} className="vehicle-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredVehicles && filteredVehicles.map((v: any) => (
            <div key={v.id} className="vehicle-card bg-white shadow-md rounded-lg overflow-hidden">
              <img className="w-full h-48 object-cover" src={`http://localhost:8080/${v.Image}`} alt={v.vehicle_name} />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{v.vehicalName}</h2>
                <p className="text-gray-700 mb-2">{v.description}</p>
                <p className="text-gray-600">Location: {v.city}</p>
                <p className="text-gray-600">Rent (with driver): ₹{v.driverAmount}/hour</p>
                <p className="text-gray-600">Rent (without driver): ₹{v.Amount}/hour</p>
              </div>
              <button onClick={() => toggleModal(v._id, v.Amount)} className='text-lg font-serif text-white bg-blue-900 rounded-lg p-1 mb-2 ml-3'>Book</button>
            </div>
          ))}
        </div>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl font-bold mb-4">Vehicle Rental Form</h2>
              <form className="grid grid-cols-3 space-x-3" onSubmit={submitBooking}>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Username</label>
                  <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Email</label>
                  <input type="email" name="useremail" value={formData.useremail} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Phone Number</label>
                  <input type="tel" name="userphoneNumber" value={formData.userphoneNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Hours</label>
                  <input type="number" name="hours" value={formData.hours} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Amount per Hour</label>
                  <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Total Amount</label>
                  <input type="number" name="totalAmount" value={formData.totalAmount} readOnly className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="mb-4 flex items-center">
                  <input type="checkbox" id="withoutDriver" checked={withoutDriver} onChange={() => setWithoutDriver(!withoutDriver)} className="mr-2" />
                  <label htmlFor="withoutDriver" className="text-sm">With Driver</label>
                </div>
                {!withoutDriver && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">Driver Name</label>
                      <input type="text" name="driverName" value={formData.driverName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">Driver Age</label>
                      <input type="number" name="driverAge" value={formData.driverAge} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">Driver lisence</label>
                      <input type="file" name="lisence" value={formData.lisence} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                  </>
                )}
                <div className="flex justify-end mt-6">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                </div>
                <div className="flex justify-end mt-6">
                  <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={toggleModal}>Close</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
