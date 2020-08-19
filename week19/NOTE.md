# 每周总结可以写在这里

## init 工具

使用 yo、yeoman-generator 进行项目构建

注意，yo 项目的 package name 必须是 generator 开头

具体用法参照文档

使用 npm link 进行校验文件

## publish 发布系统

在服务器构建发布系统需要如：对应服务（server）、发布系统（publish-server）、发布工具（publish-tools）

服务（server）：对应的线上页面，线上文件

发布系统（publish-server）：通过这个发布系统可以向线上服务部署文件

还可以进行发布权限控制、文件存到对应位置、版本管理、权限管理

发布工具（publish-tools）：最底层工具，对文件进行整合，压缩，发送到发布系统，由发布系统统一部署。