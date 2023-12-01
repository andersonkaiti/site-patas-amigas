require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
});

db.connect(error => {
    if(error) {
        console.error("Erro ao se conectar ao banco de dados.");
        throw error;
    } else {
        console.log("Conexão com o banco de dados efetuada com sucesso!");
    }
});

module.exports = db;