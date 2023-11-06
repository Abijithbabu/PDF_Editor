const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 860000,
    });
  
    return res
    .cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      SameSite: "lax",
      secure: true,
    })
    .status(200)
    .json({ status: true, user });
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 860000,
    });
  
  return res
    .status(200)
    .cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      SameSite: "None",
      secure: true,
    }).json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.gLogin = async (req, res) => {
  const { name, email, googleId, imageUrl } = req.body;
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
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: 860000,
    });

  return res
    .status(200)
    .cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      SameSite: "None",
      secure: true,
    }).json({ status: true, user:existingUser });
  } catch (error) {
    console.log(error.message);
    return new Error(error);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    res.clearCookie(`token`);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
