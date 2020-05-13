const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.headers);
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('X-Foo', 'bar')
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok')
}).listen(3000, () => {
  console.log('链接 3000 成功');
})