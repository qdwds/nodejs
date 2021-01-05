const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const DIR_PATH = path.join(__dirname, 'upload')
const multer = require('multer');
const upload = multer({ dest: DIR_PATH })
app.use(express.static(path.join(__dirname, 'public')))
console.log(DIR_PATH);
//  切片上传文件接口
app.post('/file', upload.single('file'), (req, res) => {
    const filename = req.body.file_name;  //  文件名称
    const name = filename.split(' - ')[0];
    const mkdirFileName = path.join(DIR_PATH, name);

    //  修改文件名称
    const olgFileName = path.join(DIR_PATH, req.file.filename);
    const newFileName = path.join(DIR_PATH, filename);
    //  修改文件名称
    fs.renameSync(olgFileName, newFileName);
    //  文件夹不存在的时候再创建
    if (!fs.existsSync(mkdirFileName)) {
        //  创建文件夹
        fs.mkdirSync(mkdirFileName)
    }
    console.log(newFileName);
    console.log(path.join(newFileName,name));
    fs.moveSync(newFileName,path.join(newFileName,name))
    res.send('file ok')
})
app.get('/merge', (req, res) => {
    // console.log(req.query);
    res.send('文件合并1');
})
app.listen(3000, () => console.log(3000))