import { Outlet } from 'react-router-dom';
import Header from './Components/Header.tsx';
import { AuthContextProvider } from './Context/AuthContext.tsx';
import './App.css';

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
