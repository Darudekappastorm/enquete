const spawn = require("./spawn");
const login = require("./authentication/login");

const createPoll = require("./poll/create");
const getAllPolls = require("./poll/polls");
const editPoll = require("./poll/update");
const handInPoll = require("./poll/handIn");
const getPollResults = require("./poll/results");
const deletePoll = require("./poll/delete");

module.exports = {
  spawn,
  login,
  createPoll,
  getAllPolls,
  editPoll,
  handInPoll,
  getPollResults,
  deletePoll
};
