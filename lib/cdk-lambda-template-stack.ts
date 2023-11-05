import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { join } from "path";

export class CdkLambdaTemplateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    const queue = new sqs.Queue(this, "CdkLambdaTemplateQueue", {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    const fileName = "";

    const lambda = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "SampleLambda",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        entry: "lib/Lambdas/sampleFunction.ts",
        functionName: "SampleLambda",
        bundling: {
          commandHooks: {
            beforeBundling(inputDir, outputDir) {
              return [];
            },
            afterBundling(inputDir: string, outputDir: string): string[] {
              const outFile = join(outputDir, "index.js");
              const scriptPath = join(inputDir, "..", ".scripts");
              const shFile = fileName.replace(".ts", ".sh");
              return [
                "echo afterBunding:",
                `echo ${outFile}, ${scriptPath}`,
                "echo " + inputDir,
                "echo " + outputDir,
              ];

              // return [
              //   `mkdir -p ${scriptPath}`,
              //   `echo esbuild ${inputDir}/${fileName} --outfile=${outFile} --watch --bundle --target=node18 --platform=node > ${scriptPath}/${shFile}`,
              // ];
            },
            beforeInstall(inputDir, outputDir) {
              return [];
            },
          },
        },
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
