  
const http = require('http')
const https = require('https')
const fs = require('fs')
const url = require('url')
var querystring = require("querystring");
const unzip = require('unzipper')

//Create an HTTP server
const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;
  console.log(req.url)

  // if (pathname == '/auth') {
  //   return auth(req, res);
  // }

  if (req.url.match(/^\/auth/)) {
    return auth(req, res);
  }

  if (!req.url.match(/^\/?/)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
  }

  console.log(req.headers.token)

  // if (pathname != '/favicon.ico') {
    
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: '/user',
      method: 'GET',
      headers: {
        Authorization: 'token ' + req.headers.token,
        "User-Agent": 'toy-publish-server'
      }
    }

    const request = https.request(options, (response) => {
      let body = ''
      response.on('data', (data) => {
        const result = data.toString();
        body += result;
      })
      response.on('end', () => {
        let userInfo = JSON.parse(body);
        console.log('userInfo')
        console.log(userInfo);

        // 权限检查
        let writeStream = unzip.Extract({ path: '../server/public' })
        req.pipe(writeStream)
      
        req.on('end', () => {
          res.writeHead(200, { 'Content-Type': 'text/plain' })
          res.end('okay')
        })
      
        // req.on('error', (err) => {
        //   console.log(err)
        // })
      })
    })

    request.on('error', (e) => {
      console.error(e);
    });
    request.end();
  // }
})

function auth(req, res) { 
  const query = url.parse(req.url).query;
  let code = querystring.parse(query).code;
  let client_id = 'Iv1.fd051ff9cfec7cd4';
  let client_secret = 'f8c5fd35f39d419cce739ecd69d83d7f6ee64272';
  let redirect_uri = encodeURIComponent('http://localhost:8081/auth');

  let params = `code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`

  const options = {
    hostname: 'github.com',
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: 'POST'
  }

  const request = https.request(options, (response) => {
  
    response.on('data', (d) => {
      let body = querystring.parse(d.toString());
      if (body.error) {
        console.log(body.error_description);
        res.end('error');
        return
      }
      const access_token = querystring.parse(d.toString()).access_token;
      res.writeHead(200, { 
        'Content-Type': 'text/html',
        'access_token': access_token
      })
      res.end(`<a href='http://localhost:8080/publish?token=${access_token}'>publish</a>`)
    });
  });
  
  request.on('error', (e) => {
    console.error(e);
  });

  request.end();
}

server.listen(8081)