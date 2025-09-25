import React, { useState } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { FaCar, FaMoneyCheckAlt, FaSignOutAlt, FaHome, FaComments, FaUserFriends } from 'react-icons/fa';

const DashBoard = () => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const navigateTo = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigateTo('/');
    };

    const owners = localStorage.getItem('owner');
    const owner = owners ? JSON.parse(owners) : null;

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-white flex justify-between items-center">
                <h1 className="text-2xl font-bold"> Owner Dashboard</h1>
                <button onClick={logout} className="flex items-center space-x-2">
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>

            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="bg-gradient-to-b from-fuchsia-400 via-lime-300 to-indigo-600 text-white w-64 h-full hidden md:flex flex-col">
                    <div className="p-4 border-b border-gray-700">
                        {/* <h1 className="text-2xl font-bold">{owner.firstName + " " + owner.lastName}</h1> */}
                    </div>
                    <div className="p-4">
                        <ul className="space-y-2">
                            {/* <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer flex items-center">
                                <Link to="home" className="flex items-center">
                                    <FaHome className="mr-2" />
                                    Home
                                </Link>
                            </li> */}
                            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer flex items-center">
                                <Link to="addvehicles" className="flex items-center">
                                    <FaCar className="mr-2" />
                                    Add Vehicles
                                </Link>
                            </li>
                            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer flex items-center">
                                <Link to="viewvehicles" className="flex items-center">
                                    <FaCar className="mr-2" />
                                    View Vehicles
                                </Link>
                            </li>
                            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer flex items-center">
                                <Link to="request" className="flex items-center">
                                    <FaUserFriends className="mr-2" />
                                    View Requests with Driver
                                </Link>
                            </li>
                            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer flex items-center">
                                <Link to="requestwithoutdriver" className="flex items-center">
                                    <FaUserFriends className="mr-2" />
                                     Requests without Driver
                                </Link>
                            </li>
                            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer flex items-center">
                                <Link to="viewpayments" className="flex items-center">
                                    <FaMoneyCheckAlt className="mr-2" />
                                    View Payments
                                </Link>
                            </li>
                            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer flex items-center">
                                <Link to="feedback" className="flex items-center">
                                    <FaComments className="mr-2" />
                                    Feedback
                                </Link>
                            </li>
                            {/* <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer flex items-center">
                                <Link to="raisequery" className="flex items-center">
                                    <FaComments className="mr-2" />
                                    Raisequery
                                </Link>
                            </li> */}
                            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer flex items-center">
                                <Link to="chatapp" className="flex items-center">
                                    <FaComments className="mr-2" />
                                    chatapp
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4">
                    {/* Outlet renders the child routes here */}
                    <Outlet />
                </div>
            </div>

            {/* Bottom Navigation for Small Screens */}
            <div className="bg-gradient-to-r from-gray-800 to-black text-white fixed bottom-0 w-full md:hidden flex justify-around items-center p-4">
                <Link to="/dashboard/home">
                    <FaHome className="cursor-pointer" />
                </Link>
                <Link to="/dashboard/addvehicles">
                    <FaCar className="cursor-pointer" />
                </Link>
                <Link to="/dashboard/request">
                    <FaUserFriends className="cursor-pointer" />
                </Link>
                <Link to="/dashboard/payment">
                    <FaMoneyCheckAlt className="cursor-pointer" />
                </Link>
                <Link to="/dashboard/feedback">
                    <FaComments className="cursor-pointer" />
                </Link>
            </div>
        </div>
    );
};

export default DashBoard;
