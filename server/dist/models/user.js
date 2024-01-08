"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bs = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose_1.default.Schema({
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
        validate(value) {
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
        validate(value) {
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
}, {
    timestamps: true,
});
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await exports.User.findOne({ email: email });
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
userSchema.methods.getPublicInfo = function () {
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
userSchema.pre("save", async function (next) {
    const user = this;
    console.log(user);
    if (user.isModified("password")) {
        user.password = await bs.hash(user.password, 8);
    }
    next();
});
exports.User = mongoose_1.default.model("User", userSchema);
