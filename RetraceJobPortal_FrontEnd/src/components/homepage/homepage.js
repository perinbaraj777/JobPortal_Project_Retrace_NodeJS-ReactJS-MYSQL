import React from 'react';
import namelogo from './namelogo image.png'

import { BubblyLink } from 'react-bubbly-transitions'
//images for jobseekers page
import homePageImage1 from './homePageImage1.jpg';
import jobseekerpageImage1 from './jobseekerpageImage1.jpg'
import jobseekerpageGif from './Online world.gif'

import './homepage.css';
//images for employers module
import employerspageImage1 from'./Team goals.gif';
import employerspageImage2 from './Business analytics.gif';


//company module properties
import { useState } from 'react';
import tcsImage from './tcsImage.jpg'
import wiproImage from './wiproImage.jpg'
import accentureImage from './accentureImage.jpg'
import amazonImage from './amazonImage.jpg'
import tataImage from './tataImage.jpg'
import ibmImage from './ibmImage.png'
import techMahindraImage from './techMahindraImage.jpg'

export function Homepage(){
   
        
    return(
    <>
   <div className='homepagebody'>
 <div className='container-fluid row  p-5 m-5'>
        <div className='col-lg-8'>
        <h1>WELCOME TO YOUR PROFFESSIONAL COMMUNITY</h1>
        </div>
        <div className='col-lg-4 '>
                <img src={homePageImage1}/>
        </div>
 </div>
 <div className=' row p-5 m-5'>
        <div className='col-lg-4'>
        <h1>Explore collaborative articles</h1>
        <p className='font-italic'>We’re unlocking community knowledge in a new way. Experts add insights directly 
into each article, started with the help of AI.</p>
        </div>
        
        <div className='col-lg-8'>
    <div className='d-flex flex-wrap'>
      <p className='border border-danger m-2 p-2 rounded'>Marketing</p>
      <p className='border border-danger m-2 p-2 rounded'>Public Administration</p>
      <p className='border border-danger m-2 p-2 rounded'>Healthcare</p>
      <p className='border border-danger m-2 p-2 rounded'>Engineering</p>
      <p className='border border-danger m-2 p-2 rounded'>IT Services</p>
      <p className='border border-danger m-2 p-2 rounded'>Sustainability</p>
      <p className='border border-danger m-2 p-2 rounded'>Business Administration</p>
      <p className='border border-danger m-2 p-2 rounded'>Telecommunications</p>
      <p className='border border-danger m-2 p-2 rounded'>HR Management</p>
    </div>
  </div>
  </div>

  <div className='alert alert-warning row  p-5 m-5'>
        <div className='col-lg-4'>
                <h1>Find the right job or internship for you
SUGGESTED SEARCHES</h1>
        </div>
        <div className='col-lg-8'>
        <div className='d-flex flex-wrap'>
      <p className='border border-danger m-2 p-2 rounded'>Engineering</p>
      <p className='border border-danger m-2 p-2 rounded'> Business Development</p>
      <p className='border border-danger m-2 p-2 rounded'>Finance</p>
      <p className='border border-danger m-2 p-2 rounded'>Retail Associate</p>
      <p className='border border-danger m-2 p-2 rounded'>Customer Service</p>
      <p className='border border-danger m-2 p-2 rounded'>Operations</p>
      <p className='border border-danger m-2 p-2 rounded'>Information Technology</p>
      <p className='border border-danger m-2 p-2 rounded'>Marketing</p>
      <p className='border border-danger m-2 p-2 rounded'>Human Resources</p>
      </div>
 </div>
  </div>

  <div className='row  p-5 m-5'>       
        <div className='col-lg-6'>
               <h1>CHECK OUT WHAT PROFFESSOR HEATHER AUSTINS SAYS ABOUT JOB HUNTING</h1> 
        </div>
        <div className='col-lg-6'>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/h_04pmxmHQc?si=5tfhpp-6_ykB-CTi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
  </div>




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
</div>
        </>
        )}

 export function JobSeekers (){

                return(
                        <>                      
<div className='jobsekerpageBody row'>
        <div >
        <h1 className='text-center mt-5' >Welcome to <mark>Retrace</mark> - Your Gateway to a Brighter Future!</h1>
        <p className='font-italic text-center mt-4 col-lg-12 '>Are you on the hunt for your dream job? Look no further! Retrace is here to guide you on your journey to professional success. Whether you're a recent graduate taking your first steps into the workforce, an experienced professional seeking new challenges, or someone looking to make a 
career change, we've got you covered.</p>

<div className='d-flex justify-content-center'><BubblyLink to ="/user_login "><h1 className='border border-primary rounded bg-primary text-light  mt-3'>LOGIN</h1></BubblyLink></div>
</div>
        <div className='col-lg-6'>
                        <img src={jobseekerpageImage1}/>
        </div>
        <div className='col-lg-6  text-center mt-5 align-middle '>
                <h1>Join Our Thriving Community Today!</h1>
                <p>At Retrace, we believe that every individual deserves a fulfilling career. Let us be your partner in finding the perfect job opportunity that matches your ambitions. Get started now by creating your profile, exploring job listings, and taking the first step toward a brighter future.

<mark>Your dream job is just a click away. Join us today and embark on a journey to professional success!</mark>

</p>
                <BubblyLink to ="/user_signup "><h1 className='border border-primary rounded bg-primary text-light mt-5'>SIGNUP</h1></BubblyLink>
        </div>
        <div className='col-lg-6 '>
                <h1 className='m-4'>Why Choose Retrace?</h1>
                <dl className='m-4'>
                        <dt>Diverse Opportunities: </dt>
                        <dd> Our platform connects you with a wide range of job opportunities from top companies across industries. Explore job listings that match your skills, interests, and career goals.</dd>
                        <dt>User-Friendly Interface:</dt>
                        <dd>Our user-friendly and intuitive interface makes job searching a breeze. Easily filter, search, and apply for jobs that align with your qualifications.</dd>
                        <dt>Personalized Experience:</dt>
                        <dd> Tailor your job search by creating a profile that highlights your skills and experiences. Receive personalized job recommendations based on your preferences.</dd>
                <dt>Community and Networking: </dt>
                <dd>Connect with fellow job seekers, professionals, and mentors through our networking features. Build meaningful relationships that can propel your career forward.</dd>
                </dl>
        </div>
        <div className='col-lg-5 d-flex justify-content-end'>
                <img src={jobseekerpageGif}/>
        </div>
        <section name="footer">
        <footer className='mt-3'>
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

</div>
                        </>
                ) }

export function Employer(){
        

        return(
                <>
                {/* <h1>  this is employer module   </h1>
                <div className='col-lg-6 text-center'>
<h1 className=''>POST A JOB</h1>
        <BubblyLink to="/employer_signup">SIGNUP</BubblyLink>
</div> */}

<div className='employerpageBody row'>
        <div >
        <h1 className='text-center mt-5' >Welcome to <mark>Retrace</mark> - Your Partner in Talent Acquisition!</h1>
        <p className='font-italic text-center mt-4 col-lg-12 '>Are you searching for top-tier talent to drive your company's success? Look no further! Retrace is your go-to platform for finding exceptional candidates who can take your organization to the next level.</p>

<div className='d-flex justify-content-center'><BubblyLink to ="/employer_login"><h1 className='border border-primary rounded bg-primary text-light  mt-3'>LOGIN</h1></BubblyLink></div>
</div>
        <div className='col-lg-6'>
                        <img src={employerspageImage1}/>
        </div>
        <div className='col-lg-6  text-center mt-5 align-middle '>
                <h1>Join Our Network of Successful Employers!</h1>
                <p>At Retrace, we understand that your employees are your most valuable asset. Let us be your partner in finding exceptional talent that drives your organization's growth and success. Get started today by creating your employer profile and posting your job openings.
Discover why leading companies trust Retrace for their hiring needs. Your next superstar employee is just a click away. Join us today and elevate your team to new heights!
</p>
                <BubblyLink to ="/employer_signup"><h1 className='border border-primary rounded bg-primary text-light mt-5'>SIGNUP</h1></BubblyLink>
        </div>
        <div className='col-lg-6 '>
                <h1 className='m-4'>Why Choose Retrace for Your Hiring Needs?</h1>
                <dl className='m-4'>
                          <dt>Access to a Vast Talent Pool:  </dt>
                        <dd>Our platform boasts a diverse and extensive talent pool of qualified professionals spanning various industries and skill sets. Find the perfect candidates to meet your unique requirements.</dd>
                        <dt>Effortless Posting and Recruitment:</dt>
                        <dd> Easily post job listings and manage applications with our streamlined and user-friendly interface. Our platform simplifies the hiring process, saving you time and resources.</dd>
                        <dt>Customized Recruitment:</dt>
                        <dd>Tailor your job postings to attract candidates who align with your company culture and values. Specify skills, experience, and qualifications to find the best match for your organization.</dd>
                <dt>Employer Branding:</dt>
                <dd> Showcase your company's brand and values to prospective employees. A compelling employer profile page helps you stand out and attract top talent.</dd>
                </dl>
        </div>
        <div className='col-lg-5 d-flex justify-content-end'>
                <img src={employerspageImage2}/>
        </div>
        <section name="footer">
        <footer className='mt-3'>
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

</div>
                </>
        )
}


export function Companies(){
        
        //declaring a variable card to store the companies images
        const cards=[
                {
                        header:"TCS",
                        image:tcsImage
                },
                {
                        header:"WIPRO",
                        image:wiproImage
                },
                {
                        header:"AMAZON",
                        image:amazonImage
                },
                {
                        header:"ACCENTURE",
                        image:accentureImage
                },
                {
                        header:"TATA",
                        image:tataImage
                },
                {
                        header:"IBM",
                        image:ibmImage
                },
                {
                        header:"Tech Mahindra",
                        image:techMahindraImage
                },

        ];
        
       const [active,setActive]=useState(0);

        return(
                <>
                <section className='accordinSection'>
                        {cards.map((card,index)=>(
                                <article
                                key={card.image}
                                className={
                                
                                        active === index
                                        ? "active"
                                        :""
                                }
                                onClick={()=>setActive(index)}
                                >
                                        <img src={card.image} className='accordinImage'/>
                                        <div className='content'>
                                                
                                                <div>
                                                        <h2 className="accordinh2">{card.header}</h2>
                                                       
                                                </div>
                                        </div>
                                </article>
                        ))}
                </section>
                <footer className='mt-3'>
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
                </>
        )
}

