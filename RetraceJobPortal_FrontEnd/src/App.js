
import './App.css';


import { Homepage } from './components/homepage/homepage';
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter,Routes,Route,Outlet} from 'react-router-dom';
import { BubblyContainer } from 'react-bubbly-transitions';
import { JobSeekers } from './components/homepage/homepage';
import { Employer } from './components/homepage/homepage';
import { Companies } from './components/homepage/homepage';
import { Nav } from './components/homepage/navbar';


import {Userlogin} from './components/homepage/signup_and_login/user_login'
import {Employerlogin} from './components/homepage/signup_and_login/employer_login';
import { Employersignup } from './components/homepage/signup_and_login/employer_signup';
import { LandingPage } from './components/landingiPage';
import EmployerLandingPage from './components/employer_landingPage';
import Usersignup from './components/homepage/signup_and_login/user_signup';



//adminPage
import { WavyContainer } from 'react-wavy-transitions';
import { AdminNav } from './components/admin/AdminNav';
import { AdminMain } from './components/admin/AdminMain';
import '../src/components/admin/admin.css';
import { AdminDashboardModule } from './components/admin/Admin_dashboard';
import { AdminUserModule } from './components/admin/Admin_usersModule';
import { AdminJobApplicationModule } from './components/admin/Admin_jobApplications';
import { AdminJobsModule } from './components/admin/Admin _jobsModule';



function App() {
  return (
    <>
   
    <BrowserRouter>
    <BubblyContainer/>
    <WavyContainer/>
    <Routes>
      <Route path='/' element={[<Nav/>,<Outlet/>]}>
        <Route index element={<Homepage/>}/>
        <Route path='jobSeekers' element={<JobSeekers/>}/>
        <Route path='employer' element={<Employer/>}/>
        <Route path='companies' element={<Companies/>}/>
        <Route path='*' element={<>No Match</>}/>

      </Route>


      <Route path='adminDashboard' element={[<AdminNav/>,<AdminMain/>]}>
        <Route index element={< AdminDashboardModule/>}/>
        <Route path='adminUsers' element={<AdminUserModule/>}/>
        <Route path='adminJobs' element={<AdminJobsModule/>}/>
        <Route path='adminApplications' element={<AdminJobApplicationModule/>}/>

        <Route path='*' element={<>No Match</>}/>
      </Route>
    
      {/* <Route path="/" element={ <Homepage/>}/>       */}
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
