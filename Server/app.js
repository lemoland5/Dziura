// "use strict";
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/indexRouter");
const dbRouter = require("./routes/db");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

//set up view engine -> ejs
app.set("view engine", "ejs");
//set up views folder
app.set("views", path.join(__dirname, "views"));

//log requests to the console
app.use(morgan("dev"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

//parse incoming requests data to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//enable cors
app.use(cors());

//parse cookies
app.use(cookieParser());
//serve static files WITH JOINING GLOBAL PATH WITH PUBLIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

//define routes:
app.use("/", indexRouter); // todo: make router that will serve all pages
app.use("/api", dbRouter);

//todo: better error handling
// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

//start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
