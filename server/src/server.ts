const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
import session from "express-session";
import "express-session";
const mongodbstore = require("connect-mongodb-session")(session);
import { router as userRouter } from "./routers/userRouter";
import { router as jobsRouter } from "./routers/jobRouter";
require("./db/mongoose");
const { NONAME } = require("dns");

export interface UserInfo extends Request {
  user: string;
  session: { user: any };
}

// declaration for express-session to work
declare module "express-session" {
  interface SessionData {
    user: {
      email: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }
}

const app = express();
const port = process.env.PORT || 5001;

// setup mongodbstore
const mongoDBStore = new mongodbstore({
  uri: process.env.MONGO_DB_ADDRESS,
  collection: "mySessions",
});

// session setup
app.use(
  session({
    secret: "secret123",
    name: "session-id",
    store: mongoDBStore,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: false,
      maxAge: 360000,
      secure: false,
    },
  })
);

// cors setup
const corsOptions = {
  origin: [`http://localhost:3000`],
  methods: ["GET", "POSTS"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("client/build"));
app.set("trust proxy", 1);

// routers
app.use(userRouter);
app.use(jobsRouter);

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
