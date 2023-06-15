const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");

const cors = require('cors');

app.use(cors());  // 使用cors中间件，允许所有源的请求

const uploadRouter = require('./routes/api/upload');
app.use('/api/upload', uploadRouter);

const downloadRouter = require('./routes/api/download');
app.use('/api/download', downloadRouter);

// 其他的代码...

//引用users.js
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
//const upload = require("./routes/api/upload");
// const download = require("./routes/api/download");
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//连接mysql数据库
// const mysql = require("mysql")
// const connection = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"123456",
//     database:"managesystem"
// });
// connection.connect((err)=>{
//     if(err){
//         console.error("连接失败！" + err.stack);
//         return
//     }
//     console.log("连接成功！")
    // connection.query("SELECT * FROM administrator", function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    // });
// });



//连接mongodb数据库
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017")
    .then(() => console.log("连接成功"))
    .catch(err => console.log("连接失败"))

//passport 初始化
app.use(passport.initialize());

require("./config/passport")(passport);


//使用routes
app.use("/api/users",users);
app.use("/api/profiles",profiles);
//app.use("/api/upload",upload);
// app.use('/api/download',download)

const port = process.env.PORT||5000;

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})



