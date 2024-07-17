const axios = require("axios");

const postdata = {
  name: "NewZealand",
  duration: 20,
  difficulty: "medium",
  price: 2000,
  email: "abc1@gmail.com",
};

// axios
//   .post(`http://localhost:4448/api/v1/tour`, postdata)
//   .then((res) => console.log("Response:", res.status))
//   .catch((err) => console.log(err.message));

// axios
//   .delete(`http://localhost:4448/api/v1/tour/1`)
//   .then((res) => console.log("Response:", res.message))
//   .catch((err) => console.log(err.message));

// axios
//   .post(`http://localhost:4000/api/v2/tour`, postdata)
//   .then((res) => console.log("Response:", res.status))
//   .catch((err) => console.log(err.message, "ERR"));

let updateData = {
  price: 8001,
};
let updateData2 = {
  price: "8001", // this will also go as integer only
  email: "data1@gmail.com",
};
let updateData3 = {
  price: "bccf", // this will fail
};
let updateData4 = {
  // this will also fail as we have validation
  email: "data1",
};
axios
  .patch(
    `http://localhost:4000/api/v2/tour/6694b21e734fd5c06f988e47`,
    updateData4,
  )
  .then((res) => {
    console.log("Response:", res.status);
  })
  .catch((err) => console.log(err.message, "ERR"));
