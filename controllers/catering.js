const cateringRoute = require("express").Router();
const connection = require("../connection");

cateringRoute.post("/insert-catering", async (request, response) => {
  try {
    const body = request?.body;
    console.log("Body", request?.body);
    //create user object with jwt token

    let sqlQuery = `INSERT INTO catering( description, name, review, rating, picture, contactNo ) 
    VALUES ("${body?.description}","${body?.name}","${body?.review}","${body?.rating}","${body?.picture}","${body?.contactNo}")`;
    let query = connection.query(sqlQuery, (error, result) => {
      if (error) {
        console.log("error in inserting catering. line 57", error);
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
cateringRoute.get("/list-catering", (request, response) => {
  let sqlQuery = "SELECT * FROM catering";

  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in listing catering. line 31", error);
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

// get catering according to id
cateringRoute.get("/catering/:id", (request, response) => {
  let sqlQuery = `SELECT * FROM catering WHERE cat_Id=${request?.params?.id}`;
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in catering. line 44", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data catering",
        status: "ok",
        data: result,
      });
    }
  });
});
// delete catering
cateringRoute.delete("/catering/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `DELETE  FROM catering WHERE cat_Id=${request?.params?.id}`;
  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in delete catering. line 57", error);
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
// update catering
cateringRoute.put("/catering/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `UPDATE catering SET cat_Id = '2' WHERE cat_Id = '${request?.params?.id}'`;

  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in update catering. line 57", error);
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


module.exports = cateringRoute;

