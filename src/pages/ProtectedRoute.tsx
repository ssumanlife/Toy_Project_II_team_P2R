import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext.tsx';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin }: ProtectedRouteProps) {
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

  return { children };
}

ProtectedRoute.defaultProps = {
  requireAdmin: false,
};
