const express = require('express');
const app = express();
const path = require('path')
const multer = require('multer');
const fs = require('fs');
const dir_path = path.join(__dirname,'upload');
const upload_path = multer({dest:dir_path});
app.use(express.static(path.join(__dirname,'public')));

app.post('/files',upload_path.array('file'),(req,res)=>{
    console.log(req.files);
    console.log(req.body);
    //  剔除文件名
    const filePathList = req.body.path.split('/');
    filePathList.pop()
    createDir(filePathList)
    res.send('ok')
})

function createDir(arr){
   for (let i = 0; i < arr.length; i++) {
         fs.mkdir(path.join(dir_path,arr[i]),(err)=>{
             console.log(err);
             arr.shift();
         })
   }
}


app.listen(3000,()=>console.log(3000))