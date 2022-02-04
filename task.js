const { request } = require("express")
const express = require ("express")
const app = express()

app.use(express.json())

app.post("/bruto",(request,response)=>{
    let barang = request.body.barang
    let pack = request.body.pack

    let netto = 0
    let totalharga = 0

    let total = []

    for (let i = 0; i < barang.length; i++) {
        for (let j = 0; j < pack.length; j++) {
            if (barang[i].pack == pack[j].nama_pack) {
                netto = barang[i].bruto - pack[j].berat
                totalharga = netto * barang[i].harga
            }          
        }
        total.push({
            ID : barang[i].id,
            Nama : barang[i].nama,
            Bruto : barang[i].bruto,
            Harga : barang[i].harga,
            Pack : barang[i].pack,
            Netto : netto,
            Total : totalharga
        })
        
    }
    return response.json({
        "Barang" : total
    })
})

/* 
{
    "barang" : [
        {"id" : 1, "nama" : "Beras", "bruto" : 100, "harga" : 15000, "pack" : "karung"},
        {"id" : 2, "nama" : "Gula", "bruto" : 150, "harga" : 11000, "pack" : "karung"},
        {"id" : 3, "nama" : "Minyak", "bruto" : 50, "harga" : 20000, "pack" : "plastik"},
        {"id" : 4, "nama" : "Telur", "bruto" : 200, "harga" : 25000, "pack" : "kayu"},
    ],

    "pack" : [
        {"id_pack" : 1, "nama_pack" : "karung", "berat" : 1 },
        {"id_pack" : 2, "nama_pack" : "plastik", "berat" : 0.5 },
        {"id_pack" : 3, "nama_pack" : "kayu", "berat" : 2 },

    ]
}
*/ 

app.post("/word",(request,response)=>{
    let word = request.body.word
    word = word.toLowerCase()
    
    let konsonan = 0
    let vokal = 0

    for (let i = 0; i < word.length; i++) {
        var char = word.charArt(i);
        if(char.match(/[aeiou]/)){
            vokal++
        }else if(char.match(/[bcdfghjklmnpqrstvwxyz]/)){
            konsonan++;
        }
    }
    return response.json({
        "jumlah huruf vokal" : vokal,
        "jumlah huruf konsonan" : konsonan
    })
})

/*
{
    "word" : "Mokleters"
} 
*/

app.post("/jumlah",(request,response)=>{
    let statement = request.body.statement
    function WordCount(str){
        return str.split(" ").length;
    }
    jumlah = WordCount(statement)

    return response.json({
        jumlah : jumlah
    })
})

/*
{
    "statement" : "Hari ini adalah hari jum'at, sebuah weekend yang dinanti, semoga pekan depan kita
    bisa belajar kembali"
}
*/
app.listen(8000, () => {
    console.log(`Server run bestie on port 8000`);
})