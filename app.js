const mongoose = require("mongoose");
const express = require("express");
const app = express();
const users = require("./routes/api/users");
const bodyParser = require('body-parser');
const db = require("./config/keys").mongoURI;
const passport = require('passport');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

require('./config/passport')(passport);

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch(err => console.log(err));

app.use("/api/users", users);
	
// Using the correct port in development and production
const port = process.env.PORT || 5000;

// Listening on port
app.listen(port, () => console.log(`Server is running on port ${port}`));