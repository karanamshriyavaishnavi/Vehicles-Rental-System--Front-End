import React from 'react';
import { Outlet } from 'react-router-dom';
import { FaUsers, FaUserTie, FaCar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SiImessage } from "react-icons/si";

const AdminDashboard = () => {
    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-indigo-400 via-violet-300 to-violet-400 text-white p-4">
                <h1 className="text-xl">Admin Panel</h1>
            </nav>

            {/* Main Content Area */}
            <div className="flex flex-1">
                {/* Sidebar for larger screens */}
                <aside className="hidden lg:flex lg:flex-col bg-gradient-to-b from-cyan-400 to-blue-500 w-64 p-4">
                    <ul>
                        <Link to="viewusers">
                            <li className="flex items-center p-2 text-white text-xl font-serif hover:bg-gray-300 rounded">
                                <FaUsers className="mr-2" />
                                <span>View Users</span>
                            </li>
                        </Link>
                        <Link to="viewowners">
                            <li className="flex items-center p-2 text-white text-xl font-serif hover:bg-gray-300 rounded">
                                <FaUserTie className="mr-2" />
                                <span>View Owners</span>
                            </li>
                        </Link>
                        <Link to="viewvehicles">
                            <li className="flex items-center p-2 text-white text-xl font-serif hover:bg-gray-300 rounded">
                                <FaCar className="mr-2" />
                                <span>View Vehicles</span>
                            </li>
                        </Link>
                        {/* <Link to="viewqueries">
                            <li className="flex items-center p-2 text-white text-xl font-serif hover:bg-gray-300 rounded">
                                <SiImessage className="mr-2" />
                                <span>View queries</span>
                            </li>
                        </Link> */}
                        <Link to="/">
                            <li className="flex items-center p-2 text-white text-xl font-serif hover:bg-gray-300 rounded">
                                {/* <SiImessage className="mr-2" /> */}
                                <span>Logout</span>
                            </li>
                        </Link>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 bg-slate-200">
                    <Outlet />
                </main>
            </div>

            {/* Bottom Navigation for small screens */}
            <div className="lg:hidden bg-gray-200 p-2 flex justify-around">
                <div className="flex flex-col items-center">
                    <Link to="viewusers">
                        <FaUsers className="text-xl" />
                        <span>Users</span>
                    </Link>
                </div>
                <div className="flex flex-col items-center">
                    <Link to="viewowners">
                        <FaUserTie className="text-xl" />
                        <span>Owners</span>
                    </Link>
                </div>
                <div className="flex flex-col items-center">
                    <Link to="viewvehicles">
                        <FaCar className="text-xl" />
                        <span>Vehicles</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
