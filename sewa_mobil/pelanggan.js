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

// end-point akses data pelanggan
app.get("/pelanggan", (req, res) => {
    // create sql query
    let sql = "select * from pelanggan"

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
                pelanggan: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data pelanggan id_pelanggan tertentu
app.get("/pelanggan/:id", (req, res) => {
    let data = {
        id_pelanggan: req.params.id
    }

    // create sql query
    let sql = "select * from pelanggan where ?"

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
                pelanggan: result
            }
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data pelanggan
app.post("/pelanggan", (req, res) => {

    // prepare data
    let data = {
        id_pelanggan: req.body.id_pelanggan,
        nama_pelanggan: req.body.nama_pelanggan,
        alamat_pelanggan: req.body.alamat_pelanggan,
        kontak: req.body.kontak
    }

    // create sql query insert
    let sql = "insert into pelanggan set ?"

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

// end-point mengubah data pelanggan
app.put("/pelanggan", (req, res) => {
    
    // prepare data
    let data = [
        // data
        {
            id_pelanggan: req.body.id_pelanggan,
            nama_pelanggan: req.body.nama_pelanggan,
            alamat_pelanggan: req.body.alamat_pelanggan,
            kontak: req.body.kontak
        },

        // parameter (primary key)
        {
            id_pelanggan: req.body.id_pelanggan
        }
    ]

    // create sql query update
    let sql = "update pelanggan set ? where ?"

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

// end-point menghapus data pelanggan berdasarkan id_pelanggan
app.delete("/pelanggan/:id", (req, res) => {
    // prepare data
    let data = {
        id_pelanggan: req.params.id
    }

    // create query sql delet
    let sql = "delete from pelanggan where ?"

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