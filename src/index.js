const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
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

app.post('/api/foto', async(req, res) => {
    var data = req.body.fotografias;
    var moment = require('moment');
    var now = moment().format("DDMMYYYY-HHmmss");
    data_url = data;
    ba64.writeImageSync(`./image/image${now}`, data_url);
    respuesta = await pre.init(`/image/image${now}.PNG`);
    //respuesta = await pre.init(`/image/images09132022-085916.png`);
    res.send(respuesta);
});
//node src/index.js  
const port = process.env.port || 3000;
httpServer.listen(port, () => console.log(`Escuchando en puerto ${port}...`));