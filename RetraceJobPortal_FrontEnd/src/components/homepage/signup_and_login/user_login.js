import React from "react";
import {Link} from "react-router-dom";
import { BubblyLink } from "react-bubbly-transitions";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import welcomeloginimage from './images/login-welcome-image.jpg'
import './login_style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
export function Userlogin(){
   const[formData,setFormData]=useState({
    mailId:'',
    userPassword:''
   })
   const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
   }

   //to navigate to the landing page "hint:cannot declare the usenavigate component inside a function"
   const navigate= useNavigate();

   //for allowing cookies and accessing it
   axios.defaults.withCredentials=true;

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response= await axios.post('http://localhost:8000/userLogin',formData)
        if (response.data.status === 'success'){
    alert("login successfull");
    navigate('/landingpage');

 }else{
    alert("login failed");
 }
} catch (error) {
    alert('Registration failed (please verify your email and  password) ');
}
};
    return(
        <>

        <html>
            <body className="employerloginbody">

           
        <div className="login">
            <div className="avatar">
                      <img src={welcomeloginimage}/>
            </div>
            <h2>Login</h2>
            <h3>Welcome Back User</h3>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="textbox">
                <input type="text" placeholder="Usermail" name="mailId" value={formData.mailId} onChange={handleChange}/>
                <span className="material-symbols-outlined"> <FontAwesomeIcon icon={faUserCircle} /></span>
                </div>
                <div className="textbox">
                <input type="password" placeholder="Password" name="userPassword" value={formData.userPassword} onChange={handleChange}></input>            
                <span className="material-symbols-outlined"><FontAwesomeIcon icon={faLock } /></span>

                </div>
                <button type="submit" className="loginbutton">Login</button>
                <BubblyLink to='/user_signup' > <p className="signuproute">Dont have an account!</p></BubblyLink>
                <BubblyLink to="/"><p className="signuproute">cancel</p></BubblyLink>

                
            </form>
            </div>
            </body>

</html>
        
        </>
    )
}
