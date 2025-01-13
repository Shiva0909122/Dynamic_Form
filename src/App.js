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
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className={`btn ${isAdmin ? "bg-blue-500" : "bg-green-500"}`}
        >
          Switch to {isAdmin ? "User Form" : "Admin Panel"}
        </button>

      </div>
<center style="color:#fff;"> © 2024-25 Shivarth. All rights reserved. </center>
    </div>
  );
};

export default App;
