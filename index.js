  const http = require('http');
  const path = require('path');
  const fs = require('fs');
  const PORT = 3000;
  const hostname = 'localhost';

  // createServer is the http method used to create a web server that takes a callback.
  const server = http.createServer(serverHandler);

  // callback function definition
  function serverHandler(req, res) => {
    if(req.method === 'GET' && req.url === '/') {
      let filePath = path.resolve(__dirname, 'public/index.html')
      let fileExists = fs.existsSync(filePath);
      if (!fileExists) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
          <html>
            <body>
              <h3>Page not found</h3>
            </body>
          </html>`)
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
      }
    }
  }

  server.listen(PORT, hostname, () => {
    console.log(`Server running at ${hostname}:${PORT}`);   
  })
