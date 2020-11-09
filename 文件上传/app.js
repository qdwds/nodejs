const express = require('express');
const app = express();
const path = require('path');
const multiparty = require('multiparty');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')))

app.post('/file', (req, res) => {
    const form = new multiparty.Form({
        uploadDir: 'files'
    })
    form.parse(req, (err, fieds, files) => {

        if (!err) {
            const fileName = files.file[0].originalFilename;
            const oldPath = __dirname + '\\' + files.file[0].path;
            const newPath = __dirname + '\\' + 'files\\' + fileName
            console.log(oldPath);
            fs.rename(oldPath, newPath, (err, q) => {
                if (!err) {
                    res.send(
                        {
                            message: "上传成功",
                            code: 200
                        }
                    )
                }
            })

        }

    })

})
app.listen(3000, () => console.log(`http://localhost:3000`))