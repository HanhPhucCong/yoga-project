import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/SidebarUser";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8 bg-gray-100 min-h-screen">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Chỉnh sửa Hồ sơ
          </h1>
          <div className="text-center mb-8">
            <img
              src={userData.profileImage || "https://via.placeholder.com/150"}
              alt="User Profile"
              className="w-24 h-24 rounded-full mx-auto border border-gray-300"
            />
            <p className="text-sm text-gray-600 mt-2">Tải lên hình ảnh mới</p>
          </div>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="text"
                value={userData.email}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên
                </label>
                <input
                  type="text"
                  value={userData.name.split(" ")[0]}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Họ
                </label>
                <input
                  type="text"
                  value={userData.name.split(" ").slice(1).join(" ")}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ
              </label>
              <input
                type="text"
                value={userData.address || ""}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="text"
                value={userData.phoneNumber || ""}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <button
              type="button"
              className="w-full py-2 mt-4 text-white bg-gray-800 rounded-md hover:bg-gray-900"
            >
              Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
