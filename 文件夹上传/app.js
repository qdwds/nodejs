const express = require('express');
const app = express();
const path = require('path')
const multer = require('multer');
const fs = require('fs');
const dir_path = path.join(__dirname, 'upload');
const upload_path = multer({ dest: dir_path });
app.use(express.static(path.join(__dirname, 'public')));

app.post('/files', upload_path.array('file'), (req, res) => {
    // console.log(req.files);
    // console.log(req.body);
    //  剔除文件名
    const filePathList = req.body.path.split('/');
    filePathList.pop()
    let filePath = filePathList.join('/')
    let createPaths = path.join(dir_path, filePath)

    let files =[];

    fs.mkdir(createPaths, { recursive: true }, (err) => {
        if (err) throw err;

        //  把下载的文件放到指定目录下
        let oldPath = req.files[0].path;
        let newPath = path.join(dir_path, req.body.path)
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
            files.push(newPath)
            res.send({
                success:2000,
                path:newPath
            })

        })
    });
})


app.listen(3000, () => console.log(3000))