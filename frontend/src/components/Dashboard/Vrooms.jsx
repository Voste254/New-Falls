import { Button } from "../ui/button";
import { data } from "./Data";
import {  useState } from "react";



function Subscribe(){
    const [subscribed ,setSubscribed]= useState(false)
   return  (  <Button className={subscribed &&  '!bg-purple-800' } onClick={()=>setSubscribed(!subscribed)}>{subscribed ?"Subscribed":"Subscribe"}</Button>)
}

export default function Vroom() {   

  return (
    <div className="flex-1 h-full overflow-y-auto pt-[80px] bg-purple-200 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Vrooms</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Object.values(data).map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{user.vroom}</h2>
            <p className="text-gray-500">@{user.username}</p>
            <Subscribe/>
          </div>
        ))}
      </div>
    </div>
  );
}
