const gameRoute = require("express").Router();
const React = require("react");
const connection = require("../connection");


gameRoute.post("/insert-game", async (request, response) => {
  try {
    const body = request?.body;
    console.log("Body", request?.body);
    //create user object with jwt token

    let sqlQuery = `INSERT INTO game( description, price,name,picture ) VALUES ("${body?.description}","${body?.price}","${body?.name}","${body?.picture}")`;
    let query = connection.query(sqlQuery, (error, result) => {
      if (error) {
        console.log("error in inserting games. line 57", error);
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
gameRoute.get("/list-game", (request, response) => {
  let sqlQuery = "SELECT * FROM game";

  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in listing game. line 31", error);
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


// get game according to id
gameRoute.get("/game/:id", (request, response) => {
  let sqlQuery = `SELECT * FROM game WHERE g_id=${request?.params?.id}`;
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in game. line 44", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data game",
        status: "ok",
        data: result,
      });
    }
  });
});

// delete game
gameRoute.delete("/game/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `DELETE  FROM game WHERE g_id=${request?.params?.id}`;
  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in deleting game. line 57", error);
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

// update game
gameRoute.put("/game/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `UPDATE game SET g_id = '2' WHERE g_id = '${request?.params?.id}'`;

  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in update game. line 57", error);
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

module.exports = gameRoute;
