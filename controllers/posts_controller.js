const Post = require('../models/post');

//create an action to get data from the browser that is submitted via create post form
module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){
            console.log('error in creating post');
            return;
        }
        return res.redirect('back');
    })
    //now map it to routes
};