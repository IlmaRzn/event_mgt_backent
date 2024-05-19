const decorationRoute = require("express").Router();
const connection = require("../connection");

decorationRoute.post("/insert-decoration", async (request, response) => {
  try {
    const body = request?.body;
    console.log("Body", request?.body);
    //create user object with jwt token

    let sqlQuery = `INSERT INTO decoration( description, theme, price, type, picture ) VALUES ("${body?.description}","${body?.theme}","${body?.price}","${body?.type}","${body?.picture}")`;
    let query = connection.query(sqlQuery, (error, result) => {
      if (error) {
        console.log("error in inserting decoration. line 57", error);
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
decorationRoute.get("/list-decoration", (request, response) => {
  let sqlQuery = "SELECT * FROM decoration";

  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in listing decoration. line 31", error);
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

// get decoration according to id
decorationRoute.get("/decoration/:id", (request, response) => {
  let sqlQuery = `SELECT * FROM decoration WHERE d_Id=${request?.params?.id}`;
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in getting decoration. line 44", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data decoration",
        status: "ok",
        data: result,
      });
    }
  });
});
// delete decoration
decorationRoute.delete("/decoration/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `DELETE  FROM decoration WHERE d_Id=${request?.params?.id}`;
  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in delete . line 57", error);
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
// update decoration
decorationRoute.put("/decoration/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `UPDATE decoration SET d_Id = '2' WHERE d_Id = '${request?.params?.id}'`;

  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in update decoration. line 57", error);
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
module.exports = decorationRoute;
