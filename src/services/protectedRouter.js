import useAuthCheck from "../hooks/useAuthCheck";
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthCheck();
  if (!isAuthenticated) {
    return navigate('/login');
  }

  return children;
};

export default ProtectedRoute;
