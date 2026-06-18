import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
  AiOutlineInfoCircle,
} from "react-icons/ai";

const AlertMessage = ({ type = "info", message }) => {
  if (!message) return null;

  const alertStyles = {
    error: {
      icon: <AiOutlineCloseCircle className="text-red-600 text-lg" />,
      box: "bg-red-50 border-red-300 text-red-700",
    },

    success: {
      icon: <AiOutlineCheckCircle className="text-green-600 text-lg" />,
      box: "bg-green-50 border-green-300 text-green-700",
    },

    loading: {
      icon: (
        <AiOutlineLoading3Quarters className="text-blue-600 text-lg" />
      ),
      box: "bg-blue-50 border-blue-300 text-blue-700",
    },

    warning: {
      icon: <AiOutlineInfoCircle className="text-yellow-600 text-lg" />,
      box: "bg-yellow-50 border-yellow-300 text-yellow-700",
    },

    info: {
      icon: <AiOutlineInfoCircle className="text-purple-600 text-lg" />,
      box: "bg-purple-50 border-purple-300 text-purple-700",
    },
  };

  const current =
    alertStyles[type] || alertStyles.info;

  return (
    <div
      className={`
        w-full
        mb-5
        rounded-lg
        border
        px-4
        py-3
        flex
        items-start
        gap-3
        ${current.box}
      `}
    >
      <div className="mt-[2px]">
        {current.icon}
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

export default AlertMessage;