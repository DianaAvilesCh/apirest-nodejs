const tf = require('@tensorflow/tfjs-node');
const tfc = require('@tensorflow/tfjs-converter');
const tf2 = require('@tensorflow/tfjs');
var fs = require("fs");


async function init(base) {

    model = await tf2.loadGraphModel("https://recycle-trash.herokuapp.com/Model/model.json");
    console.log('model loaded from storage');
    const str = undefined;
    //const input;
    //   const imageBuffer = fs.readFileSync('./image/stack-abuse-logo-out.png.PNG',{encoding:'utf8',flag:'r'});
    //const tensor = tf.node.decodeImage(imageBuffer);
    //const myimg = await loadImage('./image/stack-abuse-logo-out.png.PNG');
    // Check if the file exists in the current directory.
    //c = fs.readFileSync('./image/stack-abuse-logo-out.png.PNG');
    //  let p = new PNG(c);
    //img = base;
    //var logotipo = new Image(249,28);
    //img = img.replace(/^data:image\/[a-z]+;base64,/, "");
    var img = base.split("base64,")[1];
    const b = Buffer.from(img, "base64");
    const ten = tf.node.decodeImage(b, 3);

    //logotipo.src= "./image/stack-abuse-logo-out.png.PNG";
    //const tensor = await tf.browser.fromPixels(ten).resizeNearestNeighbor([256, 256]).toFloat()
    path = "/image/stack-abuse-logo-out.png.PNG"
    image_io = io.BytesIO(path.content);
    img = image.load_img(image_io, target_size=(256, 256))

pred = model.predict(img)



   // pred = model.predict(tf.reshape(ten, [1, 256, 256, 3]))
    pred.print()
    console.log("End of predict function")
    //This array is encoded with index i = corresponding emotion. In dataset, 0 = Angry, 1 = Disgust, 2 = Fear, 3 = Happy, 4 = Sad, 5 = Surprise and 6 = Neutral
    category = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']
    //At which index in tensor we get the largest value ?
    pred.data()
        .then((data) => {
            console.log(data)
            output = document.getElementById("results")
            output.innerHTML = ""
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

//init();
module.exports = {
    "init": init
}