const mongoose = require("mongoose");
const dbURL =
  "mongodb+srv://pr35:<password_here>@cluster0.uvp3laq.mongodb.net/";
const port = 4000;
const express = require("express");
const app = express();
const tourRoutes = require("./routes/tourRoutes");

// use custom middle ware

function logger(req, res, next) {
  console.log("method: ", req.method, " Url:", req.path);
  next();
}

app.use(express.json());
app.use(logger);
app.use("/api/v2/tour", tourRoutes);

app.get("/", (req, res) => {
  console.log(req.method, " ", req.path);
  res.status(200).send({
    message: "OK",
  });
});

async function serverInit() {
  try {
    await mongoose.connect(dbURL);
    app.listen(port, () => {
      console.log("Conneted to Database & Server is listening at:", port);
    });
  } catch (error) {
    console.log(error);
  }
}

serverInit();
