const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const dir_path = path.join(__dirname, 'upload')
const upload_path = multer({ dest: dir_path })

app.use(express.static(path.join(__dirname, 'public')))

app.post('/file', upload_path.array('file'), async (req, res) => {
    const filePath = []
    //  获取每个文件 修改每个文件的名字
    const files = req.files;
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            let oblFilPath = files[i].path;
            let newFilePath = path.join(dir_path, files[i].originalname);
            fs.renameSync(oblFilPath, newFilePath)
            filePath.push(newFilePath)
        }
        res.send({ success: 200, path: filePath })
    }
})
app.listen(3000, () => console.log('http://localhost:3000'));
