//import packages
const express = require("express");
const bodyParser = require("body-parser");
const customerRoute = require("./controllers/customer");
const loginRoute = require("./controllers/login");
const decorationRoute = require("./controllers/decoration");
const gameRoute = require("./controllers/game");
const hallRoute = require("./controllers/hall");
const photographyRoute = require("./controllers/photography");
const cateringRoute = require("./controllers/catering");
const eventRoute = require("./controllers/event");
const bookingRoute = require("./controllers/booking");
const feedbackRoute = require("./controllers/feedback");
const cors = require("cors");


const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.use("/", customerRoute);
app.use("/", loginRoute);
app.use("/", decorationRoute);
app.use("/", gameRoute);
app.use("/", hallRoute);
app.use("/", photographyRoute);
app.use("/", cateringRoute);
app.use("/", eventRoute);
app.use("/", bookingRoute);
app.use("/", feedbackRoute);

app.listen(3000, () => {
  console.log("Server has started on port 3000");
});
