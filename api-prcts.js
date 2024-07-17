const express = require("express");
const fs = require("fs");
app = express(); // bunch of functionalities
const port = 4448;
const { v4: uuidv4 } = require("uuid");

// app.get("/", (req, res) => {
//   //   res.status(200).send("Hello from server side");
//   res.status(200).json({
//     message: "Hello from server side",
//     app: "express-mongo",
//   });
// });
// app.post("/", (req, res) => {
//   //   res.status(200).send("Hello from server side");
//   res.status(200).json({
//     message: "Hello from server side",
//     app: "express-mongo",
//   });
// });

/**
 * Middleware in Express provides a powerful mechanism
 *  to modularize and manage the flow of requests
 *  through your application, enhancing flexibility
 * and maintainability.
 *
 *
 * In the context of Express.js,
 * middleware refers to functions
 * that have access to the
 * request (req) and response (res)
 * objects in the application's request-response cycle.
 * These functions can execute code,
 * modify request and response objects,
 * end the request-response cycle,
 * or call the next middleware function in the stack.
 */
/**
 * When a request with a JSON payload is received,
 * express.json() parses the JSON body and populates
 *  the req.body property with the parsed JSON data.
 *  This allows you to access the JSON data in your route handlers.
 * express.json() middleware only parses request bodies
 * that have a Content-Type header of application/json.
 */
app.use(express.json());
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tour.json`));
// app.get("/api/v1/tour", (req, res) => {
//   res.status(200).send({
//     status: "success",
//     total: tours.length,
//     result: {
//       tours,
//     },
//   });
// });

// app.get("/api/v1/tour/:id", (req, res) => {
//   console.log(req.params.id);
//   const tour = tours.find((data,index)=>data._id==req.params.id);
//   // console.log(tour)
//   if(tour){
//     res.status(200).send({
//       status: "success",
//       result: tour,

//     });
//   }
//   else{
//     res.status(200).send({
//       status:'success',
//       message:'no result found',
//       result:null
//     })
//   }

app.patch("api/v1/tour/:id", (req, res) => {
  let id = req.params.id;
  res.status(200).send({
    status: "success",
  });
});

app.delete("/api/v1/tour/:id", (req, res) => {
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
});

// app.post("/api/v1/tour", (req, res) => {
//   console.log(
//     "when event for post triggered see parse data of req body",
//     req.body,"==============="
//   );
//   let data = req.body;
//   console.log('adding data===============')
//   if (data.name && data.duration && data.difficulty && data.price) {
//    console.log('enter inside if===========')
//    console.log(tours.length)
//     tours.push({ ...data, _id: uuidv4() });
//    console.log(tours.length)
//     fs.writeFile(`${__dirname}/dev-data/tour.json`, JSON.stringify(tours),
//     (err,data)=>{
//       if(err){
//         res.status(500).send({
//           status: "internal server error",
//           mesage: "unable to write data",
//         });
//         return
//       }
//       res.status(200).send({
//       status: "success",
//       mesage: "added data into database",
//       result: data,
//        });
//     });

//   } else {
//     res.status(400).send({
//       status: "bad request",
//       mesage: "incorrect data",
//     });
//   }
// });
app.listen(port, () => {
  console.log("server running at port", port);
});
