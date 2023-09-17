import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
       
        <div className="bg-secondary p-5">
        <div className="alert alert-danger text-center container">
        <h1>USER LOGIN</h1>
        <form onSubmit={handleSubmit}>
        <table>
            <tbody>
            <tr>
               
       <td> <label htmlFor='mail'>ENTER MAIL ADDRESS:</label></td>
       <td> <input type="email" id='mail' name="mailId" value={formData.mailId} onChange={handleChange} ></input><br/></td>
       <td></td>
        </tr>
        <tr>        
        <td> <label htmlFor="password">ENTER THE PASSWORD:</label></td>
        <td> <input type="text"  id="password" name='userPassword' value={formData.userPassword} onChange={handleChange}></input></td>
        </tr>
        <tr><td><input type='submit'></input></td></tr>
        </tbody>
        </table>
        </form>
        <h4>Dont have an account</h4>
        <Link to="/user_signup"><h4 className="text-dark">create an new account</h4></Link>
       
        </div>
        </div>
        
        </>
    )
}
