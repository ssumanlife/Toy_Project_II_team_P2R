import { Outlet } from 'react-router-dom';
import Header from './Components/Header.tsx';
import { AuthContextProvider, useAuthContext } from './Context/AuthContext.tsx';
import GlobalStyle from './globalStyle.tsx';

const ConditionalHeader = () => {
  const { user } = useAuthContext();
  return user ? <Header /> : null;
};

function App() {
  return (
    <AuthContextProvider>
      <GlobalStyle />
      <ConditionalHeader />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
