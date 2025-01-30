const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const UserModel = require("../../common/models/User");
const { jwtSecret, jwtExpirationInSeconds } = require("../../utils/config");

const generateAccessToken = (username, userId) => {
  return jwt.sign(
    {
      userId,
      username,
    },
    jwtSecret,
    {
      expiresIn: jwtExpirationInSeconds,
    }
  );
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

module.exports = {
  signup: async (req, res) => {
    try {
      const payload = req.body;

      const { username, email } = payload;

      const existingUser = await UserModel.getUser({ username, email });

      if (existingUser) {
        return res.status(400).json({
          status: false,
          error: {
            message: `User already exists.`,
          },
        });
      }

      let hashedPassword = await hashPassword(payload.password);
      const user = await UserModel.createUser({...payload, password: hashedPassword});
      const accessToken = generateAccessToken(user.username, user.id);

      return res.status(200).json({
        status: true,
        data: {
          token: accessToken,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await UserModel.getUser({ username });

      if (!user) {
        return res.status(401).json({
          status: false,
          error: {
            message: "Wrong username or password.",
          },
        });
      }

      const isMatch = await verifyPassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          status: false,
          error: {
            message: "Wrong username or password.",
          },
        });
      }

      const accessToken = generateAccessToken(user.username, user.id);

      return res.status(200).json({
        status: true,
        data: {
          token: accessToken,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error,
      });
    }
  },
};