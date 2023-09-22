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
  const [name,setName]=useState('');             //loged  in employer name
const [id,setId]=useState('')           //useState for storing the employerid  and send as a prop to the application form and store in (postedby state)

  axios.defaults.withCredentials=true; //from login page
//to get the employer name  and id decoded from the cookies
  useEffect(()=>{
    axios.get('http://localhost:8000/').then(res=>{
      if(res.data.status==="success"){
        setAuth(true);
        setName(res.data.name)
        setId(res.data.id)
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

  ///handling the back button in joblisting component by call back function
  const handleJobListingBackButton=()=>{
    setShowPostedJobs(false);
  }

  //handling the back button in the jobApplication component  by using the callback function
  const handleJobApplicationFormBackButton = ()=>{
    setShowApplicationForm(false);
  }
  return (
   <div>
    {
      auth ? 

    <div>          
      {showApplicationForm ? (
        <JobApplicationForm id={id} backButton={handleJobApplicationFormBackButton} />  //id prop from the employerFunction component //back button call back function
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
        <JobListing id={id} backButton={handleJobListingBackButton} />  //id is a from employer function for listing the loged in employer id =loged in employer id from the cookie
      ) : (
        <>
        <div className="container alert alert-success p-3">
        <h2>view jobs</h2>
        <button onClick={handleShowJobsClick}  className="alert alert-danger">VIEW</button>
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

const JobListing =({id,backButton})=>{
   
  const [employerId, setEmployerId] =useState(id) ;
  const [jobs, setJobs] = useState([]);
  const [showTableHead,setShowTableHead]=useState(false);

  const fetchJobs = () => {
    fetch(`http://localhost:8000/jobs?employerId=${employerId}`)
      .then((response) => response.json())
      .then((data) =>{        
        if(data.status==="none"){
          alert("you haven't posted any jobs")
        }else{
          setShowTableHead(true);
          setJobs(data)
        }
       
      } )
      .catch((error) => console.error('Error fetching data: ' + error));
  };

  
  

  //update job
  //this state stores the jobid of  the selected job to be updated
  const [selectedJobId, setSelectedJobId] = useState(null);
  //creating a state to store the data of the job need to update with
const [updateJobData, setUpdateJobData] = useState({
  jobType: "",
  jobTitle: "",
  jobDescription: "",
  jobLocation: "",
});


  
  
  

 // Function for  delete a job from job listing in employer landing page
 const handleDeleteJob = async (jobId) => {
  try {
    // passig  the jobid as params to the backend
    const response = await axios.delete(`http://localhost:8000/jobs/delete/${jobId}`);
    if (response.data.status === "success") {
      alert(`job ${jobId} is successfully  deleted`);
      // fetchJobs function is called here to refresh the job list after successful deletion
      fetchJobs();
    } else {
      alert(`Failed to delete job with ID ${jobId}`);
    }
  } catch (error) {
    console.error('Error deleting job:', error);
  }
};

  return (
    <>
    {selectedJobId !== null ? (
      <JobUpdateForm
        jobId={selectedJobId}  ///jobId is moved to the update form 
        jobData={updateJobData}
        onUpdated={() => {
          setSelectedJobId(null);
          fetchJobs(); // Refresh job listings
        }}
        onCancel={() => {
          setSelectedJobId(null);
        }}
      />
    ) : (
      // Render the job list here
   
    
    <div className="container text-center alert alert-dark">
      <h1>Job Details</h1>
     <h3>EMPLOYER ID:   {employerId}</h3> 
     <div className="p-2 m-2">
        <button onClick={fetchJobs} className="bg-warning">MY POST'S</button>
        <button  className="ms-2 bg-danger" onClick={backButton}>Back</button>
        </div>
        {showTableHead &&
      <table className="table table-hover container alert alert-primary">
        <thead>
          <tr>
          <th  scope="col">#</th>
            <th  scope="col"> JOB ID</th>
            <th  scope="col">category</th>
            <th  scope="col">Title</th>

            <th  scope="col">Description</th>
            <th  scope="col">Location</th>
            <th scope="col">Actions</th>

          
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
              <td >
         <button className="bg-primary" onClick={() =>{setSelectedJobId(job.job_id);
       setUpdateJobData({jobType: job.job_type,
      jobTitle: job.job_title,
      jobDescription: job.job_description,
      jobLocation: job.location
    } )}}>Update</button>
                  <button className="m-1 bg-danger" onClick={() => handleDeleteJob(job.job_id)}>Delete</button>
                </td>  </tr>
          ))}
        </tbody>        
      </table>      
      }
    </div>
    )}
    </>
  );
  
}




// Job Application Form Component
const JobApplicationForm = ({id,backButton}) => {
    // creating a state to set weather the job application is successfully submitted or not if true display only the message(successful)
    const [isSubmitted, setIsSubmitted] = useState(false);
//creating state for storing the form data
    const [formData,setFormData]=useState({
        jobType:"",
        jobTitle:"",
        jobDescription:"",
        jobLocation:"",
        postedBy:id
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
            <tr>  <td>  <h3>Employer Id:{formData.postedBy}</h3></td><td></td></tr>

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
      <button onClick= {backButton}>Back</button>
      </table>
     

    </form>
   
    </>
  );
};



//job update form
const JobUpdateForm = ({ jobId, jobData, onUpdated, onCancel }) => {
  const [updatedJobData, setUpdatedJobData] = useState(jobData);

  const handleChange = (e) => {
    setUpdatedJobData({...updatedJobData,[e.target.name]: e.target.value,});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/jobs/update/${jobId}`,
        updatedJobData
      );

      if (response.data.status === "success") {
        alert(`Job ID ${jobId}  is Successfully updated `);
        onUpdated(); // Callback to refresh job listings
      } else {
        alert(`Failed to update job with ID ${jobId}`);
      }
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div className="container alert alert-info">
      <h2>Update Job Form</h2>
      <p>please enter the correct data in the corresponding field</p>
      <form onSubmit={handleSubmit}>
        <table className="table alert alert-dark container ">
          <tbody>
          <tr>
    <td> <label>Job Category:</label></td>
    <td> <select name="jobType" value={updatedJobData.jobType} onChange={handleChange} >
          <option>choose</option>
          <option>part time</option>
          <option>full time</option>
          <option>contract</option>
          <option>service</option>
          <option>others</option>
        </select></td></tr> 
        
          <tr>
        <td>  <label>Job Title:</label></td>
        <td> <input type="text" name="jobTitle" value={updatedJobData.jobTitle} onChange={handleChange} /></td>
       </tr> 
        <tr>
        <td> <label>Job Description:</label></td>
        <td> <input type="text" name="jobDescription" value={updatedJobData.jobDescription} onChange={handleChange} /></td>
        </tr>
        <tr>
        <td> <label>Job Location:</label></td>
        <td>  <input type="text" name="jobLocation" value={updatedJobData.jobLocation} onChange={handleChange} /></td>
        </tr> 
        <tr>
        <td>  <button type="submit" className="bg-primary">Update</button></td>
        <td><button onClick={onCancel} className="bg-danger">Cancel</button></td></tr> 
        </tbody>
        </table>
      </form>
    </div>
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

    

    