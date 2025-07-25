const { UnauthorizedError } = require("../errors");

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }
    throw new UnauthorizedError("Admin only route");
}

module.exports = adminOnly;