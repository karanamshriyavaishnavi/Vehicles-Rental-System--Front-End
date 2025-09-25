import React, { useState, useEffect } from 'react';
import AxiosApi from '../AxiosApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BookingTable = () => {
  const [BookingId, SetBookingId] = useState(null); // Initial state to null to handle undefined case
  const [data, setData] = useState({
    cardHolder: '',
    cardNumber: '',
    expire: '',
    cvv: '',
    amount: 0,
  });

  const [bookings, setBookings] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false); // Track payment status

  const customerJson = localStorage.getItem("customer");
  if (!customerJson) {
    alert("No customer data found!");
    return; // Exit early if no customer data is available.
  }
  const customerId = JSON.parse(customerJson)._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AxiosApi.post(`api/customer/payments/${BookingId?._id}`, {
        Cardholder: data.cardHolder,
        cardNumber: data.cardNumber,
        expire: data.expire,
        cvv: data.cvv,
        amount: data.amount,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        toast.success('Payment successful!');
        setPaymentCompleted(true); // Set payment as completed
        setIsOpen(false);
      } else {
        toast.success(response.data.message || 'Error: Payment failed.');
      }
    } catch (error) {
      console.error('Error making payment:', error);
      toast.success('Payment Already Done. ');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (id) => {
    SetBookingId(id);
    setData((prevData) => ({
      ...prevData,
      amount: id.totalamount || 0, // Safely setting amount only when BookingId is available
    }));
    setIsOpen(true); // Corrected function name and state setter
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const resp = await AxiosApi.get(`/api/customer/bookings/${customerId}`);
        if (isMounted) {
          setBookings(resp.data.bookings);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [customerId]);


  const n = useNavigate()

  const handlefeedback = (id) => {
    n(`/dash/userfeedback/${id}`)
  }
  const handlechat = (id) => {
    n(`/dash/customerchat/${id}`)
  }

  return (
    <div className="hidden sm:block">
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left border border-gray-300">Vehicle Image</th>
            <th className="px-4 py-2 text-left border border-gray-300">Vehicle Name</th>
            <th className="px-4 py-2 text-left border border-gray-300">Date</th>
            <th className="px-4 py-2 text-left border border-gray-300">Hours</th>
            <th className="px-4 py-2 text-left border border-gray-300">Status</th>
            <th className="px-4 py-2 text-left border border-gray-300">Action</th>
            <th className="px-4 py-2 text-left border border-gray-300">Feedback</th>
            <th className="px-4 py-2 text-left border border-gray-300">Chat</th>


          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">
                  <img
                    src={`http://localhost:8080/${booking.vehical?.Image}`}
                    alt={booking.vehical ? booking.vehical.vehicalName : 'No vehicle name available'}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {booking.vehical ? booking.vehical.vehicalName : 'No vehicle name available'}
                </td>
                <td className="px-4 py-2 border border-gray-300">{booking.date}</td>
                <td className="px-4 py-2 border border-gray-300">{booking.hours} hours</td>
                <td className="px-4 py-2 border border-gray-300">{booking.status}</td>
                <td className="px-4 py-2 border border-gray-300 space-x-4">
                  {booking.status === "accept" && !paymentCompleted ? (
                    <button
                      onClick={(e) => handleOpen(booking)}
                      className='text-lg font-serif bg-blue-500 p-1 rounded-lg text-white'
                    >
                      Payment
                    </button>
                  ) : booking.status === "reject" ? (
                    <h3>Rejected</h3>
                  ) : booking.status === "accept" && paymentCompleted ? (
                    <h3>Payment Done</h3>
                  ) : (
                    <h3>{paymentCompleted ? "Paid" : "Pending"}</h3>
                  )}

                </td>

                <td className="px-4 py-2 border border-gray-300 space-x-4">
                  <button onClick={() => handlefeedback(booking._id)}
                    className=' text-lg font-serif bg-blue-500 p-1 rounded-lg text-white '
                  >
                    Feedback
                  </button>
                </td>
                <td className="px-4 py-2 border border-gray-300 space-x-4">
                  <button
                    onClick={() => handlechat(booking.vehical.owner, booking.vehical.owner)}  // Pass both vehicalId and ownerId
                    className='text-lg font-serif bg-blue-500 p-2 rounded-lg text-white'
                  >
                    Chat
                  </button>
                </td>
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

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full animate__animated animate__fadeInTopRight">
            <h2 className="text-2xl font-bold mb-4">Payment Form</h2>
            <form className="grid" onSubmit={handlePayment}>
              {/* Username */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Cardholder</label>
                <input
                  required
                  type="text"
                  name="cardHolder"
                  value={data.cardHolder}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${data.cardHolder.length > 0 ? 'bg-slate-50' : 'bg-green-100'}`}
                />
              </div>

              {/* Card Number */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Card Number</label>
                <input
                  required
                  type="text"
                  name="cardNumber"
                  value={data.cardNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${data.cardNumber ? 'bg-slate-50' : 'bg-green-100'}`}
                />
              </div>

              {/* Expiry Date */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Expiration Date</label>
                <input
                  required
                  type="month"
                  name="expire"
                  value={data.expire}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              {/* CVV */}
              <div className="mb-4">
                <label className="block text-sm font-medium">CVV</label>
                <input
                  required
                  type="text"
                  name="cvv"
                  value={data.cvv}
                  maxLength="3"
                  minLength="3"
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${data.cvv ? 'bg-slate-50' : 'bg-green-100'}`}
                />
              </div>

              {/* Close Button */}
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={loading || paymentCompleted} // Disable if payment is completed
                >
                  {loading ? 'Processing...' : `₹${data.amount} Pay`}
                </button>
                <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setIsOpen(false)}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTable;
