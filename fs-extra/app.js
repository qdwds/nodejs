const express = require('express');
const app = express();
const path = require("path");
const fse = require('fs-extra');
app.use(express.static(path.join(__dirname, 'public')))

const dir_path = path.join(__dirname);


//  赋值指定文件夹下所有文件
app.get('/copy', (req, res) => {
    fse.copy(`${dir_path}/files`, `${dir_path}`)
        .then(re => res.send(re))
        .catch(err => res.send(err))
})

//  确保文件夹是空的(文件夹)。如果存在清空文件下所有内容，如果目标不存在则创建目标
app.get("/emptyDir", (req, res) => {
    fse.emptyDir(`${dir_path}/files`)
        .then(re => res.send(re))
        .catch(err => res.send(err))
})

//  确保目标存在(文件夹)，不存在则创建
app.get("/ensureDir", (req, res) => {
    const dir = path.join(dir_path, 'files/file/fil/fi/f')
    fse.emptyDir(dir)
        .then(re => res.send(re))
        .catch(err => res.send(err))
})

//  确保文件存在,存在不修改，不存在创建
app.get("/ensureFile", (req, res) => {
    const dir = path.join(dir_path, 'files/file/fil/fi/1.txt')
    fse.ensureFile(dir)
        .then(re => res.send(re))
        .catch(err => res.send(err))
})

// 移动文件位置 需要指定文件,否则无效
app.get("/move", (req, res) => {
    const dest = path.join(__dirname,'files','file','2.txt')
    const dir = path.join(__dirname,'files','file','fil','fi','f','2.txt')
    fse.move(dir,dest)
        .then(re => res.send(re))
        .catch(err => res.send(err))
})

// 往指定的文档写入内容 
app.get("/outputFile", (req, res) => {
    const txt = path.join(__dirname,'files','file','txt.txt')
    fse.outputFile(txt,'10100')
        .then(re => {
            //  读取内容后返回前端
            fse.readFile(txt,'utf-8',(err,data)=>{
                res.send(data)
            })
        })
        .catch(err => res.send(err))
})


// pathExists   检测文件是否存在
app.get("/pathExists", (req, res) => {
    const dir = path.join(__dirname,'file','2.txt')
    fse.pathExists(dir)
        .then(re =>{
            res.send(re)
        })
        .catch(err => res.send(err))
})

//  删除文件
app.get("/remove", (req, res) => {
    const dir = path.join(__dirname,'file','2.txt')
    fse.remove(dir)
        .then(re =>{
            res.send(re)
        })
        .catch(err => res.send(err))
})

app.listen(3000, () => {
    console.log(3000);
})

