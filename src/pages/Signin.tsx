import React from 'react';
import { useAuthContext } from '../Context/AuthContext.tsx';

const Signin: React.FC = () => {
  const { user, setUser } = useAuthContext();

  const handleLogin = () => {
    if (user) {
      setUser({ ...user, isAdmin: true, name: user.name || '' });
    }
  };

  return (
    <div>
      <h1>Signin</h1>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Signin;
