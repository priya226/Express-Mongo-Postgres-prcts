const url = require("url");
const userController=require("./userController");
function getUserId(path){
    const match = path.match(/^\/users\/(\d+)$/);
    if(match){
        return match[1];
    }
    return null;
}
const router=(req,res)=>{ //like express().use() in express
    //url.parse(req.url, true), it parses the URL string and returns an object contain pathname,query,protocol, host
    //The true argument tells the parser to automatically parse the query string into an object.
//The true argument tells the parser to automatically parse the query string into an object.
    const requrl=url.parse(req.url,true);
    res.setHeader('Content-Type','application/json');
    /**
     * express fascilitate us 
     * router.route("/endpoint")
     * .get(controller)
     * .post(controller)
     * but in node we detect it from req and url
     */
    if(requrl.pathname=='/'){
        res.statusCode = 200;
        res.end(JSON.stringify({message:'OK'})) //need to pass stringified
    }else{
        const userId=getUserId(requrl.path);
        if(userId){
            if(req.method=='GET'){
                console.log("here in /path...")
                userController.getuserById(req,res,userId)
            }
            if(req.method=='PATCH'){
                userController.updateUser(req,res,userId)
            }
            if(req.method=='DELETE'){
                userController.deleteUser(req,res,userId)
            }
        }else{
            if(requrl.pathname=='/users'){
                if(req.method=='GET'){
                    userController.getUsers(req,res)
                }else if(req.method=='POST'){
                    userController.postUser(req,res)
                }
            }
        }
    }
}
module.exports=router;
