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

// end-point akses data sewa
app.get("/sewa", (req, res) => {
    // create sql query
    let sql = "select * from sewa"

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
                sewa: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data sewa id_sewa tertentu
app.get("/sewa/:id", (req, res) => {
    let data = {
        id_sewa: req.params.id
    }

    // create sql query
    let sql = "select * from sewa where ?"

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
                sewa: result
            }
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data sewa
app.post("/sewa", (req, res) => {

    // prepare data
    let data = {
        id_sewa: req.body.id_sewa,
        id_mobil: req.body.id_mobil,
        id_karyawan: req.body.id_karyawan,
        id_pelanggan: req.body.id_pelanggan,
        tgl_sewa: req.body.tgl_sewa,
        tgl_kembali: req.body.tgl_kembali,
        total_bayar: req.body.total_bayar
    }

    // create sql query insert
    let sql = "insert into sewa set ?"

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

// end-point mengubah data sewa
app.put("/sewa", (req, res) => {
    
    // prepare data
    let data = [
        // data
        {
            id_sewa: req.body.id_sewa,
            id_mobil: req.body.id_mobil,
            id_karyawan: req.body.id_karyawan,
            id_pelanggan: req.body.id_pelanggan,
            tgl_sewa: req.body.tgl_sewa,
            tgl_kembali: req.body.tgl_kembali,
            total_bayar: req.body.total_bayar
        },

        // parameter (primary key)
        {
            id_sewa: req.body.id_sewa
        }
    ]

    // create sql query update
    let sql = "update sewa set ? where ?"

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

// end-point menghapus data sewa berdasarkan id_sewa
app.delete("/sewa/:id", (req, res) => {
    // prepare data
    let data = {
        id_sewa: req.params.id
    }

    // create query sql delet
    let sql = "delete from sewa where ?"

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