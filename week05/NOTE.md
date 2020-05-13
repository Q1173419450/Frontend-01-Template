# 每周总结

### 结构化

#### 函数调用栈（Execution Context Stack）

先进先出

- code evalluation state
  - async await（保存状态）
  - Generator
- Function
  - 可能是 null
- Script or Module
  - null
- Generator
  - yield
- Realm
  - 在 JS 中，函数表达式和对象直接量均会创建对象
  - 使用. 做隐式转化也会创建对象
  - 这些对象都有原型，如何我们没有Realm，我们就不知道他们的原型是谁
- LexialEnvironment
  - this
    - 箭头函数，执行的时候和变量一起指定指向
    - 普通函数，在执行时，才知道他的指向
  - new Target
  - super
  - 变量
- VariableEnvironment
  - with()
  - eval()

####  Environment Record
  
- Declarative Environment Record (声明环境记录)
  - Function Environment Record
  - module Environment Record
- Global Environment Record（全局环境）
- Object Environment Record（对象环境，with）

### BrowerHTTP

#### 浏览器渲染原理

面试题：用户在输入url按下回车，浏览器都做了哪些操作

当用户输入时，浏览器会先判断时要进行搜索还是请求 URL

当为请求URL时，提交文档进入到网络进程，网络进程会先查看是否有DNS 解析记录，然后再查看操作系统中的 host 是否保存有记录，有则直接访问IP地址，与TCP 连接，没有则需要访问远程服务器获取 IP 地址

当拿到 IP 地址后，通过三次握手与服务器建立 TCP 连接，返回状态码、请求头、cookie 等

浏览器更新状态 进入渲染进程

解析 HTML、CSS 形成Render Tree 最后进行页面渲染

#### 浏览器 request

请求行
请求头
请求内容

```
POST / HTTP/1.1/r
Host: 127.0.0.1/r
Content-Type: application/x-www-form-urlencoded/r
/r/n
field1=aaa&code=x%3D1
```

#### 浏览器 response

状态行
响应头
响应内容

```
HTTP/1.1 200 OK
Content-Type: text/html
Date: Mon, 23 Dec 2019 06:46:19 GMT
Connection: keep-alive
Transfer-Encoding: chunked

26(body.length)
<html><body> Hello World<body></html>
26
<html><body> Hello World<body></html>
0(body.end)
```