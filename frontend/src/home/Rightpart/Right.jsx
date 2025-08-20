import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/Authprovider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // Reset conversation only on unmount
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full h-screen flex flex-col bg-slate-900 text-gray-300">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header with user info */}
          <Chatuser />

          {/* Messages area (scrollable) */}
          <div className="flex-1 overflow-y-auto px-2">
            <Messages />
          </div>

          {/* Typing / send box at bottom */}
          <div className="p-2 border-t border-slate-700">
            <Typesend />
          </div>
        </>
      )}
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
      {/* Mobile menu button */}
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute top-4 left-4"
      >
        <CiMenuFries className="text-gray-300 text-2xl" />
      </label>

      {/* Welcome message */}
      <h1 className="text-lg md:text-xl font-medium leading-relaxed">
        Welcome{" "}
        <span className="font-semibold text-xl">
          {authUser?.user?.fullname}
        </span>
        <br />
        <span className="text-gray-400">
          No chat selected — please start a conversation by selecting a contact.
        </span>
      </h1>
    </div>
  );
};
