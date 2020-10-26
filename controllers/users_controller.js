const cookieParser = require('cookie-parser');
const User = require('../models/users');

module.exports.profile = function(req, res){
    // return res.end('<h1>Users Profile</>');

    // return res.render('profile', {
    //     title: "profile",
    //     name: req.cookies.name,
    //     email: req.cookies.email
    // });

    //profile page must appear only after sign-in

    //check if user_id is present in cookie
    if(req.cookies.user_id){
        //check if user exist for this user_id
        User.findById(req.cookies.user_id, function(err, user){
            // if(err){
            //     console.log("error while finding the user");
            //     return;
            // }
            if(user){
                return res.render('profile', {
                    title: "user profile",
                    user: user
                });
            }else{
                return res.redirect('/users/sign-in');
            }
        })
    }else{
        return res.redirect('/users/sign-in');
    }
};

//render the sign up page 
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'codeial | sign up'
    });
};

//render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'codeial | sign in'
    });
};

//get the sign up data
module.exports.create = function(req, res){
    
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        console.log("new user");
        if(!user){
            User.create(req.body, function(err, user){  
                if(err){
                    console.log("error in creating user while signing up");
                    return;
                }
                console.log("redirecting to sign in page");
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
};

//sign in and create a session for user
module.exports.createSession = function(req, res){
    
    //check if user exist
    User.findOne({email: req.body.email}, function(err, user){
        
        if(err){
            console.log("error in signing in the user");
            return;
        }
        //if user doesn't exit
        if(!user){
            return res.redirect('back');
        }else{
            //check if password is correct
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            //create a session
            res.cookie('user_id', user.id);
            // res.cookie('name', user.name);
            // res.cookie('email', user.email);
            return res.redirect('/users/profile');
        }

    });
};

//sign out - clear cookie and redirect to sign in page
module.exports.singOut = function(req, res){
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
};