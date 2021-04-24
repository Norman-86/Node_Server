const path = require('path');
const fs = require('fs');
const http = require('http');
const port = 5000

const server = http.createServer((request, response) => {
    if (request.url === '/') {
        let filePath = path.join(__dirname, 'public', 'index.html')
        fs.readFile(filePath, 'utf8', (err, data) => {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end(data)
        })
    }

    if (request.url === '/index2.html') {
        let filePath = path.join(__dirname, 'public', 'index2.html')
        fs.readFile(filePath, 'utf8', (err, data) => {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end(data)
        })
    }
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});