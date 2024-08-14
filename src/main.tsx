import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './store.ts';
import App from './App.tsx';
import Error from './Pages/Error.tsx';
import Home from './Pages/Home.tsx';
import ProtectedRoute from './Pages/ProtectedRoute.tsx';
import { AuthContextProvider, useAuthContext } from './Context/AuthContext.tsx';
import ScheduleManage from './Pages/Schedule-Manage/Schedule-Manage.tsx';
import PayrollHistory from './Pages/Payroll/PayrollHistory.tsx';
import EmployeeList from './Pages/EmployeeList/EmployeeList.tsx';
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
        element: (
          <ProtectedRoute requireAdmin>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: 'schedule',
        element: (
          <ProtectedRoute requireAdmin>
            <ScheduleManage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'employees',
        element: (
          <ProtectedRoute requireAdmin>
            <EmployeeList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payroll',
        element: (
          <ProtectedRoute requireAdmin>
            <PayrollHistory />
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: 'schedule',
        element: (
          <ProtectedRoute>
            <ScheduleManage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payroll',
        element: (
          <ProtectedRoute>
            <PayrollHistory />
          </ProtectedRoute>
        ),
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
