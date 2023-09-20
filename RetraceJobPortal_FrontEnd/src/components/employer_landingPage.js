import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


// Job Listing Component
const Employerfunctions = () => {
    //creating a state to hide the application form if state is false
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const [showPostedJobs,setShowPostedJobs]=useState(false);

//user authorized or not function with logout in employer landing page
const [auth,setAuth]=useState(false);
  const [message,setMessage]=useState('');
  const [name,setName]=useState('');

  axios.defaults.withCredentials=true; //from login page
//to get the employer name  and id decoded from the cookies
  useEffect(()=>{
    axios.get('http://localhost:8000/').then(res=>{
      if(res.data.status==="success"){
        setAuth(true);
        setName(res.data.name)
      }else{
        setAuth(false);
        setMessage(res.data.error)
      }
    })
    .then(err=>console.log(err));
  },[])

  //for logout a employer when deleted the cookie also should be deleted  and redirect to the login page
  const handleDelete = ()=>{
    axios.get('http://localhost:8000/Logout').then(res=>{
     window.location.reload(true);
  }).catch(err=>console.log(err));
    }


//function to toggle between the state of the application form to true or false by button onclick
  const handleApplyClick = () => {
    setShowApplicationForm(true);
  };

  const handleShowJobsClick=()=>{
    setShowPostedJobs(true);
  }

  
  return (
   <div>
    {
      auth ? 

    <div>          
      {showApplicationForm ? (
        <JobApplicationForm />
      ) : (
        <>
         <h1 className="text-center bg-dark text-light">EMPLOYERS MODULE</h1>
        <div className="container alert alert-warning p-3">
         <h3> WELCOME --{name}</h3>
         <button className="btn btn-danger" onClick={handleDelete}>Logout</button>
        <h2>post a job</h2>
        <button onClick={handleApplyClick} className="alert alert-danger">REGISTER</button>
        </div>
       
        </>
      )}
      <div>
        
      {showPostedJobs ? (
        <JobListing />
      ) : (
        <>
        <div className="container alert alert-success p-3">
        <h2>view jobs</h2>
        <button onClick={handleShowJobsClick} className="alert alert-danger">VIEW</button>
        </div>
       
        </>
      )}

      </div>
      
    </div>
    :
    <div>
    <h3>{message}</h3>
    <h3>Login Now</h3>
    <Link to ='/employer_login' className='btn btn-primary'>Login</Link>
    </div>
     }
     </div>


  );
};

const JobListing =()=>{
   
  const [employerId, setEmployerId] = useState('');
  const [jobs, setJobs] = useState([]);

  const fetchJobs = () => {
    fetch(`http://localhost:8000/jobs?employerId=${employerId}`)
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching data: ' + error));
  };

  return (
    <div className="container text-center alert alert-dark">
      <h1>Job Details</h1>
      <div >
        <label>Employer ID:</label>
        <input
          type="text"
          value={employerId}
          onChange={(e) => setEmployerId(e.target.value)}
        />
        <button onClick={fetchJobs}>Fetch Jobs</button>
      </div>
      <table className="table table-hover container alert alert-primary">
        <thead>
          <tr>
          <th  scope="col">#</th>
            <th  scope="col"> JOB ID</th>
            <th  scope="col">category</th>
            <th  scope="col">Title</th>

            <th  scope="col">Description</th>
            <th  scope="col">Location</th>

          
          </tr>
        </thead>
        <tbody>
                    {/* index is used to give numbering for fetched data */}
          {jobs.map((job,index) => (
            <tr >
               <th scope="row">{index+1}</th>
              <td>{job.job_id}</td>
              <td>{job.job_type}</td>
              <td>{job.job_title}</td>
              <td>{job.job_description}</td>
              <td>{job.location}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




// Job Application Form Component
const JobApplicationForm = () => {
    // creating a state to set weather the job application is successfully submitted or not if true display only the message(successful)
    const [isSubmitted, setIsSubmitted] = useState(false);
//creating state for storing the form data
    const [formData,setFormData]=useState({
        jobType:"",
        jobTitle:"",
        jobDescription:"",
        jobLocation:"",
        postedBy:""
    });

    //for storint the data to state when value is added to  the input field
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
    }

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
     const response= await axios.post('http://localhost:8000/createJobs',formData);
   if(response.data.status==="success"){
    
    setIsSubmitted(true);
   }else{
    alert("failed to post the job")
   }
} catch (error) {
    console.error('Error:', error);
  }
  };
  if (isSubmitted==true) {
    // Displaying a success message after submission without application form
    return (
      <div className=" alert alert-success container ">
        <p>Your application has been successfully submitted!</p>
        <p>Thank you for applying </p>
      </div>
    );
  }
//if issubmitted ===false the job application form remains unchanged
  return (
    <>
    
    <form onSubmit={handleSubmit}>
    <h1 className="text-center bg-dark text-light">JOB REGISTRATION FORM</h1>
        <table className="table alert alert-secondary container">
            <thead>
            <tr>  <td>  <label>Employer Id:</label></td><td><input type="number" name="postedBy" value={formData.postedBy} onChange={handleChange}/></td> </tr>

            <tr><td><label>Job Category:</label></td><td><select name="jobType" value={formData.jobType} onChange={handleChange}>
                <option>choose</option>
                <option>part time</option>
                <option>full time</option>
                <option>contract</option>
                <option>service</option>
                <option>others</option>

                </select></td> </tr>
            <tr><td><label>Job Tittle:</label></td><td><input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange}/></td> </tr>
            <tr><td><label>Job description:</label></td> <td><textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange}></textarea></td></tr>

            <tr><td>  <label>location:</label></td><td><input type="text" name="jobLocation" value={formData.jobLocation} onChange={handleChange}/></td> </tr>

      </thead>
      <button type="submit">Submit Application</button>
      </table>
     

    </form>
   
    </>
  );
};

// Main App Component of the employer landing page
const EmployerLandingPage = () => {
 
  return (
    <div>
      <Employerfunctions/>
    </div>
  );
};

export default EmployerLandingPage;

    

    