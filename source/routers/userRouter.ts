const { sessionCheck } = require("../middleware/auth");
const nodemailer = require("nodemailer");
const generator = require("generate-password");
import express from "express";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
require("../db/mongoose");
export const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  auth: {
    user: process.env.NODEMAILERUSERNAME,
    pass: process.env.NODEMAILERPASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

// get all users
router.get("/getUsers", async (req: Request, res: Response) => {
  try {
    const data = await User.find({});
    console.log("Users found");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

// find user
router.post("/finduser", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    res.status(200).send({ user: user });
  } catch (e) {
    res.status(404).send({ err: e });
  }
});

// route to create a user if criteria met
router.post("/signup", async (req: Request, res: Response) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();

    req.session.user = user.getPublicInfo();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// route to set user session on login if creds valid
router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    req.session.user = user.getPublicInfo();

    console.log("User");
    console.log(req.session.user);

    res.status(200).send({ user: req.session.user! });
  } catch (err) {
    res.status(400).send(err);
  }
});

// test route for session check
router.get("/users", sessionCheck, async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// route to logout user
router.get(
  "/user/logout",
  sessionCheck,
  async (req: Request, res: Response) => {
    try {
      delete req.session.user;
      console.log(req.session);
      res.status(200).send(req.session);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// helper route to check user authentication. returns to front end
router.get("/isAuth", (req: Request, res: Response) => {
  if (req.session.user) {
    console.log(req.session.user);
    res.json({ user: req.session.user, loggedIn: true });
  } else {
    console.log("No User");
    res.json({ user: req.session.user, loggedIn: false });
  }
});

// route to delete all users
router.delete("/deleteAll", async (req: Request, res: Response) => {
  try {
    const result = await User.deleteMany({});

    console.log("Users deleted");

    res.status(200).send("Deleted");
  } catch (err) {
    res.status(400).send(err);
  }
});

// route to change password
router.post(
  "/resetpassword",
  sessionCheck,
  async (req: Request, res: Response) => {
    try {
      const user = await User.findByCredentials(
        req.session.user!.email,
        req.body.oldPassword
      );

      if (user) {
        user.password = req.body.newPassword;
        user.save();
      }

      res.status(200).send({ user: req.session.user! });
    } catch (err) {
      res.status(400).send({ err: "User not found" });
    }
  }
);

// route to send password reset email
router.post("/sendemail", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
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
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: "Message not sent" });
  }
});
