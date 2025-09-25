import React, { useState, useEffect } from 'react';
import AxiosApi, { url } from '../AxiosApi';
import { Link } from 'react-router-dom';
import Booking from './Booking ';

const Uservehicals = () => {
  const [data, setData] = useState([]);
  const [showBooking, setShowBooking] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<object>({});
  const [search, setSearch] = useState('');
  const [place, setplace] = useState('')


  const handlesearch = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setSearch(e.target.value)
  }

  const handletype = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    setplace(e.target.value)   
  }
  const ownerString = localStorage.getItem('customer');
  const owner = ownerString ? JSON.parse(ownerString) : null;

  
    const gettingVehicals = async () => {
      try {
        const response = await AxiosApi.get(`/customer/vehical/${owner._id}?type=${place}&place=${search}`);
       // console.log(response.data, "response");
        setData(response.data.Vehical);
      } catch (error) {
        console.log(error);
      }
    };

    // if (owner) {
    //   gettingVehicals();
    // };

  // useEffect(()=>{
  //   gettingVehicals()
  // },[])


  const handleShowBooking = (itemId: object) => {
    setShowBooking(true);
    setSelectedId(itemId);
  };

  return (
    <div className="">
      {!showBooking ? (
        <div className="overflow-y-auto max-h-screen">

<div className="flex items-center space-x-4 mt-2">
        {/* Select Input */}
        <select
        value={place}
        onChange={handletype}
          className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="" >Select vehicals</option>
          <option value="Car">Car</option>
          <option value="Auto">Auto</option>
          <option value="Bike">Bike</option>
          <option value="Rikshaw">Rikshaw</option>
        </select>
        
        {/* Search Input */}
        <div className="relative">
          <input
          value={search}
          onChange={handlesearch}
            type="text"
            placeholder="Search...Place"
            className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg w-64 focus:outline-none focus:border-blue-500"
          />
          {/* Search Icon (SVG) */}
          <svg
            className="h-5 w-5 absolute left-3 top-2 text-gray-400 pointer-events-none"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m0 0l-6-6m6 6l-6 6m6-6l6 6"></path>
          </svg>
          <button onClick={gettingVehicals} type='submit' className=' w-16 h-10 rounded-md bg-sky-300 hover:bg-sky-700 p-2  ml-3' >Search</button>
        </div>
      </div>


         










          <div className="grid grid-cols-3 p-3 mt-1 min-h-10px max-h-50px">
            {data.map((item: any) => (
              <div className="max-w-2xl mx-auto p-3" key={item._id}>
                <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img
                      className="rounded-t-lg min-h-44 max-h-48 object-cover"
                      src={`${url}/Vehicals/${item?.Image}`}
                      alt=""
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                        {item.vehicalName}
                      </h5>
                    </a>
                    <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                      {item.vehicalNumber}
                    </p>
                    <div className="flex space-x-3">
                      <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                        Rent: {item.Amount}
                      </p>
                      <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                        <span className="text-xl text-slate-950">withdriver: </span>
                        {item.driverAmount}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                        vehicalType: {item.vehicalType}
                      </p>
                      <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                        <span className="text-xl text-slate-950">City: </span>
                        {item.city}
                      </p>
                    </div>
                    <div className="flex space-x-6">
                      <button
                        onClick={() => handleShowBooking(item)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className=" ml-64 mt-8">
          <Booking productId={selectedId} />
        </div>
      )}
    </div>
  );
};

export default Uservehicals;
