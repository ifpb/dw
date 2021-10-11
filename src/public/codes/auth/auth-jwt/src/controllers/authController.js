const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function signin(req, res) {
  try {
    const { email, password } = req.body;

    const { id: userId, password: hash } = await User.readByEmail(email);

    const match = await bcrypt.compare(password, hash);

    if (match) {
      const token = jwt.sign({ userId }, process.env.SECRET, {
        expiresIn: 300 // 5min
      });

      res.json({ auth: true, token });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).json({ error: "User not found" });
  }
}

function signout(req, res) {
  return res.send({ auth: false, token: null });
}

module.exports = { signin, signout };
