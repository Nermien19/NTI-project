
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => {
//     console.error('Failed to connect to MongoDB:', err);
// });

// .then(async () => {
//   const hashedPassword = await bcrypt.hash('123', 10); // Correct usage of bcrypt
//   const user = new User({
//     username: 'admin',
//     password: hashedPassword,
//   });

//   await user.save();
//   console.log('Admin user created');
// })
// .catch(err => {
//   console.error('Failed to connect to MongoDB:', err);
// });

.then(async () => {
  // Check if the admin user already exists
  const existingAdmin = await User.findOne({ username: 'admin' });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('123', 10);
    const user = new User({
      username: 'admin',
      password: hashedPassword,
    });

    await user.save();
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
})
.catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});
// Import routes
const aboutRoutes = require('./routes/about');
const homeRouter = require('./routes/home');
const portfolioRoutes = require('./routes/portfolio');
const skillsRoutes = require('./routes/skills');
const contactRoutes = require('./routes/contact');
const navbarRoutes = require('./routes/navbar');
const loginRoutes = require('./routes/auth');

app.use('/admin/login', loginRoutes);
app.use('/admin/navbar', navbarRoutes);
app.use('/admin/contact', contactRoutes);
app.use('/admin/portfolio', portfolioRoutes);
app.use('/admin/skills', skillsRoutes);
app.use('/admin/about', aboutRoutes);
app.use('/admin/home', homeRouter);

// app.use('/images', express.static(path.join(__dirname, './images')));
// try {
//   app.use('/images', express.static(path.join(__dirname, './images')));
// } catch (error) {
//   console.error('Error serving images directory:', error);
// }




app.use('/cv', express.static(path.join(__dirname, './cv')));
app.use('/images', express.static(path.join(__dirname, './images')));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
