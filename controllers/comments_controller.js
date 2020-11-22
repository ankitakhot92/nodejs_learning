const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = function(req, res){
    
    //we find the post, if exist then create a comment to prevent anyone from fiddling with our webpage
    Post.findById(req.body.post, function(err, post){
        
        if(post){
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            }, function(err, comment){
                if(err){
                    console.log('error in creating a comment');
                    return;
                }
                //we update post of post schema with comment id and whenever we update we must save also
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            });
        }

    })
}