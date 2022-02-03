const { request } = require("express")
const express = require("express")
const app = express()

app.use(express.json())

app.post("/search",(request,response) => {
    let keyword = request.body.keyword
    let found = []

    let data = [
            {nis : 101, nama: "Adinda", alamat : "Araya"},
            {nis : 102, nama: "Andika", alamat : "Sawoiaiar"},
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

        return response.ison({
            found
        })
})

app.post("/sorting",(request,response) =>{
    let data = request.body.data
    let keyword = request.body.keyword
    let type = request.body.keyword

    data.sort((a,b) => {
        return a.umur - b.umur;
    });

    if (keyword === "nama") {
        if (type === "ascending") {
            data.sort((a,b) => {
                return a.nama - b.nama;
            });

        } else if (type === "descending") {
            data.sort((a,b) => {
                    return b.nama - a.nama;
                });
        }

        if (keyword === "nis") {
            if (type === "ascending") {
                data.sort((a,b) => {
                    return a.nis - b.nis;
                });

            } else if (type === "descending") {
                data.sort((a,b) => {
                    return b.nis - a.nis;
                });
            }

            if (keyword === "umur") {
                if (type === "ascending") {
                    data.sort((a,b) => {
                        return a.umur - b.umur;
                    });

                } else if (type === "descending") {
                    data.sort((a,b) => {
                        return b.umur - a.umur;
                    });
                }
            }
        }

        return response.json({
            data : data
        })
    }
})

/*  {
    "data" : [
        {"nis" : 100, "nama" : "Peter", "umur" : 20},
        {"nis" : 101, "nama" : "iohn", "umur" : 35},
        {"nis" : 102, "nama" : "Dormamu", "umur" : 29}
    ]
} */
app.listen(8000, ()=> {
    console.log(`Server runnnnnn bestie on port 8000`);
})