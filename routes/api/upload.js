// const express = require('express');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
//
// const app = express();
// // const router = express.Router();
//
// app.post('/upload', upload.single('file'), function (req, res, next) {
//     console.log(req.file);
//     res.send('File uploaded!');
// });

 // app.listen(5000, function () {
 //     console.log('App listening on port 5000!');
 // });
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// 创建一个Express路由器实例
const router = express.Router();

router.post('/', upload.single('file'), function (req, res, next) {
    console.log(req.file);
    res.send(req.file);
});

// 导出路由器
module.exports = router;
