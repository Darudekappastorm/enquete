const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const cors = require("cors");
const routes = require("./routes");

const models = require("./models");
const v = require("node-input-validator");
const CONFIG = require("./config/config.json");

class AuthenticationService {
  async start() {
    this.app = express();
    this.configure();
    this.database = await this.setupDatabase();
    this.setupRouting();
    this.app.listen(9000, () =>
      console.log("ADMIN service listening on port 9000")
    );
  }

  configure() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  async setupDatabase() {
    try {
      const { host, port, username, password, database } = CONFIG.database;
      await mongoose.connect(
        `mongodb://${username}:${password}@${host}:${port}/${database}`,
        { useNewUrlParser: true }
      );
      return {
        connection: mongoose.connection,
        models: models
      };
    } catch (ex) {
      throw ex;
    }
  }

  setupRouting() {
    this.app.post("/api/admin/spawn", (req, res) => routes.spawn(req, res, v));
    this.app.post("/api/admin/login", (req, res) =>
      routes.login(this, req, res)
    );
    this.app.post("/api/admin/createPoll", (req, res) =>
      routes.createPoll(this, req, res)
    );
    this.app.post("/api/admin/getAllPolls", (req, res) =>
      routes.getAllPolls(this, req, res)
    );
    this.app.post("/api/admin/editPoll", (req, res) => {
      routes.editPoll(this, req, res);
    });
    this.app.post("/api/admin/handInPoll", (req, res) => {
      routes.handInPoll(this, req, res);
    });
    this.app.post("/api/admin/getPollResults", (req, res) => {
      routes.getPollResults(this, req, res);
    });
    this.app.post("/api/admin/deletePoll", (req, res) => {
      routes.deletePoll(this, req, res);
    });
  }
}

const service = new AuthenticationService();
service.start();
