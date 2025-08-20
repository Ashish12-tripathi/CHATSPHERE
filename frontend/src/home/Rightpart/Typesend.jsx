import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed bottom-0 right-[48px] w-[50%] p-4 bg-transparent">
      <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 w-full max-w-xl ml-auto text-bold">
        <input
          type="text" style={{ fontWeight: "bold", color: "black" }}
          placeholder="Type a message"
          value={message}
           onChange={(e) => setMessage(e.target.value)}
          className="flex-grow px-3 py-2 text-sm rounded-full outline-none bg-gray-100"
        />
        <button className="text-green-600 p-2 hover:bg-gray-200 rounded-full ml-2">
          <IoSend size={21} />
        </button>
      </div>
    </div>
     </form>
  );
}

export default Typesend;
