import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const alignment = itsMe ? "items-end" : "items-start";
  const bubbleColor = itsMe ? "bg-blue-800" : "bg-gray-700";
  const tailPosition = itsMe
    ? "after:right-[-7px] after:border-r-blue-800"
    : "after:left-[-7px] after:border-l-gray-700";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
   <div className={`flex flex-col px-4 py-2 ${alignment}`}>
  <div
    className={`relative max-w-[75%] px-3 py-2 rounded-lg ${bubbleColor}
      text-white text-sm
      after:absolute after:bottom-0 after:translate-y-full
      after:border-t-[10px] after:border-t-transparent after:border-b-0
      after:border-l-[10px] after:border-r-[10px]
      after:border-b-transparent after:border-l-transparent after:border-r-transparent
      ${tailPosition}`}
  >
    {/* Message + Time inside one bubble */}
    <div className="flex items-end gap-1">
      <span className="break-words">{message.message}</span>
      <span className="text-xs text-gray-200 ml-2">{formattedTime}</span>
    </div>
  </div>
</div>

  );
}

export default Message;
