import { Link } from "react-router-dom"
import LoginIcon from '@mui/icons-material/Login';

export default function Page404() {
  return(
    <div>
      <Link to="/" id="RegoToLogin">
        <LoginIcon id="BackToLogin"/>
      </Link>
      <div id="ErrorPage">
        <div id="ErrorTitle">Sorry, page not found!</div>
        Sorry, we couldn’t find the page you’re looking for.
      </div>
    </div>
  )
}
