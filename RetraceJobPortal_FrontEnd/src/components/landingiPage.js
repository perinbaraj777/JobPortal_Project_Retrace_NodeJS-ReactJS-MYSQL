import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function  LandingPage(){


    
      const [jobs, setJobs] = useState([" "]);

      const[showJobApplicationForm,setShowJobApplicationForm]=useState(false);

      const handleApplyClick =()=>{
        setShowJobApplicationForm(true)
      };

      //pagination 
      const [currentPage,setCurrentPage]=useState(1);
      const [totalPages,setTotalPages] = useState(1);
      
    
      useEffect(() => {
        fetch(`http://localhost:8000/jobs/userLandingPage?page=${currentPage}`)
          .then((response) => response.json())
          
          .then((data) => {
            setJobs(data.result);
            setTotalPages(data.totalPages);
      })
          .catch((error) => console.error('Error fetching data: ' + error));
      }, [currentPage]);

      //handling the previous and next page 
      const handlePreviousPage = ()=>{
        if(currentPage > 1){
          setCurrentPage(currentPage - 1);
        }
      };

      const handleNextPage = ()=>{
        if(currentPage < totalPages){
          setCurrentPage(currentPage + 1);
        }
      };

      //for verifying the logged in user is aurthorzed or not
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
    
     
      //for user logout 
      const handleDelete = ()=>{
        axios.get('http://localhost:8000/Logout').then(res=>{
         window.location.reload(true);
      }).catch(err=>console.log(err));
        }

        
    
      
      return (
        <div>
        { auth ? 
    
        <div>
            {showJobApplicationForm ?(
                <JobApplicationForm />
            ):(
                <>
          <h1>RETRACE</h1>
          <h2>WELCOME-- {name}</h2>
          <button className="btn btn-danger" onClick={handleDelete}>Logout</button>

          <div className=" container-fluid alert alert-danger p-2 ">
            <input type="text" className="m-2 text-center"/>
            <button>search</button>
          </div>
          <div >
          {jobs.map((job) => (
            <div key={job.id} className="container p-3 ">
                <div className="alert alert-primary p-3">
              <h2> {job.job_title}</h2>
              <h4>job Id:{job.job_id}</h4>
              <h3>{job.location}</h3>
              <p>{job.job_description}</p>
              <button onClick={() => handleApplyClick(job.job_id)}>Apply</button>
            </div>
            </div>
          ))}
           <div className="pagination">
      <button onClick={handlePreviousPage} disabled={currentPage === 1}> Previous Page</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}> Next Page </button>
   </div>
   </div>
          </>
          )}
        </div>
       :
       <div>
   <h3>{message}</h3>
    <h3>Login Now</h3>
    <Link to ='/user_login' className='btn btn-primary'>Login</Link>
        </div>
      }
      </div>
      );
    }

   const JobApplicationForm =()=>{

    const[isSubmitted,setIsSubmitted]=useState(false);
    
    const[formData,setFormData]=useState({ 
    userId:"",
    userMail:"",
    jobId:"",
    resume:"",
    coverLetter:""
    })

    const handleChange=(e)=>{
setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response= await axios.post('http://localhost:8000/job/ApplicationForm',formData);

        if(response.data.status==="success"){ 
            alert('your application has been sent successfully')   
            setIsSubmitted(true);
           }else{
            alert('failed to apply please try again after')   
        //     alert("failed to post the job")
           }
        } catch (error) {
            console.error('Error:', error);
          }
          };
          if (isSubmitted==true) {
            // Displaying a success message after submission without application form
            return (
              <div className="container alert alert-success">
                <p>Your application has been successfully submitted!</p>
                <p>Thank you for applying </p>
              </div>
            );
          }else{

          return(
            <>
            <form onSubmit={handleSubmit}>
                <table className="table alert alert-info container">
                    <thead>
                        <th className="text-center"> JOB APPLICATION FORM</th>
                    </thead>

                        <tbody>
                        <tr>
                            <td className="text-center"><label>ENTER USER ID:</label></td> <td><input type="text" name="userId" value={formData.userId} onChange={handleChange}></input></td>
                        </tr>
                        <tr>
                            <td className="text-center"><label>ENTER MAIL ID:</label> </td><td><input type="text" name="userMail" value={formData.userMail} onChange={handleChange}></input></td>
                        </tr>
                        <tr>
                            <td className="text-center"><label>ENTER JOB ID:</label></td> <td><input type="text" name="jobId" value={formData.jobId} onChange={handleChange}></input></td>
                        </tr>
                        <tr>
                            <td className="text-center"><label>UPLOAD RESUME:</label></td> <td><input type="file" name="resume" value={formData.resume} onChange={handleChange}></input></td>
                        </tr>
                        <tr>
                            <td className="text-center"><label>COVER LETTER:</label> </td><td><textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange}></textarea></td>
                        </tr>
                        <tr>
                            <td className="text-center">  <button type="submit">APPLY</button></td>
                        <td></td>
                        </tr>
                        </tbody>
                </table>
            
              
            </form>
            </>
          )
    
        }
   }
    

    
