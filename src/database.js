const mysql = require('mysql');


const mysqlConnection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'preventas-app'
})

mysqlConnection.connect(function (err) {
    if(err){
        console.log("error")
    }else{
        console.log("DB is conected")
    }
} )


module.exports = mysqlConnection;