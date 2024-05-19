const hallRoute = require("express").Router();
const connection = require("../connection");

hallRoute.post("/insert-hall", async (request, response) => {
  try {
    const body = request?.body;
    console.log("Body", request?.body);
    //create user object with jwt token

    let sqlQuery = `INSERT INTO hall( description, name, rating, review, picture, contactNo ) VALUES 
    ("${body?.description}","${body?.name}","${body?.rating}","${body?.review}","${body?.picture}","${body?.contactNo}")`;
    let query = connection.query(sqlQuery, (error, result) => {
      if (error) {
        console.log("error in inserting hall. line 57", error);
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
hallRoute.get("/list-hall", (request, response) => {
  let sqlQuery = "SELECT * FROM hall";

  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in listing hall. line 31", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data listed",
        status: "ok",
        data: result,
      });
    }
  });
});
// get hall according to id
hallRoute.get("/hall/:id", (request, response) => {
  let sqlQuery = `SELECT * FROM hall WHERE h_id=${request?.params?.id}`;
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in hall. line 44", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data hall",
        status: "ok",
        data: result,
      });
    }
  });
});

// delete hall
hallRoute.delete("/hall/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `DELETE  FROM hall WHERE h_id=${request?.params?.id}`;
  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in deleting hall. line 57", error);
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

// update hall
hallRoute.put("/hall/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `UPDATE hall SET h_id = '2' WHERE h_id = '${request?.params?.id}'`;

  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in update hall. line 57", error);
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
module.exports = hallRoute;
