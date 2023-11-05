# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

1. install CDK CLI: `npm install -g aws-cdk`
2. init the folder: `cdk init app --language typescript`
3. remove jest & add native testing - 3 (not needed)
4. add compile, lint, format - 1 (add lint and format like in the other article, add eslint-ignore to jest config file) DONE!
5. what else? check how to run lambdas locally? - 5
6. add bundling (remove ts-node) - step 2 TODO (DONE)
7. get rid of CDK out duplication? - 4
8. add git hooks - 6

## ESLint, Prettier

This can be copied from the old article. Also add a eslint-ignore to jest config file

## Adding ESBuild

`npm install --save-dev esbuild`

do we even need a watch command for the bin? Only need it for the lambdas code

Copied info:
AWS CDK supports esbuild for AWS Lambda Functions, but the implementation cannot be used with other Constructs and doesn't expose all of esbuild's API.

`npm install --save-dev aws-lambda`

honestly not necessary to get rid of the ts-node???

so ts-node + inbuilt esbuild to build the whole cdk app? sounds stupid

command hooks: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_nodejs-readme.html#command-hooks
https://github.com/aws/aws-cdk/issues/2869

Option 2:

parse the template file, find the asset name, rebuild the index.js using esbuild, and only then run the SAM invoke
Example:

`npm run invoke:local SampleFunction`

this command will look for the `SampleFunction` string in the template, fetch the corresponding asset name. Then it will trigger an esbuild command using to save the output into the asset name, and only then will it run the SAM invoke!
