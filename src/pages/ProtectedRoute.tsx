import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext.tsx';

interface ProtectedRouteProps {
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if ((requireAdmin && user && !user.isAdmin) || (requireAdmin && !user) || !user) {
      navigate('/');
    }
  }, [user, requireAdmin, navigate]);

  if (!user || (requireAdmin && !user.isAdmin)) {
    return null;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default ProtectedRoute;
