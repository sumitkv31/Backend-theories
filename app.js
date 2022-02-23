//function to handle incoming request and response to the request
function handleRequest(request, response) {
  response.statusCode = 200;
}

//creating our own server
const http = require("http");
const server = http.createServer(handleRequest);
server.listen(1000);
