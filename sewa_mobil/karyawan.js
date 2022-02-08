// inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require ("cors")
const mysql = require("mysql")

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

// end-point akses data karyawan
app.get("/karyawan", (req, res) => {
    // create sql query
    let sql = "select * from karyawan"

    //run query 
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                karyawan: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data karyawan id_karyawan tertentu
app.get("/karyawan/:id", (req, res) => {
    let data = {
        id_karyawan: req.params.id
    }

    // create sql query
    let sql = "select * from karyawan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                karyawan: result
            }
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data karyawan
app.post("/karyawan", (req, res) => {

    // prepare data
    let data = {
        id_karyawan: req.body.id_karyawan,
        nama_karyawan: req.body.nama_karyawan,
        alamat_karyawan: req.body.alamat_karyawan,
        kontak: req.body.kontak,
        username: req.body.username,
        password: req.body.password
    }

    // create sql query insert
    let sql = "insert into karyawan set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted bestie purr"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data karyawan
app.put("/karyawan", (req, res) => {
    
    // prepare data
    let data = [
        // data
        {
            id_karyawan: req.body.id_karyawan,
            nama_karyawan: req.body.nama_karyawan,
            alamat_karyawan: req.body.alamat_karyawan,
            kontak: req.body.kontak,
            username: req.body.username,
            password: req.body.password
        },

        // parameter (primary key)
        {
            id_karyawan: req.body.id_karyawan
        }
    ]

    // create sql query update
    let sql = "update karyawan set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated bestie purr"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data karyawan berdasarkan id_karyawan
app.delete("/karyawan/:id", (req, res) => {
    // prepare data
    let data = {
        id_karyawan: req.params.id
    }

    // create query sql delet
    let sql = "delete from karyawan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted bestie purr"
            }
        }
        res.json(response) // send response
    })
})

app.listen(8000, () => {
    console.log("Run on port 8000 bestie purr");
})