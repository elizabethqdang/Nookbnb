const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const passport = require('passport');
const path = require('path');

// Using mongoose to connect to Mongo database with success and error messages
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch(err => console.log(err));

// Uses the right port when in development and in production
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Requests for this route uses the users callback function
app.use("/api/users", users);

// Middleware for Passport
app.use(passport.initialize());

// Configuration file for Passport
require('./config/passport')(passport);

// Route for serving static assets
// Makes content under the public directory accessible
// i.e. In components, <img src="/static/splash.jpg" />
app.use('/static', express.static(path.join(__dirname, 'public')))
