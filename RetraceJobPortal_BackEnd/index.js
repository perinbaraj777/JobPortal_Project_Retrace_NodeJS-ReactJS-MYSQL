const express=require ('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const fileupload = require('express-fileupload');
const database = require('mysql');
const nodeMailer = require('nodemailer');
const {application,request,response}=require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt=require('bcrypt');


const add = express();
add.use(cors({
    origin:['http://localhost:3000'],
    methods:['POST','GET','DELETE','PUT'],
    credentials:true
}));

add.use(fileupload());
add.use(bodyparser.json());

add.use(express.json());
add.use(express.static('public'));
add.use(cookieParser());
 
const salt =10;


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
let{userType,firstName,lastName,age,gender,dob,city,district,state,nationality,mailId,contactNumber,qualification,}=request.body;

let sql ='insert into user_signup(user_type,first_name,last_name,age,gender,dob,city,district,state,nationality,mail_id,contact_number,qualification,user_password,status,effective_from,effective_to,created_on,created_by,modified_by,modified_on) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,"A",current_date(),"9999-08-07",current_timestamp,"admin","admin",current_timestamp)'
bcrypt.hash(request.body.userPassword.toString(),salt,(error,hash)=>{
    if(error){
        return response.json({error:"error for hashing password"});
    }

a.query(sql,[userType,firstName,lastName,age,gender,dob,city,district,state,nationality,mailId,contactNumber,qualification,hash],(error,result)=>{
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
})
});



//user login api with password decrypt
add.post("/userLogin",(req,res)=>{
const sql = 'select * from  user_signup where mail_id = ?';
a.query(sql,[req.body.mailId],(err,data)=>{
    if(err) return res.json({Error:"Login error in server"});
    if(data.length > 0) {
        bcrypt.compare(req.body.userPassword.toString(), data[0].user_password,(err,response)=>{
            console.log(response)
            if(err) return res.json({Error:"password compare error"});
            if(response) {
                //get two coloumn values from databse and assign to a single variabele by js string concatination method
                const name = data[0].first_name + ' ' + data[0].last_name;
                const token = jwt.sign({name},"jwt-seceret-key",{expiresIn:"1d"});
                res.cookie('token',token);

                return res.json({status:"success"})                
            }
            else{                
                return res.json({Error:"password not matched"})
            }
        })
            }else{
                return res.json({Error:"no email existed"})
            }
})
});




//api for employeer registration
add.post('/employeerRegistration',(request,response)=>{
console.log(JSON.stringify(request.body))
    let {companyName,recruiterName,employerMail,employerPhone}=request.body;
    const sql='insert into employer_signup(company_name,empoyer_name,employer_mail,contact_number,employer_password,status,created_by,created_on,modified_by,modified_on,effective_from,effective_to)values(?,?,?,?,?,"A","admin",current_date(),"admin",current_timestamp,current_timestamp,"9999-02-12")';
    bcrypt.hash(request.body.employerPassword.toString(),salt,(error,hash)=>{
        if(error){
            return response.json({error:"error for hashing password"});
        }
    
    a.query(sql,[companyName,recruiterName,employerMail,employerPhone,hash],(error,result)=>{
    if(error){
        console.log(error);
        response.send({"status":"failed"})
    }else{
        response.send({"status":"success"})
    }
})
    })
})



//employer login api with  password decrypt() actual)
add.post("/employerLogin",(req,res)=>{
    const sql = 'select * from employer_signup where employer_mail = ?';
    a.query(sql,[req.body.employerMail],(err,data)=>{
        if(err) return res.json({Error:"Login error in server"});
        if(data.length > 0) {
            bcrypt.compare(req.body.employerPassword.toString(), data[0].employer_password,(err,response)=>{
                console.log(response)
                console.log(data)
                if(err) return res.json({Error:"password compare error"});
                if(response) {                    
            const name = data[0].empoyer_name;
            const id = data[0].employer_id;
            const token = jwt.sign({name,id},"jwt-seceret-key",{expiresIn:'1d'});
            res.cookie('token',token);
                    return res.json({status:"success"})                
                }
                else{                
                    return res.json({Error:"password not matched"})
                }
            })
                }else{
                    return res.json({Error:"no email existed"})
                }
    })
    });
    






  //employer login  with user verification by cookies
  const verifyUser=(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json({error:"you are not authenticated  Please login"});
            }else{
                jwt.verify(token,"jwt-seceret-key",(err,decoded)=>{
            if(err){
                return res.json({error:"Token is not ok"});
            }else{
                req.name= decoded.name;
                req.id= decoded.id;
                next();
            }
            })
            }
          }
          //get the token and check for authenticated user or not and decode the employer name from the cookei and pass to the employer landing page
         add.get('/',verifyUser,(req,res)=>{
            return res.json({status:"success",name:req.name,id:req.id});
         }) 
  
         //employer logout api for the logout button in the employer landing page by deleting the cookiee
         add.get('/Logout',(request,response)=>{
            response.clearCookie('token');
            return response.json({status:"success"})
         })


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
        if(results.length <=  0){
            response.send({status:"none"})
        }else{
        response.json(results);
    }
      }
    });
  });

  //updating a job of an employer  from the list in employerlanding page for the update button
  add.put("/jobs/update/:jobId",(request,response)=>{
    let jobId=request.params.jobId;
    let {jobType,jobTitle,jobDescription,jobLocation}= request.body;
    let sql='update jobs set job_type= ?, job_title=?, job_description= ?, location=? where job_id= ? ';
    a.query(sql,[jobType,jobTitle,jobDescription,jobLocation,jobId],(error,result)=>{
        if(error){
            console.log(error);
            response.status(500).json({status:"internal server error"})
        }else{
            response.status(200).json({status:"success"})
        }
    })
  })
  
  //delete jobs of a employer in employer landing page jobs delete button
  add.delete("/jobs/delete/:jobId",(request,response)=>{ 
    const jobId = request.params.jobId;
    const sql = 'DELETE FROM jobs WHERE job_id = ?';
    a.query(sql, [jobId], (error, result) => {
      if (error) {
        console.error('Error in deleting job:', error);
        response.status(500).json({ status: 'failed' });
      } else {
        response.status(200).json({ status: 'success' });
      }
    });
  });
  
  

  //api for displaying all jobs in pagination in userLanding page
  add.get('/jobs/userLandingPage',(req,res)=>{
const page = parseInt(req.query.page) || 1;
//variable storing the limit of jobs to display per page
const itemsPerpage = 5;
const offset = (page - 1) * itemsPerpage;
//fetch and storing total number of jobs in a variable
const countQuery = 'select count(*) as totalCount from jobs';
a.query(countQuery,(countError,countResult)=>{
    if(countError){
        return res.status(500).json({error:"Database error"});

    }
    const totalCount = countResult[0].totalCount;

    //fetching the limited data from database per page
    const sql = 'select * from jobs limit ? offset ?';
    a.query(sql,[itemsPerpage,offset],(error,result)=>{
        if(error){
            return res.status(500).json({error:"Database error"});

        }
        //calculating total number of pages
        const totalPages = Math.ceil(totalCount / itemsPerpage);
    res.json({result,totalPages});
    })
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
  


  //admin page api's
  //get all users details

  add.get('/admin/allUsers',(request,response)=>{
    a.query('select * from user_signup',(error,result)=>{
        if(error){
            console.log(error);
            response.status(500).json({"Internal server Error":error})
        }
        else{
            response.status(200).json(result);
        }

    });

  })

  //search users
  add.get('/search/users',(request,response)=>{
    let searchItem = request.query.searchItem;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             //array(22).fill method is used to fill the searchItem value to the all coloumns and compre and retrive the data which is matched                                               
    a.query('select * from user_signup where user_id like ? or user_type like ? or first_name like ? or last_name like ? or age like ? or gender like ?  or dob like ? or city like ? or district like ? or state like ? or nationality like ? or mail_id like ? or contact_number like ? or qualification like ? or user_password like ? or status=? or effective_from like ? or effective_to like ? or created_on like ? or created_by like ? or modified_by like ? or modified_on like ?',Array(22).fill( '%' + searchItem + '%'),(error,result)=>{
        if(error){
            console.log(error);
            response.status(500).json({"Internal server error":error})
        }else{
            response.status(200).json(result)
        }
    })
  })
//remove user button  api in admin user module
add.delete('/admin/removeUser/:userId',(request,response)=>{
    let userId=request.params.userId;
    a.query('delete from user_signup where user_id= ? ',[userId],(error,result)=>{
        if(error){
            console.log(error);
            response.status(500).json({"Internal server error:":error})
        }else{
            response.status(200).json({status:"success" , message:"data deleted successfully"})
        }
    })
})

//get all jobs details

add.get('/admin/allJobs',(request,response)=>{
    a.query('select * from jobs',(error,result)=>{
        if(error){
            console.log(error);
            response.status(500).json({"Internal server Error":error})
        }
        else{
            response.status(200).json(result);
        }

    });

  })

 //search jobs
 add.get('/admin/search/jobs',(request,response)=>{
    let searchItem = request.query.searchItem;
   
    a.query('select * from jobs where job_id like ? or job_type like ? or job_title like ? or job_description like ? or location like ? or posted_by like ?  or status=? or created_by like ? or  created_on like ? or  modified_by like ? or modified_on like ? or effective_from like ? or effective_to like ?  ',Array(13).fill( '%' + searchItem + '%'),(error,result)=>{
        if(error){
            console.log(error);
            response.status(500).json({"Internal server error":error})
        }else{
            response.status(200).json(result)
        }
    })
  })


  //remove job button  api in admin job module
add.delete('/admin/removeJob/:jobId',(request,response)=>{
    let jobId=request.params.jobId;
    a.query('delete from jobs where job_id= ? ',[jobId],(error,result)=>{
        if(error){
            console.log(error);
            response.status(500).json({"Internal server error:":error})
        }else{
            response.status(200).json({status:"success" , message:"data deleted successfully"})
        }
    })
})

add.listen(8000,()=>{
    
    console.log("server running in 8000 port"); 
})





