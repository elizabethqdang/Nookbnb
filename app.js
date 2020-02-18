const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const users = require('./routes/api/users');
const spots = require('./routes/api/spots');
const geocode = require('./routes/api/geocode');

// Loading static build folder for production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
	app.get('/', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	})
}

// Using mongoose to connect to Mongo database with success and error messages
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Connected to MongoDB successfully'))
	.catch(err => console.log(err));

// Respond to JSON requests and requests from other software (i.e. Postman)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Uses the right port when in development and in production
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Requests for these routes uses the specified callback function
app.use('/api/users', users);
app.use('/api/spots', spots);
app.use('/api/geocode', geocode);

// Middleware for Passport
app.use(passport.initialize());

// Configuration file for Passport
require('./config/passport')(passport);

// Route for serving static assets
// Makes content under the public directory accessible
// i.e. In components, <img src='/images/splash.jpg' />
app.use('/images', express.static(path.join(__dirname, 'public')))
