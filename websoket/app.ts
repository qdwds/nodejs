const ws = require('ws');
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


const server = new ws.Server({
    port: 8000
})

server.on('connection', (childs: any) => {
    //  主动给C端发送消息
    for (let i = 0; i < 10; i++) {
        childs.send(`第一次：${i}`)
    }

    //  接受c端消息
    childs.on('message', (e) => {
        console.log(e); //  接受前端发送的从连命令
        for (let i = 0; i < 10; i++) {
            childs.send(`重新连接：${i}`)
        }
    })
})

app.listen(9000)
