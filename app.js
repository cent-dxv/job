console.log("job api");
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");

const NotFound = require("./middleware/404");
const error = require("./middleware/error");
const { Job, Login } = require("./router/");
const auth = require("./middleware/auth");

//basic security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());

//security set up
app.set('trust proxy' , 1)
const limmiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:100
});

app.use(helmet);
app.use(cors);
app.use(xss);

app.use("/", Login);
app.use("/api/v1", auth, Job);
app.use(NotFound);
app.use(error);

const start = async () => {
  try {
    await connectDB();
    console.log("db connected");
    const port = process.env.PORT || 3000;
    app.listen(port, console.log("server running at ", port));
  } catch (e) {
    console.log(e);
  }
};

start();
