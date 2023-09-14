"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const { sessionCheck } = require("../middleware/auth");
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
require("../db/mongoose");
exports.router = express_1.default.Router();
// get all users
exports.router.get("/getUsers", async (req, res) => {
    try {
        const data = await user_1.User.find({});
        console.log("Users found");
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
    }
});
// route to create a user if criteria met
exports.router.post("/signup", async (req, res) => {
    const user = new user_1.User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        const newUser = user.getPublicInfo();
        res.status(201).send({ newUser, token });
    }
    catch (e) {
        res.status(400).send(e);
    }
});
// route to set user session on login if creds valid
exports.router.post("/login", async (req, res) => {
    try {
        const user = await user_1.User.findByCredentials(req.body.email, req.body.password);
        req.session.user = user.getPublicInfo();
        console.log("User");
        console.log(req.session.user);
        res.status(200).send({ user: req.session.user });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
// test route for session check
exports.router.get("/users", sessionCheck, async (req, res) => {
    try {
        const users = await user_1.User.find({});
        res.status(200).send(users);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
// route to logout user
exports.router.get("/users/logout", sessionCheck, async (req, res) => {
    try {
        delete req.session.user;
        res.status(200).send(req.session);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
// helper route to check user authentication. returns to front end
exports.router.get("/isAuth", (req, res) => {
    if (req.session.user) {
        console.log(req.session.user);
        res.json({ user: req.session.user, loggedIn: true });
    }
    else {
        console.log("No User");
        res.json({ user: req.session.user, loggedIn: false });
    }
});
// route to delete all users
exports.router.delete("/deleteAll", async (req, res) => {
    try {
        const result = await user_1.User.deleteMany({});
        console.log("Users deleted");
        res.status(200).send("Deleted");
    }
    catch (err) {
        res.status(400).send(err);
    }
});
