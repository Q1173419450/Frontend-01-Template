const http = require('http');
const fs = require('fs');
const archiver = require('archiver'); // MacOs obj.value.stats.isDirectory is not a function
const compressing = require('compressing'); // windows
const child_process = require('child_process')
const url = require('url')
const querystring = require("querystring");

// let packname = 'package.zip';

// var archive = archiver('zip');
// // archive.append(fs.createReadStream('dist/index.html'), {name: 'index.html'});
// archive.directory('./dist', false);

// archive.pipe(fs.createWriteStream('./dist.zip'));
// archive.on('end', function() {
//     console.log('上传完成！');
// });
// archive.finalize();

// 内网URL
/* 唤起登录 */
let redirect_uri = encodeURIComponent('http://localhost:8081/auth');
child_process.exec(`start https://github.com/login/oauth/authorize/?client_id=Iv1.fd051ff9cfec7cd4&redirect_uri=${redirect_uri}`)

let packName = './dist';
const server = http.createServer((req, res) => {
    console.log('real publish')
    let token = querystring.parse(url.parse(req.url).query).token;
    console.log(token)

    const options = {
        host: 'localhost',
        port: 8081,
        path: '/?filename=' + 'package.zip',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/octet-steam'
        }
    }

    // 向服务端发送数据
    const request = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    })

    var archive = archiver('zip', {
        zlib: {
            level: 9
        } // Sets the compression level.
    });

    archive.directory(packName, false)

    archive.pipe(request);

    archive.finalize();

    archive.on('end', () => {
        console.log('上传完成！');
        request.end();
        server.close();
    });

    request.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
})

server.listen(8080);

// compressing.zip.compressDir('./package', './package.zip').then((res) => {
//     fs.stat(packname, (error, stat) => {
//         if (error) {
//             console.log(err)
//             return;
//         }
//         const options = {
//             host: 'localhost',
//             port: 8081,
//             method: 'POST',
//             path: `/?filename=${packname}`,
//             headers: {
//                 'Content-Type': 'application/octet-stream',
//                 'Content-Length': stat.size
//             }
//         };
//         const req = http.request(options, (res) => {
//             console.log(`STATUS: ${res.statusCode}`);
//             console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//         })

//         req.on('error', (e) => {
//             console.error(`problem with request: ${e.message}`);
//         })
//         let readStream = fs.createReadStream(`./${packname}`);  // 文件流
//         readStream.pipe(req);
//         readStream.on('end', () => {
//             req.end();
//         })
//     })
// })