# Job-Portal (**_seasonal-jobs.com_**)

Project done by _Siddhida_ and _Harish Ponna_

Deployed URL: https://seasonal-jobs.herokuapp.com

# Contributors

- Harish Ponna
- Siddhida

# About Our Project:

    Our Project is nothing but a bridge between Help Seeker and Help Provider. It is nothing but works to combine two needs and needies at a same place and same time. Help Seekers are none other than Job Providers. They are those who needs help of some helping hand. And Help Providers are none other that Job seekers. Both of them will find each other using our platform. Both of them will help each other and will exchange services in terms of money. Our skimpy platform will wisely accomodate their need and time for them and according to them.
          While planning for this project, only thoughts in our mind was our young and unemployed population. We thought of making that simple application which could help them earn pocket money for them selves. This pocket money will add on their confience, personality, and keep their supplies for struggle tennure on. This platform will avail them be more self dependent.
              Our Seasonal Job app is very easy to use. One can find a part-time job for himself or herself at instantaneous basis most suitable to their timing and location. These jobs are of informal types.
            Few, features we have applied and there are many more we are left with for now. Which we will add with the passing time in near future.
               Let's take a tour to our project...

## Users of Application

| Role              | Rights                                                                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Generator     | Maintenance of API                                                                                                                                 |
| App Administrator | Keep an eye on users activity, Block the unwanted ones                                                                                             |
| Job Provider      | Post jobs, Delete Jobs, Update Jobs, Update Profile, Photo Upload, change password, Forgot Password, view all posted Jobs, view all opted out Jobs |
| Job Seeker        | Accept Jobs, Update Profile, Upload Profile Pic, Reset Password, Forgot Password, view all available jobs, view all accomplished jobs              |

### End Points of APIs

1.  PROVIDER's ROUTES

    - Registering Provider Account

      > POST https://seasonal-jobs.herokuapp.com/api/user/register

    - Provider Account Activation

      > GET https://seasonal-jobs.herokuapp.com/api/accountactivation/{Activation-Token}?user={Role}

    - Logging into Provider Account

      > POST https://seasonal-jobs.herokuapp.com/api/user/login/

    - Posting a job by provider

      > POST https://seasonal-jobs.herokuapp.com/api/jobprovider/postingjob

    - Showing provider his own posted jobs

      > GET https://seasonal-jobs.herokuapp.com/api/jobprovider/jobspostedtilldate/{Page Number}/

    - Job updation by Provider Account

      > PATCH https://seasonal-jobs.herokuapp.com/api/jobprovider/udpatingjob/{Job Id}/

    - Job Deletion by Provider

      > DELETE https://seasonal-jobs.herokuapp.com/api/jobprovider/deletingjob/{Job Id}/

    - Uploading Profile Picture

      > PATCH https://seasonal-jobs.herokuapp.com/api/jobprovider/uploadprofilepicture

    - udpating profile
      > PATCH https://seasonal-jobs.herokuapp.com/api/jobprovider/editprofile


       * updating editing  password
          > PATCH https://seasonal-jobs.herokuapp.com/api/jobprovider/editpassword

       * Logging out from Provider Account
          > DELETE https://seasonal-jobs.herokuapp.com/api/jobprovider/logout/


       * forgot passsword sending system generated password
          >  POST https://seasonal-jobs.herokuapp.com/api/user/forgotpassword

2.  SEEKER's ROUTES

    - Register Seeker Account

      > POST https://seasonal-jobs.herokuapp.com/api/user/register

    - Account Activation
      > GET https://seasonal-jobs.herokuapp.com/api/accountactivation/{Activation Token}?user=
             {Role}

    - Login into Seeker Account
      > POST https://seasonal-jobs.herokuapp.com/api/user/login

    - showing all jobs which are available
       > GET https://seasonal-jobs.herokuapp.com/api/jobseeker/searchjobs/allavailablejobs/{Page Number}/


       * filtering jobs by category of hourly, daily, weekly, monthly
          > GET https://seasonal-jobs.herokuapp.com/api/jobseeker/searchjobs/filter/{Page Number}?category={Hourly/Daily/Weekly/Monthly}

       * showing single job by jobId
          > GET https://seasonal-jobs.herokuapp.com/api/jobseeker/searchjobs/byjobId/{Job Id}/

       * Job Accepting by Seeker
            > PATCH https://seasonal-jobs.herokuapp.com/api/jobseeker/searchjobs/byjobid/{Job Id}/isaccepted

       * showing jobs accepted by seeker till date
            > GET https://seasonal-jobs.herokuapp.com/api/jobseeker/jobsacceptedtilldate/{Page Number}

       *  Uploading Profile Picture
            > PATCH https://seasonal-jobs.herokuapp.com/api/jobseeker/uploadprofilepicture

       * udpating profile
            > PATCH https://seasonal-jobs.herokuapp.com/api/jobseeker/editprofile

       * Edit password
            > PATCH https://seasonal-jobs.herokuapp.com/api/jobseeker/editpassword


       * Logging out from Seeker Account
           > DELETE https://seasonal-jobs.herokuapp.com/api/jobseeker/logout

       * forgot passsword sending system generated password
            > POST https://seasonal-jobs.herokuapp.com/api/user/forgotpassword

3.  Admin Routes

    - Logging In from App Administrator Account

      > POST https://seasonal-jobs.herokuapp.com/api/user/login

    - view all available(including blocked) jobs

      > GET https://seasonal-jobs.herokuapp.com/api/admin/allavailablejobs/{Page Number}

    - view all accepted jobs

      > GET https://seasonal-jobs.herokuapp.com/api/admin/allacceptedjobs/{Page Number}

    - view all Providers

      > GET https://seasonal-jobs.herokuapp.com/api/admin/allproviders/{Page Number}

    - view all seekers

      > GET https://seasonal-jobs.herokuapp.com/api/admin/allseekers/1

    - Blocking Unwanted App User(s) or Unwanted Job(s)

      > PATCH https://seasonal-jobs.herokuapp.com/api/admin/{User/Job Id}/isblocked/?model={Role}

    - logout from Administrator Account
      > DELETE https://seasonal-jobs.herokuapp.com/api/admin/logout/

# Features :

### \* REGISTRAION & LOGIN Related

---

1.  Email Verification for Registration.
2.  Only Unique Account Creation allowed (Aadhaar Number based Uniqueness).
3.  Single device Login facility.
4.  Editing Password (After login).
5.  Resetting Passwords (System Generated Password via mail).

### \* USER's Related

---

1.  Job Provider can Post, Edit, view and Delete his posts.
2.  Job Seeker can view, filter, search and accept jobs.
3.  Admin can be watchfull towards his users and jobs posted also can BLOCK unwanted Jobs and Users even.
4.  Instant notification Via mail to both Job provider and Job Seeker.
5.  Profile Updation (Limited to Profile Picture, Contact Number and Address Change)

### \* JOBs Related

---

1. **Aggregations** :
   - a. Job Count.
   - b. Sorting (as per Most Recent Update).
   - c. Filteration (_As per Different category and preferences_).
   - d. Searching (_On the basis of keyword and location_) .
   - e. Pagination (_10 Jobs per page_).
2. _View Jobs_.
3. _Block Jobs_ (By Admin only).

# Technologies used:

---

- Nodemailer (_To send system generated emails_)
- Multer + Cloudinary (_Converting System Image into URL_)
- Express Js (_Framework for node Js_)
- Json Web token (_For Authentication_)
- Bcrypt Js (_For Hashing_)
- Helmet (_To Secure all Headings and Status_)
- Compressor (_To compress the size of the data_)
- Mongoose (_To Connect to NoSQL Database_)
- Mark Down (_To Make our read me file look better_)

# Future Goals :

      1. Denial of job after acceptance from Provider side and also from Seeker side.
      2. Location Mapping
      3. Online Payment Wallet (To avail Our commission)
      4. Customer's grievance Suport System
      5. Mobile Application Implementation
      6. Mobile OTP for login
      7. Login Via Google/ Facebook/ Insta/ Twitter
      8. Background Verification

# Context Diagram (MVP)

![Context Diagram](https://res.cloudinary.com/da8rrc2mj/image/upload/v1585817326/IMG-20200402-WA0001_es56y5.png)
