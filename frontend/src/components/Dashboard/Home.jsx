import React from 'react';
import { data } from './Data';
import { FaThumbsUp, FaComment, FaBookmark, FaShareAlt, FaShoppingCart } from 'react-icons/fa';

const Home = () => {
  const users = Object.values(data);

  return (
    <div className="flex-1 h-full overflow-y-auto pt-[80px] bg-purple-200 p-4 flex justify-center">
      <div className="flex flex-col gap-6 w-full max-w-5xl">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg shadow-sm 
                       w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[50%]
                       h-auto sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] xl:min-h-[450px]
                       mx-auto transition-all"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 mb-2">
              <img src={user.profilePicture} alt={user.name} className="w-12 h-12 rounded-full" />
              <div>
                <h4>{user.name} || @{user.username}</h4>
                <p>{user.description}</p>
              </div>
            </div>

            {/* Post Image */}
            <img
              src={user.photoUrl}
              alt="post content"
              className="w-full rounded-lg my-2 object-contain
                         h-[140px] sm:h-[160px] md:h-[180px] lg:h-[220px] xl:h-[260px]"
            />

            {/* Action Icons */}
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
