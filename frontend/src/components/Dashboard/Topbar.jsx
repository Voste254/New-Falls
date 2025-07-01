import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between bg-purple-600 px-5 py-2 h-[70px]">
      
      <div className="text-[50px] font-[Jaini_Purva] text-black flex items-center">
        <i className="fas fa-shopping-cart mr-2" />
        FOLLS
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search......."
          className="py-2.5 px-5 rounded-full border-none w-[400px] text-[20px] outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="w-[45px] h-[45px] rounded-full bg-white flex items-center justify-center p-1.5 cursor-pointer">
          <img
            src="https://i.ibb.co/BHxC3vxW/pngegg.png"
            alt="Notifications"
            className="w-6 h-6 object-contain"
          />
        </button>

        <button className="w-[45px] h-[45px] rounded-full bg-white flex items-center justify-center p-1.5 cursor-pointer">
          <img
            src="https://i.ibb.co/wZYKTmGt/pngegg-1.png"
            alt="Dark Mode"
            className="w-6 h-6 object-contain"
          />
        </button>

        <div className="flex flex-col items-center gap-1">
          <button className="bg-none border-none p-0 rounded-full overflow-hidden w-10 h-10 cursor-pointer bg-gray-300">
            <img
              src="https://i.ibb.co/Fq85sGjC/pngegg-2.png"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </button>
          <p className="mt-0 bg-white rounded-[10px] px-2.5 py-[1px] text-sm font-medium">
            @falls
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
