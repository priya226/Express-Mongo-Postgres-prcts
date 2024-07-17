const Tour = require("./../models/tourModel");

exports.getAllTour = async (req, res) => {
  console.log("reached getAllTour");
  let tours = await Tour.find();
  try {
    res.status(200).send({
      status: "OK",
      message: "tourData find succefully",
      result: {
        data: tours,
      },
    });
  } catch {
    res.status(404).send({
      message: "somethings went wrong",
      status: "error",
    });
  }
};

exports.getTourById = async (req, res) => {
  try {
    // let _id = req.params.id;
    let tour = await Tour.findById(req.params.id);
    res.status(200).send({
      status: "OK",
      message: "succefully retrieve data",
      result: {
        data: tour,
      },
    });
  } catch {
    res.status(404).send({
      status: "Failed",
      message: "Failed to get data",
    });
  }
};

//
exports.postTour = async (req, res) => {
  try {
    console.log("inside postTour");
    // Tour.create().then(); using promise if async await not used
    const tour = await Tour.create(req.body);
    res.status(200).send({
      status: "success",
      message: "saved succefully",
      result: tour,
    });
  } catch (err) {
    res.status(400).send({
      status: "failed",
      message: "Invalid data send",
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    console.log("updateData");
    let tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // to return modified doc
      runValidators: true, // to check validations we defined
    });
    console.log("tour", tour);
    res.status(200).send({
      status: "success",
      message: "saved succefully",
      result: { tour },
    });
  } catch (err) {
    res.status(400).send({
      status: "failed",
      message: "Invalid data send",
    });
  }
};
exports.delteTour = async (req, res) => {
  try {
    // in rESTFUL API we dont send any result for delete ope
    await Tour.findByIdAndDelete(req.params.id);
    req.status(204).send({
      status: "OK",
      message: "deleted succefully",
    });
  } catch {
    req.status(400).send({
      status: "fail",
      message: "failed to delete data",
    });
  }
};
