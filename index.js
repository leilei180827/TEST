const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
const publicPath = path.join(__dirname, "public");
console.log(publicPath);
const rectangleRouter = require("./routes/rectangle");
const circleRouter = require("./routes/circle");
const port = process.env.PORT || 8000;
app.use(express.static(publicPath));

app.use("/api/rectangle", rectangleRouter);
app.use("/api/circle", circleRouter);
app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});
