const express = require('express');
const port = 8080;

const app = express();

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is up and running at port: ${port}`);
});