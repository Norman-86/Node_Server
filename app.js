const path = require('path');
const fs = require('fs');
const http = require('http');
const port = 5000

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
    let contentType = getContentType(filePath) || 'text/html'
    let emptyPath = path.join(__dirname, 'public', '404.html')
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(emptyPath, 'utf8', (err, content) => {
                    res.writeHead(200, { 'Content-Type': contentType })
                    res.end(content)
                })
            } else {
                res.writeHead(500)
                res.end('A server error has occurred')
            }
        }
        if (!err) {
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(content)
        }
    })
})

const getContentType = (filePath) => {
    let extname = path.extname(filePath)
    if (extname === '.js') {
        return 'text/javascript'
    }
    if (extname === '.css') {
        return 'text/css'
    }
    if (extname === '.png') {
        return 'image/png'
    }
    if (extname === '.jpg') {
        return 'image/jpg'
    }
}

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});