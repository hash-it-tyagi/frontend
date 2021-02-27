const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use((req,res,next)=>{
    var reqUrl = req.url;
    console.log("The request Url is: ",reqUrl);
    next();
});

var port = 4321;
app.listen(process.env.PORT || port,()=>{
    console.log(`Sever running at port: ${port}`);
});