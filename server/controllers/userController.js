const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const nameCheck = await User.findOne({ name });
    if (nameCheck)
      return res.status(400).json({ message: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.status(400).json({ message: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.gLogin = async (req, res) => {
  const { name, email, googleId, imageUrl } = req.body;
  console.log(email, googleId);
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email })

    if (existingUser) {
      const isPassword = await bcrypt.compare(googleId.toString(), existingUser.password)
      if (!isPassword) {
        return res
          .status(400)
          .json({ message: "Invalid Email Id or password" });
      }
    } else {
      const password = await bcrypt.hash(googleId, 10);
      existingUser = new User({
        name,
        email,
        password
      });
      await existingUser.save();
    }
    res
      .status(200)
      .json({
        message: "Successfully Logged in",
        user: existingUser,
        status:true,
      });
  } catch (error) {
    console.log(error.message);
    return new Error(error);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ message: "User id is required " });
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
