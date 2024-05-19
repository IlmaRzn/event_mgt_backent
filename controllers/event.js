const eventRoute = require("express").Router();
const connection = require("../connection");

eventRoute.post("/insert-event", async (request, response) => {
  try {
    const body = request?.body;
    console.log("Body", request?.body);
    //create user object with jwt token

    let sqlQuery = `INSERT INTO event( description,  name, picture ) VALUES ("${body?.description}","${body?.name}","${body?.picture}")`;
    let query = connection.query(sqlQuery, (error, result) => {
      if (error) {
        console.log("error in inserting event. line 57", error);
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
eventRoute.get("/list-event", (request, response) => {
  let sqlQuery = "SELECT * FROM event";

  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in listing event. line 31", error);
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

// get event according to id
eventRoute.get("/event/:id", (request, response) => {
  let sqlQuery = `SELECT * FROM event WHERE id=${request?.params?.id}`;
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in event. line 44", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data event",
        status: "ok",
        data: result,
      });
    }
  });
});

// delete event
eventRoute.delete("/event/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `DELETE  FROM event WHERE id=${request?.params?.id}`;
  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in deleting event. line 57", error);
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

// update event
eventRoute.put("/event/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `UPDATE event SET id = '2' WHERE id = '${request?.params?.id}'`;

  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in update events. line 57", error);
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
module.exports = eventRoute;
