//function to handle incoming request and response to the request
function handleRequest(request, response) {
  //url is a property of request which stores the path
  if (request.url === "/currenttime") {
    response.statusCode = 200;
    response.end("<h1>" + new Date().toISOString() + "</h1>");
  } else if (request.url === "/") {
    response.statusCode = 200; //a success status code
    response.end("<h1>Hello World!</h1>"); //response of server after success
  }
}

//creating our own server
const http = require("http");
const server = http.createServer(handleRequest);
server.listen(3000);
