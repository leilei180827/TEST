const Canvas = require("canvas");
const { WIDTH, HEIGHT,CIRCLE_RADIUS } = require("../config/constants");
const { generateImageData,generateSortedImageData } = require("./generateImageDate");

function drawRectangleImage(isSorted) {
  const imageRGBData =isSorted ? generateSortedImageData():generateImageData();
  const canvas = Canvas.createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");
  const image = ctx.createImageData(WIDTH, HEIGHT);
  // console.log(image);
  const data = image.data;
  let length = HEIGHT * WIDTH * 4;

  for (let i = 0; i < length; i += 4) {
    data[i] = imageRGBData[i]; // full red
    data[i + 1] = imageRGBData[i + 1]; // no green
    data[i + 2] = imageRGBData[i + 2]; // no blue
    data[i + 3] = imageRGBData[i + 3]; // fully opaque
  }
  ctx.putImageData(image, 0, 0);
  return canvas;
}

function drawCircleImage(isSorted) {
   const imageRGBData =isSorted ? generateSortedImageData():generateImageData();
  const canvas = Canvas.createCanvas(2*CIRCLE_RADIUS, 2*CIRCLE_RADIUS);
  const ctx = canvas.getContext("2d");
  drawCircle(ctx, imageRGBData);
  return canvas;
}

function drawCircle(ctx, RGBData) {
  // let colorIndex = 0;
  // let colorIndex = isLeftHalf ? 0 : 128 * 128;
  // let radius = HEIGHT / 2;
  let image = ctx.createImageData(2 * CIRCLE_RADIUS, 2 * CIRCLE_RADIUS);
  let data = image.data;

  for (let x = -CIRCLE_RADIUS; x < CIRCLE_RADIUS; x++) {
    for (let y = -CIRCLE_RADIUS; y < CIRCLE_RADIUS; y++) {
      let distance = Math.sqrt(x * x + y * y);

      if (distance > CIRCLE_RADIUS) {
        // skip all (x,y) coordinates that are outside of the circle
        continue;
      }

      // Figure out the starting index of this pixel in the image data array.
      let rowLength = 2 * CIRCLE_RADIUS;
      let adjustedX = x + CIRCLE_RADIUS; // convert x from [-50, 50] to [0, 100] (the coordinates of the image data array)
      let adjustedY = y + CIRCLE_RADIUS; // convert y from [-50, 50] to [0, 100] (the coordinates of the image data array)
      let pixelWidth = 4; // each pixel requires 4 slots in the data array
      let index = (adjustedX + adjustedY * rowLength) * pixelWidth;
      // data[index] = RGBData[colorIndex];
      // data[index + 1] = RGBData[colorIndex + 1];
      // data[index + 2] = RGBData[colorIndex + 2];
      // data[index + 3] = RGBData[colorIndex + 3];
      // colorIndex += 4;
      data[index] = RGBData[index];
      data[index + 1] = RGBData[index + 1];
      data[index + 2] = RGBData[index + 2];
      data[index + 3] = RGBData[index + 3];
      // colorIndex += 4;
    }
  }
  // isLeftHalf ? ctx.putImageData(image, 0, 0) : ctx.putImageData(image, 12, 0);
  ctx.putImageData(image, 0, 0);
  // return canvas;
}

module.exports = { drawRectangleImage, drawCircleImage };
