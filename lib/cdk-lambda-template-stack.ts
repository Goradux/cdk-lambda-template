import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from "aws-cdk-lib/aws-sqs";

export class CdkLambdaTemplateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, "CdkLambdaTemplateQueue", {
    //   visibilityTimeout: cdk.Duration.seconds(300),
    // });

    const lambda = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "SampleLambda",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        entry: "lib/Lambdas/sampleFunction.ts",
        functionName: "SampleLambda",
      }
    );

    const lambda2 = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "SampleLambda2",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        entry: "lib/Lambdas/sampleFunction2.ts",
        functionName: "SampleLambda2",
      }
    );
  }
}
