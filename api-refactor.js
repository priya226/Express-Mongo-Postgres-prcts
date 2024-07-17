const fs = require("fs");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
app = express();
app.use(express.json());
const tours = JSON.parse(fs.readFileSync(`./dev-data/tour.json`));

//Get all tours refactor
getAllTours = (req, res) => {
  console.log("inside getAllTours");
  res.status(200).send({
    message: "success",
    status: "OK",
    result: tours,
  });
};

//Refactoring code for tour detail by ID
getTourbyId = (req, res) => {
  console.log(req.params.id);
  const tour = tours.find((data, index) => data._id == req.params.id);
  // console.log(tour)
  if (tour) {
    res.status(200).send({
      status: "success",
      result: tour,
    });
  } else {
    res.status(200).send({
      status: "success",
      message: "no result found",
      result: null,
    });
  }
};

//Post new data
postNewTourData = (req, res) => {
  console.log(
    "when event for post triggered see parse data of req body",
    req.body,
    "===============",
  );
  let data = req.body;
  console.log("adding data===============");
  if (data.name && data.duration && data.difficulty && data.price) {
    console.log("enter inside if===========");
    console.log(tours.length);
    tours.push({ ...data, _id: uuidv4() });
    console.log(tours.length);
    fs.writeFile(
      `${__dirname}/dev-data/tour.json`,
      JSON.stringify(tours),
      (err, data) => {
        if (err) {
          res.status(500).send({
            status: "internal server error",
            mesage: "unable to write data",
          });
          return;
        }
        res.status(200).send({
          status: "success",
          mesage: "added data into database",
          result: data,
        });
      },
    );
  } else {
    res.status(400).send({
      status: "bad request",
      mesage: "incorrect data",
    });
  }
};

//RefactorCode of delete tour
deleteTour = (req, res) => {
  console.log(req.params.id);
  const tourIndex = tours.findIndex((data, index) => data._id == req.params.id);
  // console.log(tour)
  if (tourIndex > -1) {
    tours.splice(tourIndex, 1);
    fs.writeFile(`./dev-data/tour1.json`, JSON.stringify(tours), (error) => {
      if (error) {
        res.status(404).send({
          status: "failed",
          message: "failed to update database",
          result: null,
        });
      } else {
        res.status(200).send({
          status: "success",
          message: "successfully deleted",
          result: null,
        });
      }
    });
  } else {
    res.status(400).send({
      status: "success",
      message: "no result found",
      result: null,
    });
  }
};

function logMiddleWare(req, res, next) {
  console.log(req.method, "method called");
  next();
  //Calling next()
  //passes control to the next middleware function
  // or route handler.
}

app.get("/", (req, res) => {
  res.status(200).send({
    message: "hit the server",
  });
});

/**
 * app.get("/api/v1/tour", getAllTours);

//  * When you register middleware using app.use()
//  * or specify it with an HTTP method (app.get(),
//  *  app.post(), etc.), Express automatically provides
//  * the req, res, and next parameters to your middleware
//  * function when a matching request comes in.
 
app.use(logMiddleWare);

// Not using next will not complete req it will stop there only
app.use((req, res, next) => {
  req.requesTime = Date().toString();
  console.log(req.requesTime);
  next();
});

app.get("/api/v1/tour/:id", getTourbyId);

app.post("/api/v1/tour", postNewTourData);

app.delete("/api/v1/tour/:id", deleteTour);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} `);
  next();
});

 */
// A middleware created its intace of Route
//This router object is like a mini-application in itself,
//capable of handling middleware and routing
//just like the main Express application.
const tourRouter = express.Router();

app.use("/api/v1/tour", tourRouter);
//any req from this path is is handle by tourRouter

// this will act as sub-application easily reable reusable code
// we can chain http methods that are being used to this path
tourRouter.route("/").get(getAllTours).post(postNewTourData);

tourRouter.route("/:id").get(getTourbyId).delete(deleteTour);

app.listen(4448, () => {
  console.log("listening.... at the port 4448");
});
