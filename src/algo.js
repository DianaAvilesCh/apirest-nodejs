const tf = require('@tensorflow/tfjs-node');
const tfc = require('@tensorflow/tfjs-converter');
const tf2 = require('@tensorflow/tfjs');
var fs = require("fs");
const Jimp = require('jimp');

//async function init(base) {
async function init() {
    model = await tf2.loadGraphModel("https://recycle-trash.herokuapp.com/Model/model.json");
    console.log('model loaded from storage');

    //const IMAGE_FILE_PATH = process.cwd()+base;
    const IMAGE_FILE_PATH = process.cwd() + '/image/images09132022-085916.png';
    
    const buf = fs.readFileSync(IMAGE_FILE_PATH);
    const input = tf.node.decodeImage(buf);

    //const tensor = await tf.browser.fromPixels(input).resizeNearestNeighbor([256,256]).toFloat()
    //pred = model.predict(tensor)

    //pred = model.predict(input.expandDims(0));
    pred = model.predict(input.expandDims(0).resizeNearestNeighbor([256,256]).toFloat())

    // pred = model.predict(tf.reshape(ten, [1, 256, 256, 3]))
    pred.print()
    console.log("End of predict function")
    //This array is encoded with index i = corresponding emotion. In dataset, 0 = Angry, 1 = Disgust, 2 = Fear, 3 = Happy, 4 = Sad, 5 = Surprise and 6 = Neutral
    category = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']
    //At which index in tensor we get the largest value ?
    pred.data()
        .then((data) => {
            console.log(data)
            max_val = -1
            max_val_index = -1
            for (let i = 0; i < data.length; i++) {
                if (data[i] > max_val) {
                    max_val = data[i]
                    max_val_index = i
                }
            }
            CATEGORY_DETECTED = category[max_val_index]
            console.log(CATEGORY_DETECTED);

        })
}


async function resize(url) { // Function name is same as of file name
    // Reading Image
    const image = await Jimp.read
        (url);
    image.resize(256, 256, function (err) {
        if (err) throw err;
    })
        .write("./image/Rimages09132022-085916.png");
}

init();
module.exports = {
    "init": init
}