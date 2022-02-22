import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function About() {
  return(
    <div>
      <div id="AboutBackground">
        <div id="AboutInfo">
        This web app was a personal project designed to allow users the ability to upload any projects they have completed or are still working on<br/><br/>
        There is also a feature to view other user's profile and the projects they have uploaded.
        </div>
      </div>
      <div id="Socials">
        <h2 id="SocialsTitle">Socials</h2>
        <div id="SocialsIcon">
          <a href="https://github.com/terry-h12" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none"}}><GitHubIcon id="AboutGithub" /></a>
          <a href="https://www.linkedin.com/in/terence-huang-8742981b8/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none"}}><LinkedInIcon id="AboutLinkedIn"/></a>
        </div>
      </div>
    </div>
  )
}
