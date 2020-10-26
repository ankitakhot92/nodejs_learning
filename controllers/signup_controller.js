module.exports.signup = function(req, res){
    return res.render('signup', {
        title: 'signup'
    });
};

module.exports.createuser = function(req, res){
    return res.end('<h1>User Created Successfully..</h1>');
};