# 每周总结

## Single File Components（单文件组件）

Vue 提供的一种组件化解决方案

- 全局定义
  - 拒绝全局定义，因为全局定义需要每个组件命名不冲突
  - 拒绝字符串模板，使用字符串模板的全局组件，对开发极其不友好，没有语法高亮。
  - 不支持 CSS (No CSS support)
  - 没有构建步骤 (No build step) 限制只能使用 HTML 和 ES5 JavaScript，而不能使用预处理器，如 Pug (formerly Jade) 和 Babel

单文件组件解决了以上的问题

> 如何解析 Single File Components

1、我们定义了一个 loader 文件来对单文件组件进行解析

2、利用 `状态机` 的方式来处理文件内容，主要难点在于解析 `script` 内的一系列内容。

3、当解析出了 DOM 树后，再利用 `JSX` 进行 `DOM树` 解析，实现真正的 DOM 内容。

## 构建一个动画库

定义一个动画类，专门处理动画

- 动画对象
- 动画方式
- 开始位置
- 结束位置
- 动画时长
- 延迟
- 动画方式
- 位移距离

定义一个时间线专门处理动画的执行和先后顺序

- 定义一个动画队列，将动画类加入到队列中
- 定义一个动画函数
  - 计算当前时间到 动画时长 为一个周期
  - 计算当前周期内位移的值
  - 动画结束停止 requestAnimationFrame、并推出当前动画类

## 使用 TypeScript 对 项目进行重构，暂时只做了 animation

主要问题出现在使用 style 的类型 CSSStyleDeclaration 时，使用索引签名。将 tsconfig.json 中 `"noImplicitAny": false`关闭即可

```ts
// 关键代码
object[property] = template(value);
```

当参数有可能为空时，不能直接赋值或使用，而是需要类型断言或者类型保护下

```ts
// 若不进行断言，使用则可能因为元素找不到返回null，所以需要断言下
let el = document.getElementById('el') as HTMLElement
```