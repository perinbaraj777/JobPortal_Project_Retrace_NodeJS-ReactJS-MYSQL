import React from 'react';
import './homepage.css';
import namelogo from './namelogo image.png'
import about_image1 from './about_image.png'
import { Link } from 'react-router-dom';



export function Homepage(){
   
        
    return(
    <>
       {/* title */}
<section name="navbar">
<nav class="navbar navbar-expand-lg navbar-light bg-warning p-3">
  {/* <a class="navbar-brand" href="#">Navbar</a> */}
  <img src={namelogo} width="150px" height="60px"/>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-link active" href="about">About Us</a> 
      <a  class="nav-link" href="#">jobs</a>     
      <a  class="nav-link" href="#">Companies</a>
      <a class="nav-link">Services</a>
      <button className='navloginbutton'>LOGIN</button>
      <button class="nav-link">Register</button>
      <select><option> <a class="nav-link" href="#">For Employers</a></option>
     
      <option>Employer login</option>
      <option>post a job</option>
      </select>

    </div>
  </div>
</nav>
</section>

        <div className="title">
            <h1 className='text-center'>RETRACE</h1>
            <h3 className='text-center'>The Easiest Way To Get A New job</h3>



 
                                 {/* signup                */}

 <div className='col-lg-12 text-center bg-success' >
<h1 className='text-light'>FIND A JOB</h1>
 <Link to="/user_signup"><h1 className='text-light'>SIGNUP</h1></Link>
</div>                                
 <div className='row' >                                 

<div className='col-lg-6 text-center' >
         <h1 >Retrace helps the right candidates find you.</h1> 

</div>
<div className='col-lg-6 text-center'>
<h1 className=''>POST A JOB</h1>
        <Link to="/employer_signup">SIGNUP</Link>
</div>
</div>
        </div> 

<section name="about">
        <div className='row'>
                <div className='col-lg-6'>
                <h1>About Retrace</h1>
                <p>Indeed is the #1 job site in the world1 with over 300M unique visitors
 every month2. Indeed strives to put job seekers first, giving them free access to 
 search for jobs, post resumes, and research companies. Every day, we connect millions 
 of people to new opportunities.

Please note that Indeed and its affiliates are directly or indirectly owned by a publicly traded Japanese parent company, Recruit Holdings Co., Ltd.</p>
                </div>
                <div className='col-lg-6' >
                        <img src={about_image1} width="700px" height="700px"/>
                        </div>
        </div>
</section>


<section name="footer">
        <footer>
        <div className='row bg-dark text-light'>
               <div className='col-lg-3'>
               <img src={namelogo} width="150px" height="60px"/>
               <h5>contact us with</h5>
               
               </div>
               <div className='col-lg-3'>
                <p>About us</p>
                <p>Careers</p>
                <p>Employer home</p>
                <p>Sitemap</p>
               </div>

               <div className='col-lg-3'>
               <p>Help center</p>  
               <p>Summons/Notices</p>
               <p>Grievances</p>
               <p>Report issue</p>
               </div>

               <div className='col-lg-3'>
                <p>Privacy policy</p>
                <p>Terms & conditions</p>
                <p>Fraud alert</p>
                <p>Trust & safety</p>
               </div>   
               <hr/>     
        </div>
</footer>
</section>
        </>
        )}
