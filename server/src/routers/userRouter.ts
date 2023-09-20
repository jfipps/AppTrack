const { sessionCheck } = require("../middleware/auth");
import express from "express";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
require("../db/mongoose");
export const router = express.Router();

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
