const http = require('http');
const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log("=== FRONTEND ERROR RECEIVED ===");
        console.log(body);
        console.log("===============================");
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end('ok');
    });
});
server.listen(9999, () => {
    console.log('Error catching server listening on port 9999');
});
