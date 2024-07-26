import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
// import { onUserStateChange } from '../API/Firebase';

interface User {
  name: string;
  employeeNumber: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loginout: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // user.name = SpongeBob 으로 고정
  useEffect(() => {
    setUser({ name: 'SpongeBob', employeeNumber: '1234', isAdmin: true });
  }, []);

  // Uncomment and use the following code in your production environment
  // useEffect(() => {
  //   onUserStateChange((updatedUser) => {
  //     setUser(updatedUser);
  //   });
  // }, []);

  const loginout = useMemo(() => (user ? 'Logout' : 'Login'), [user]);

  const contextValue = useMemo(() => ({ user, loginout, setUser }), [user, loginout, setUser]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
}
