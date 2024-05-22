
# Implementation 



There are multiple permissions to be given to the user to access certain AWS services. All the permissions required will be mentioned at the required steps.

## Folder Structure

Quintessensial information for understanding the flow of the project. 

```bash
  fovus-code
    |_cdk
        |_lib
            cdk-stack.ts
        |_other folders
        |_lambda
            lambda.ts
            lambda2.ts
        |_scripts
            script.py
    |_public
    |_src
        |_App.js
        |_index.css
        |_index.js
        |_components
            FormPage.jsx
    |_node_modules
```




## Step 1 : S3 bucket setup

The s3 bucket is updated with the following policy.

Here's the bucket policy :
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicListGet",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:List*",
                "s3:Get*"
            ],
            "Resource": [
                "arn:aws:s3:::<Bucket-name>",
                "arn:aws:s3:::<Bucket-name>/*"
            ]
        }
    ]
}
```

This is the CORS policy :


```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE",
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```


We need to mention the bucket name for the bucket used at specific locations in the project for smooth upload/fetch of the data from the bucket. 

Put the bucket names as the following locations
| FileName | Line  Number   |
| :-------- | :------- | 
| `FormPage.jsx` | `15` |  
| `script.py` | `32` | 

Also please mention the bucket name in the bash script code in the 2nd lambda function in lambda2.js file.


These permissions are given for now : 

```bash
AmazonS3FullAccess
AmazonSSMFullAccess
AmazonCloudFormationFullAccess 
IAMFullAccess


```


Then going to the console, generate Access key ID and Secret access Key and download in CSV file, that will be later used for the configuration of environment.

## Step 2 : KEYS Setup



Now, next step is to set up our keys so the AWS configuration is set up.


Keys can be added using the aws config or by putting the access key and the secret access key. To use aws-cli, follow the following steps. 

Access key and Secret Access Key are to be taken from the AWS account 
```bash
-> aws config
-> AWS Access Key : AccessKey
-> AWS Secret Accees Key : SecretKey
-> Default Region Name : 'us-east-2'
-> Default output format : JSON 

```

```bash
The other method is to give direct key access to the locations in the frontend and the scripts. Which is generally not considered a good practice.

```

#### Or
Update the keys in the following files:

| FileName | Line          | 
|----------------|---------|
| `FormPage.jsx` | `23,24` | 
| `script.py`    | `16,35` |


## Step 3 : Understanding the frontend 

The frontend is built using React.js, Tailwind CSS and Flowbite UI. There are three components in the App.js file, header, FormComponent, and footer. The FormComponent has text_input field, file_selection button, and a submit button.




## Step 4 : Building the CDK stack and understanding the cdk directory 

For CDK stack, inside the main project directory, I have made the CDK directory. 

```bash
-> The directory has a library folder containing the cdk-stack.ts file that is used to build the structure of all the services and initialize them.

-> The second file is the script.py inside the scripts folder. This file is the script that runs in the EC2 instance to generate and post the ouput path to the DynamoDb.

-> The third file is the lambda.js file inside the lambda directory. This file contains the first lambda function that is triggered by the API gateway service and is used to add the data to the dynamodb. 

-> The fourth file is the lambda2.js file inside the lambda directory. This file contains the second lambda function that is triggered by the dynamodb stream and is used to initiate the EC2 instance.

```

Following permissions has been given in order to make sure that users have the necessary permissions.

```bash
AmazonAPIGatewayAdministratior
AmazonAPIGatewayInvokeFullAccess
AmazonDynamoDBFullAccess  
AWSLambda_FullAccess

```
 
    


## Step 5 CDK stack dependencies installment

Install all the dependencies by writing the command "npm install". Do this both for main directory and the cdk directory too. 

## Step 6 : EC2 instance settings

Generate the Key-Pair required to launch the EC2 instance. This can be done using the AWS console. Access the EC2 service on AWS and go on to generate the key pairs that will be used to launch the EC2 instance.

KeyPair needs to be updated in the lambda2.js file.

``` 

Update the keyName in the following file:

| FileName     | Line     | 
| `lambda2.js` | `15`     | 

```
Also, AWS account nunber needs to be updated in the cdk-stack.ts file. 
```

--------------------------------------------
| FileName             | Line              | 
--------------------------------------------
| `cdk-stack.ts` | `57 to 65` and 72 |



```

The following permissions has been added : 

```bash
AmazonEC2ContainerRegistryFullAccess
AmazonEC2FullAccess

```

## Step 7 : Stack deployment

```bash
Command 1 :
-> cdk bootstrap 
```
Make sure name and region for the aws are correctly mentioned in the stack file. 


```bash
Command 2 :
-> cdk synth 
```
 Once you get successful completion, do the following command :




```bash
Command 3 :
-> cdk deploy
```
After calling this command, we should get the API that should be posted to the frontend to connect the request from frontend to cloud. This is the final step for stack deployment.


## Step 8 : Starting the frontend 
Navigate to the root directory and do "npm run start" to start the react application. 

Once the frontend starts, it should follow the flow of the project as per the requirements of the assignment. Please watch the attached video for the step-by-step project flow and working









