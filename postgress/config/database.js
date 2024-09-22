const {Pool} = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path:path.resolve(__dirname, '../../.env') });
const password=process.env.PASSWORD
const pool = new Pool({
    host:"localhost",
    user:"postgres",
    password:password,
    port:5432,
    database:"persondb"
    // connectionString:process.env.DATABASE_POSTGRESS_URL
});
console.log('Database starting ...')
pool.on('connect',()=>{
    console.log('Database Connected ...')
})
// pool.query('SELECT 1', (err, res) => {
//     if (err) {
//       console.error('Error executing initial query', err.stack);
//     } else {
//       console.log('Pool connection established');
//     }
//   });
  
/**
 * This allows other parts of your application to use db.query to run database queries without needing to set up a new Pool or connection. The query function is reusable across your application.
 */
module.exports = {
    query : (text,param)=> pool.query(text,param)
}