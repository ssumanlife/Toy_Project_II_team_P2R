import { Outlet } from 'react-router-dom';
import Header from './Components/Header.tsx';
import { useAuthContext } from './Context/AuthContext.tsx';
import GlobalStyle from './globalStyle.tsx';

const ConditionalHeader = () => {
  const { user } = useAuthContext();
  const path = window.location.pathname;
  return user && path !== '/' ? <Header /> : null;
};

function App() {
  return (
    <>
      <GlobalStyle />
      <ConditionalHeader />
      <Outlet />
    </>
  );
}

export default App;
