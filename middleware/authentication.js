const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require("../errors");
const User = require('../models/user'); // Adjust the path as necessary
const { log } = require('console');

const auth = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith('Bearer')) {
        throw new UnauthenticatedError("Authentication Invalid");
    }

    const token = authToken.split(" ")[1];
    if (!token) {
        throw new UnauthenticatedError("Missing or invalid token");
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.userId).select("-password");
        req.user = { userId: payload.userId, name: payload.name, role: payload.role };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Authentication Invalid - Bad token");
    }
}

module.exports = auth;