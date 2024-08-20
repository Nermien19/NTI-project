
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const aboutRoutes = require('./routes/about');
// const portfolioRoutes = require('./routes/portfolio');
// const skillsRoutes = require('./routes/skills');
// const contactRoutes = require('./routes/contact');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/about', aboutRoutes);
// app.use('/api/portfolio', portfolioRoutes);
// app.use('/api/skills', skillsRoutes);
// app.use('/api/contact', contactRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
