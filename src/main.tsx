import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import Error from './Pages/Error.tsx';
import Home from './Pages/Home.tsx';
// import ProtectedRoute from './Pages/ProtectedRoute';
import { AuthContextProvider, useAuthContext } from './Context/AuthContext.tsx';
import ScheduleManage from './Pages/Schedule-Manage/Schedule-Manage.tsx';
import PayrollHistory from './Pages/Payroll/Payroll-History.tsx';
import EmployeeList from './Pages/EmployeeList/EmployeeList.tsx';
import EmployeeSpecific from './Components/EmployeeList/EmployeeSpecificModal.tsx';
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
  const { user } = useAuthContext();
  return <RouterProvider router={user?.isAdmin ? adminRouter : userRouter} />;
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>,
  );
} else {
  console.log('No root element found');
}
