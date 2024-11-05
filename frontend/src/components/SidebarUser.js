import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Hồ sơ");

  const menuItems = [
    { label: "Hồ sơ", path: "/user-profile" },
    { label: "Mật khẩu", path: "/change-password" },
    { label: "Lịch sử đơn hàng", path: "/order-history" },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.label);
    navigate(item.path);
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col shadow-lg">
      <h2 className="text-2xl font-bold text-center py-6 border-b border-gray-700">Tài khoản</h2>
      <ul className="flex flex-col mt-4">
        {menuItems.map((item) => (
          <li
            key={item.label}
            onClick={() => handleItemClick(item)}
            className={`relative px-6 py-3 cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded-l-full ${
              activeItem === item.label ? "bg-gray-700" : ""
            }`}
          >
            {activeItem === item.label && (
              <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r"></span>
            )}
            <span className="ml-2">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
