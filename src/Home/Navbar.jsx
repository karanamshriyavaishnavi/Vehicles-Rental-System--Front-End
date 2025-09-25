import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ open, setLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll and change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const navigate = useNavigate();

  const handleRegister=()=>{
    navigate("/signup")
  }
  const handlelogin=()=>{
    navigate("/signin")
  }


  return (
    <nav
      className={`fixed top-0 left-0 w-full z-10 p-4 transition-all duration-300 ease-in-out font-serif ${
        isScrolled
          ? "bg-slate-400 shadow-md text-white "
          : "bg-transparent text-black"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold ">Vehicle Rent Management</h1>

        <div className="space-x-4">
          <button onClick={()=>open(true)} 
            // to="/register"
            className=" transition-colors"
          >
            Register
          </button>
          <button onClick={()=>setLogin(true)}
            // to="/login"
            className=" transition-colors"
          >
            Login
          </button>
          {/* <button onClick={handleRegister}>Register</button>
          <button onClick={handlelogin}>Login</button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
