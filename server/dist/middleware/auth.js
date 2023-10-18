"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionCheck = void 0;
// middleware function to check if user has an active session
const sessionCheck = (req, res, next) => {
    console.log("Session", req.session);
    const { user } = req.session;
    if (!user) {
        console.log("Fail");
        return res.status(401).send(req.session);
    }
    next();
};
exports.sessionCheck = sessionCheck;
