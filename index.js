const http = require("http");
http.createServer((req,res) => {
    var path = req.url.toLowerCase();
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('This is a home page');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('I really want to pass this class');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }
}).listen(process.env.PORT || 3000);

console.log('Server running at http://127.0.0.1:3000/');