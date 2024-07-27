import { Outlet } from 'react-router-dom';
import Header from './Components/Header.tsx';
import { AuthContextProvider } from './Context/AuthContext.tsx';
import GlobalStyle from './globalStyle.tsx';

function App() {
  return (
    <AuthContextProvider>
      <GlobalStyle />
      <Header />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
