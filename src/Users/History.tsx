import React, { useEffect, useState } from 'react'
import AxiosApi from '../AxiosApi';
import { useNavigate } from 'react-router-dom';

const History = () => {
  // const bookings = [
  //     {
  //       id: 1,
  //       vehicle_name: 'Toyota Camry',
  //       vehicle_image: 'https://example.com/toyota-camry.jpg',
  //       date: '2024-10-20',
  //       hours: 5,
  //       status: 'Approved',
  //     },
  //     {
  //       id: 2,
  //       vehicle_name: 'Ford Mustang',
  //       vehicle_image: 'https://example.com/ford-mustang.jpg',
  //       date: '2024-10-22',
  //       hours: 8,
  //       status: 'Pending',
  //     },
  //     {
  //       id: 3,
  //       vehicle_name: 'Tesla Model X',
  //       vehicle_image: 'https://example.com/tesla-model-x.jpg',
  //       date: '2024-10-25',
  //       hours: 10,
  //       status: 'Rejected',
  //     },
  //   ];



  const [review, setreview] = useState({
    review: '',
    rating: 0
  });
  const [bookings, setbookings] = useState([])

  const customerjson = localStorage.getItem("customer")
  const customerId = JSON.parse(customerjson)._id;
  console.log(customerId);


  useEffect(() => {
    const fetchdata = async () => {
      const resp = await AxiosApi.get(`/api/customer/history/${customerId}`);
      console.log(resp.data.history);
      setbookings(resp.data.history)


    }
    fetchdata()
  }, [])


 






  return (
    <div>
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left border border-gray-300">Vehicle Image</th>
            <th className="px-4 py-2 text-left border border-gray-300">Vehicle Name</th>
            <th className="px-4 py-2 text-left border border-gray-300">Date</th>
            <th className="px-4 py-2 text-left border border-gray-300">Amount</th>
            <th className="px-4 py-2 text-left border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">
                  <img src={`http://localhost:8080/${booking.vehicals[0].Image
                    }`} alt={booking.vehicals[0].vehicalName} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-4 py-2 border border-gray-300">{booking.vehicals[0].vehicalName }</td>
                <td className="px-4 py-2 border border-gray-300">{booking.date}</td>
                <td className="px-4 py-2 border border-gray-300">${booking.amount}  </td>
                <td className="px-4 py-2 border border-gray-300">{booking.status}</td>
                {/* <td className="px-4 py-2 border border-gray-300 space-x-4">
                  <button onClick={() => handlefeedback(booking._id)} className=' text-lg font-serif bg-blue-500 p-1 rounded-lg text-white '>Feddbacks</button>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default History
