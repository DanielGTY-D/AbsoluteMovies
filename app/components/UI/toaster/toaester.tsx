import { useEffect, useState } from "react";

interface ToasterProps {
  type: string;
  message: string;
  removeFn: ({ message, type }: { message: string; type: string }) => void;
  outTime?: number;
}

const Toaster = ({ type, message, removeFn, outTime = 5000 }: ToasterProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
    }

    setTimeout(() => {
      setShow(false);
    }, outTime);

    setTimeout(() => {
      removeFn({ message: "", type: "" });
    }, outTime + 700);
  }, [message]);

  return (
    <div
      className={`fixed top-5 right-0 z-50 transition-all duration-700  ${
        show ? "translate-x-0 right-5" : "translate-x-[100%]"
      }`}
    >
      {type === "succes" ? (
        <div className="bg-white text-black text-lg shadow-xl flex gap-2 items-center rounded-lg py-2 px-4 ">
          <i className="ri-checkbox-circle-fill"></i>
          {message}
        </div>
      ) : (
        <div
          className={`bg-white shadow-xl text-black rounded-xl py-2 px-4  flex items-center gap-2`}
        >
          <i className="ri-close-circle-fill text-red-500 text-2xl"></i>
          {message}
        </div>
      )}
    </div>
  );
};

export default Toaster;
