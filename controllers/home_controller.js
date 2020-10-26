module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for codeial!</h1>');

    console.log(req.cookies);

    //to alter the cookie via server
    res.cookie('_id', 25);

    return res.render('home', {
        title: "Home"
    });
}