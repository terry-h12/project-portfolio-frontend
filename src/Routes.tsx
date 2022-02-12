import { 
  Navigate, 
  useRoutes 
} from 'react-router-dom';

import Login from './Pages/Login';
// Maybe change?
import DashboardLayout from './Layouts/Dashboard/DashboardLayout';
import LogoOnlyLayout from './Layouts/LogoOnlyLayout';

import Register from './Pages/Register';
import DashboardApp from './Pages/DashboardApp';
import AddProject from './Pages/AddProject';
import Profile from './Components/Profile';
import Project from './Pages/Project';

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <DashboardApp /> },
        { path: 'addProject', element: <AddProject /> },
        { path: 'profile', element: <Profile /> },
        { path: 'project/:projectId', element: <Project /> },
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: '/', element: <Navigate to="/login" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" /> },
  ]);
}

