const db = require('../postgress/config/database');
exports.getUsers=async (req,res)=>{
    try{
        const data = await db.query(
            "select * from person"
        )
         res.statusCode = 200;
        res.end(JSON.stringify({status:200,message:'User fetched succefully',result:{data:data.rows,total:data.rowCount}}));
    }catch(err){
        //  res.statusCode = 400;
        res.end(JSON.stringify({status:400,error:err}))
    }
     
} 
exports.postUser=async (req,res)=>{
    const {name,city,role} = req.body;
    try{
        //by default iset operation does not return anything
        //inorder to get added rows data we can returning * {all attr}
        const data = await db.query(
            "Insert into person(name,city,role) values ($1,$2,$3) returning *",
            [name,city,role]
        )
         res.statusCode = 200;
        res.end(JSON.stringify({status:200,message:'User Registred succefully',data:data.rows}));
    }
    catch(err){
         res.statusCode = 400;
        res.end(JSON.stringify({status:400,error:err}))
    }
} 
exports.getuserById=async (req,res,userId)=>{ //cant find id using pathparam property
    try{
        const data=await db.query(
            "select * from person where id=$1",
            [userId]
        );
         res.statusCode = 200;
        res.end(JSON.stringify({status:200,message:"fetched details of user successfully", result:{data:data.rows}}))
    }catch(err){
         res.statusCode = 400;
        res.end(JSON.stringify({status:400,error:err}))
    }
} 
exports.updateUser=async (req,res,userId)=>{
    try{
        const {name,city,role} = req.body;
        const {rows} = await db.query(
            "update person set name =$1, city =$2, role=$3 where id=$4 returning *",
            [name,city,role,userId]
        )
         res.statusCode = 200;
        res.end(JSON.stringify({status:200,message:"user updated succefully",result:{rows}}));
    }catch(err){
         res.statusCode = 400;
        res.end(JSON.stringify({status:400,error:err}))
    }
} 
exports.deleteUser=async (req,res,userId)=>{
    try{
        const result=await db.query("delete from person where id=$1 RETURNING *",[userId]);
        if (result.rows.length === 0) {
            res.end(JSON.stringify({message: 'User not found'}))
          }else{
            res.statusCode = 200;
            res.end(JSON.stringify({status:200,message:"deleted user succefully",data:result.rows[0] }))
          }
    }catch(err){
         res.statusCode = 400;
        res.end(JSON.stringify({status:400,error:err}))
    }
} 