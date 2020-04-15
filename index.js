const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

let Container = require('./container');

app.post('/carIn', async (req,res) => {
    let data = req.body;
    let response = await Container.GetDataCarIn(data);
    const result = response.map(item => ({
        plat_nomor: item.plat_nomor,
        parking_lot: item.parking_lot,
        tanggal_masuk: item.tanggal_masuk
    }));
    res.status(200).json(result)
})

app.post('/carOut', async (req,res) => {
    let data = req.body.plat_nomor;
    let result = await Container.GetDataCarOut(data);
    res.status(200).json(result)
})

app.post('/report', async (req,res) => {
    let data = req.body.tipe;
    let result = await Container.GetReport(data)
    res.status(200).json(result)
})

app.post('/listbycolor', async (req,res) => {
    let data = req.body.warna;
    let result = await Container.GetListByColor(data);
    res.status(200).json({
        plat_nomor: result
    })
})

app.listen(port, () => console.log(`Server liseting on port ${port}`))