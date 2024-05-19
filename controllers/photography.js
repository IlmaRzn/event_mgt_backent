const photographyRoute = require("express").Router();
const connection = require("../connection");

photographyRoute.post("/insert-photography", async (request, response) => {
  try {
    const body = request?.body;
    console.log("Body", request?.body);
    //create user object with jwt token

    let sqlQuery = `INSERT INTO photography( description, name, price, type, picture ) VALUES
     ("${body?.description}","${body?.name}","${body?.price}","${body?.type}","${body?.picture}")`;
    let query = connection.query(sqlQuery, (error, result) => {
      if (error) {
        console.log("error in inserting photography. line 57", error);
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
photographyRoute.get("/list-photography", (request, response) => {
  let sqlQuery = "SELECT * FROM photography";

  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in listing photography. line 31", error);
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

// get photography according to id
photographyRoute.get("/photography/:id", (request, response) => {
  let sqlQuery = `SELECT * FROM photography WHERE p_id=${request?.params?.id}`;
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in photography. line 44", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data photography",
        status: "ok",
        data: result,
      });
    }
  });
});

// delete photography
photographyRoute.delete("/photography/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `DELETE  FROM photography WHERE p_id=${request?.params?.id}`;
  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in deleting photography. line 57", error);
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

// update photography
photographyRoute.put("/photography/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `UPDATE photography SET p_id = '3' WHERE p_id = '${request?.params?.id}'`;

  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in update photography. line 57", error);
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
module.exports = photographyRoute;
