const express = require('express');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const dbControls = require('./config/config');
const bodyParser = require('body-parser');
const models = path.join(__dirname, './model');
const app = express();
const cors = require('cors');


// Connecting to Database
const dbConnectURL = dbControls.url;

const dbOptions = {
    useNewUrlParser: true
};
mongoose.Promise = global.Promise;
mongoose.connect(dbConnectURL, dbOptions).then(() => {
    console.log(chalk.blue('Connection to Database is '), chalk.green.bold("Successful!"));
}).catch((error) => {
    console.log(chalk.red('Connection to Database '), chalk.red.bold("Failed!"), chalk.red('\n Due to', error));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//For Listing All the Models   *** this is modelbinder
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(path.join(models, file)));

// *** this is routebinder
require('./route/todo.route')(app);


const server = app.listen('3000', () => {
    console.log(chalk.green.bold(server.name), chalk.blue('started @ IP'), chalk.green.bold());
});

