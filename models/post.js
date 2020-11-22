const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {                                                       //to link it with user
        type: mongoose.Schema.Types.ObjectId,                     //we link it with users schema
        refer: 'User'                                             //referring to users schema
    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refer: 'Comment'
        }
    ]
},{
    timestamps: true                                              //timestamps auto introduces 2 fields createdAt and updateAt
});

const Post = mongoose.model('Post', postSchema);                  //to tell that this is going to be a model in db
module.exports = Post;

//next step is to go to the views and create a form where this schema will have a doc in it