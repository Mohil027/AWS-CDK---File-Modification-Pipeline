import boto3
import sys
import subprocess
import time
import requests
import logging

inputArg = sys.argv[1]


def main():
    
    reqId = inputArg
    

    dynamodb = boto3.client('dynamodb', aws_access_key_id="", aws_secret_access_key="", region_name="us-east-2")  # Use client instead of resource
    table_name = 'MyTable'

    response = dynamodb.get_item(
        TableName=table_name,
        Key={'id': {'S': reqId}}  
    )
    item = response.get('Item', {})
    input_text = item.get('input_text', {}).get('S')  
    input_file_path = item.get('input_file_path', {}).get('S')

    print(item, input_text, input_file_path)

    file_name = input_file_path.split('/')[-1]
    print(file_name)

    bucket_name = 'bucket027fovus'  
    # s3 = boto3.client('s3')

    s3 = boto3.client('s3', aws_access_key_id="", aws_secret_access_key="", region_name="us-east-2")
    s3.download_file(bucket_name, file_name, file_name)

    # with open('input_file.txt', 'a') as file:
    #     file.write('\n{}'.format(input_text))


    output_file_content = '{} : {}'.format(open(file_name, "r").read(), input_text)
    with open('output_file.txt', 'w') as file:
        file.write(output_file_content)

    # Upload output file to S3
    s3.upload_file('output_file.txt', 'bucket027fovus', 'output_file.txt')


    # table.update_item(
    #     Item={
    #         'id': reqId,  # Replace 'your_id' with the ID of the item in DynamoDB
    #         'output_file_path':   # Replace 'YourBucketName' with your S3 bucket name
    #     }
    # )

    dynamodb.update_item(
        TableName=table_name,
        Key={'id': {'S': reqId}},
        UpdateExpression="set output_file_path = :r",
        ExpressionAttributeValues={
            ':r': {'S': 'bucket027fovus/output_file.txt'}  
        }
    )

    

if __name__ == '__main__':
    main()