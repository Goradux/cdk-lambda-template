/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const OUTPUT_DIRECTORY = "./cdk.out";
const CDK_STACK_NAME = "CdkLambdaTemplateStack";

import * as esbuild from "esbuild";
// esbuild.build

const assets = require(`${OUTPUT_DIRECTORY}/${CDK_STACK_NAME}.assets.json`);
const template = require(`${OUTPUT_DIRECTORY}/${CDK_STACK_NAME}.template.json`);
// console.log(assets);
// console.log(template);

// console.log(process.argv);
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

const discoveredLambdas = [];
const resources = template.Resources;
// console.log(resources);
for (let resourceName in resources) {
  const resource = resources[resourceName];
  // console.log(resource);
  if (resource.Type === "AWS::Lambda::Function") {
    discoveredLambdas.push(resource);
  }
}
// console.log(discoveredLambdas);
const neededLambda = discoveredLambdas.filter(
  (l) => l.Properties.FunctionName === lambdaName
)[0];

if (!neededLambda) {
  console.log(`No ${lambdaName} lambda found in the CloudFormation template`);
  process.exit(1);
}

const assetSuffix = neededLambda.Properties.Code.S3Key.split(".")[0];

const buildPath = `${OUTPUT_DIRECTORY}/asset.${assetSuffix}/`; // index.js inside of here
// the thing is built to just an index.js

// await esbuild.build({
//   entryPoints: ["app.jsx"], // lambdaHandlerSource
//   bundle: true,
//   minify: true,
//   sourcemap: true,
//   target: ["node"],
//   outfile: buildPath + "index.js",
// });
