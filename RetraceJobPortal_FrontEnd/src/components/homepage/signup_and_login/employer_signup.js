import React from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function Employersignup(){

    const navigate=useNavigate();
    const[formData,setFormData]=useState({
        companyName:'',
        recruiterName:'',
        employerMail:'',
        employerPhone:'',
        employerPassword:''
    });

    const handleChange=(e)=>{
        setFormData({ ...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e)=>{
e.preventDefault();
try{
    const response= await axios.post('http://localhost:8000/employeerRegistration',formData)
    if(response.data.status==="success"){
        alert("registration successful");
        navigate('/employer_login')
    }else{
        alert("registration failed");
    }
    }catch(error){
    console.log(error);
    alert("registration failed");
    }
    }

    return(
        <>
        <h1 className="text-center" >EMPLOYER SIGNUP</h1>
        <div>
            <form onSubmit={handleSubmit}>
            <table className="table container alert alert-info">
                <tbody>
                    
                    <tr>
       <td className="text-center"> <label for='companyname'>COMPANY NAME:</label></td>
       <td >  <input id='companyname' name='companyName' onChange={handleChange} value={formData.companyName} type='text'></input></td>
       </tr>
       <tr>
       <td className="text-center"><label for='recruitername'>RECRUITER NAME:</label></td>
       <td><input type='text' id='recruitername' name='recruiterName' value={formData.recruiterName} onChange={handleChange}></input></td>
</tr>
<tr>
<td className="text-center"><label for='mail'>ENTER MAIL ID:</label></td>
<td ><input type='text' id='mail' value={formData.employerMail} name='employerMail' onChange={handleChange}></input></td>
</tr>
<tr>
<td className="text-center"><label for='phone'>PHONE:</label></td>
<td><input type='number' id='phone' name='employerPhone' value={formData.employerPhone} onChange={handleChange}></input></td>
</tr>
<tr>
<td className="text-center"><label for='password'>PASSWORD:</label></td>
<td><input type='password' id='password' name='employerPassword' value={formData.employerPassword} onChange={handleChange}></input></td>
</tr>
</tbody>
<input type="submit"/>
</table>

</form>
<div className=" alert alert-primary container">
            <p className="text-center">Already have an account</p> <Link to="/employer_login"><h4 className="text-center">LOGIN</h4></Link>
        </div>
        </div>
        </>
    )
}