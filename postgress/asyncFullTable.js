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
client.connect()
.then(()=> console.log('connected succefully...'))
.then(()=> client.query("select * from customers where cust_name = $1",["Raju"]))
.then((res)=> { console.table(res.rows)})
// .then(()=> client.query("insert into customers values ($1,$2)",[1,"shyam"]))
.then(()=> client.query("insert into customers(cust_name) values ($1)",["Baburao"]))
.then(()=> client.query("select * from customers where cust_name = $1",["Baburao"]))
.then((res)=> { console.table(res.rows)})
.catch((e)=> console.log('error',e))
.finally(()=> {console.log('finally ...'); client.end()})