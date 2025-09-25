import React, { useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AxiosApi from '../AxiosApi'

interface LoginData {
  email: string,
  password: string
}

const Signup = () => {
  const NavigateTo = useNavigate();

  const [data, setData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const [role, setRole] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);

    try {
      if (!role) {
        toast.error("Please select a role before logging in.");
        return;
      }

      if (data.email === "admin@gmail.com" && data.password === "admin") {
        toast.success("Admin Login Successful");
        NavigateTo('/admindashboard');
      } else if (role === 'owner') {
        const response = await AxiosApi.post('/api/owner/login', data);
        console.log(response, "login");
        toast.success(response.data.message);
        localStorage.setItem('owner', JSON.stringify(response.data.user));
        NavigateTo('/ownerdashboard');
      } else if (role === 'customer') {
        const response = await AxiosApi.post('/api/customer/login', data);
        console.log(response, "login");
        toast.success(response.data.message);
        localStorage.setItem('customer', JSON.stringify(response.data.Customer));
        NavigateTo('/homepage');
      }

      // Reset input fields after successful login
      setData({ email: '', password: '' });
      setRole('');

    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <Nav />
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img src="mt.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Log in to your account
            </h1>
            <div className="mt-6">
              <label htmlFor="userType" className="block text-gray-700">Select Role</label>
              <select
                id="userType"
                value={role}
                onChange={handleRoleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              >
                <option value="">Select type</option>
                <option value="owner">Owner</option>
                <option value="customer">Customer</option>
              </select>
            </div>

            <form className="mt-6" onSubmit={login}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            <hr className="my-6 border-gray-300 w-full" />

            <p className="mt-8">
              Need an account?{" "}
              <Link to='/signup' className="text-blue-500 hover:text-blue-700 font-semibold">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Signup;
