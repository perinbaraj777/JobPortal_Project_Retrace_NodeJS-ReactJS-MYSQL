import  React from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export  function Employerlogin(){

    //declaring the navigate
    const navigate =useNavigate();

    const [formData,setFormData]=useState({
        employerMail:"",
        employerPassword:""
    })
    
    const handleChange= (e)=>{
        setFormData({ ...formData,[e.target.name]:e.target.value});
    }
 const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:8000/employerLogin',formData);
    if(response.data.status==="success"){
        alert("Login successfull")
        navigate('/employerLandingpage');
        
               
    }else{
        alert("Login  (please verify the mailId and  password)")
    }
    } catch(error){
        alert("Login failed (please verify the mailId and  password)")
    }
 }
    return(
        <>
        <h1 className="text-center">EMPLOYER LOGIN</h1>
        <div className="container alert alert-success p-5 text-center">
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
            <td><label htmlFor="mail">E-MAIL:</label></td>
            <td><input type="email" id="mail" name="employerMail" value={formData.employerMail} onChange={handleChange}/></td></tr>
            <tr>
            <td><label htmlFor="password">PASSWORD:</label></td>
            <td> <input type="text" id="password" name="employerPassword" value={formData.employerPassword} onChange={handleChange}></input></td><br/>
            </tr>
            
            </tbody>
            </table>
            <button type="submit" className="alert alert-danger p-1" >LOGIN</button>
            </form>
            <h5>Let's create your account</h5>
            <Link to='/employer_signup'><h4 className="text-dark">create an account</h4></Link>
        </div>
        </>
    )
}