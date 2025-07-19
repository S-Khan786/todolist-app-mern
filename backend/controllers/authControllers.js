import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, password, email } = req.body;
  const image = req.file?.filename;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      username,
      password,
      email,
      image,
    });

    await user.save();

    const paylaod = { userId: user.id };
    const token = jwt.sign(paylaod, process.env.JWT_SECRET, {
      expiresIn: "1d",
    }); // create a token

    return res.status(200).json({ msg: "Registration Successfull", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to register" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentails" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentails" });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      msg: "Login Successfull",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
      },
    });
  } catch (err) {}
};
