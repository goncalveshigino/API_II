var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users.router');
var skillsRouter = require('./src/routes/skills.router');
var jobsRouter = require('./src/routes/jobs.router');
var applicationsRouter = require('./src/routes/applications.router');


var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationsRouter);

module.exports = app;