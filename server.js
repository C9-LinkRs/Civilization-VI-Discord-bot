"use strict";

let express = require("express");
const bodyParser = require("body-parser");
let EventEmitter = require("events");

let app = express();

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

class Server extends EventEmitter {
  init() {
    app.get("/", (request, response) => {
      response.status(200).json({ "message": "Server's up!" });
    });

    app.post("/webhook/:channelId", (request, response) => {
      let body = request.body;
      let channelId = request.params.channelId;

      response.status(200).json({ "message": "Done!" });

      this.emit("turn", channelId, body.value2, body.value3, body.value1);
    });

    app.listen(process.env.NODEJS_PORT, () => {
      console.log(`Server is up and listening in port ${process.env.NODEJS_PORT}`);
    });
  }
}

const server = new Server();
server.init();

module.exports = server;