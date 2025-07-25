const {StatusCodes} = require("http-status-codes")
const User = require("../models/user");
const {BadRequestError, NotFoundError, } = require("../errors/index")

const register = async (req, res) => {
    const {name, email, password} = req.body;
    const user = await User.create({ name, email, password });
    const token = await user.createJWT();
    res.status(StatusCodes.CREATED).json({user, token})
};

const login = async (req, res) => {
    const { email, password } = req.body; 
    if (!email || !password) {
        throw new BadRequestError("please provide email and password")
    }
    const user = await User.findOne({ email });
    if (!user){
        throw new BadRequestError("User doesn't exist")
    }
    let isPasswordCorect = user.comparePassword(password);
    if (!isPasswordCorect) {
        throw new BadRequestError("Incorect password")
    }
    const token = await user.createJWT();
    res.status(StatusCodes.OK).json({ name: user.name, role:user.role, token });
}

module.exports = { register, login };