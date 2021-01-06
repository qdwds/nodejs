const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const DIR_PATH = path.join(__dirname, 'upload')
const multer = require('multer');
const { resolve } = require('path');
const { rejects } = require('assert');
const upload = multer({ dest: DIR_PATH })
app.use(express.static(path.join(__dirname, 'public')))
//  切片上传文件接口
app.post('/file', upload.single('file'), (req, res) => {
    const file_name = req.body.file_name;  // 每个片的文件名
    const file_dir_name = file_name.split(' - ')[0];    //  文件名
    const file_dir = path.join(DIR_PATH, file_dir_name);    //  路径

    //  修改文件名称
    const oldFileDir = path.join(req.file.path);
    const newFileDir = path.join(DIR_PATH, file_name);

    //  修改文件名称
    fs.renameSync(oldFileDir, newFileDir);

    //  文件夹不存在的时候再创建
    if (!fs.existsSync(file_dir)) {
        //  创建文件夹
        fs.mkdirSync(file_dir)
    }
    //  移动文件到指定目录
    fs.renameSync(newFileDir, path.join(DIR_PATH, file_dir_name, file_name))
    res.send('file ok')
})

app.get('/merge', (req, res) => {
    const { filename } = req.query; //  文件名称
    const chunkDir = path.join(DIR_PATH, filename)   //  切片的目录
    //   获取文件夹下所有的文件

    fs.readdir(chunkDir, (err, dir) => {
     
            res.send('文件合并1');



    })
})
app.listen(3000, () => console.log(3000))

