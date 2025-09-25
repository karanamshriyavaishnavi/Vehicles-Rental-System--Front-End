import React, { useState, useEffect } from 'react';
import AddDriver from './AddDriver ';
import AxiosApi from '../AxiosApi';

// Dummy data for rendering
const dummyData = [
  {
    _id: '1',
    vehicles: [
      {
        vehicalType: 'Sedan',
        vehicalNumber: 'ABC1234',
        vehicalName: 'Toyota Camry',
        Image: 'image1.jpg',
      },
    ],
    Username: 'johndoe',
    UserphoneNumber: '1234567890',
    hours: 4,
    date: '2023-10-15',
  },
  {
    _id: '2',
    vehicles: [
      {
        vehicalType: 'SUV',
        vehicalNumber: 'XYZ5678',
        vehicalName: 'Ford Explorer',
        Image: 'image2.jpg',
      },
    ],
    Username: 'janesmith',
    UserphoneNumber: '9876543210',
    hours: 8,
    date: '2023-10-16',
  },
];

const ViewRequestComponent = () => {
  const [data, setData] = useState([]); // Use dummy data for now
  const ownersting = localStorage.getItem('owner')
  const owner = ownersting ? JSON.parse(ownersting) : null;
  useEffect(() => {
    const fetchdata = async () => {
      const resp = await AxiosApi.get(`/api/owner/booking/${owner._id}`)
      setData(resp.data.bookings)
      
    }
    fetchdata()
  },[])
  const [showDriver, setShowDriver] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [objectItem, setObjectItem] = useState({});

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSend = (item: any) => {
    if (selectedOption === 'Accept') {
      setShowDriver(true);
      setObjectItem(item);
    } else if (selectedOption === 'Reject') {
      console.log('Rejecting request', item._id);
      // Add API call or logic to handle rejection

      const ownersting = localStorage.getItem('owner')
      const owner = ownersting ? JSON.parse(ownersting) : null;
      AxiosApi.put(`/api/owner/status/${owner}`)
    }
  };

  const formatDate = (date: string) => {
    const dates = new Date(date);
    return dates.toISOString().split('T')[0];
  };

  return (
    <div className="">
      {!showDriver ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-6 text-sm md:text-base">
            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="px-4 py-2 text-left border border-gray-300">Image</th>
                <th className="px-4 py-2 text-left border border-gray-300">Vehicle Type</th>
                <th className="px-4 py-2 text-left border border-gray-300">Vehicle No.</th>
                <th className="px-4 py-2 text-left border border-gray-300">Brand</th>
                <th className="px-4 py-2 text-left border border-gray-300">User Name</th>
                <th className="px-4 py-2 text-left border border-gray-300">User No.</th>
                <th className="px-4 py-2 text-left border border-gray-300">Hour</th>
                <th className="px-4 py-2 text-left border border-gray-300">Wish Date</th>
                <th className="px-4 py-2 text-left border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item: any) => (
                  <tr key={item._id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">
                      <img
                        src={`http://localhost:8080/${item.vehicles[0].Image}`}
                        alt="Vehicle"
                        className="w-20 h-20 md:w-28 md:h-32 object-contain"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-300">{item.vehicles[0].vehicalType}</td>
                    <td className="px-4 py-2 border border-gray-300">{item.vehicles[0].vehicalNumber}</td>
                    <td className="px-4 py-2 border border-gray-300">{item.vehicles[0].vehicalName}</td>
                    <td className="px-4 py-2 border border-gray-300">{item.Username}</td>
                    <td className="px-4 py-2 border border-gray-300">{item.UserphoneNumber}</td>
                    <td className="px-4 py-2 border border-gray-300">{item.hours}</td>
                    <td className="px-4 py-2 border border-gray-300">{formatDate(item.date)}</td>
                    <td className="px-4 py-2 border border-gray-300 space-y-2">
                      <select name="status" className="border rounded-md px-2 py-1" onChange={handleSelectChange}>
                        <option value="">Select</option>
                        <option value="Accept">Accept</option>
                        <option value="Reject">Reject</option>
                      </select>
                      <button
                        className="ml-4 p-2 text-sm md:text-lg text-white bg-lime-500 rounded-md"
                        onClick={() => handleSend(item)}
                      >
                        Send
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-4 text-center text-gray-500">
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="ml-96 mt-8">
          <AddDriver product={objectItem} />
        </div>
      )}
    </div>
  );
};

export default ViewRequestComponent;
