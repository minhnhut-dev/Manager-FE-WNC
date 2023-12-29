import React from 'react';
import useAuthCheck from "../hooks/useUseCheck";
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthCheck();
  console.log("isAuthenticated", isAuthenticated)
  if (!isAuthenticated) {
    // Nếu không xác thực, chuyển hướng đến trang đăng nhập
    return navigate('/login');
  }

  return children; // Nếu xác thực, hiển thị route được yêu cầu
};

export default ProtectedRoute;
