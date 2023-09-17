use retrace;
show tables;
select * from  user_signup;-- 
truncate table ds;
drop table user_signup;-- 

create table user_signup(user_id bigint(20)  primary key auto_increment,
user_type varchar(30),
first_name varchar(30),
last_name varchar(20),
age int(3) check (age>18),
gender varchar(20),
dob date,
city varchar(40),
district varchar(30),
state varchar(30),
nationality varchar(30),
mail_id varchar(30) ,
contact_number bigint(20),
qualification varchar(20),
user_password varchar(20), status varchar(10) ,
created_by varchar(20),
created_on datetime  ,
modified_by varchar(10),
modified_on datetime ,
effective_from date ,
effective_to date
) auto_increment=10000;

create table employer_signup(employer_id bigint(20) primary key auto_increment not null,
empoyer_name varchar(20) not null,
employer_mail varchar(20) not null,
company_name varchar(20) ,
contact_number bigint(20) not null,
employer_password varchar(40) not null,
status varchar(10) ,
created_by varchar(20),
created_on datetime  ,
modified_by varchar(10),
modified_on datetime ,
effective_from date ,
effective_to date )auto_increment=20000;
select * from employer_signup;


create table jobs(job_id bigint primary key auto_increment not null,
job_type varchar(20) not null,
job_title varchar(50) not null,
job_description text ,
location varchar(20) not null,
posted_by bigint not null,
status varchar(10) ,
created_by varchar(20),
created_on datetime  ,
modified_by varchar(10),
modified_on datetime ,
effective_from date ,
effective_to date,
foreign key (posted_by) references employer_signup (employer_id)
 )auto_increment=30000;

select * from jobs;-- 
 
 create table applications(application_id bigint key  auto_increment ,
 applicant_id bigint ,
 applicant_mail  varchar(40)  ,
 application_job_id bigint,
 foreign key (applicant_id) references user_signup (user_id),
 foreign key (application_job_id) references jobs (job_id),
 applicant_resume text ,
 applicant_cover_letter text,
 status varchar(10) ,
created_by varchar(20),
created_on datetime  ,
modified_by varchar(10),
modified_on datetime ,
effective_from date,
effective_to date)auto_increment=40000;
 select * from applications;
 drop table applications;-- 
 
