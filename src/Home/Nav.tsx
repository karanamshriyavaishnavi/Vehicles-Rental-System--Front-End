import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        className={`p-4 flex justify-between items-center ${
          show ? 'bg-blue-800 text-white' : 'bg-inherit text-black'
        }`}
        style={{ position: 'sticky', top: 0, zIndex: 999 }}
      >
        <div className="text-white text-lg uppercase font-serif">
          Vehicle Rent Management
        </div>
        <div>
          <Link
            to="/signup"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
          >
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
