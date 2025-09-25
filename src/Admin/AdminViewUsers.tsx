import React, { useEffect, useState } from 'react';
import AxiosApi from '../AxiosApi';

// Dummy Data
const dummyData = [
    {
        username: 'johndoe',
        email: 'john.doe@example.com',
        profilePic: 'https://via.placeholder.com/50',
        address: '123 Main St, City, Country',
        mobile: '123-456-7890',
    },
    {
        username: 'janesmith',
        email: 'jane.smith@example.com',
        profilePic: 'https://via.placeholder.com/50',
        address: '456 Elm St, City, Country',
        mobile: '234-567-8901',
    },
    {
        username: 'michaeljohnson',
        email: 'michael.johnson@example.com',
        profilePic: 'https://via.placeholder.com/50',
        address: '789 Maple St, City, Country',
        mobile: '345-678-9012',
    },
    // Add more dummy data as needed
];

const AdminViewUsers = () => {
    
    const [data, setData] = useState([]); // Use dummy data
    useEffect(()=>{
        const fetchData = async()=>{
            const Responsive=await AxiosApi.get("/api/admin/users");
            setData(Responsive.data.users);
            
        }
        fetchData()
    },[])
    
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 15;

    const filteredUsers = data.filter((user) => {
        return (
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Users List</h2>
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Search by username or email"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        className="pl-4 pr-10 py-2 text-sm text-gray-700 border rounded"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                        className="absolute top-2 left-44 cursor-pointer border-l-2 border-black"
                        onClick={() => setPage(1)} // Reset page to 1 when searching
                    >
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                    </svg>
                </div>
            </div>

            {/* Table for larger screens */}
            <div className="hidden sm:block">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 border-b">
                            <th className="px-4 py-2 text-left border border-gray-300">Profile</th>
                            <th className="px-4 py-2 text-left border border-gray-300">Name</th>
                            <th className="px-4 py-2 text-left border border-gray-300">Email</th>
                            <th className="px-4 py-2 text-left border border-gray-300">Address</th>
                            <th className="px-4 py-2 text-left border border-gray-300">Mobile No.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user, index) => (
                                <tr key={index} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2 border border-gray-300">
                                        <img src={`http://localhost:8080/upload/CustomerImages/${user.image}`} alt={user.fullName} className="w-10 h-10 rounded-full" />
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">{user.fullName}</td>
                                    <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                                    <td className="px-4 py-2 border border-gray-300">{user.address}</td>
                                    <td className="px-4 py-2 border border-gray-300">{user.mobileNumber}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Responsive layout for mobile screens */}
            <div className="block sm:hidden">
                {currentUsers.length > 0 ? (
                    currentUsers.map((user, index) => (
                        <div key={index} className="border-b border-gray-300 py-4">
                            <div className="flex items-center mb-2">
                                <img src={user} alt={user} className="w-10 h-10 rounded-full mr-2" />
                                <div>
                                    <p className="font-semibold">{user.fullName}</p>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                            </div>
                            <p className="text-gray-700">Address: {user.address}</p>
                            <p className="text-gray-700">Mobile No: {user.mobileNumber}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-4">
                        No users found
                    </div>
                )}
            </div>

            {/* Pagination */}
            {filteredUsers.length > itemsPerPage && (
                <div className="flex justify-end py-4">
                    <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-2"
                        onClick={() => setPage(page + 1)}
                        disabled={page >= totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminViewUsers;
