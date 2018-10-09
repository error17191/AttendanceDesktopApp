var screenshot = require('desktop-screenshot');

screenshot("bobo.png", {width: 600 ,quality: 100}, function(error, complete) {
    if(error)
        console.log("Screenshot failed", error);
    else
        console.log("Screenshot succeeded");
});
