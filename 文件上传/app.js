const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const DIR_PATH = path.join(__dirname, 'upload');
const upload = multer({ dest: DIR_PATH }) //  文件存放的地方

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.send('123')
})

app.post('/file', upload.single('file'), (req, res) => {
    const oldFilePath = req.file.path;
    const newFilePath = path.join(DIR_PATH, req.file.originalname);
    fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) return console.log(err);
        res.send('ok')
    })
})
app.listen(3000, () => console.log(3000))