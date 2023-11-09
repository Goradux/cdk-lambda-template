/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const OUTPUT_DIRECTORY = "./cdk.out";
const CDK_STACK_NAME = "CdkLambdaTemplateStack";

// import * as esbuild from "esbuild";
const esbuild = require("esbuild");

// const assets = require(`${OUTPUT_DIRECTORY}/${CDK_STACK_NAME}.assets.json`);
const template = require(`${OUTPUT_DIRECTORY}/${CDK_STACK_NAME}.template.json`);

// starting from argv2 is our args
const lambdaName = process.argv[2];
const lambdaHandlerSource = process.argv[3];

if (!lambdaName) {
  console.log("No Lambda function name was specified in argv. Exiting...");
  process.exit(1);
}
console.log(`Rebuilding ${lambdaName} function`);

// Resources > loop through all keys > find that Type is "Type": "AWS::IAM::Role"
// Properties.Code.S3Key, string.split(".")[0] -> that is the asset folder name
// Match by Properties.FunctionName

let targetLambda;
for (let resourceName in template.Resources) {
  const resource = template.Resources[resourceName];
  if (
    resource.Type === "AWS::Lambda::Function" &&
    resource.Properties.FunctionName === lambdaName
  ) {
    targetLambda = resource;
    break;
    // discoveredLambdas.push(resource);
  }
}
// console.log(targetLambda);

if (!targetLambda) {
  console.log(`No ${lambdaName} lambda found in the CloudFormation template`);
  process.exit(1);
}

const assetSuffix = targetLambda.Properties.Code.S3Key.split(".")[0];

const buildPath = `${OUTPUT_DIRECTORY}/asset.${assetSuffix}/`; // index.js inside of here

// console.log(lambdaHandlerSource, buildPath + "index.js");
esbuild.build({
  entryPoints: [lambdaHandlerSource],
  bundle: true,
  // target: ["es2020"],
  format: "cjs",
  outfile: buildPath + "index.js",
});

// .then run SAM
// node .\buildLambda.js SampleLambda .\lib\Lambdas\sampleFunction.ts
// sam local invoke SampleLambda --no-event -t .\cdk.out\CdkLambdaTemplateStack.template.json

// TODO: fix the script and publish it
