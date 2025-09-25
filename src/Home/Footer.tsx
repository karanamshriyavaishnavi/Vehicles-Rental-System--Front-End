import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importing icons

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-lg font-bold mb-4 md:mb-0">Vehicle Rent Management</div>
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="hover:underline">Home</a>
              <a href="#" className="hover:underline">About Us</a>
              <a href="#" className="hover:underline">Services</a>
              <a href="#" className="hover:underline">Contact</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
            </div>
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="hover:text-gray-400"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-gray-400"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-gray-400"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-gray-400"><FaLinkedin size={20} /></a>
            </div>
          </div>
          <div className="text-center mt-4">
            <p>© {new Date().getFullYear()} Vehicle Rent Management. All rights reserved.</p>
            <p>Contact us: info@vehiclerentmanagement.com | +123 456 7890</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
