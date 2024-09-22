// witout using express
//using nodejs and http
const http = require('http');
const port=3000;
const hostname = '127.0.0.1';

const routes= require('./routes.js'); //routing file as express


function loggerMiddleware(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();  // Call the next middleware or handler
}

// Middleware 2: Authentication Check - Simple authentication check
function authMiddleware(req, res, next) {
    // console.log("authentication here..",req.headers['authorization'])
    if (req.headers['authorization'] === 'Bearer token123') {
        next();  // Proceed to the next middleware or handler if authorized
    } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Unauthorized' }));
    }
}

function parseRequestBody(req,res,next){
    body = '';
    req.on('data',  function (chunk) {
        body += chunk;
      });
    req.on('end',()=>{
        if(body){
            try{
                req.body = JSON.parse(body);
            }catch(err){
                res.statusCode=400;
                res.end('invalid json');
                return;
            }
        }
        next();
    })
}

// Middleware array to be applied before routing
const middlewareStack = [
    loggerMiddleware,    // Log request details
    authMiddleware,       // Simulate authentication check
    parseRequestBody //parsing json 
];

function executeMiddleware(middleware,req,res,finalhandler){
    // console.log("middleware execution handler ...")
    let index=0;
    function next(){
        // console.log("current function ",);
        if(index<middleware.length){
            const currentMiddlewWare = middleware[index];
            index++;
            currentMiddlewWare(req,res,next); // Call next middleware
        }else{ //api call
            finalhandler(req,res);
        }
    }
    // console.log("calling next ...")
    next();
}
const server = http.createServer((req, res) => {
    console.log("server here ...")
    executeMiddleware(middlewareStack, req, res, routes);
})
server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`)
})