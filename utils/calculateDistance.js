function RGBDistance(a,b){
    return Math.pow((a[0]-b[0]),2)+Math.pow((a[1]-b[1]),2)+Math.pow((a[2]-b[2]),2)
}
function RGBGrayLevel(a,b) { 
    return (a[0]-b[0])*0.299 + (a[1]-b[1])*0.587 + (a[2]-b[2])*0.114;
}
function indexDistance(a,b){
    return Math.pow((a[0]-b[0]),2)+Math.pow((a[1]-b[1]),2)
}
function HSVDistance(a,b){
    return Math.pow((a[0]-b[0]),2)+Math.pow((a[1]-b[1]),2)
}
// function calculateDistance(x, y) { 
//     x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0)
// }
/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, v ];
}
function colourWeightDistance(a,b)
{
    let rMean = ( a[0] + b[0] )/2;
    let rDiff = a[0] - b[0];
    let gDiff = a[1] - b[1];
    let bDiff = a[2] - b[2];
    let weightR = 2 + rMean/256;
    let weightG = 4.0;
    let weightB = 2 + (255-rMean)/256;
    return Math.sqrt(weightR*rDiff*rDiff + weightG*gDiff*gDiff + weightB*bDiff*bDiff);
}
module.exports = {RGBDistance,indexDistance,RGBGrayLevel,colourWeightDistance}