"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const { sessionCheck } = require("../middleware/auth");
const nodemailer = require("nodemailer");
const generator = require("generate-password");
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
require("../db/mongoose");
exports.router = express_1.default.Router();
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    auth: {
        user: "apptrack123@outlook.com",
        pass: "Graphite1234$",
    },
    tls: {
        ciphers: "SSLv3",
    },
});
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
// find user
exports.router.post("/finduser", async (req, res) => {
    try {
        const email = req.body.email;
        const user = await user_1.User.findOne({ email: email });
        res.status(200).send({ user: user });
    }
    catch (e) {
        res.status(404).send({ err: e });
    }
});
// route to create a user if criteria met
exports.router.post("/signup", async (req, res) => {
    const user = new user_1.User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        req.session.user = user.getPublicInfo();
        res.status(201).send({ user, token });
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
exports.router.get("/user/logout", sessionCheck, async (req, res) => {
    try {
        delete req.session.user;
        console.log(req.session);
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
// route to change password
exports.router.post("/resetpassword", sessionCheck, async (req, res) => {
    try {
        const user = await user_1.User.findByCredentials(req.session.user.email, req.body.oldPassword);
        if (user) {
            user.password = req.body.newPassword;
            user.save();
        }
        res.status(200).send({ user: req.session.user });
    }
    catch (err) {
        res.status(400).send({ err: "User not found" });
    }
});
// route to send password reset email
exports.router.post("/sendemail", async (req, res) => {
    try {
        const user = await user_1.User.findOne({
            email: req.body.email,
        });
        var password = generator.generate({
            length: 14,
            numbers: true,
            symbols: true,
        });
        if (user) {
            user.password = password;
            user.save();
        }
        const info = await transporter.sendMail({
            from: '"App Track" <apptrack123@outlook.com>',
            to: "jfipps1995@gmail.com",
            subject: "Your password has been reset.",
            text: `Your temporary password is: ${password}`,
        });
        res.status(200).send("Message Sent");
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ err: "Message not sent" });
    }
});
