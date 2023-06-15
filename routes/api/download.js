const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/:filename', function(req, res){
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../../uploads', filename);

    // 根据文件扩展名设置Content-Type
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream';  // 默认值
    if (ext === '.txt') {
        contentType = 'text/plain';
    } else if (ext === '.jpg' || ext === '.jpeg') {
        contentType = 'image/jpeg';
    } else if (ext === '.png') {
        contentType = 'image/png';
    } // 其他文件类型可以继续添加

    // 检查文件是否存在
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`${filePath} doesn't exist`);
            res.status(404).send('File not found');
        } else {
            // 如果文件存在，发送文件
            res.setHeader('Content-Type', contentType);
            res.download(filePath, err => {
                if (err) {
                    res.status(500).send('Error downloading file');
                }
            });
        }
    });
});

module.exports = router;
