# 每周总结

PhantomJS、Puppeteer、cypress

不支持 ES6 语法

jslint

## OAuth

> 以 gitHub 为例

文档

https://developer.github.com/v3/media/

https://docs.github.com/en/developers/apps/using-content-attachments

首先需要请求 `https://github.com/login/oauth/authorize/` 拿到 code 值

code 值 主要的作用就是 gitHub 返回的一个值用来换取 access_token, 这样就可以使用access_token 调起 git 的一些 api

> 实例

主要由 tools 类发起拿到 code，传到 server 服务，server 拿到 access_token后，传递到 tools 中的 publish 类，形成闭环 