import  {BubblyLink} from "react-bubbly-transitions"
import namelogo from './namelogo image.png'
import './homepage.css';


//the navbar
export const Nav =()=>(
    <nav
    className="animate-in nav" style={{animationDelay:"800ms"}}>
        <img src={namelogo}  className="navlogo" width="150px" height="60px"/>
        <BubblyLink to ="/">Home</BubblyLink>
        <BubblyLink to ="jobSeekers">Job Seekers</BubblyLink>
        <BubblyLink to ="employer">Employer</BubblyLink>
        <BubblyLink to ="companies">Companies</BubblyLink>       
          
    </nav>
)


//displaying the selected  nav bar title

export const Title=({children})=>(
<h2 className="animate-in" style={{animationDelay:"600ms"}}>{children}</h2>
)
