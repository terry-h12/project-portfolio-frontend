
import { Link, Outlet } from 'react-router-dom';

export default function LogoOnlyLayout() {
  return (
    <>
      <Link to="/">
        Back to Login
      </Link>
      <Outlet />
    </>
  );
}