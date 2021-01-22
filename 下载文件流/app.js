const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/download', (req, res) => {
    let file = path.join(__dirname, 'public', 'index.html');
    res
        .header({
            'filename': 'index.html'
        })
        .download(file)
})

app.listen(3000, () => console.log(3000))