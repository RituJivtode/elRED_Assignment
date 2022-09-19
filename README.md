# elRED_Assignment

APIs :-

```bash
 https://mailotp.herokuapp.com/login    
 ```
 to send the OTP
 
 ```bash
 https://mailotp.herokuapp.com/postTask
 ```
 to post the task by particular user
 
 ```bash
 https://mailotp.herokuapp.com/editTask
 ```
 to edit the task or any other fields by authorized user
 
 ```bash
 https://mailotp.herokuapp.compostTask/deleteTask/:taskId
 ```
  to delete the task by authorized user



Problem Statement - Create Apis for the following :

1.) User must be able to login / logout using email ID and Password. OTP should be sent to email ID. User Session and Authentication should be taken care of. Please create an API endpoint for the same.

2.) Create a POST API,  where logged in users can post any Task. The following are the required fields : Date, Task : String,  Status : Completed / Incomplete. The task is basically a string which contains the task. Eg : Swimming for one hour

3.) Create a Patch API where a logged in user must have the provision to edit the Task. He should have the provision to edit one or more parameters of the Task Object. Eg : Date, Task or Status

4.) Create a delete API where the user must have provision to delete a particular task.

Note : All These APIs must be accessible only by logged in Users. Give necessary error messages. For testing, set an automatic session time out of 30 seconds. Session Invalid Error Notifications should also be displayed.

5.) Please host these APIs on any free server / Amazon Test Account. Please feel free to reply to this email / schedule a call with us for any queries.


( Note:- if you get this error-
 "Invalid login: 535-5.7.8 Username and Password not accepted", then  Allow less secure apps From your Google Account.)
 
 
