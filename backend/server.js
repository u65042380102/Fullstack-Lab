const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM customer";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json(data);
    });
});

app.get('/menu',(req,res)=>{
    const sql = "SELECT * FROM `menu`";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/create', (req, res) => {
    const sql = "INSERT INTO customer (`name`, `idmenu`) VALUES (?, ?)";
    const values = [
        req.body.name,
        req.body.idmenu
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json("created");
    });
});

app.put('/update/:idcus', (req, res) => {
    const sql = "UPDATE customer SET `name` = ?, `idmenu` = ? WHERE `idcus` = ?";
    const idcus = req.params.idcus;
    const values = [
        req.body.name,
        req.body.idmenu
    ];
    db.query(sql, [...values, idcus], (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json("updated");
    });
});

app.delete('/delete/:idcus', (req, res) => {
    const sql = "DELETE FROM customer WHERE idcus = ?";
    const idcus = req.params.idcus;
    db.query(sql, [idcus], (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json("deleted");
    });
});


app.listen(8082, () => {
    console.log(`Server is running on port`);
});
