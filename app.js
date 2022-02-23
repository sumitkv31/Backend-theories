//function to handle incoming request and response to the request
function handleRequest(request, response) {
  response.statusCode = 200; //a sucess status code
  response.end("<h1>Hello World!</h1>");
}

//creating our own server
const http = require("http");
const server = http.createServer(handleRequest);
server.listen(3000);
