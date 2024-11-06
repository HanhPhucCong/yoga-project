import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/forgot-password", 
        { email }
      );
      setSuccessMessage("An email has been sent with instructions to reset your password.");
      setEmail(""); 
      setError(""); 
      setShowResetForm(true);
      console.log(response.data)
    } catch (error) {
      setError("Failed to send email. Please check your email address.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/reset-password", 
        { token: resetToken, password: newPassword }
      );
      setSuccessMessage("Password has been reset successfully.");
      setResetToken("");
      setNewPassword("");
      setError("");
      console.log(response.data)
      navigate("/home");
    } catch (error) {
      setError("Failed to reset password. Please check your token and try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Quên mật khẩu?
        </h2>
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {!showResetForm ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
                placeholder="E-mail"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              type="submit" 
              className="w-full py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900"
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>
            <div className="text-right">
              <a
                href="/login"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Quay lại đăng nhập
              </a>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="token"
                className="block text-sm font-medium text-gray-700"
              >
                Mã xác nhận
              </label>
              <input
                type="text"
                id="token"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)} 
                required
                placeholder="Mã xác nhận"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu mới
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} 
                required
                placeholder="Mật khẩu mới"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              type="submit" 
              className="w-full py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900"
            >
              Đặt lại mật khẩu
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
