import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className="bg-gray-100">
      <div className="bg-white p-6 md:mx-auto">
    <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
        <circle cx="12" cy="12" r="12" fill="currentColor" />
        <path
          fill="#fff"
          d="M9.707 13.293l-2.121-2.121-1.414 1.414L9.707 16.121l7.778-7.778-1.414-1.414z"
        />
      </svg>

     <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">Thank you for your ticket purchase.</p>
          <p>Have a great day!</p>
          <div className="py-10 text-center">
            <Link to="/home" className="px-12 bg-primaryColor rounded text-white font-semibold py-3">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
