
import React, { useEffect } from "react";
import {useState} from "react";
import axios from "axios";

export function  AdminJobsModule(){
//state to store all the job list
    const[adminAllJobs,setAdminAllJobs]= useState([" "]);
    //when the jobs  module is clicked the job list will be displayed
    useEffect(()=>{
        axios.get("http://localhost:8000/admin/allJobs").then((response)=>{
            setAdminAllJobs(response.data);
            console.log(response.data)
        })
    },[])

    //state to store the  value to be searched 
    const[searchItem,setSearchItem]=useState(" ");
   
  
//state to display search result if searched else all job list
const[searchedJobs,setSearchedJobs]=useState(false);
//state for storing the search result
const[searchedJobResult,setSearchedJobResult]=useState([" "])
//search button functions

const handleSearch = () => {
    //impotant* to remove leading and trailing spaces from the searchItem
    const trimmedSearchItem = searchItem.trim();
  
    if (trimmedSearchItem === "") {
      // If the searchItem is empty, do nothing 
      return;
    }
  
    fetch(`http://localhost:8000/admin/search/jobs?searchItem=${trimmedSearchItem}`)
      .then((response) => {
        if (!response.ok) {
          console.log("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setSearchedJobResult(data);
        setSearchedJobs(true);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };


  //return button function from the searched result page  
  const handleReturn=()=>{
    setSearchedJobs(false)
  }

  //remove an job id
  const handleDelete=async(jobId)=>{
    try{
   await axios.delete(`http://localhost:8000/admin/removeJob/${jobId}`).then((response)=>{
        if(response.data.status==="success"){
            //to refresh the job list after  deletion
            axios.get("http://localhost:8000/admin/allJobs").then((response) => {
                setAdminAllJobs(response.data);
                console.log(response.data);
                alert(`deleting user ${jobId} `);
                //to refresh the searched job list  after deletion
           handleSearch();
              });
        }else{
            alert("Failed to delete the user")
        }
    })
}catch(error){
    console.log("Failed to delete the user",error)

}
  }

    return(
        <>
        {searchedJobs ?
        <div>
             <table className="table table-hover container alert alert-primary">
        <thead>
                <tr className="text-center">
                <th  scope="col">#</th>
                    <th scope="col"> Id</th>
                    <th scope="col">Category </th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Location</th>
                    <th scope="col">EmployerId</th>
                     <th scope="col">Status</th>
                    <th scope="col">created_by</th>
                    <th scope="col">created_on</th>
                    <th scope="col">modified_by</th>
                    <th scope="col">modified_on</th>
                    <th scope="col">effective_from</th>
                    <th scope="col">effective_to</th>
                    <th scope="col">Actions</th>

                </tr>
            </thead>
            <tbody>
            
                {searchedJobResult.map((jobs,index)=>(
<tr>
<th scope="row">{index +1}</th>
    <td>{jobs.job_id}</td>
    <td>{jobs.job_type}</td>
    <td>{jobs.job_title}</td>
    <td>{jobs.job_description}</td>
    <td>{jobs.location}</td>
    <td>{jobs.posted_by}</td>   
    <td>{jobs.status}</td>
    <td>{jobs.created_by}</td>
    <td>{jobs.created_on}</td>
    <td>{jobs.modified_by}</td>
    <td>{jobs.modified_on}</td>
    <td>{jobs.effective_from}</td>
    <td>{jobs.effective_to}</td>
    <td><button className="alert alert-danger" onClick={()=>{handleDelete(jobs.job_id)}}>Remove</button></td>
</tr>
                ))}
                 </tbody>
              
        </table>
        <button onClick={handleReturn}>Back</button>
        </div>
         :
       <div>
        <div className="alert alert-info container-fluid">
            <input type="text" name="searchItem" value={searchItem} onChange={(e)=>setSearchItem(e.target.value)}></input> 
            <button onClick={handleSearch}>search</button>
        </div>
        <table className="table table-hover container alert alert-primary container">
        <thead>
                <tr className="text-center">
                <th  scope="col">#</th>
                <th scope="col"> Id</th>
                    <th scope="col">Category </th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Location</th>
                    <th scope="col">EmployerId</th>
                     <th scope="col">Status</th>
                    <th scope="col">created_by</th>
                    <th scope="col">created_on</th>
                    <th scope="col">modified_by</th>
                    <th scope="col">modified_on</th>
                    <th scope="col">effective_from</th>
                    <th scope="col">effective_to</th>
                    <th scope="col">Actions</th>



                </tr>
            </thead>
            <tbody>
                {adminAllJobs.map((jobs,index)=>(
<tr>
    <th scope="row">{index +1}</th>
    <td>{jobs.job_id}</td>
    <td>{jobs.job_type}</td>
    <td>{jobs.job_title}</td>
    <td>{jobs.job_description}</td>
    <td>{jobs.location}</td>
    <td>{jobs.posted_by}</td>   
    <td>{jobs.status}</td>
    <td>{jobs.created_by}</td>
    <td>{jobs.created_on}</td>
    <td>{jobs.modified_by}</td>
    <td>{jobs.modified_on}</td>
    <td>{jobs.effective_from}</td>
    <td>{jobs.effective_to}</td>
    <td><button className="alert alert-danger" onClick={()=>{handleDelete(jobs.job_id)}}>Remove</button></td>



</tr>
                ))}
                 </tbody>
        </table>
        </div>
         }
        
        </>
    )
}