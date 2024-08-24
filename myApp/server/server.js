// const express = require('express');
// // const mongoose = require('mongoose');
// const mongoose = require ('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');


// const path = require('path');

// const app = express();
// app.use(bodyParser.json());
// app.use(express.json());
// // Serve static files from 'uploads' directory
// // app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
// // Middleware
// app.use(cors());


// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/portfolio', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => {
//   console.error('Failed to connect to MongoDB:', err);
// })

// // Import routes
// const aboutRoutes = require('./routes/about');
// const homeRouter = require('./routes/home');
// const portfolioRoutes = require('./routes/portfolio');
// app.use('/admin/portfolio', portfolioRoutes);
// app.use('/admin/about', aboutRoutes);
// app.use('/admin/home', homeRouter);


// // app.use('/admin/portfolio', portfolioRouter);
// // app.use(express.static('public'));


// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});

// Import routes
const aboutRoutes = require('./routes/about');
const homeRouter = require('./routes/home');
const portfolioRoutes = require('./routes/portfolio');

app.use('/admin/portfolio', portfolioRoutes);
app.use('/admin/about', aboutRoutes);
app.use('/admin/home', homeRouter);

// app.use('/images', express.static(path.join(__dirname, './images')));
// try {
//   app.use('/images', express.static(path.join(__dirname, './images')));
// } catch (error) {
//   console.error('Error serving images directory:', error);
// }


app.use('/images', express.static(path.join(__dirname, './images')));q
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
