import React from 'react';
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
    const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`flex space-x-6 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer ${
        isSelected ? 'bg-slate-700' : ''
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      {/* Avatar with custom online indicator */}
  
          <div className="relative w-16 h-16">
             <div className="rounded-full overflow-hidden w-12 h-12">
          <img
            src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
            alt="User avatar"
            className="object-cover w-12 h-12"
          />
        </div>
        
      
          
        {/* Green online dot */}
    {isOnline && (
    <span className="absolute top-0 right-4 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
  )}
</div>
      
     

      {/* User info */}
      <div>
        <h1 className="font-bold">{user.fullname}</h1>
        <span>{user.email}</span>
      </div>
    </div>
  );
}

export default User;
