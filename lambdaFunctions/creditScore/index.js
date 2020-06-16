const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const userCPF = event.queryStringParameters.cpf;

  if (!userCPF) {
    return response(400, { message: "Missing required CPF" });
  }

  const responseBody = await readFile(userCPF);
  if (!responseBody) {
    return response(404, { message: "CPF not found" });
  }

  return response(200, [responseBody]);
};

async function readFile(cpf) {
  const filename = "credit-score.json";
  const bucket = {
    Bucket: "creditdb",
    Key: filename,
    ResponseContentType: "application/json",
  };

  const data = await s3.getObject(bucket).promise();

  return readFileContent(data.Body.toString(), cpf);
}

function readFileContent(content, cpf) {
  return JSON.parse(content)[cpf];
}

function response(statusCode, body) {
  let header = {};

  if (statusCode === 200) {
    header = {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    };
  } else {
    header = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  }

  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: header,
  };
}
