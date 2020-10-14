const { drawRectangleImage } = require("./drawImages");
// var myImage = canvasObject.toDataURL("image/png");
// console.log(myImage);
const canvas = drawRectangleImage();
const filePath = path.join(__dirname, "..", "images", "default.png");
var buf = canvas.toBuffer();
fs.writeFileSync(filePath, buf);
