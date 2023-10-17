import  {BubblyLink} from "react-bubbly-transitions"
import namelogo from './namelogo image.png'
//for getting the current routed location
import { useLocation } from "react-router-dom"


//the navbar
export const Nav =()=>{
    const location = useLocation();
    // Declaring a function to check if a given path matches the current route 
  const isActive = (path) => location.pathname === path;
    return(
    <nav
    className="animate-in nav  pt-3" style={{animationDelay:"800ms"}}>
        <img src={namelogo}  className="navlogo" width="150px" height="60px"/>
        {/* we pass isactive function as a prop through the bubbly link  component and use it to conditionally apply the active class based on whether the link's path matches the current route. */}
        <BubblyLink to="/" isActive={isActive('/')}>Home</BubblyLink>
        <BubblyLink to="/jobSeekers" isActive={isActive('/jobSeekers')}>Job Seekers</BubblyLink>
        <BubblyLink to ="/employer" isActive={isActive('/employer')}>Employer</BubblyLink>
        <BubblyLink to ="/companies" isActive={isActive('/companies')}>Companies</BubblyLink>       
          
    </nav>
)
}

//displaying the selected  nav bar title

