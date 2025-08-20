import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import user from "../../assets/user.jpg";
function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };
 

  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-gray-300 text-xl" />
      </label>
    <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300">
      <div className="relative w-16 h-16 py-2">
        <div className="rounded-full overflow-hidden w-12 h-12">
          <img
            src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
            alt="User avatar"
            className="object-cover w-12 h-12"
          />
        </div>

        {/* Green online dot */}
        <span className="absolute top-2 right-4 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      </div>

      <div>
        <h1 className="text-xl">{selectedConversation.fullname}</h1>
        <span className="text-sm"> {getOnlineUsersStatus(selectedConversation._id)}</span>
      </div>
    </div>
    </div>
  );
}

export default Chatuser;
