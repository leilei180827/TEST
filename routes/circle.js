const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const { drawCircleImage } = require("../utils/drawImages");
router.get("/", (req, res) => {
  fs.access("./images/circle.png", (err) => {
    //image not exists, need to generate it
    if (err) {
      const canvas = drawCircleImage(false);
      const filePath = path.join(
        __dirname,
        "..",
        "public",
        "images",
        "circle1.png"
      );
      var buf = canvas.toBuffer();
      fs.writeFileSync(filePath, buf);
    }
    const url = req.protocol + "://" + req.headers.host + "/images/circle1.png";
    // image exists,response the URL
    res.status(200).json({
      success: true,
      imageType: "circle",
      imageSource: url,
    });
  });
});
router.get("/sorted", (req, res) => {
  fs.access("./images/circle-sorted-withoutIndependentIndex.png", (err) => {
    //image not exists, need to generate it
    if (err) {
      const canvas = drawCircleImage(true);
      const filePath = path.join(
        __dirname,
        "..",
        "public",
        "images",
        "circle-sorted-withoutIndependentIndex.png"
      );
      var buf = canvas.toBuffer();
      fs.writeFileSync(filePath, buf);
    }
    const url = req.protocol + "://" + req.headers.host + "/images/circle-sorted-withoutIndependentIndex.png";
    // image exists,response the URL
    res.status(200).json({
      success: true,
      imageType: "circle",
      imageSource: url,
    });
  });
});
module.exports = router;
