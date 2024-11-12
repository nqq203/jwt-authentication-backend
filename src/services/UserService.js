const userRepository  = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  async register(username, fullName, email, password) {
    if (!username || !fullName || !email || !password) {
      return 0;
    }
    const existingEmail = await userRepository.existingElement({field: 'email', value: email});
    const existingUsername = await userRepository.existingElement({field: 'username', value: username});

    if (existingEmail || existingUsername) {
      return 1;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await userRepository.create({
        username,
        fullName,
        email,
        password: hashedPassword
      });
      return user;
    } catch (error) {
      // console.error('Failed to register user:', error);
      throw new Error('Registration failed');
    }
  }

  async login(email, password) {
    try {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        return 0;
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return 1;
      }

      const token = jwt.sign({ sub: user.id, name: user.fullName}, process.env.JWT_SECRET, { expiresIn: '30m' });
      return {
        token,
        user: { id: user.id, username: user.username, fullName: user.fullName }
      }
    } catch(error) {
      console.error('Login error:', error);
      throw new Error('Failed to login.');
    }
  }

  async profile(userId) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        return 0;
      }
      const { password, ...data } = user;
      return data;
    } catch(error) {
      console.error('Profile error:', error);
      throw new Error('Failed to fetch user profile.');
    }
  }
}

module.exports = new UserService();