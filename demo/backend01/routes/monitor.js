const express = require("express");
const router = express.Router();

module.exports = app => {
  const { apiController } = app.controller;
  router.post("/visit", apiController.newVisitor);
  router.post("/monitor", apiController.getLogByUrl);
  router.get("/pv", apiController.getPvLog);
  router.get("/ip", apiController.getIP);
  router.get("/analyzeBlogDate", apiController.analyzeBlogDate);

  return router;
}