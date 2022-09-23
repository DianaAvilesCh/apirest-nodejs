const tf = require('@tensorflow/tfjs-node');
//const tfc = require('@tensorflow/tfjs-converter');
const tf2 = require('@tensorflow/tfjs');
var fs = require("fs");

async function init(base) {
    console.log(base);

    model = await tf2.loadGraphModel("https://recycle-trash.herokuapp.com/Model/model.json");

    console.log('model loaded from storage');

    const IMAGE_FILE_PATH = process.cwd()+base;
    console.log(IMAGE_FILE_PATH);
    
    const buf = fs.readFileSync(IMAGE_FILE_PATH);
    const input = tf.node.decodePng(buf);

    pred = model.predict(input.expandDims(0).resizeNearestNeighbor([256,256]).toFloat());

    pred.print();
    console.log("End of predict function");
    //This array is encoded with index i = corresponding emotion. In dataset, 0 = Angry, 1 = Disgust, 2 = Fear, 3 = Happy, 4 = Sad, 5 = Surprise and 6 = Neutral
    category = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash'];
    //At which index in tensor we get the largest value ?

        var resultado = pred.dataSync();
        var mayor= resultado.indexOf(Math.max.apply(null,resultado));
        console.log(category[mayor]);
        return category[mayor];        
}

module.exports = {
    "init": init
}