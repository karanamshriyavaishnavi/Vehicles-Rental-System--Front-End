import React ,{useState,useEffect}from 'react'
import AxiosApi,{url} from '../AxiosApi'
import Payment from './Payment'

const ViewDriver = () => {
    const [data,setdata] = useState([])
    const [showpayment,setshowpayment] = useState(false)
    const [product,setproduct] = useState()
    const customers = localStorage.getItem('customer')
    const customer = customers ? JSON.parse(customers) : null;
   
    const gettindData = async() =>{
     try{
       const response = await AxiosApi.get(`/customer/driver/${customer._id}`)
       console.log(response,"respo")
       setdata(response.data.View)
   
     }catch(error){
       console.log(error)
     }
    }
   
   
   useEffect(()=>{
     gettindData()
   },[])


  const handliclick = (item:any) =>{
    setshowpayment(true)
    setproduct(item)
  }








  return (
    <div >
      {
        !showpayment ? (

        <div className=' absolute left-64'>
      <h2>Booking Details</h2>
      <table className='w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Image</th>
            <th scope='col'  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Vehicle Name</th>
            <th scope='col'  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Vehicle Type</th>
            <th scope='col'  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Number</th>
            <th scope='col'  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>DriveName</th>
            <th scope='col'  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>DriveAge</th>
            <th scope='col'  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Lisence</th>
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
              <td className="px-6 py-4 whitespace-nowrap">{item.DriverName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.DriverAge}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={`${url}/Lisence/${item.lisence}`} alt="" style={{ width: '50px', height: '50px' }} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.totalamount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.hours}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="">
                  <button onClick={()=>handliclick(item)}>Pay</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        ):(
          <div className=" mt-10">
            <Payment product= {product}/>
          </div>
        )
      }
      
    </div>
  )
}

export default ViewDriver
