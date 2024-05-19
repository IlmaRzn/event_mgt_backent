const customerRoute = require("express").Router();
const connection = require("../connection");
var jwt = require("jsonwebtoken");

// signup
customerRoute.post("/create-account", async (request, response) => {
  try {
    const body = request?.body;
    console.log("Body", request?.body);
    //create user object with jwt token
    const data = {
      ...request?.body,
      token: jwt.sign({ email: body?.email }, "Dreams-planner"),
    };
    delete data?.password;
    let sqlQuery = `INSERT INTO customer( name, NIC, email, phone_No, username, password, district, province) VALUES 
    ("${body?.name}","${body?.NIC}","${body?.email}","${body?.phone_No}","${body?.username}","${body?.password}","${body?.district}","${body?.province}")`;
    let query = connection.query(sqlQuery, (error, result) => {
      if (error) {
        console.log("error in inserting customers. line 57", error);
        throw error;
      } else {
        console.log("results:", result);
        response.json({
          message: "Data fetched",
          status: "ok",
          data: data,
        });
      }
    });
  } catch (e) {
    console.log("error in catch block", e);
    response.json({
      message: "Data could not be fetched",
      status: "failed",
      data: e,
    });
  }
});

customerRoute.post("/login", (request, response) => {
  try {
    const { username, password } = request?.body;

    let sqlQuery = `SELECT "name","email","district","NIC","c_Id","username","province","phone_No" FROM customer WHERE username="${username}" AND password="${password}"`;
    let query = connection.query(sqlQuery, (error, result) => {
      if (error) {
        console.log("error in username or password", error);
        throw error;
      } else {
        console.log("results:", result, result?.length);

        if (result?.length > 0) {
          const data = {
            ...result[0],
            token: jwt.sign({ email: result[0]?.email }, "Dreams-planner"),
          };

          response.json({
            message: "logged in ",
            status: "ok",
            data: data,
          });
        } else {
          response.json({
            message: "No Such User",
            status: "404",
            data: {},
          });
        }
      }
    });
  } catch (e) {
    console.log("error in catch block", e);
    response.json({
      message: "Data could not be fetched",
      status: "failed",
      data: e,
    });
  }
});



// list all customers
customerRoute.get("/list-customers", (request, response) => {
  let sqlQuery = "SELECT * FROM customer";

  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in fetching customers. line 31", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data fetched",
        status: "ok",
        data: result,
      });
    }
  });
});
// get customer according to id
customerRoute.get("/customers/:id", (request, response) => {
  let sqlQuery = `SELECT * FROM customer WHERE c_Id=${request?.params?.id}`;
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in fetching customers. line 44", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data fetched",
        status: "ok",
        data: result,
      });
    }
  });
});
// delete customer
customerRoute.delete("/customers/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `DELETE  FROM customer WHERE c_Id=${request?.params?.id}`;
  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in inserting customers. line 57", error);
      throw error;
    } else {
      console.log("results:", result);
      response.json({
        message: "Data fetched",
        status: "ok",
        data: result,
      });
    }
  });
});
// update customer
customerRoute.put("/customer/:id", (request, response) => {
  const body = request?.body;
  let sqlQuery = `UPDATE customer SET c_Id = '2' WHERE c_Id = '${request?.params?.id}'`;

  console.log(sqlQuery);
  let query = connection.query(sqlQuery, (error, result) => {
    if (error) {
      console.log("error in inserting customers. line 57", error);
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

module.exports = customerRoute;
