import { NextFunction } from "connect";

import mongoose, { set } from "mongoose";
const bs = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// User interface for middleware typing
interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  tokens: [{ token: string }];
}

// User methods interface
interface IUserMethods {
  getPublicInfo(): {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  };
  generateAuthToken(): string;
}

// User statics interface
interface IUserStatics extends mongoose.Model<IUser, {}, IUserMethods> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<mongoose.HydratedDocument<IUser, IUserMethods>>;
}

const userSchema = new mongoose.Schema<IUser, IUserMethods, IUserStatics>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
      validate(value: string) {
        if (value.toLowerCase() === "password") {
          throw new Error("Invalid Password");
        }
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bs.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Incorrect Info");
  }

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, "thisisasecret");

  console.log(user, token);

  user.tokens = user.tokens.concat({ token: token });

  console.log(user.tokens);

  user.save();

  return token;
};

userSchema.methods.getPublicInfo = function (): {
  email: string;
  password: string;
  createAt: Date;
  updatedAt: Date;
} {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// pass hash middleware
userSchema.pre<IUser>("save", async function (next: NextFunction) {
  const user = this;
  console.log(user);
  if (user.isModified("password")) {
    user.password = await bs.hash(user.password, 8);
  }

  next();
});

export const User = mongoose.model<IUser, IUserStatics>("User", userSchema);
