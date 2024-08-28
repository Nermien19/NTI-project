const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// router.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, '../path-to-your-admin-login-page.html'));
// });

router.get('/', async (req, res) => {
  try {
    const home = await User.find();
    res.status(200).json(home);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin Login
// router.post('/', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Create JWT token
//         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

//         res.json({ token });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
// router.post('/', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//       const user = await User.findOne({ username });
//       if (!user) {
//           console.log('User not found');
//           return res.status(401).json({ message: 'Invalid credentials' });
//       }

//       const isMatch = await user.comparePassword(password);
//       if (!isMatch) {
//           console.log('Password does not match');
//           return res.status(401).json({ message: 'Invalid credentials' });
//       }

//       const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
//       res.json({ token });
//   } catch (err) {
//       console.error('Error during login:', err);
//       res.status(500).json({ message: err.message });
//   }
// });
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({ username });
      if (!user) {
          console.log('User not found');
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      console.log('Plain password:', password);
      console.log('Hashed password from DB:', user.password);

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
          console.log('Password does not match');
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: err.message });
  }
});

// Middleware to protect routes
function authMiddleware(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid Token' });
    }
}

module.exports = router; // Export only the router
