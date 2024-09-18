const Client = require('pg').Client  //node-progress lib
const path = require('path');
require('dotenv').config({ path:path.resolve(__dirname, '../.env') })
const password=process.env.PASSWORD
const client = new Client({
    host:"localhost",
    user:"postgres",
    password:password,
    port:5432,
    database:"projectdb"
})
execute();
async function execute() {
    try{
        await client.connect();
        await client.query("BEGIN")
        // await client.query("insert into customers(cust_name) values ($1)",["laxmi chit fund"])
        // console.log("inserted new row")
        await client.query("delete from customers where cust_name= $1 ",["laxmi chit fund"])
        console.log("deleted the query but it will not alter the real time table untill commit not done")
        await client.query("insert into customers values ($1,$2)",[2,"laxmi chit fund"])
        await client.query("COMMIT")
    }catch(err){
        console.log("failed to execute..",err)
        await client.query("ROLLBACK");
    }finally{
        await client.end();
        console.log("disconnected ...")
    }
    
}