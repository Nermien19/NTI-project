const express = require('express');
// const mongoose = require('mongoose');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Import routes
const aboutRoutes = require('./routes/about');
const homeRouter = require('./routes/home');
// Use routes
app.use('/admin/about', aboutRoutes);


app.use(express.json());
app.use('/admin/home', homeRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
