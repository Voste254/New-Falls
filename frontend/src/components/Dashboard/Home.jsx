import React from 'react';
import { data } from './Data';
import { FaThumbsUp, FaComment, FaBookmark, FaShareAlt, FaShoppingCart } from 'react-icons/fa';

const Home = () => {
  const users = Object.values(data);

  return (
<div className="flex-1 h-full overflow-y-auto pt-[80px] bg-purple-200 p-4 flex justify-center">

      <div className="flex flex-col gap-6 w-[50%]">
        {users.map((user, index) => (
          <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-2">
              <img src={user.profilePicture} alt={user.name} className="w-12 h-12 rounded-full" />
              <div>
                <h4>{user.name} || @{user.username}</h4>
                <p>{user.description}</p>
              </div>
            </div>
            <img src={user.photoUrl} alt="post content" className="w-full h-[180px] rounded-lg my-2 object-contain" />
            <div className="flex justify-around pt-2">
              <FaThumbsUp className="text-xl cursor-pointer text-gray-800 transition-transform duration-200 ease-in-out hover:scale-110 hover:text-purple-600" />
              <FaComment className="text-xl cursor-pointer text-gray-800 transition-transform duration-200 ease-in-out hover:scale-110 hover:text-purple-600" />
              <FaBookmark className="text-xl cursor-pointer text-gray-800 transition-transform duration-200 ease-in-out hover:scale-110 hover:text-purple-600" />
              <FaShareAlt className="text-xl cursor-pointer text-gray-800 transition-transform duration-200 ease-in-out hover:scale-110 hover:text-purple-600" />
              <FaShoppingCart className="text-xl cursor-pointer text-gray-800 transition-transform duration-200 ease-in-out hover:scale-110 hover:text-purple-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
