import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import Error from './Pages/Error.tsx';
import Home from './Pages/Home.tsx';
// import ProtectedRoute from './Pages/ProtectedRoute';
import { AuthContextProvider, useAuthContext } from './Context/AuthContext.tsx';
import ScheduleManage from './Pages/Schedule-Manage.tsx';
import PayrollHistory from './Pages/Payroll-History.tsx';
import EmployeeList from './Pages/Employee-List.tsx';
import EmployeeSpecific from './Pages/Employee-Specific.tsx';
import Signin from './Pages/Signin.tsx';

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
        children: [
          {
            path: ':id',
            element: <EmployeeSpecific />,
          },
        ],
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
  // const { user } = useAuthContext();
  // console.log(user?.isAdmin);

  // return <RouterProvider router={user?.isAdmin ? adminRouter : userRouter} />;
  return <RouterProvider router={adminRouter} />;
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </React.StrictMode>,
  );
} else {
  console.log('No root element found');
}
