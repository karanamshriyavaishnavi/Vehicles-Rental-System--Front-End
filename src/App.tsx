import React from 'react'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import Signup from './Home/Signup'
import Main from './Home/Main'
import Signin from './Home/Signin'
import DashBoard from './Owners/DashBoard'
import Admindashboard from './Admin/Admindashboard';
import AdminViewDrivers from './Admin/AdminViewDrivers ';
import AdminViewOwners from './Admin/AdminViewOwners ';
import AdminViewUsers from './Admin/AdminViewUsers';
import ViewVehicles from './Admin/Viewvehicals';
import Userdashboard from './Users/Userdashboard';
import ViewQueries from './Admin/ViewQueries';
import Home from './Home/Home'
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import { ToastContainer, toast } from 'react-toastify';
import AddVehicle from './Owners/AddVehicle';
import Viewvehicals from './Owners/Viewvehicals';
import UpdateVehicle from './Owners/UpdateVehicle';
import ViewPayments from './Owners/ViewPayments'
import ViewRequestComponent from './Owners/ViewRequestComponent ';
import ViewRequestWithOutDriver from './Owners/ViewRequestWithOutDriver';
import FeedbackView from './Owners/FeedbackView ';
import RaiseQueryForm from './Owners/RaiseQueryForm';
import ChatApp from './Owners/ChatApp';
import Homepage from './Home/Homepage';

// users
import Dashboard from './Users/Dashboard';
import BookingTable from './Users/BookingTable';
// import ChatApps from './Users/ChatApp';
import History from './Users/History'
import UserProfile from './Users/UserProfile'
import Feedbacks from './Users/Feedbacks'
import CustomerChat from './Users/CustomerChat'






const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/' element={<Main/>} />
          <Route path='/homepage' element={<Homepage/>} />
          <Route path='/signin' element={<Signup/>} />
          <Route path='/signup' element={<Signin/>} />

          <Route path='/ownerdashboard' element={<DashBoard/>} >
            <Route path='addvehicles' element={<AddVehicle/>} />
            <Route path='viewvehicles' element={<Viewvehicals/>} />
            {/* <Route path='updatevehicle/:id' element={<UpdateVehicle/>} /> */}
            
            <Route path='viewpayments' element={<ViewPayments/>} />
            <Route path='request' element={<ViewRequestComponent/>} />
            <Route path='requestwithoutdriver' element={<ViewRequestWithOutDriver/>} />
            <Route path='feedback' element={<FeedbackView/>} />
            <Route path='raisequery' element={<RaiseQueryForm/>} />
            <Route path='chatapp' element={<ChatApp/>} />
           

          </Route>
          <Route path='/admindashboard' element={<Admindashboard/>} >
            <Route path='viewdrivers' element={<AdminViewDrivers/>}/>
            <Route path='viewowners' element={<AdminViewOwners/>}/>
            <Route path='viewvehicles' element={<ViewVehicles/>}/>
            <Route path='viewusers' element={<AdminViewUsers/>}/>
            <Route path='viewqueries' element={<ViewQueries/>}/>


          </Route>
          <Route path='/userdashboard' element={<Userdashboard/>}/>
          <Route path='/dash' element={<Dashboard/>} >
            <Route path='booking' element={<BookingTable/>} />
            {/* <Route path='chatting' element={<ChatApps/>} /> */}
            <Route path='history' element={<History/>} />
            <Route path='profile' element={<UserProfile/>} />
            <Route path='userfeedback/:id' element={<Feedbacks/>} />
            <Route path='customerchat/:id' element={<CustomerChat/>} />
            
          </Route>
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  )
}

export default App
