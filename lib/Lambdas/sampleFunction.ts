import type { Handler, Context, SNSEvent } from "aws-lambda";

// compiled using esbuild under the hood
export const handler: Handler = async (event: SNSEvent, _context: Context) => {
  console.log("Starting the function!");
  console.log(JSON.stringify(event, null, 2));
  return {
    result: "Done!",
  };
};
