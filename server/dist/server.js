"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const express_session_1 = __importDefault(require("express-session"));
require("express-session");
const mongodbstore = require("connect-mongodb-session")(express_session_1.default);
const userRouter_1 = require("./routers/userRouter");
const jobRouter_1 = require("./routers/jobRouter");
require("./db/mongoose");
const { NONAME } = require("dns");
const app = express();
const port = process.env.PORT || 5001;
// setup mongodbstore
const mongoDBStore = new mongodbstore({
    uri: process.env.MONGO_DB_ADDRESS,
    collection: "mySessions",
});
// session setup
app.use((0, express_session_1.default)({
    secret: "secret123",
    name: "session-id",
    store: mongoDBStore,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: 36000000,
        secure: false,
    },
}));
// cors setup
const corsOptions = {
    origin: [`http://localhost:3000`],
    credentials: true,
    optionSuccessStatus: 200,
    methods: ["GET", "POST"],
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("client/build"));
app.set("trust proxy", 1);
// routers
app.use(userRouter_1.router);
app.use(jobRouter_1.router);
app.listen(port, () => {
    console.log("Server is up on port: " + port);
});
