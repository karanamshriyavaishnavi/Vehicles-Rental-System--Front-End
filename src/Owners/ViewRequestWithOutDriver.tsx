import React, { useEffect, useState } from 'react';
import AxiosApi from '../AxiosApi';


// Dummy data for bookings
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
    DriverName: 'John Doe',
    DriverAge: 45,
    lisence: 'license1.jpg',
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
    DriverName: 'Jane Smith',
    DriverAge: 35,
    lisence: 'license2.jpg',
    Username: 'janesmith',
    UserphoneNumber: '9876543210',
    hours: 8,
    date: '2023-10-16',
  },
];

const ViewRequestWithOutDriver = () => {

  // const [data, setData] = useState(dummyData); // Use dummy data as the initial state
  const [data, setData] = useState([]); // Use dummy data for now
  const ownersting = localStorage.getItem('owner')
  const owner = ownersting ? JSON.parse(ownersting) : null;
  useEffect(() => {
    const fetchdata = async () => {
      const resp = await AxiosApi.get(`/api/owner/bookings/${owner._id}`)
      console.log(resp.data.bookings);
      setData(resp.data.bookings)

    }
    fetchdata()
  }, [])
  const [statuses, setStatuses] = useState<{ [key: string]: string }>({}); // Object to store status for each booking

  // Format date to YYYY-MM-DD
  const formatDate = (date: string) => {
    const dates = new Date(date);
    return dates.toISOString().split('T')[0];
  };

  // Handle status change for a specific booking
  const handleStatusSelectChange = (id: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatuses({ ...statuses, [id]: e.target.value }); // Update status for the specific booking
  };

  // Handle sending status update (simulating with console log for now)
  const statusChange = async (id: string) => {
    if (!statuses[id]) {
      alert("Please select a status before sending.");
      return;
    }

    try {
      const response = await AxiosApi.put(`/api/owner//statuss/${id}`, {
        status: statuses[id],
      });

      if (response.status === 200) {
        alert(`Status updated successfully to ${statuses[id]}`);
        // Refresh data to show updated status
        setData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, status: statuses[id] } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };


  return (
    <div className="p-4">
      <div className="overflow-x-auto"> {/* For responsive horizontal scrolling */}
        <table className="w-full border-collapse mb-6 text-sm md:text-base">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="px-2 md:px-4 py-2 text-left border border-gray-300">Image</th>
              <th className="px-2 md:px-4 py-2 text-left border border-gray-300">Vehicle Type</th>
              <th className="px-2 md:px-4 py-2 text-left border border-gray-300">Vehicle No.</th>
              <th className="px-2 md:px-4 py-2 text-left border border-gray-300">Brand</th>
              <th className="px-2 md:px-4 py-2 text-left border border-gray-300">Driver Name</th>
              <th className="px-2 md:px-4 py-2 text-left border border-gray-300">Driver Age</th>
              {/* <th className="px-2 md:px-4 py-2 text-left border border-gray-300">Driving License</th> */}
              <th className="px-2 md:px-4 py-2 text-left border border-gray-300">User Name</th>
              <th className="px-2 md:px-4 py-2 text-left border border-gray-300">User No.</th>
              <th className="px-2 md:px-4 py-2 text-left border border-gray-300">Hour</th>
              <th className="px-2 md:px-4 py-2 text-left border border-gray-300">Wish Date</th>
              <th className="px-2 md:px-4 py-2 text-left border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-100">
                  <td className="px-2 md:px-4 py-2 border border-gray-300">
                    <img
                      src={`http://localhost:8080/${item.vehicles[0].Image}`}  // Fixed image path
                      alt="Vehicle"
                      className="w-20 h-20 md:w-28 md:h-32 object-contain"
                    />
                  </td>
                  <td className="px-2 md:px-4 py-2 border border-gray-300">{item.vehicles[0].vehicalType}</td>
                  <td className="px-2 md:px-4 py-2 border border-gray-300">{item.vehicles[0].vehicalNumber}</td>
                  <td className="px-2 md:px-4 py-2 border border-gray-300">{item.vehicles[0].vehicalName}</td>
                  <td className="px-2 md:px-4 py-2 border border-gray-300">{item.DriverName}</td>
                  <td className="px-2 md:px-4 py-2 border border-gray-300">{item.DriverAge}</td>
                  {/* <td className="px-2 md:px-4 py-2 border border-gray-300">
                    <img
                      src={`http://localhost:8080/${item.lisence}`}  // Fixed image path for license
                      alt="License"
                      className="w-20 h-20 md:w-28 md:h-32 object-contain"
                    />
                  </td> */}
                  <td className="px-2 md:px-4 py-2 border border-gray-300">{item.Username}</td>
                  <td className="px-2 md:px-4 py-2 border border-gray-300">{item.UserphoneNumber}</td>
                  <td className="px-2 md:px-4 py-2 border border-gray-300">{item.hours}</td>
                  <td className="px-2 md:px-4 py-2 border border-gray-300">{formatDate(item.date)}</td>
                  <td className="px-2 md:px-4 py-2 border border-gray-300">
                    <div className="space-y-2">
                      <button
                        className="text-sm md:text-lg border-black text-white bg-lime-500 rounded-md px-2 py-1"
                        onClick={() => statusChange(item._id)}
                      >
                        Send
                      </button>
                      <select
                        name="status"
                        onChange={(e) => handleStatusSelectChange(item._id, e)}
                        value={statuses[item._id] || ''}
                        className="border rounded-md px-2 py-1 text-sm md:text-base"
                      >
                        <option value="">Status</option>
                        <option value="accept">Accept</option>
                        <option value="reject">Reject</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="px-4 py-4 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewRequestWithOutDriver;
