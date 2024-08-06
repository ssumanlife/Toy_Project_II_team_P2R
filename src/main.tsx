import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './store.ts';
import App from './App.tsx';
import Error from './Pages/Error.tsx';
import Home from './Pages/Home.tsx';
// import ProtectedRoute from './Pages/ProtectedRoute';
import { AuthContextProvider, useAuthContext } from './Context/AuthContext.tsx';
import ScheduleManage from './Pages/Schedule-Manage/Schedule-Manage.tsx';
import PayrollHistory from './Pages/Payroll/PayrollHistory.tsx';
import EmployeeList from './Pages/EmployeeList/EmployeeList.tsx';
import EmployeeSpecific from './Components/EmployeeList/EmployeeSpecificModal.tsx';
import Signin from './Pages/Signin.tsx';

//로그인하지 않아도 url로 직접 접근이 가능한 문제 -> ProtectedRoute로 해결
const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Signin />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'schedule',
        element: <ScheduleManage />,
      },
      {
        path: 'employees',
        element: <EmployeeList />,
      },
      {
        path: 'payroll',
        element: <PayrollHistory />,
      },
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Signin />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'schedule',
        element: <ScheduleManage />,
      },
      {
        path: 'payroll',
        element: <PayrollHistory />,
      },
    ],
  },
]);

function Root() {
  const { user } = useAuthContext();
  return <RouterProvider router={user?.isAdmin ? adminRouter : userRouter} />;
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </Provider>,
  );
} else {
  console.log('No root element found');
}
