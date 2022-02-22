import { Navigate, useRoutes } from 'react-router-dom';
import Login from './Pages/Login';
import DashboardLayout from './Layouts/DashboardLayout';
import LogoOnlyLayout from './Layouts/LogoOnlyLayout';
import Register from './Pages/Register';
import DashboardApp from './Pages/DashboardApp';
import AddProject from './Pages/AddProject';
import EditProject from './Pages/EditProject';
import EditProfile from './Pages/EditProfile';
import SearchUser from './Pages/SearchUser';
import UserPage from './Components/UserPage';
import ViewProject from './Pages/ViewProject';
import About from './Pages/About';
import Page404 from './Pages/Page404'

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <DashboardApp /> },
        { path: 'addProject', element: <AddProject /> },
        { path: 'editProfile', element: <EditProfile /> },
        { path: 'editproject/:projectId', element: <EditProject /> },
        { path: 'searchUsers', element: <SearchUser /> },
        { path: 'userPage/:userId', element: <UserPage /> },
        { path: 'viewproject/:projectId', element: <ViewProject /> },
        { path: 'about', element: <About /> },
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: '/', element: <Navigate to="/login" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" /> },
  ]);
}
