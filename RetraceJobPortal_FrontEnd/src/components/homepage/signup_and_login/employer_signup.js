import React from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../namelogo image.png';
import './signup_style.css';

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
                
        <div className="signupformBody">
            <div className="signupbackground"></div>
            <div className="signupcard">
                <img className="signuplogo" src={logo}></img>
                <h2>Create Account</h2>
                <form  className="signupform" onSubmit={handleSubmit}>
                    
                 <input  type="text " placeholder="COMPANY NAME" className="signupinput"  name='companyName' onChange={handleChange} value={formData.companyName} />
                    <input type="text " placeholder="RECRUITER NAME" className="signupinput" name='recruiterName' value={formData.recruiterName} onChange={handleChange}/>
                    <input type="text " placeholder=" MAIL ID" className="signupinput" name='employerMail' onChange={handleChange}/>
                    <input type="text " placeholder="PHONE" className="signupinput"  name='employerPhone' value={formData.employerPhone} onChange={handleChange}/>
                    <input type="text " placeholder="PASSWORD" className="signupinput"  name='employerPassword' value={formData.employerPassword} onChange={handleChange}/>
                    <button type="submit" className="signupbutton">Sign Up</button>
                </form>
                <footer className="signupfooter">
                    Existing user
                    <Link to="/employer_login"><p className="text-center">Login Here</p></Link>

                </footer>
            </div>
           
            
             
        </div>
        </>
    )
}