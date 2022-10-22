console.log("job api");
require("express-async-errors");
require("dotenv").config()
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
const rateLimiter = require("express-rate-limit");

const app = express();

//security set up
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());


app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});

// app.use("/", (req,res)=>{
//   res.send('job api')
// });
app.use("/auth", Login);
app.use("/api/v1", auth, Job);
app.use(NotFound);
app.use(error);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB();
    console.log("db connected");
    app.listen(port, console.log("server running at ", port));
  } catch (e) {
    console.log(e);
  }
};

start();
