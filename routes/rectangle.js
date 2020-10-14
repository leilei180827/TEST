const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const { drawRectangleImage } = require("../utils/drawImages");
router.get("/sorted", (req, res) => {
  fs.access("./images/rectangle-weight.png", (err) => {
    //image not exists, need to generate it
    if (err) {
      const canvas = drawRectangleImage(true);
      const filePath = path.join(
        __dirname,
        "..",
        "public",
        "images",
        "rectangle-weight.png"
      );
      var buf = canvas.toBuffer();
      fs.writeFileSync(filePath, buf);
    }
    const url = req.protocol + "://" + req.headers.host + "/images/rectangle-weight.png";
    // image exists,response the URL
    res.status(200).json({
      success: true,
      imageType: "rectangle",
      imageSource: url,
    });
  });
});
router.get("/", (req, res) => {
  fs.access("./images/default.png", (err) => {
    //image not exists, need to generate it
    if (err) {
      const canvas = drawRectangleImage(false);
      const filePath = path.join(
        __dirname,
        "..",
        "public",
        "images",
        "default.png"
      );
      var buf = canvas.toBuffer();
      fs.writeFileSync(filePath, buf);
    }
    const url = req.protocol + "://" + req.headers.host + "/images/default.png";
    // image exists,response the URL
    res.status(200).json({
      success: true,
      imageType: "rectangle",
      imageSource: url,
    });
  });
});
module.exports = router;
