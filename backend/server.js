const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json());

// const appmajor = express()
// app.use(cors())
// app.use(express.json());

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})

app.get('/',(req,res)=>{
    const sql = "SELECT student.id, student.fname, student.lname, student.phone, major.major_name FROM student INNER JOIN major ON student.major_id = major.major_id;";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/major',(req,res)=>{
    const sql = "SELECT * FROM `major`";
    // const id = req.params.id;
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/create',(req,res)=>{
    const sql = "INSERT INTO student (`id`,`fname`,`lname`,`phone`,`major_id`) VALUES(?)";
    const values = [
        req.body.id,
        req.body.fname,
        req.body.lname,
        req.body.phone,
        req.body.major_id,
    ]
    db.query(sql, [values],(err, data)=>{
        if(err) return res.json(err);
        return res.json("created");
    })
})

app.put('/update/:id',(req,res)=>{
    const sql = "UPDATE student set `fname` = ?,`lname` = ?,`phone` = ?,`major_id` = ? WHERE id = ?";
    const id = req.params.id;
    const values = [
        req.body.fname,
        req.body.lname,
        req.body.phone,
        req.body.major_id,
    ]
    db.query(sql, [...values, id],(err, data)=>{
        if(err) return res.json(err);
        return res.json("updated");
    })
})
app.get('/update/:id',(req,res)=>{
    const sql = "SELECT * FROM `student` WHERE id = ?";
    const id = req.params.id;

    db.query(sql,[id], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.delete('/delete/:id',(req,res)=>{
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id],(err, data)=>{
        if(err) return res.json(err);
        return res.json("deleted");
    })
    
})

app.listen(5000,()=>{
    console.log('Listening 5000 .....')
})