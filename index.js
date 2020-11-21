const express = require('express');
const port = 8080;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const expressLayouts = require('express-ejs-layouts');

// const User = require('./model/users');.



const app = express();

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    indentedSyntax : false,
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'

}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
// express.static(path.join(__dirname, 'public')));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// app.set('view options', { layout:'layout.ejs' });

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect mongo-db setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is up and running at port: ${port}`);
});