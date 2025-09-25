import React, { useEffect, useState } from 'react';
import AxiosApi,{url} from '../AxiosApi';
import Payment from './Payment';

const ViewBooking = () => {

 
 const [data,setdata] = useState([])
 const customers = localStorage.getItem('customer')
 const customer = customers ? JSON.parse(customers) : null;

 const gettindData = async() =>{
  try{
    const response = await AxiosApi.get(`/customer/request/${customer._id}`)
    console.log(response,"respo")
    setdata(response.data.View)

  }catch(error){
    console.log(error)
  }
 }


useEffect(()=>{
  gettindData()
},[])




  const [payment,setpayment] = useState(false)
  const [product,setproduct] = useState({})



 const handleclick = (item:any) =>{
  setpayment(true)
  setproduct(item)
 }

  return (
    <div >
    {
      !payment ?(

    <div>
      <h2>Booking Details</h2>
      <table className='w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Image</th>
            <th scope='col'  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Vehicle Name</th>
            <th scope='col'  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Vehicle Type</th>
            <th scope='col'  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Number</th>
            <th scope='col'  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
            <th scope='col'  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Total Amount</th>
            <th scope='col'  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>hours</th>
            <th scope='col'  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Payment</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item:any) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={`${url}/Vehicals/${item.vehicals[0].Image}`} alt="Vehicle" style={{ width: '50px', height: '50px' }} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.vehicals[0].vehicalName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.vehicals[0].vehicalType}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.vehicals[0].vehicalNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.totalamount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.hours}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="">
                  <button onClick={()=>handleclick(item)} > Pay</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      ):(
        <div className=" mt-8">
          <Payment product={product} />
        </div>
      )
    }
    </div>
  );
};

export default ViewBooking;
