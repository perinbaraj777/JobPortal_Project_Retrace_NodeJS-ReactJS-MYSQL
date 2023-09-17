
import './App.css';

import { Homepage } from './components/homepage/homepage';
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Userlogin} from './components/homepage/signup_and_login/user_login'
import {Employerlogin} from './components/homepage/signup_and_login/employer_login';
import { Employersignup } from './components/homepage/signup_and_login/employer_signup';
import { LandingPage } from './components/landingiPage';
// import { EmployerLandingPage } from './components/employer_landingPage';
import EmployerLandingPage from './components/employer_landingPage';
import Usersignup from './components/homepage/signup_and_login/user_signup';

function App() {
  return (
    <>
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Homepage/>}/>
      
      <Route path='/user_login' element={<Userlogin/>}/>
      <Route path="/user_signup" element={ <Usersignup/>}/>
      <Route path="/employer_login" element={<Employerlogin/>}/>
      <Route path="/employer_signup" element={<Employersignup/>}/>
      <Route path="/landingpage" element={<LandingPage/>}/>
     <Route path="/employerLandingpage" element={<EmployerLandingPage/>}/>
     
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
