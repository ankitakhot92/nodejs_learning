const express = require('express');
const port = 8080;

const cookieParser = require('cookie-parser');

const db = require('./config/mongoose');

// const User = require('./model/users');.

const app = express();

app.use(express.urlencoded());

app.use(cookieParser());

//use express router
app.use('/', require('./routes'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is up and running at port: ${port}`);
});