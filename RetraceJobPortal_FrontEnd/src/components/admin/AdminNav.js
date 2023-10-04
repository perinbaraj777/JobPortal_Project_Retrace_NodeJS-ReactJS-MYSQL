import { WavyLink} from "react-wavy-transitions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceThree, faRightFromBracket, faTachometerAlt, faTh, faThLarge, faThList } from "@fortawesome/free-solid-svg-icons";
export const AdminNav =()=>(
    <nav className="admin_nav">
        <WavyLink to='/adminDashboard' color="#ff44fd">Dashboard</WavyLink>
        <WavyLink to='adminUsers' color="#ff44fd">Users</WavyLink>
        <WavyLink to='adminJobs' color="#ff44fd">Jobs</WavyLink>
        <WavyLink to='adminApplications' color="#ff44fd">Applications</WavyLink>
        <WavyLink to='/' color="#ff44fd"><FontAwesomeIcon icon={faRightFromBracket}/>Exit</WavyLink>


    </nav>
);