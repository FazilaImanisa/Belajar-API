// inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require ("cors")
const mysql = require("mysql")
const moment = require("moment")

// implementation
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sewa_mobil"
})

db.connect(error => {
    if (error) {
        console.log(error.message);
    } else {
        console.log("MySQL Connected bestie purr");
    }
})

// end-point menambahkan sewa
app.post("/sewa", (req, res) => {
    // prepare data to sewa
    let data = {
        id_sewa: req.body.id_sewa,
        id_pelanggan: req.body.id_pelanggan,
        id_karyawan: req.body.id_karyawan,
        waktu: moment().format('YYYY-MM-DD HH:mm:ss') // get current time
    }

    // parse to JSON
    let sewa = JSON.parse(req.body.sewa)

    // create query insert to sewa
    let sql = "insert into sewa set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            res.json({message: error.message})
        } else {
            
            // get last inserted id_sewa
            let lastID = result.insertId

            // prepare data to sewa
            let data = []
            for (let index = 0; index < sewa.length; index++) {
                data.push([
                    lastID, sewa[index].id_sewa
                ])  
            }

            // create query insert sewa
            let sql = "insert into sewa values ?"

            db.query(sql, [data], (error, result) => {
                if (error) {
                    res.json({message: error.message})
                } else {
                    res.json({message: "Data has been inserted bestie purr"})
                }
            })
        }
    })
})

// end-point menampilkan data sewa
app.get("/sewa", (req, res) => {
    // create sql query
    let sql = ""
})

// belom kelar sabar ya ges yak