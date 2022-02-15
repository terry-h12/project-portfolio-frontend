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
// import Profile from './Components/Profile';
import EditProject from './Pages/EditProject';
import EditProfile from './Pages/EditProfile';
import SearchUser from './Pages/SearchUser';
import UserPage from './Components/UserPage';

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <DashboardApp /> },
        { path: 'addProject', element: <AddProject /> },
        { path: 'editProfile', element: <EditProfile /> },
        { path: 'project/:projectId', element: <EditProject /> },
        { path: 'searchUsers', element: <SearchUser /> },
        { path: 'userPage/:userId', element: <UserPage /> },
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

