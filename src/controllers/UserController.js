const userService = require("../services/UserService");
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });

class UserController {
  async register(req, res) {
    const { email, username, password, fullName } = req.body;
    try {
      const result = await userService.register(username, fullName, email, password);
      if (result === 0) {
        res.status(400).json({ statusCode: 400, message: 'All fields are required.' });
      } else if (result === 1) {
        res.status(200).json({ statusCode: 409, message: 'Username or email already exists.' });
      } else {
        res.status(201).json({ statusCode: 201, message: 'User registered successfully.', data: result });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ statusCode: 500, message: 'Internal server error.' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);

      if (result === 0 || result === 1) {
        return res.status(200).json({ statusCode: 401, message: 'Wrong username or password!' });
      }

      // Send the token and user info back to the client
      res.status(200).json({ statusCode: 200, message: 'User login successfully!', data: {token: result.token, user: result.user} });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ statusCode: 500, message: 'Internal server error.' });
    }
  }

  async profile(req, res) {
    try {
      const token = req.headers['authorization'].split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userService.profile(decoded.sub);
      if (user === 0) {
        res.status(200).json({ statusCode: 404, message: 'User not found.' });
      }
      res.status(200).json({ statusCode: 200, message: 'User profile fetched successfully!', data: user });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ statusCode: 500,  message: 'Internal server error.' });
    }
  }

  async logout(req, res) {
    res.status(200).json({statusCode: 200, message: 'User logged out successfully!'});
  }
}

module.exports = new UserController();