const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

connection.query(`CREATE TABLE people (id int not null auto_increment, name varchar(255), primary key(id))`)
const sql = `INSERT INTO people(name) values('Eduardo')`;
connection.query(sql);
const sql2 = `INSERT INTO people(name) values('Monica')`;
connection.query(sql2);
const sql3 = `INSERT INTO people(name) values('Tamires')`;
connection.query(sql3);

app.get('/', (req, res) => {
    connection.query("SELECT * FROM people", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        var resultstr = "";
        Object.keys(result).forEach(function (key) {
            var row = result[key];
            resultstr += "<br>" + row.name
        });

        res.send(`<h1>Full Cycle Rocks!</h1><br>` + resultstr);
    });
})

app.listen(port, () => {
    console.log('Rodando na porta' + port)
})