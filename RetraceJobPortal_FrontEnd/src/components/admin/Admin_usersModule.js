import React, { useEffect } from "react";
import {useState} from "react";
import axios from "axios";

export function AdminUserModule(){
//state to store all the user list
    const[adminAllUsers,setAdminAllUsers]= useState([" "]);
    //when the user users module is toggled the users list will be displayed
    useEffect(()=>{
        axios.get("http://localhost:8000/admin/allUsers").then((response)=>{
            setAdminAllUsers(response.data);
            console.log(response.data)
        })
    },[])

    //state to store the  value to be searched 
    const[searchItem,setSearchItem]=useState(" ");
   
  
//state to display search result if searched else all users list
const[searchedUsers,setSearchedUsers]=useState(false);
//state for storing the search result
const[searchedUserResult,setSearchedUserResult]=useState([" "])
//search button functions

const handleSearch = () => {
    //impotant* to remove leading and trailing spaces from the searchItem
    const trimmedSearchItem = searchItem.trim();
  
    if (trimmedSearchItem === "") {
      // If the searchItem is empty, do nothing 
      return;
    }
  
    fetch(`http://localhost:8000/search/users?searchItem=${trimmedSearchItem}`)
      .then((response) => {
        if (!response.ok) {
          console.log("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setSearchedUserResult(data);
        setSearchedUsers(true);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };


  //return button function from the searched result page  
  const handleReturn=()=>{
    setSearchedUsers(false)
  }

  //remove an user id
  const handleDelete=async(userId)=>{
    try{
   await axios.delete(`http://localhost:8000/admin/removeUser/${userId}`).then((response)=>{
        if(response.data.status==="success"){
            //to refresh the user list after  deletion
            axios.get("http://localhost:8000/admin/allUsers").then((response) => {
                setAdminAllUsers(response.data);
                console.log(response.data);
                alert(`deleting user ${userId} `);
                //to refresh the searched user list deletion
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
        {searchedUsers ?
        <div>
             <table className="table table-hover container alert alert-primary">
        <thead>
                <tr className="text-center">
                <th  scope="col">#</th>
                    <th scope="col"> Id</th>
                    <th scope="col">Category </th>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">DOB</th>
                    <th scope="col">City</th>
                    <th scope="col">District</th>
                    <th scope="col">State</th>
                    <th scope="col">Country</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Degree</th>
                    <th scope="col">Password</th>
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
            
                {searchedUserResult.map((users,index)=>(
<tr>
    <th scope="row">{index +1}</th>
    <td>{users.user_id}</td>
    <td>{users.user_type}</td>
    <td>{users.first_name}</td>
    <td>{users.last_name}</td>
    <td>{users.age}</td>
    <td>{users.gender}</td>
    <td>{users.dob}</td>
    <td>{users.city}</td>
    <td>{users.district}</td>
    <td>{users.state}</td>
    <td>{users.nationallity}</td>
    <td>{users.mail_id}</td>
    <td>{users.contact_number}</td>
    <td>{users.qualification}</td>
    <td>{users.user_password}</td>
    <td>{users.status}</td>
    <td>{users.created_by}</td>
    <td>{users.created_on}</td>
    <td>{users.modified_by}</td>
    <td>{users.modified_on}</td>
    <td>{users.effective_from}</td>
    <td>{users.effective_to}</td>
    <td><button className="alert alert-danger" onClick={()=>{handleDelete(users.user_id)}}>Remove</button></td>
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
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">DOB</th>
                    <th scope="col">City</th>
                    <th scope="col">District</th>
                    <th scope="col">State</th>
                    <th scope="col">Country</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Degree</th>
                    <th scope="col">Password</th>
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
                {adminAllUsers.map((users,index)=>(
<tr>
    <th scope="row">{index +1}</th>
    <td>{users.user_id}</td>
    <td>{users.user_type}</td>
    <td>{users.first_name}</td>
    <td>{users.last_name}</td>
    <td>{users.age}</td>
    <td>{users.gender}</td>
    <td>{users.dob}</td>
    <td>{users.city}</td>
    <td>{users.district}</td>
    <td>{users.state}</td>
    <td>{users.nationallity}</td>
    <td>{users.mail_id}</td>
    <td>{users.contact_number}</td>
    <td>{users.qualification}</td>
    <td>{users.user_password}</td>
    <td>{users.status}</td>
    <td>{users.created_by}</td>
    <td>{users.created_on}</td>
    <td>{users.modified_by}</td>
    <td>{users.modified_on}</td>
    <td>{users.effective_from}</td>
    <td>{users.effective_to}</td>
    <td><button className="alert alert-danger" onClick={()=>{handleDelete(users.user_id)}}>Remove</button></td>



</tr>
                ))}
                 </tbody>
        </table>
        </div>
         }
        
        </>
    )
}