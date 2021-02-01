const express = require('express');
const app = express();
const path = require('path')
const jwt = require('jsonwebtoken');
app.use(express.static(path.join(__dirname,'public')))

app.get('/jwt',(req,res)=>{
    const token = jwt.sign({data:'123'},'secrent1',{expiresIn:'20s'})
    res.send({
        code:200,
        token
    })
})

app.get('/check',(req,res)=>{
    const token = req.headers['authorization']
    jwt.verify(token, 'secrent1',function(err, decoded) {
        if (err)  return res.send({
            ...err,
            code:403
        })
        res.send({
            code:200,
            token:token
        })
    })
})
app.listen(5000,()=>console.log(5000))