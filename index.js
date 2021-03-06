// load library express 
const { request, response } = require("express")
let express = require("express")
const req = require("express/lib/request")

// inisiasi objek baru dari express
let app = express()

// endpoint pertama
app.get("/test",(request, response) => {
    let kata = `Fear Of God`
    return response.json({
        message: kata,
        nama: "Lexa",
        age: 150
    })
})

// endpoint 2 : hitung BMI
// request data : tinggi, berat,
// response data : nilai BMI dan status kategori BMI

// setting agar dapat membaca data request dengan format json 
app.use(express.json())

app.post("/bmi",(request, response) =>{
    // tampung data tinggi dan beratnya
    let tinggi = request.body.tinggi
    let berat = request.body.berat

    let bmi = berat / (tinggi * tinggi)

    let status = null 

    if (bmi < 18.5 ){
        status = `Kurang Gizi`
    }else if(bmi >= 18.5 && bmi < 25){
        status = `Ideal`
    }else if(bmi >= 25 && bmi < 30){
        status = `Berat Badan Lebih`
    }else if(bmi >= 30){
        status = `Obesitas`
    }

    return response.json({
        nilai : bmi,
        status : status
    })
})

// end point ketiga (request with GET Method)
app.get("/profile/:nama/:usia", (request, response) => {
    // tampung data yang dikirimkan
    let nama = request.params.nama
    let usia = request.params.usia

    let status = null
    
    if(usia < 10){
        status = `Anak-Anak`
    } else if (usia >=10 && usia <=20){
        status = `Remaja`
    } else if (usia > 20 && usia < 50){
        status = `Dewasa`
    }else if (usia >= 50){
        status = `Tua`
    }

    return response.json({
        message : `Saya ${nama} adalah ${status}`
    })
})


/* app.post("/sortdata", (request, response) => {
    let data = request.body.data
    let key = request.body.key
    let type = request.body.type

    for (let i = 0; i < data.length; i++) {
        for (let j = i; j < data.length; j++) {
            if (key === "nama") {
                if (type === "ascending") {
                    if (data[j].nama <= data[i].nama) {
                    }
                    //    tukar data
                    let bantuan = data[i]
                    data[i] = data[j]
                    data[j] = bantuan

                } else if (type === "descending") {
                    if (data[j].nama <= data[i].nama) {
                        //    tukar data
                        let bantuan = data[i]
                        data[i] = data[j]
                        data[j] = bantuan
                    }
                }

                if (key === "nis") {
                    if (type === "ascending") {
                        if (data[j].nis <= data[i].nis) {
                        }
                        //    tukar data
                        let bantuan = data[i]
                        data[i] = data[j]
                        data[j] = bantuan

                    } else if (type === "descending") {
                        if (data[j].nis <= data[i].nis) {
                            //    tukar data
                            let bantuan = data[i]
                            data[i] = data[j]
                            data[j] = bantuan
                        }
                    }

                    if (key === "umur") {
                        if (type === "ascending") {
                            if (data[j].umur <= data[i].umur) {
                            }
                            //    tukar data
                            let bantuan = data[i]
                            data[i] = data[j]
                            data[j] = bantuan

                        } else if (type === "descending") {
                            if (data[j].umur <= data[i].umur) {
                                //    tukar data
                                let bantuan = data[i]
                                data[i] = data[j]
                                data[j] = bantuan
                            }
                        }
                    }
                }
            }
        }
    }

                return response.json({
                    data: data
                })
            })
*/      

app.listen(8000, () => {
    console.log(`Server run on port 8000`);
})