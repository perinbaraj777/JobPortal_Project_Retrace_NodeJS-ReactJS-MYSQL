import React from "react";
import {useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { BubblyLink } from "react-bubbly-transitions";
import {useNavigate} from "react-router-dom";
import logo from '../namelogo image.png';
import './signup_style.css';

// export function Usersignup(){
         


const Usersignup = () => {
  const [formData, setFormData] = useState({
        userType:'choose',
        firstName:'',
        lastName:'',
        age:'',
        gender:'',
        dob:'',
        city:'',
        district:'',
        state:'',
        nationality:'',
        mailId:'',
        contactNumber:'',
        qualification:'',
        userPassword:''
         });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  //to navigate  to the login page if registration is successful useNavigate is used
  const navigate= useNavigate();

//using asynchronous function for the registration method
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response= await axios.post('http://localhost:8000/userRegistration', formData)
        if (response.data.status === 'success') {
                alert('Registration successful');
                navigate('/user_login')
              } else {
                alert('Registration failed');
              }
      
    } catch (error) {
       
      alert('Registration failed');
    }
  };

  return (
    <div>
       
      <div className="signupformBody">
            <div className="signupbackground"></div>
            <div className="signupcard">
                <img className="signuplogo" src={logo}></img>
                <h2>Create Account</h2>
                <form  className="signupform" onSubmit={handleSubmit}>
                <input  type="text " placeholder="User Type:"   disabled className="signupselect"  name='companyName' onChange={handleChange} value={formData.companyName} />
                <select name='userType' value={formData.userType} onChange={handleChange}  className="signupinput">
                <option value="">choose</option> 
                 <option value="student">student</option>    
                 <option value="graduate">graduate</option> 
                <option value="others">others</option>           
                
         </select>
                    
                 <input  type="text " placeholder="FIRST NAME" className="signupinput"   name="firstName" value={formData.firstName} onChange={handleChange} />
                    <input type="text " placeholder="LAST NAME" className="signupinput" name="lastName" value={formData.lastNameName} onChange={handleChange}/>
                    <input type="text " placeholder=" AGE" className="signupinput" name="age" value={formData.age} onChange={handleChange}/>
                    <input type="text " placeholder="GENDER" className="signupinput"  name="gender" value={formData.gender} onChange={handleChange}/>
                    <input type="date " placeholder="DATE OF BIRTH" className="signupinput"  name="dob" value={formData.dob} onChange={handleChange}/>
                    <input type="text " placeholder="CITY" className="signupinput"  name="city" value={formData.city} onChange={handleChange}/>
                    <input type="text " placeholder="DISTRICT" className="signupinput"  name="district" value={formData.district} onChange={handleChange}/>
                    <input type="text " placeholder="STATE" className="signupinput" name="state" value={formData.state} onChange={handleChange}/>
                    <input type="text " placeholder="NATIONALITY" className="signupinput" name="nationality" value={formData.nationality} onChange={handleChange}/>
                    <input type="email " placeholder="EMAIL ID" className="signupinput"  name="mailId" onChange={handleChange} value={formData.mailId}/>
                    <input type="number " placeholder=" MOBILE NUMBER" className="signupinput"  name="contactNumber" value={formData.contactNumber} onChange={handleChange}/>
                    <input type="text " placeholder="QUALIFICATION" className="signupinput" name="qualification" value={formData.qualification} onChange={handleChange}/>
                    <input type="text " placeholder="PASSWORD" className="signupinput" name="userPassword" value={formData.userPassword} onChange={handleChange}/>
                    <button type="submit" className="signupbutton">Register</button>
                </form>
                <footer className="signupfooter">
                    Existing user
                    <BubblyLink to="/user_login"><p className="text-center">Login Here</p></BubblyLink><br/>
                    <BubblyLink to="/"><p className="text-center">cancel</p></BubblyLink>

                </footer>
            </div>
           
            
             
        </div>
    </div>
  );
};

export default Usersignup;
