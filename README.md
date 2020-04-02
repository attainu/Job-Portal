# Job-Portal
Project done by Siddhida and Harish Ponna

# Contributors
* Harish Ponna
* Siddhida
  
## Users of Application

 |Role   |  Rights   |
 |------ | ----------|------
 |API Generator| Maintenance of API |
 |App Administrator | Keep an eye on users activity, Block the unwanted ones|
 |Job Provider | Post jobs, Delete Jobs, Update Jobs, Update Profile, Photo Upload, change password, Forgot Password, view all posted Jobs, view all opted out Jobs|
 |Job Seeker | Accept Jobs, Update Profile, Upload Profile Pic, Reset Password, Forgot Password, view all available jobs, view all accomplished jobs|

 ### End Points of APIs

 1. PROVIDER's ROUTES  

       * Registering Provider Account
              POST http://localhost:8080/api/user/register

       *  Provider Account Activation
                GET http://localhost:8080/api/accountactivation/{Activation-Token}?user={Role}

       * Logging into Provider Account
                POST http://localhost:8080/api/user/login/

       * Posting a job by provider
                POST http://localhost:8080/api/jobprovider/postingjob

       * Showing provider his own posted jobs
                GET http://localhost:8080/api/jobprovider/jobspostedtilldate/{Page Number}/

       * Job updation by Provider Account
                PATCH http://localhost:8080/api/jobprovider/udpatingjob/{Job Id}/
 
       *  Job Deletion by Provider
                DELETE http://localhost:8080/api/jobprovider/deletingjob/{Job Id}/

       * Uploading Profile Picture
                PATCH http://localhost:8080/api/jobprovider/uploadprofilepicture

       * udpating profile
                PATCH http://localhost:8080/api/jobprovider/editprofile


       * updating editing  password 
                PATCH http://localhost:8080/api/jobprovider/editpassword

       * Logging out from Provider Account
                DELETE http://localhost:8080/api/jobprovider/logout/


       * forgot passsword sending system generated password
                POST http://localhost:8080/api/user/forgotpassword


 2. SEEKER's ROUTES  

       * Register Seeker Account
                POST http://localhost:8080/api/user/register

       * Account Activation
                GET http://localhost:8080/api/accountactivation/{Activation Token}?user=
                {Role}


       * Login into Seeker Account
                POST http://localhost:8080/api/user/login

       * showing all jobs which are available
                GET http://localhost:8080/api/jobseeker/searchjobs/allavailablejobs/{Page Number}/


       * filtering jobs by category of hourly, daily, weekly, monthly
                GET http://localhost:8080/api/jobseeker/searchjobs/filter/{Page Number}?category={Hourly/Daily/Weekly/Monthly}


       * showing single job by jobId
                GET http://localhost:8080/api/jobseeker/searchjobs/byjobId/{Job Id}/


       * Job Accepting by Seeker
            PATCH http://localhost:8080/api/jobseeker/searchjobs/byjobid/{Job Id}/isaccepted

       * showing jobs accepted by seeker till date
            GET http://localhost:8080/api/jobseeker/jobsacceptedtilldate/{Page Number}

       *  Uploading Profile Picture
            PATCH http://localhost:8080/api/jobseeker/uploadprofilepicture

       * udpating profile
            PATCH http://localhost:8080/api/jobseeker/editprofile

       * Edit password
            PATCH http://localhost:8080/api/jobseeker/editpassword


       * Logging out from Seeker Account
            DELETE http://localhost:8080/api/jobseeker/logout

       * forgot passsword sending system generated password
            POST http://localhost:8080/api/user/forgotpassword

3.  Admin Routes 

       * Logging In from App Administrator Account
            POST http://localhost:8080/api/user/login

       * view all available(including blocked) jobs
            GET http://localhost:8080/api/admin/allavailablejobs/{Page Number}

       * view all accepted jobs
            GET http://localhost:8080/api/admin/allacceptedjobs/{Page Number}

       * view all Providers
            GET http://localhost:8080/api/admin/allproviders/{Page Number}

       * view all seekers
            GET http://localhost:8080/api/admin/allseekers/1

       * Blocking Unwanted App User(s) or Unwanted Job(s)
            PATCH http://localhost:8080/api/admin/{User/Job Id}/isblocked/?model={Role}

       * logout from Administrator Account
           DELETE http://localhost:8080/api/admin/logout/           

# Future Goals :
      1. Denial of job after acceptance from Provider side and also from Seeker side.
      2. Location Mapping
      3. Online Payment Wallet (To avail Our commission)
      4. Customer's grievance Suport System
      5. Mobile Application Implementation
      6. Mobile OTP for login
      7. Login Via Google/ Facebook/ Insta/ Twitter
      8. Background Verification



