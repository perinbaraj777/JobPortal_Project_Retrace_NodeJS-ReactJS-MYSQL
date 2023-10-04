import  React from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import welcomeloginimage from './images/login-welcome-image.jpg'
import './login_style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
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

    //setting credentials -backend cors
    axios.defaults.withCredentials=true;

 const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:8000/employerLogin',formData)
    if(response.data.status==="success"){
        alert("Login successfull")
        navigate('/employerLandingpage');
        
               
    }else{
        alert(response.data.Error)
    }
    } catch(error){
        // navigate('/employerLandingpage')

        alert("Login failed (please verify the mailId and  password)")
    }
 }
    return(
        <>
              <html>
            <body className="employerloginbody">

           
        <div className="login">
            <div className="avatar">
                      <img src={welcomeloginimage}/>
            </div>
            <h2>Login</h2>
            <h3>Welcome Back </h3>
            
            <form onSubmit={handleSubmit} className="login-form">
                <div className="textbox">
                <input type="text" className="logininput" placeholder="Usermail" name="employerMail" value={formData.employerMail} onChange={handleChange}/>
                <span className="material-symbols-outlined"> <FontAwesomeIcon icon={faUserCircle} /></span>
                </div>
                <div className="textbox">
                <input type="password" className="logininput" placeholder="Password" name="employerPassword" value={formData.employerPassword} onChange={handleChange}></input>            
                <span className="material-symbols-outlined"><FontAwesomeIcon icon={faLock } /></span>

                </div>
                <button type="submit" className="loginbutton">Login</button>
                <Link to='/employer_signup'> <p>Dont have an account!</p></Link>    
                <p>Forgot password?</p>
            </form>
            </div>
            </body>

</html>
        </>
    )
}