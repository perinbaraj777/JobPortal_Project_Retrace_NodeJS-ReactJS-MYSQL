import React from "react";
import {useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom"

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
         <section name="userSignupForm">
         <div className='container alert alert-info' id="usersignup">
         <h1 className='text-center'>USER REGISTRATION</h1>
      <form onSubmit={handleSubmit}>
      <table>
                        <tr><td>
         <label for="userType">USER TYPE:</label></td>
       <td>  <select name='userType' value={formData.userType} onChange={handleChange}>
                <option value="choose">choose</option> 
                 <option value="student">student</option>    
                 <option value="graduate">graduate</option> 
                <option value="others">others</option>           
                
         </select></td></tr>
         <tr>
     <td><label for="firstname">FIRST NAME:</label></td>
       <td><input type="text" id="firstname" name="firstName" value={formData.firstName} onChange={handleChange}/></td></tr> 

       <tr>
     <td><label for="lastname">LAST NAME:</label></td>
       <td><input type="text" id="lastname" name="lastName" value={formData.lastNameName} onChange={handleChange}/></td></tr> 

       <tr>
     <td><label for="age">AGE:</label></td>
       <td><input type="number" id="age" name="age" value={formData.age} onChange={handleChange}/></td></tr> 

       <tr>
     <td><label for="gender">GENDER:</label></td>
       <td><input type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange}/></td></tr> 

       <tr><td><label for="dob">DATE OF BIRTH:</label></td>
         <td> <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange}/></td></tr> 

         <tr>
     <td><label for="city">CITY:</label></td>
       <td><input type="text" id="city" name="city" value={formData.city} onChange={handleChange}/></td></tr> 
       <tr>
     <td><label for="district">DISTRICT:</label></td>
       <td><input type="text" id="district" name="district" value={formData.district} onChange={handleChange}/></td></tr> 
       <tr>
     <td><label for="state">STATE:</label></td>
       <td><input type="text" id="state" name="state" value={formData.state} onChange={handleChange}/></td></tr> 
       <tr>
     <td><label for="nationality">NATIONALITY:</label></td>
       <td><input type="text" id="nationality" name="nationality" value={formData.nationality} onChange={handleChange}/></td></tr> 
       <tr><td><label for="mailId">EMAIL ID:</label></td>
         <td> <input type="email" id="mailId" name="mailId" onChange={handleChange} value={formData.mailId}/></td></tr> 
         <tr>
     <td><label for="contactNumber">MOBILE NUMBER:</label></td>
       <td><input type="number" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange}/></td></tr> 
       <tr>
     <td><label for="qualification">QUALIFICATION:</label></td>
       <td><input type="text" id="qualification" name="qualification" value={formData.qualification} onChange={handleChange}/></td></tr> 
       <tr>
     <td><label for="userPassword">PASSWORD:</label></td>
       <td><input type="password" id="userPassword" name="userPassword" value={formData.userPassword} onChange={handleChange}/></td></tr> 

       <button type="submit" className="text-center">Register</button>
</table>
      
      </form>
      <Link to="/user_login"><h4 className="text-dark text-center">Already have an account?login</h4> </Link>
      </div>
      </section>
    </div>
  );
};

export default Usersignup;
