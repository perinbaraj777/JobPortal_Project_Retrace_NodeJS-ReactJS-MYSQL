const express=require ('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const fileupload = require('express-fileupload');
const database = require('mysql');
const nodeMailer = require('nodemailer');
const {application,request,response}=require('express');
const add = express();
add.use(cors());
add.use(fileupload());
add.use(bodyparser.json());

add.use(express.json());
add.use(express.static('public'));

//node mailer
// var transporter = nodeMailer.createTransport({
//     service:'gmail',
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth:{
//             //Enter the mail id  from which the booking details needed to be send to the owners mail id 
//         user:'sivasekar7737@gmail.com', 
//         pass:'fxxyiheilxgsmeml'
//     }
// }); 
 
// var mailOptions ={
    //     from:'sivasekar7737@gmail.com', 
    //      //considered as the mailid of the owner 
    //     to:'perinbaraj777@gmail.com',  
    //     subject:'user signin successfully',
    //     html:`<p>Signined Successfully:<br>customerid:${userPassword}</p>`,
        
    //     };
    //     transporter.sendMail(mailOptions,function(error,info){
    //             if(error){
    //                 console.log(error);
    //             }
    //             else{
    //                 console.log('E mail sent' + info.response);
    //             }
    //         });

let a = database.createConnection(
    {
    host:"localhost",
    user:"root",
    password:"Root",
    database:"retrace"
    }
)

a.connect(function(error){
    if(error){
        console.log(error); 
    }
    else{
        console.log("DB connected");
    }
}
)





add.post('/userRegistration',(request,response)=>{
console.log(JSON.stringify(request.body));
let{userType,firstName,lastName,age,gender,dob,city,district,state,nationality,mailId,contactNumber,qualification,userPassword}=request.body;

let sql ='insert into user_signup(user_type,first_name,last_name,age,gender,dob,city,district,state,nationality,mail_id,contact_number,qualification,user_password,status,effective_from,effective_to,created_on,created_by,modified_by,modified_on) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,"A",current_date(),"9999-08-07",current_timestamp,"admin","admin",current_timestamp)'
a.query(sql,[userType,firstName,lastName,age,gender,dob,city,district,state,nationality,mailId,contactNumber,qualification,userPassword],(error,result)=>{
    if(error){
        let s={"status":"error"};
        console.log(error);
        response.send(s);
       
        
    }
    else{
        let s={"status":"success"};
        response.send(s);
      
    }
    
    
})
});

//user login api
add.post("/userLogin",(request,response)=>{
    let {mailId,userPassword}=request.body;
    const sql = 'select * from user_signup where mail_id = ? and user_password = ?';
    a.query(sql, [mailId, userPassword], (error, result) => {
      if (error){
        console.log('Error during login:', error);
        response.status(500).json({ status: 'failed', message: 'Login failed' });
      } else {
        if (result.length >= 1) {
            response.status(200).json({ status: 'success', message: 'Login successful' });
        } else {
            response.status(401).json({ status: 'failed', message: 'Login failed' });
        }
      }
    });
})



//api for employeer registration
add.post('/employeerRegistration',(request,response)=>{
console.log(JSON.stringify(request.body))
    let {companyName,recruiterName,employerMail,employerPhone,employerPassword}=request.body;
    const sql='insert into employer_signup(company_name,empoyer_name,employer_mail,contact_number,employer_password,status,created_by,created_on,modified_by,modified_on,effective_from,effective_to)values(?,?,?,?,?,"A","admin",current_date(),"admin",current_timestamp,current_timestamp,"9999-02-12")';
a.query(sql,[companyName,recruiterName,employerMail,employerPhone,employerPassword],(error,result)=>{
    if(error){
        console.log(error);
        response.send({"status":"failed"})
    }else{
        response.send({"status":"success"})
    }
})
})

//api for employer login
add.post('/employerLogin',(request,response)=>{
    let {employerMail,employerPassword}=request.body;
    let sql='select * from employer_signup where employer_mail=? and employer_password=?';
    a.query(sql,[employerMail,employerPassword],(error,result)=>{
       
        //variable for getting the values in the employer table
        const employerData=result[0];

        if(error){
            response.send({"status":"failed"})
        }else{
            if(result.length>1){
                response.status(200).json({status:"success",  message: 'Login successful',employerId:employerData.employer_id})
                

            }else{
                response.send({"status":"failed" , message: 'Login failed'})
            }
        }
    })
});

add.post('/createJobs',(request,response)=>{
    console.log(JSON.stringify(request.body));
    let {jobType,jobTitle,jobDescription,jobLocation,postedBy}=request.body;
    let sql='insert into jobs(job_type,job_title,job_description,location,posted_by,status,created_by,created_on,modified_by,modified_on,effective_from,effective_to) values(?,?,?,?,?,"active","admin",current_timestamp,"admin",current_timestamp,current_date(),"9999-08-08")';
    a.query(sql,[jobType,jobTitle,jobDescription,jobLocation,postedBy],(error,result)=>{
        if(error){
            console.log(error);
            response.send({"status":"failed"})
        }else{
            response.send({"status":"success"})
        }
    })
})

//viewing jobs in the employerlanding page  of a specified employer (not used)
add.get('/employer/jobs', (request, response) => {
    const employerId = request.body.employerId;
  
    a.query('select job_id ,job_type, job_title,job_description,location from jobs where posted_by = ?', [employerId], (error, result) => {
      if (error) {
        console.error('Error fetching jobs:', error);
        response.status(500).json({ error: 'Internal server error' });
      } else {
        response.status(200).json(result); // Return job listings as JSON
      }
    });
  });
  //api for geting the jobs of a employer by employerId as input in employerLandingPage
  add.get('/jobs', (request, response) => {
    const { employerId } = request.query;
    const sql= 'SELECT * FROM jobs WHERE posted_by = ?';
  
    a.query(sql, [employerId], (error, results) => {
      if (error) {
        console.error('Error executing query: ' + error);
        response.status(500).json({ error: 'Internal Server Error' });
      } else {
        response.json(results);
      }
    });
  });

  //api for displaying all jobs in userLanding page
  add.get('/jobs/userLandingPage',(request,response)=>{
    a.query('select * from jobs',(error,result)=>{
        if(error){
            console.log('Error executing query: ' +error);
            response.status(500).json({'internal server Error':error})
        }else{
            response.status(200).json(result)
        };
    })
  })
//job application api in user landing page
  add.post('/job/ApplicationForm',(request,response)=>{
    let {userId,userMail,jobId,resume,coverLetter}=request.body;
    let sql='insert into applications(applicant_id,applicant_mail,application_job_id,applicant_resume,applicant_cover_letter,status,created_by,created_on,modified_by,modified_on,effective_from,effective_to) values(?,?,?,?,?,"submitted","admin",current_timestamp,"admin",current_timestamp,current_date(),"9999-08-08")';
    a.query(sql,[userId,userMail,jobId,resume,coverLetter],(error,result)=>{
        if(error){
            console.log(error);
            response.status(500).json({'internal server error':error})
        }else{
            response.status(200).json({status:"success"})
        }
    })
  })
  

add.listen(8000,()=>{
    
    console.log("server running in 8000 port"); 
})


