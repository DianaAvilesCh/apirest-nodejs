const express = require('express');
const app = express();
const morgan = require('morgan');
const ba64 = require("ba64");
const pre = require('./predict');

//middleware
app.use(morgan('dev'));

//starting th server
app.use(express.json());

//const foto =[]

app.get('/',(req, res) =>{
    res.send('Node js');
});

app.post('/api/foto', (req, res) => {
    var data = req.body.fotografias;
    var moment = require('moment');
    var now = moment().format("DDMMYYYY-HHmmss");
    data_url = data;
    var nombre = `./image/image${now}`;
    ba64.writeImageSync(nombre, data_url);
    pre.init(data);
    res.send("hpla");
});
//node src/index.js  
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));