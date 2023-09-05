import React from "react";
const Toast = ({ message, status, onClose }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-[280px] bg-white shadow-lg rounded-lg pointer-events-auto">
      <div className="flex items-start justify-between p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {status === "success" ? (
              <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            ) : status === "error" ? (
              <p className={"text-lg text-red-600 font-bold"}>X</p>
            ) : (
              <></>
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={onClose}
            className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
