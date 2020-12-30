Step 1: AWS CLI Configaration
        => aws configure 
           [Access key, security key, zone, response-type]

Step 2 : serverless installation
        => sudo npm install -g serverless

Step 3: Create Node App
        => npm init , express, serverless-http package etc as per my need.

Step 4: Coding

Step 5: Create serverless service
        => serverless create --template hello-world  
        Note: hello-world could be any-name. **hello-world** is the service name for my app.

Step 6: This command will create .serverless folder, serverless.yml and handler.js file. 
        I have deleted handler.js file because my entry point will be index.js file.

Step 7: Inside serverless.yml file , insie [events:] section our route will be defined.
        Here, I've used ***get,post,put,delete*** method.

Step 8: deployment time :)
        => serverless deployment
        Note: it may take 1-2 min to be deployed accounring to internet speed.    

Step 9: After deployment inside our terminal we'll see
  -------------
  endpoints:
  -------------
    ** heartBeatFunction: hello-world-dev-heartBeatFunction **
    GET -    https://z2pz1imyij.execute-api.us-east-1.amazonaws.com/dev/heartbeat 
    
    ** userFunction: hello-world-dev-userFunction ** MongoDB
    POST -   https://z2pz1imyij.execute-api.us-east-1.amazonaws.com/dev/user/create  
    DELETE - https://z2pz1imyij.execute-api.us-east-1.amazonaws.com/dev/user/delete  
    PUT -    https://z2pz1imyij.execute-api.us-east-1.amazonaws.com/dev/user/update  
    
    ** mysqlUserFunction: hello-world-dev-mysqlUserFunction ** Mysql
    GET -    https://z2pz1imyij.execute-api.us-east-1.amazonaws.com/dev/mysql/user/get  
    POST -   https://z2pz1imyij.execute-api.us-east-1.amazonaws.com/dev/mysql/user/create 




Step 10:  To compare connnection pooling on local machine follow the instruction =>
          => Open attack.js file. There are two cases to test. [Case 1 and Case 2] 
             Do necessary changes to test. Don't uncomment both case at a time. 
          
          => 1. Terminal one 
             command :  node index.js 
          => 2. Terminal two
             command :  node attack.js
          
          Note : inside Terminal one,
             For Case 1 => We can see same repeating connection ID. That means connection pooling works.
             For Case 2 => We can see exceptions. That means it is not working with raw connection string.
                
