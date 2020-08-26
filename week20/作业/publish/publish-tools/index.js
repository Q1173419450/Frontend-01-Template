/* publish-tool */
// 唤起浏览器
// mac：open
// start

let url = encodeURIComponent('http://localhost:8080/')
console.log(url)
console.log('https://github.com/login/oauth/authorize/?client_id=Iv1.fd051ff9cfec7cd4&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F')
// code=e303eece768b1c918d43

// https://github.com/login/oauth/authorize/    获取 code
// https://github.com/login/oauth/access_token  使用code 换取 access_token
// https://api.github.com/user  // 使用 access_token 获取 用户信息

// 微信端客户端的 OAth
/* 
    access_token=803796c4f55f98510eb31f2d26155b22a17b90f7
    &expires_in=28800
    &refresh_token=r1.cbfdb6360c0384d5868997afe18f04db5e5918563b1431c116244a115e7651f81357a8cad6f9c2bb
    &refresh_token_expires_in=15897600&scope=
    &token_type=bearer
*/

/* publish-server */
{// 登录
    let code = 'b21dd81a01af23604d49';
    let client_id = 'Iv1.fd051ff9cfec7cd4';
    let client_secret = 'f8c5fd35f39d419cce739ecd69d83d7f6ee64272';
    // let state = '123abc';
    let redirect_uri = encodeURIComponent('http://localhost:8080/');
    
    let params = `code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`
    
    const xhr = new XMLHttpRequest(); // fetch
    
    xhr.open('POST', `https://github.com/login/oauth/access_token?${params}`, true);
    xhr.send(null)
    
    xhr.addEventListener('readystatechange', function(e) {
        if (this.readyState === 4) {
            console.log(this.responseText)
        }
    })
}

{   // publish-tools / publish-server
    const xhr = new XMLHttpRequest(); // fetch
    
    xhr.open('GET', `https://api.github.com/user?${params}`, true);
    xhr.setRequestHeader('Authorization', 'token 803796c4f55f98510eb31f2d26155b22a17b90f7')
    xhr.send(null)
    
    xhr.addEventListener('readystatechange', function(e) {
        if (this.readyState === 4) {
            console.log(this.responseText)
        }
    })
}