const mySql=require('mysql')

const db=mySql.createPool({
host:'127.0.0.1',
user:'root',
password:'root1234',
database:'my_db_01'

})
module.exports=db