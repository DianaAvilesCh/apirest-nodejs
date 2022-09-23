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
    const input = tf.node.decodeImage(buf);
    var response = "";

    pred = model.predict(input.expandDims(0).resizeNearestNeighbor([256,256]).toFloat());

    pred.print();
    console.log("End of predict function");
    //This array is encoded with index i = corresponding emotion. In dataset, 0 = Angry, 1 = Disgust, 2 = Fear, 3 = Happy, 4 = Sad, 5 = Surprise and 6 = Neutral
    category = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash'];
    //At which index in tensor we get the largest value ?
    /* console.log("DOS");
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
            response += category[max_val_index]
            return response
        });
 */

        console.log(pred.arraySync()[1]);
        /* for (let i = 0; i < pred.data().length; i++) {
            max_val = -1
            max_val_index = -1
            for (let i = 0; i < data.length; i++) {
                if (data[i] > max_val) {
                    max_val = data[i]
                    max_val_index = i
                }
            }
          } */
        
}

module.exports = {
    "init": init
}