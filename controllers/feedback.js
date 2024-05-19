const feedbackRoute = require("express").Router();
const React = require("react");
const connection = require("../connection");
//const { autherizationMiddleware } = require("../util");

feedbackRoute.post("/insert-feedback", async (request, response) => {
  try {
    const body = request?.body;
    console.log("Body", request?.body);
    //const auth = autherizationMiddleware({
      //req: request,
      //connection: connection,
   // });
    //console.log("auth", auth);
    //create user object with jwt token

    let sqlQuery = `INSERT INTO feedback( feedback, rating) VALUES ("${body?.feedback}","${body?.rating}")`;
    let query = connection.query(sqlQuery, (error, result) => {
      if (error) {
        console.log("error in inserting feedback. line 57", error);
        throw error;
      } else {
        console.log("results:", result);
        response.json({
          message: "Data inserted",
          status: "ok",
          data: {},
        });
      }
    });
  } catch (e) {
    console.log("error in catch block", e);
    response.json({
      message: "Data could not be inserted",
      status: "failed",
      data: e,
    });
  }
});
// list all
feedbackRoute.get("/list-feedback", (request, response) => {
  let sqlQuery = "SELECT * FROM feedback";

  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in listing feedback. line 31", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data list",
        status: "ok",
        data: result,
      });
    }
  });
});
// get feedback according to id
feedbackRoute.get("/feedback/:id", (request, response) => {
  let sqlQuery = `SELECT * FROM feedback WHERE f_id=${request?.params?.id}`;
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in feedback. line 44", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data feedback",
        status: "ok",
        data: result,
      });
    }
  });
});

// delete feedback
feedbackRoute.delete("/feedback/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `DELETE  FROM feedback WHERE f_id=${request?.params?.id}`;
  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in deleting feedback. line 57", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data deleted",
        status: "ok",
        data: result,
      });
    }
  });
});

// update feedback
feedbackRoute.put("/feedback/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `UPDATE feedback SET f_id = '3' WHERE f_Id = '${request?.params?.id}'`;

  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in update feedback. line 57", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data updated",
        status: "ok",
        data: result,
      });
    }
  });
});
module.exports = feedbackRoute;
