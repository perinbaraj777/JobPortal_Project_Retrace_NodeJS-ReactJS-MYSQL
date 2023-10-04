import React from 'react';
import namelogo from './namelogo image.png'

import { BubblyLink } from 'react-bubbly-transitions'



export function Homepage(){
   
        
    return(
    <>
   
 <h1>home page</h1>
                              
  




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

        export function JobSeekers (){

                return(
                        <>
                        <h1>this is jobseekers module</h1>
                        <div className='col-lg-12 text-center bg-success' >
<h1 className='text-light'>FIND A JOB</h1>
<BubblyLink to ="/user_signup"><h1 className='text-light'>SIGNUP</h1></BubblyLink>
</div>                                
 <div className='row' >                           

<div className='col-lg-6 text-center' >
         <h1 >Retrace helps the right candidates find you.</h1> 

</div>
</div>
                        </>
                ) }

export function Employer(){
        

        return(
                <>
                <h1>  this is employer module   </h1>
                <div className='col-lg-6 text-center'>
<h1 className=''>POST A JOB</h1>
        <BubblyLink to="/employer_signup">SIGNUP</BubblyLink>
</div>
                </>
        )
}


export function Companies(){

        return(
                <>
                <h1>This is company</h1>
                
                </>
        )
}

