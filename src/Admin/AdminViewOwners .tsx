import React, { useEffect, useState } from 'react';
import AxiosApi from '../AxiosApi';

const AdminViewOwners = () => {
  const [data, setData] = useState([]);

  const gettingOwners = async () => {
    try {
      const response = await AxiosApi.get("/api/admin/owners")
      console.log(response);
      setData(response.data.Owners);
      console.log(response.data, "ksj");

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettingOwners();
  }, []);

  // Dummy data for owners (You can remove this when using real data)
  const owners = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      address: '123 Main St, Cityville',
      mobile: '123-456-7890',
      profilePic: 'https://via.placeholder.com/40',
      username: 'johndoe',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      address: '456 Elm St, Townsville',
      mobile: '987-654-3210',
      profilePic: 'https://via.placeholder.com/40',
      username: 'janesmith',
    },
    {
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      address: '789 Oak St, Villageville',
      mobile: '555-555-5555',
      profilePic: 'https://via.placeholder.com/40',
      username: 'michaelj',
    },
    // Add more dummy data as needed
  ];
  // Homepage
  return (
    <div className="sm:max-w-screen  sm:mx-auto p-6 rounded-md shadow-md mt-4 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Admin View Owners</h2>

      {/* Table for Owner Details on Larger Screens */}
      <div className="hidden sm:block">
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left border border-gray-300">First Name</th>
              {/* <th className="px-4 py-2 text-left border border-gray-300">Last Name</th> */}
              <th className="px-4 py-2 text-left border border-gray-300">Address</th>
              <th className="px-4 py-2 text-left border border-gray-300">Mobile</th>
              <th className="px-4 py-2 text-left border border-gray-300">Email</th>
              {/* <th className="px-4 py-2 text-left border border-gray-300">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((owner, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{owner.fullName}</td>
                  {/* <td className="px-4 py-2 border border-gray-300">{owner.lastName}</td> */}
                  <td className="px-4 py-2 border border-gray-300">{owner.address}</td>
                  <td className="px-4 py-2 border border-gray-300">{owner.mobileNumber}</td>
                  <td className="px-4 py-2 border border-gray-300">{owner.email}</td>
                  {/* <td className="px-4 py-2 border border-gray-300 space-x-4">
                    <button className="text-white border bg-blue-600 p-1 rounded-md ">Approve</button>
                    <button className="text-white border bg-red-600 p-1 rounded-md ">Reject</button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                  No owners found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table for Mobile and Other Details on Smaller Screens */}
      <div className="block sm:hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="px-4 py-2 text-left border border-gray-300">Profile</th>
              <th className="px-4 py-2 text-left border border-gray-300">Name</th>
              <th className="px-4 py-2 text-left border border-gray-300">Email</th>
              <th className="px-4 py-2 text-left border border-gray-300">Address</th>
              <th className="px-4 py-2 text-left border border-gray-300">Mobile No.</th>
              {/* <th className="px-4 py-2 text-left border border-gray-300">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {owners.length > 0 ? (
              owners.map((owner, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">
                    <img src={owner.profilePic} alt={owner.username} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{`${owner.firstName} ${owner.lastName}`}</td>
                  <td className="px-4 py-2 border border-gray-300">{owner.email}</td>
                  <td className="px-4 py-2 border border-gray-300">{owner.address}</td>
                  <td className="px-4 py-2 border border-gray-300">{owner.mobile}</td>
                  {/* <td className="px-4 py-2 border border-gray-300">
                    <button className="text-green-500">Approve</button>
                    <button className="text-red-500 ml-2">Reject</button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  No owners found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminViewOwners;
