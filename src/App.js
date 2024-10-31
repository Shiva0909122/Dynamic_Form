import React, { useState } from "react";
import AdminPanel from "./components/AdminPanel";
import UserForm from "./components/UserForm";

const App = () => {
  const [fields, setFields] = useState([
    {
      type: "text", 
      label: "First Name",
      name: "firstName",
      required: true,
    },
    {
      type: "email",
      label: "Email",
      name: "email",
      required: true,
    },
    {
      type: "radio",
      label: "Age",
      name: "age",
      options: [
        { value: "18-20", label: "18-20" },
        { value: "20-25", label: "20-25" },
        { value: "26-40", label: "26-40" },
      ],
    },
  ]);

  const [isAdmin, setIsAdmin] = useState(true);

  const handleFieldsChange = (newFields) => {
    setFields(newFields);
  };

  return (
    <div className="min-h-screen bg-[#0d0c14] py-[8cqw] md:py-[4cqw] relative">
      <div className="flex flex-col items-center justify-center gap-[8cqw] md:gap-[2cqw]">
       
        <div className="w-full">
          {isAdmin ? (
            <AdminPanel fields={fields} onFieldsChange={handleFieldsChange} />
          ) : (
            <UserForm fields={fields} />
          )}
        </div>
        <button onClick={() => setIsAdmin(!isAdmin)} className="btn">
          Switch to {isAdmin ? "User Form" : "Admin Panel"}
        </button>

      </div>
      <div className="flex justify-end items-end w-full absolute bottom-[6cqw] right-[6cqw] md:bottom-[2cqw] md:right-[2cqw] ">
        <div className="w-[8.5%]">
          <img
            className="z-10 object-cover"
            src="https://ik.imagekit.io/liquide/tr:w-264/logos/Logo.png"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
