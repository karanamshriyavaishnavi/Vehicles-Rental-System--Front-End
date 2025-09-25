import React, { useEffect, useState } from 'react'
import AxiosApi ,{url} from '../AxiosApi'
import Feedbacks from './Feedbacks';


const ViewHistory = () => {


const [data,setdata] = useState([]);
const [showHistroy , setShowHistory] = useState(false)
const [Feedback , setFeedback] = useState({})

const handleShowHistory =(item:any) =>{
    setShowHistory(true)
    setFeedback(item)
}







const customers = localStorage.getItem('customer')
const customer = customers ? JSON.parse(customers) : null 

const gettingHistory = async() =>{
    try{
        const response = await AxiosApi.get(`/customer/history/${customer._id}`)
        console.log(response)
        setdata(response.data.History)

    }catch(error){
        console.log(error)
        
    }
}

useEffect(()=>{
    gettingHistory()
},[])





  return (
    <div>
        {
            !showHistroy ? (

       <div className=' grid grid-cols-3 gap-8 max-h-200px overflow-y-scroll'>
        {
            data && data.map((item:any)=>(

      <div className="max-w-sm rounded overflow-hidden shadow-lg" key={item._id}>
      <img className="w-full" src={`${url}/Vehicals/${item.vehicals[0].Image}`} alt="Vehicle" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">vehicalNumber: {item.vehicals[0].vehicalNumber}</div>
        <p className="text-gray-700 text-base">
        <span className=' text-xl font-bold'>
        DriverType:
            </span> {item.orders[0].DriverType}
        </p>
        <p className="text-gray-700 text-base">
        <span className=' text-xl font-bold'>
        Username:
            </span> {item.vehicals[0].vehicalName}
        </p>
        <p className="text-gray-700 text-base">
        <span className=' text-xl font-bold'>
        status:
            </span> {item.vehicals[0].vehicalNumber}
        </p>
        <p className="text-gray-700 text-base">
        <span className=' text-xl font-bold'>
        amount:
            </span> {item.amount}
        </p>
        <p className="text-gray-700 text-base">
          <span className=' text-xl font-bold'>
          Time:
            </span> {item.vehicals[0].vehicalType}
        </p>
        <button className=' text-lg bg-sky-400 hover:bg-sky-600 rounded-md shadow-sm text-white p-2' onClick={()=>handleShowHistory(item)}>Feedback</button>
      </div>
    </div>
            ))
        }
   
    </div>
            ):(
                <div className=" absolute top-40">
                    <Feedbacks product = {Feedback}/>
                </div>
            )
        }
    </div>
  )
}

export default ViewHistory
