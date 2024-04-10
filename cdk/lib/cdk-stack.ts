import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    // const bucket = new s3.Bucket(this, 'MyBucket', {
    //   removalPolicy: cdk.RemovalPolicy.DESTROY, // For demo purposes, you may want to use a more appropriate removal policy
    // });

    
    const table = new dynamodb.Table(this, 'MyTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'MyTable',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      stream: dynamodb.StreamViewType.NEW_IMAGE, 
    });

    // 1
    const handler = new lambda.Function(this, 'MyLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda'), 
      handler: 'lambda.handler',
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // Grant Lambda permissions to access DynamoDB table
    table.grantReadWriteData(handler);

    // 2

    const lambdatwo = new lambda.Function(this, 'lambda2', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda'), 
      handler: 'lambda2.handler',
      environment: {
        TABLE_NAME: table.tableName,
      },
    });
    
    lambdatwo.addEventSourceMapping('mapping', {
      eventSourceArn: table.tableStreamArn,
      startingPosition: lambda.StartingPosition.LATEST
    })
    
    lambdatwo.addToRolePolicy(iam.PolicyStatement.fromJson({
      Action: 'ec2:RunInstances',
      Resource: [
        'arn:aws:ec2:us-east-2:767398136145:instance/*',
        'arn:aws:ec2:us-east-2:767398136145:key-pair/*',
        'arn:aws:ec2:us-east-2:767398136145:image/*',
        'arn:aws:ec2:us-east-2:767398136145:network-interface/*',
        'arn:aws:ec2:us-east-2:767398136145:security-group/*',
        'arn:aws:ec2:us-east-2:767398136145:subnet/*',
        'arn:aws:ec2:us-east-2:767398136145:volume/*',
        'arn:aws:ec2:us-east-2:767398136145:snapshot/*',
        'arn:aws:ec2:us-east-2::image/ami-0900fe555666598a2'
      ],
    }));

    lambdatwo.addToRolePolicy(iam.PolicyStatement.fromJson({
      Action: "dynamodb:GetItem",
      Resource: [
        'arn:aws:dynamodb:us-east-2:767398136145:table/*',
      ]
    }))
    table.grantStreamRead(lambdatwo);

    // Create API Gateway with Lambda integration
    const api = new apigateway.RestApi(this, 'MyApi');
    const integration = new apigateway.LambdaIntegration(handler);
    api.root.addMethod('POST', integration);
  }
}

const app = new cdk.App();
new CdkStack(app, 'MyStack');