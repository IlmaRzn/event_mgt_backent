const bookingRoute = require("express").Router();
const React = require("react");
const connection = require("../connection");

bookingRoute.post("/insert-booking", async (request, response) => {
  try {
    const body = request?.body;
    console.log("Body", request?.body);
    //create user object with jwt token

    let sqlQuery = `INSERT INTO booking( decoration,username, date, type, game, photography) VALUES 
    ("${body?.decoration}","${body?.username}","${body?.date}","${body?.type}","${body?.game}","${body?.photography}")`;
    let query = connection.query(sqlQuery, (error, result) => {
      if (error) {
        console.log("error in inserting booked customers. line 57", error);
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
bookingRoute.get("/list-bookings", (request, response) => {
  let sqlQuery = "SELECT * FROM booking";

  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in list booking. line 31", error);
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
// get booking according to id
bookingRoute.get("/booking/:id", (request, response) => {
  let sqlQuery = `SELECT * FROM booking WHERE b_id=${request?.params?.id}`;
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in booking. line 44", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data booked",
        status: "ok",
        data: result,
      });
    }
  });
});

// delete booking
bookingRoute.delete("/booking/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `DELETE  FROM booking WHERE b_id=${request?.params?.id}`;
  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in deleting booking. line 57", error);
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

// update booking
bookingRoute.put("/booking/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `UPDATE booking SET b_id = '2' WHERE b_Id = '${request?.params?.id}'`;

  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in update booking. line 57", error);
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
module.exports = bookingRoute;
