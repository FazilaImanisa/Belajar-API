const { request } = require("express")
const express = require("express")
const app = express()

// set to read a request data on JSON format
app.use(express.json())

// JSON is STRING

app.post("/ages",(request, response) => {
    // store the request data
    let data = request.body.ages
    let jmlRemaja = 0, jmlTua = 0, jmlDewasa = 0
    
    for (let i = 0; i < data.length; i++) {
        if(data[i].umur >= 12 && data[i].umur <= 24){
            jmlRemaja+=1
        }
        if(data[i].umur >= 25 && data[i].umur <= 55){
            jmlDewasa+=1
        }
        if(data[i].umur >55){
            jmlTua+=1
        }
    }

    //give a response data
    return response.json({
        "jumlah_remaja" : jmlRemaja,
        "jumlah_dewasa" : jmlDewasa,
        "jumlah_tua" : jmlTua
    })
})

// endpoint soal kedua
app.post("/belanja",(request, response) => {
    let belanja = request.body.belanja
    let total = 0, totalBayar = 0
    let ppn = 0

    for (let i = 0; i < belanja.length; i++) {
        total += belanja[i].harga * belanja[i].jumlah
    }

    ppn = 10/100 * total
    totalBayar += ppn + total

    return response.json({
        "ppn" : ppn,
        "total" : totalBayar
    })
})

// endpoint ketiga
app.post("/pecahan",(request,response) => {
    let duit = request.body.duit
    let pecahanUang = [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100]
    let hasil = []

    for (let i = 0; i < pecahanUang.length; i++) {
        if (duit >= pecahanUang[i]) {
                let jmlUang = Math.floor (duit/pecahanUang[i])
                duit -= (jmlUang * pecahanUang[i])

                hasil.push ({
                    pecahan : pecahanUang[i],
                    jumlah : jmlUang
                })
        }
    }

    return response.json({
        hasil_pecahan : hasil
    })
})

// endpoint keempat
app.post("/nilai", (request, response) => {
    let nilai = request.body.nilai
    let tunggal = 0
    let rata = 0
    let lulus = []
    let tidaklulus = []

    for (let i= 0; i < nilai.length; i++) {
        rata+= (nilai[i].math + nilai[i].english) / 8
    }

    for (let i= 0; i < nilai.length; i++) {
        tunggal= (nilai[i].math + nilai[i].english) / 2
        if (tunggal >= rata  ){
            lulus.push(nilai[i].nama)
        }else if (tunggal < rata ) {
            tidaklulus.push(nilai[i].nama)
        }
    }

    return response.json({
        "lulus" :  lulus,
        "tidaklulus" : tidaklulus,
        "rata": rata
    })
})



app.listen(8000, ()=> {
    console.log(`Server runnnnnn bestie on port 8000`);
})