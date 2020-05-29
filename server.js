"use strict";

let express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.status(200).json({ "message": "Server's up!" });
});

app.post("/webhook", (request, response) => {
  response.status(200).json({ "civilization vi": request.body });
});

app.listen(process.env.NODEJS_PORT, () => {
  console.log(`Server is up and listening in port ${process.env.NODEJS_PORT}`);
});