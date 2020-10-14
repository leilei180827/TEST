const { RGBDistance, indexDistance,RGBGrayLevel,colourWeightDistance } = require("./calculateDistance");
const { WIDTH, HEIGHT } = require("../config/constants");
function groupSplit(arr, size) {
  var r = []; //result

  function _(t, a, n) {
    //tempArr, arr, num
    if (n === 0) {
      r[r.length] = t;
      return;
    }
    for (var i = 0, l = a.length - n; i <= l; i++) {
      var b = t.slice();
      b.push(a[i]);
      _(b, a.slice(i + 1), n - 1);
    }
  }
  _([], arr, size);
  return r;
}
function generateSortedImageData() {
  let a = [];
  let result = new Array(WIDTH*HEIGHT*4).fill(0);
  let imageSortedRGBData = [];
  let indexRGB =[];

  for (let i = 8; i <= 256; i = i + 8) {
    i === 256 ? a.push(i - 1) : a.push(i);
  }
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length; j++) {
      for (let k = 0; k < a.length; k++) {
        imageSortedRGBData.push([a[i],a[j],a[k],255]);
      }
    }
  }
  //sorted according to the distance between colors
  // imageSortedRGBData = imageSortedRGBData.sort((a, b) => RGBDistance(a, [8, 8, 8]) - RGBDistance(b, [8, 8, 8]));
  //sorted according to the gray level
  // imageSortedRGBData = imageSortedRGBData.sort((a, b) => RGBGrayLevel(a, [8, 8, 8])  - RGBGrayLevel(b, [8, 8, 8]));
   //sorted according to weighted
  imageSortedRGBData = imageSortedRGBData.sort((a, b) => colourWeightDistance(a, [8, 8, 8]) - colourWeightDistance(a, [8, 8, 8]));
  for (let i = 0; i < WIDTH; i++) { 
    for (let j = 0; j < HEIGHT; j++) { 
      indexRGB.push([i,j])
    }
  }
  // indexRGB=indexRGB.sort((a, b) => indexDistance(a, [0, 0]) - indexDistance(b, [0, 0]));
  // console.log(indexRGB);
  // console.log(imageSortedRGBData);
  //
  // indexRGB.map((item, index) => { 
  //   let start = (item[0] + item[1] * WIDTH) * 4;
  //   result[start] = imageSortedRGBData[index][0];
  //   result[start + 1] = imageSortedRGBData[index][1];
  //   result[start + 2] = imageSortedRGBData[index][2];
  //   result[start + 3] = imageSortedRGBData[index][3];
  // })
  imageSortedRGBData.map((item, index) => { 
    result[index*4] = item[0];
    result[index*4 + 1] = item[1];
    result[index*4 + 2] = item[2];
    result[index*4 + 3] = item[3];
  })
  return result;
}


function generateImageData() {
  let a = [];
  let imageRGBData = [];

  for (let i = 8; i <= 256; i = i + 8) {
    i === 256 ? a.push(i - 1) : a.push(i);
  }
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length; j++) {
      for (let k = 0; k < a.length; k++) {
        imageRGBData.push(a[i]);
        imageRGBData.push(a[j]);
        imageRGBData.push(a[k]);
        imageRGBData.push(255);
      }
    }
  }
  return imageRGBData;
}

module.exports = { groupSplit, generateImageData,generateSortedImageData };
