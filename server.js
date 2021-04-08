const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config({path:'env'})

DATABASE_URL = 'mongodb+srv://dango:dango123@cluster0.0lkqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//requiring all the routes
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

//creating connection with the mongodb
mongoose.connect(DATABASE_URL,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to mongoose'));

//using all the routes
app.use('/', indexRouter);


//listening to port 3000
app.listen(process.env.PORT || 3000);