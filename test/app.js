const http = require('http');
const path = require('path');
//  处理表单
const multiparty = require('multiparty')
const server = http.createServer();
const fse = require('fs-extra')
//  要存放切片的地址
const UPLOAD_URL = path.resolve(__dirname, 'target');

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', "*")
  res.setHeader('Access-Control-Allow-Method', "*")
  // res.end('ok')
  if (req.url === '/') {
    //  获取文件/名称;
    //  获取POST传过来的表单数据
    const multipart = new multiparty.Form();
    multipart.parse(req, async (err, fields, files) => {
      if (err) {
        return;
      }
      //  获取文件块
      const [chunk] = files.chunk;
      //  获取文件名称
      const [filename] = fields.file_name;
      //  切片后的名称
      const dir_name = filename.split('-')[0]; 
      // 文件名称地址
      const chunkDir = path.resolve(UPLOAD_URL, dir_name)
      //  如果这个地址不存在 就创建一个吧
      if(!fse.existsSync(chunkDir)){
        await fse.mkdirs(chunkDir)
      }
      //  切片后的文件放到指定文件中夹
      await fse.move(chunk.path,`${chunkDir}/${filename}`)
      console.log(chunkDir,filename);
    })
  }else if(req.url === '/merge'){
    //  把server/app.js里面合并的代码拿过来就可以
    res.end('合并成功')
  }
})

server.listen(4000, () => console.log('http://localhost:3000'))