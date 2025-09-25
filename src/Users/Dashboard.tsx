import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FiBook, FiMessageSquare, FiUser, FiClock } from 'react-icons/fi';
import { FaCar } from "react-icons/fa";


const Dashboard = () => {
  return (
    <div className="flex h-screen flex-col">
      {/* Navbar */}
      <header className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white p-4 shadow">
        <h1 className="text-xl">Customer Dashboard</h1>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex md:flex-col w-64 bg-gradient-to-b from-teal-300 via-purple-600 to-rose-500 text-white p-4 space-y-4">
          <NavLink to="/homepage" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <FaCar /> <span>Vehicles</span>
          </NavLink>
          <NavLink to="booking" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <FiBook /> <span>Bookings</span>
          </NavLink>
         
          <NavLink to="history" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <FiClock /> <span>history</span>
          </NavLink>
          <NavLink to="profile" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <FiUser /> <span>Profile</span>
          </NavLink>
           <NavLink to="/" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
             <span>Logout</span>
          </NavLink>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>

      {/* Bottom Navigation for small screens */}
      {/* <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-2 flex justify-around">
        <NavLink to="books" className="flex flex-col items-center">
          <FiBook />
          <span className="text-xs">Books</span>
        </NavLink>
        <NavLink to="chatting" className="flex flex-col items-center">
          <FiMessageSquare />
          <span className="text-xs">Chatting</span>
        </NavLink>
        <NavLink to="profile" className="flex flex-col items-center">
          <FiUser />
          <span className="text-xs">Profile</span>
        </NavLink>
      </nav> */}
    </div>
  );
};

export default Dashboard;
