const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

// Import routes from the staff
const staff = require('./routes/staff.route');

// Set up mongoose connection
const mongoose = require('mongoose');
let mongoDB = 'mongodb://localhost:localhost12345@ds239682.mlab.com:39682/staff_directory_db'
mongoose.connect(mongoDB);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once('open', () => {
    console.log('Mongodb connected successfully.');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cors());
app.use('/api', staff);

app.listen(PORT, () => console.log(`Staff-library app listening on port ${PORT}`));