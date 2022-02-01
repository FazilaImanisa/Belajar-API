const { request } = require("express")
const express = require("express")
const app = express()

app.use(express.json())

app.post("/search",(request,response) => {
    let keyword = request.body.keyword
    let found = []

    let data = [
            {nis : 101, nama: "Adinda", alamat : "Araya"},
            {nis : 102, nama: "Andika", alamat : "Sawojajar"},
            {nis : 103, nama: "Bagus", alamat : "Batu"},
            {nis : 104, nama: "Cantika", alamat : "Paninggilan"},
            {nis : 105, nama: "Delintia", alamat : "Kartika"},
            {nis : 106, nama: "Entung", alamat : "Condet"},
            {nis : 107, nama: "Fazila", alamat : "Tangerang"},
            {nis : 108, nama: "Ginting", alamat : "Canggu"},
            {nis : 109, nama: "Heli", alamat : "Canggu"},
            {nis : 110, nama: "Zidane", alamat : "Tangerang"},
        ]
    
        for (let i = 0; i < data.length; i++) {
            if (keyword == data[i].nis || keyword == data[i].nama || keyword == data[i].alamat) {
                found.push({
                    nis : data[i].nis,
                    nama : data[i].nama,
                    alamat : data[i].alamat
                })
            }
        }

        return response.json({
            found
        })
})

app.listen(8000, ()=> {
    console.log(`Server runnnnnn bestie on port 8000`);
})