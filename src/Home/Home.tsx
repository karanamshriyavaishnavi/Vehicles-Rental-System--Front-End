import React, { useState } from 'react';
import Navbar from './Navbar';
import Slider from "react-slick";
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { IoCarSportSharp } from "react-icons/io5";
import { RiMotorbikeFill } from "react-icons/ri";
import { TbCarSuv } from "react-icons/tb";
import { HiUsers } from "react-icons/hi";
import { IoMdMail } from 'react-icons/io';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import AxiosApi from '../AxiosApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';







const Home: React.FC = () => {
    const [usecss, setUsecss] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [login, setLogin] = React.useState(false);

    React.useEffect(() => {
        const secondDiv = document.querySelector('.second');
        if (secondDiv) {
            const handleMouseEnter = () => setUsecss(true);
            secondDiv.addEventListener('mouseenter', handleMouseEnter);
            return () => {
                secondDiv.removeEventListener('mouseenter', handleMouseEnter);
            };
        }
    }, []);

    const reviews = [
        { id: 1, name: "John Doe", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz6FOCo35CJu6oDizL-rBOxFRoB_txplyFcOpAlSP2-qpUJar1J9n0FfZWBvEcCZ_Yz1w&usqp=CAU", rating: 5, message: "Great service and very friendly staff!" },
        { id: 2, name: "Jane Smith", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXHNYPDIj2y3liIr6SD2iqUMsCOXJwWVuqrz3ymt-vZwclsrOifw5MvRBy6nvT9L_fBrQ&usqp=CAU", rating: 4, message: "The vehicle was in excellent condition." },
        { id: 3, name: "Bob Johnson", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s", rating: 5, message: "Had a wonderful experience renting a car!" },
        { id: 4, name: "Alice Brown", photo: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250", rating: 4, message: "Good price and easy process." },
        { id: 5, name: "Tom White", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNlXZlMguDa-0yDfWZbxjbWqSu4TCEK8d-gEDkQWIUK3Ox1Sx2VnDyYy6oKpWjw0ALTXY&usqp=CAU", rating: 5, message: "Highly recommend! Will rent again." }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear"
    };

    const settingss = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
        ],
    };

    const handleMail = () => {
        window.location.href = "mailto:cse.takeoff@gmail.com";
    };

    const handleFacebook = () => {
        window.location.href = "https://www.facebook.com/marketplace";
    };

    const handleInstagram = () => {
        window.location.href = "https://www.instagram.com/";
    };

    const handleWhatsapp = () => {
        window.location.href = "https://whatsapp.com";
    };

    const sliderItems = [
        { id: 1, title: 'Slide 1', image: '/23.png' },
        { id: 2, title: 'Slide 2', image: '/home4.png' },
        { id: 3, title: 'Slide 3', image: '/home5.png' },
        { id: 4, title: 'Slide 4', image: '/mt.png' },
        { id: 5, title: 'Slide 5', image: '/bike1.png' },
        { id: 6, title: 'Slide 6', image: '/bike2.png' }
    ];

    // Sample counts for display
    const numberOfCustomers = 150;
    const numberOfVehicles = 200;
    const numberOfCars = 120;
    const numberOfBikes = 80;

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData(e.target);
    //     const userType = formData.get("role"); // Assuming you have a form field for user type

    //     try {
    //         let response;

    //         if (userType === "owner") {
    //             response = await axios.post('/api/owner/register', formData);
    //         } else if (userType === "customer") {
    //             response = await axios.post('/api/customer/register', formData);
    //         } else {
    //             toast.error("Invalid user type selected");
    //             return;
    //         }

    //         console.log(response);
    //         toast.success(response.data.message);
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("Registration failed. Please try again.");
    //     }
    // };






    const handleRegisterForm = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userType = formData.get("role"); // Get the role value

        try {
            let response;

            if (userType === "owner") {
                response = await axios.post('/api/owner/register', formData);
            } else if (userType === "customer") {
                response = await axios.post('/api/customer/register', formData);
            } else {
                toast.error("Invalid user type selected");
                return;
            }

            console.log(response);
            toast.success(response.data.message);
            e.target.reset(); // This will reset the form fields


        } catch (error) {
            console.error(error);
            toast.error("Registration failed. Please try again.");
            e.target.reset(); // This will reset the form fields

        }
    };

    // const NavigateTo = useNavigate()

    // const handleLoginForm = async (e: any) => {
    //     e.preventDefault();
    //     // const formData = new FormData(e.target);
    //     const formData = new FormData(e.target);
    //     const formObject = Object.fromEntries(formData.entries());
    //     console.log(formObject);


    //     const response = await axios.post('/api/customer/login', formObject);
    //     console.log(response, "login")
    //     toast.success(response.data.message)
    //     localStorage.setItem('customer', JSON.stringify(response.data.Customer))
    //     NavigateTo('/homepage')


    // }
    const NavigateTo = useNavigate()


    interface login {
        email: string,
        password: string
    }
    const [data, setdata] = useState<login>({
        email: '',
        password: ''
    })

    const [role, setrole] = useState('')


    const handlechange = (e: any) => {
        const { name, value } = e.target
        setdata({ ...data, [name]: value })
    }

    const handlelogin = async (e: any) => {
        e.preventDefault()
        console.log(data)
        try {
            if (data.email === "admin@gmail.com" && data.password === "admin123") {
                toast.success("Admin Login Successfull")
                NavigateTo('/admindashboard')

            } else if (role === 'owner') {
                const response = await AxiosApi.post('/api/owner/login', data);
                console.log(response, "login")
                toast.success(response.data.message)
                localStorage.setItem('owner', JSON.stringify(response.data.user))
                NavigateTo('/ownerdashboard')
            } else if (role === 'customer') {
                const response = await AxiosApi.post('/api/customer/login', data);
                console.log(response, "login")
                toast.success(response.data.message)
                localStorage.setItem('customer', JSON.stringify(response.data.Customer))
                NavigateTo('/homepage')

            }

        } catch (error) {
            console.log(error)

        }
    }



    return (
        <div className="overflow-hidden">
            <Navbar open={setIsModalOpen} setLogin={setLogin} />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 mt-20">
                <div className="flex w-full">
                    <img src="/12.png" alt="" className='w-full h-[70%] animate__animated animate__fadeInTopLeft' />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between mt-20 px-4">
                    <img src="/bike.png" alt="" className='transition-transform duration-300 hover:scale-105 w-1/2 md:w-1/3' />
                    <div className="text-center mt-4 md:mt-0 md:ml-10">
                        <h1 className="text-4xl font-serif">About Vehicle Rent Management</h1>
                        <p className="text-lg mt-4">Vehicle Rent Management is a platform that provides you with the best vehicle renting experience...</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between mt-20 px-4">
                    <div className="text-center mt-4 md:mt-0 md:mr-10">
                        <h1 className="text-4xl font-serif">About Vehicle Rent Management</h1>
                        <p className="text-lg mt-4">Vehicle Rent Management is a platform that provides you with the best vehicle renting experience...</p>
                    </div>
                    <img src="/car2.png" alt="" className='transition-transform duration-300 hover:scale-105 w-1/2 md:w-1/3' />
                </div>

                {/* New Stats Section */}
                <div className="mt-20 mb-10 px-4 h-80">
                    <h1 className="text-3xl font-bold text-center mb-6">Our Stats</h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-72 sm:w-screen m-3 ml-3">
                        <div className="bg-white p-4 rounded-lg shadow-md text-center sm:ml-5">
                            <HiUsers className=" text-4xl ml-10 sm:text-8xl text-green-500 sm:ml-20 items-center justify-center" />
                            <h2 className="text-xl font-semibold">{numberOfCustomers}+</h2>
                            <p className="text-gray-600">Customers</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <TbCarSuv className="text-4xl ml-10 sm:text-8xl text-yellow-500 sm:ml-20 items-center justify-center" />
                            <h2 className="text-xl font-semibold">{numberOfVehicles}+</h2>
                            <p className="text-gray-600">Total Vehicles</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <IoCarSportSharp className=" text-4xl ml-10 sm:text-8xl text-blue-500 sm:ml-20 items-center justify-center" />

                            <h2 className="text-xl font-semibold">{numberOfCars}+</h2>
                            <p className="text-gray-600">Cars Available</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md text-center sm:mr-5">
                            <RiMotorbikeFill className="text-4xl ml-10 sm:text-8xl text-red-500 sm:ml-20 items-center justify-center" />
                            <h2 className="text-xl font-semibold">{numberOfBikes}+</h2>
                            <p className="text-gray-600">Bikes Available</p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-10 second">
                    <h1 className="text-4xl font-serif">Welcome to Vehicle Rent Management</h1>
                    {/* no of cars  */}
                    {usecss && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10 p-2">
                            {[
                                { src: "/23.png", name: "Car Model 1" },
                                { src: "/car33.png", name: "Car Model 2" },
                                { src: "/car45.png", name: "Car Model 3" },
                                { src: "/bullet.png", name: "Car Model 4" },
                                { src: "/bike2.png", name: "Bike Model 1" },
                                { src: "/43.png", name: "Bike Model 2" }
                            ].map((item, index) => (
                                <div key={index} className="transition-transform duration-300 hover:scale-105">
                                    <img
                                        src={item.src}
                                        alt={item.name}
                                        className='w-full h-80 object-cover rounded-lg animate__animated animate__fadeIn hover:underline'
                                    />
                                    <p className="mt-2 text-lg font-semibold">{item.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* fb whatsapp icons */}

                <div className="flex flex-col fixed top-80 right-10 space-y-9 z-50">
                    <FaFacebook className='text-4xl text-blue-800 cursor-pointer pulse-icon' onClick={handleFacebook} />
                    <FaWhatsapp className='text-4xl text-green-950 cursor-pointer pulse-icon' onClick={handleWhatsapp} />
                    <FaInstagram className='text-4xl text-red-500 cursor-pointer pulse-icon' onClick={handleInstagram} />
                    <IoMdMail className='text-4xl text-blue-600 cursor-pointer pulse-icon' onClick={handleMail} />
                </div>

                {/* <Slider {...settings} className="w-full h-auto mb-10">
                    {sliderItems.map((item) => (
                        <div key={item.id} className="flex flex-col items-center">
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <img src={item.image} alt={item.title} className="w-full h-auto p-2 object-contain" />
                        </div>
                    ))}
                </Slider> */}

                <div className="text-center mt-10 bg-slate-400 ">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-6">User Reviews</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
                        <Slider {...settingss} className="w-screen h-auto mb-10">
                            {reviews.map((review) => (
                                <div key={review.id} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 m-4 space-x-3">
                                    <img src={review.photo} alt={review.name} className="w-20 h-20 object-cover rounded-full mx-auto mb-4" />
                                    <h3 className="text-lg sm:text-xl font-bold mt-2">{review.name}</h3>
                                    <div className="flex justify-center mt-2">
                                        <p className="text-yellow-500">
                                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                        </p>
                                    </div>
                                    <p className="text-sm mt-4 text-gray-600 italic">"{review.message}"</p>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>

            {/* Modal for Register */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg w-96 animate__animated animate__fadeInTopRight">
                        <h1 className="text-2xl font-bold text-center">Register</h1>
                        <button
                            className="absolute text-red-600 top-4 right-4 text-xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-100 transition-colors duration-200"
                            onClick={() => setIsModalOpen(false)}
                        >
                            X
                        </button>
                        <form className="mt-4 space-y-4" onSubmit={handleRegisterForm}>
                            <input type="text" name="fullName" placeholder="Full Name" className="w-full p-2 border border-gray-300 rounded-md" />
                            <input type="number" name="mobileNumber" placeholder="Mobile Number" className="w-full p-2 border border-gray-300 rounded-md" />
                            <input type="email" name="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded-md" />
                            <input type="password" name="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded-md" />
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full p-2 border border-gray-300 rounded-md" />
                            <input type="text" name="address" placeholder="Address" className="w-full p-2 border border-gray-300 rounded-md" />
                            <input type="file" name="image" className="w-full p-2 border border-gray-300 rounded-md" />

                            {/* Role Dropdown */}
                            <select name="role" className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="owner">Owner</option>
                                <option value="customer">User</option>
                            </select>

                            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Register</button>
                        </form>
                    </div>
                </div>

            )}

            {/* Modal for Login */}
            {login && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg w-96 animate__animated animate__fadeInTopRight">
                        <h1 className="text-2xl font-bold text-center">Login</h1>
                        <button
                            className="absolute text-red-600 top-4 right-4 text-xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-100 transition-colors duration-200"
                            onClick={() => setLogin(false)}
                        >
                            X
                        </button>
                        <div className="mt-6">
                            <label htmlFor="userType" className="block text-gray-700">Select</label>
                            <select
                                onChange={(e: any) => setrole(e.target.value)}
                                id="userType"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            >
                                <option value="">selete type</option>
                                <option value="owner">Owner</option>
                                <option value="customer">Customer</option>
                            </select>
                        </div>
                        <form className="mt-4 space-y-4" onSubmit={handlelogin}>

                            <div>
                                <label className="block text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    id=""
                                    onChange={handlechange}
                                    placeholder="Enter Email Address"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    required
                                    autoComplete=""

                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id=""
                                    required
                                    onChange={handlechange}
                                    placeholder="Enter Password"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
          focus:bg-white focus:outline-none"

                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Login</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
