const http = require('http');
const fs = require('fs');
const archiver = require('archiver'); // MacOs obj.value.stats.isDirectory is not a function
const compressing = require('compressing'); // windows
// const querystring = require('querystring');

// let packname = 'package.zip';

var archive = archiver('zip');
// archive.append(fs.createReadStream('dist/index.html'), {name: 'index.html'});
archive.directory('./dist', false);

archive.pipe(fs.createWriteStream('./dist.zip'));
archive.on('end', function() {
    console.log('上传完成！');
});
archive.finalize();

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

// fs.stat(filename, (error, stat) => {
    
    // const req = http.request(options, (res) => {
    //     console.log(`STATUS: ${res.statusCode}`);
    //     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    // })

    // req.on('error', (e) => {
    //     console.error(`problem with request: ${e.message}`);
    // })
    // let readStream = fs.createReadStream(`./${filename}`);  // 文件流
    // readStream.pipe(req);
    // readStream.on('end', () => {
    //     req.end();
    // })
// })

// const postData = querystring.stringify({
//     'content': 'Hello World!'
// });

// const options = {
//     host: 'localhost',
//     port: 8081,
//     method: 'POST',
//     path: '/?filename=x.html',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': Buffer.byteLength(postData)
//     }
// }

// const req = http.request(options, (res) => {
//     console.log(`STATUS: ${res.statusCode}`);
//     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//     res.setEncoding('utf8');
//     // res.on('data', (chunk) => {
//     //   console.log(`BODY: ${chunk}`);
//     // });
//     // res.on('end', () => {
//     //   console.log('No more data in response.');
//     // });
//   });
  
//   req.on('error', (e) => {
//     console.error(`problem with request: ${e.message}`);
//   });
  
//   // Write data to request body
//   req.write(postData);
//   req.end();