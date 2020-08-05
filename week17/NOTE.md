# 每周总结

## 组件化（一种抽象方式）

用户希望用到什么样的组件

一个特殊的对象，涵盖 
  Properties
  Methods
  Attribute：声明式编程相关的特性
  Config：全局的能力
  State：内部状态变化
  Event：组件接收东西
  Lifecycle：定义组件的方式
  Children：以树形描述一个界面

## 自研 generator

输入

npm install

文件模板

[How do you edit existing text (and move the cursor around) in the terminal?](https://stackoverflow.com/questions/10585683/how-do-you-edit-existing-text-and-move-the-cursor-around-in-the-terminal?answertab=active#tab-top)

- Move the cursor up N lines: 上
  - `\033[<N>A`
- Move the cursor down N lines: 下
  - `\033[<N>B`
- Move the cursor forward N columns: 之前
  - `\033[<N>C`
- Move the cursor backward N columns: 之后
  - `\033[<N>D`

[How to change node.js's console font color?](https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color)
[hide-terminal-cursor](https://www.npmjs.com/package/hide-terminal-cursor)