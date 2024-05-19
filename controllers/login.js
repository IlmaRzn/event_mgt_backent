const loginRoute = require("express").Router();
const connection = require("../connection");
var jwt = require("jsonwebtoken");

loginRoute.post("/admin-login", async (request, response) => {
  try {
    const { username, password } = request?.body;
    //check if user name ===admin && password=== admin123
  if (username && password) {
      if (username === "admin" && password === "admin123") {
        const data = {
          token: jwt.sign({ username }, "Dreams-planner"),
          role: "admin",
        };

        response.json({
          message: "logged in ",
          status: "ok",
          data: data,
        });
      } else {
        response.json({
          message: "wrong credentials",
          status: "404",
          data: {},
        });
      }
    } else {
      response.json({
        message: " username and password are required",
        status: "500",
        data: {},
      });
    }
  } catch (err) {}
});
module.exports = loginRoute;
