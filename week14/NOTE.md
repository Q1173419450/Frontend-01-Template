# 每周总结

利用 `jsx` 语法实现一个基本的组件

> jsx

生成节点的语法糖

当使用 `jsx` 语法时，大写的标签则会用变量来定义，小写则是字符串

> 组件思想

第一步：重写 jsx

第一步：定义基本的 config、properties、attribute、children

将获取到的属性挂在到节点（attribute）

将子节点统一放到数组中，统一挂载到父节点上

```jsx
class Div { // 组件第一版
  constructor(config) { // config
    console.log('config', config)
    this.children = [];
  }

  set class(v) {  // properties
    console.log("parent::class", v);
  }

  setAttribute(name, value) { // attribute
    console.log(name, value);
  }

  appendChild(child) {  // Children
    console.log("appendChild", child)
    this.children.push(child);
  }

  mountTo(parent) { // 挂在
    parent.appendChild(this.root);
    for(let child of this.children) { // 执行子元素的mountTo
      child.mountTo(this.root);
    }
  }
}
```

第二步：处理当子节点为 `文字` 时的情况

当子节点为文字时，需要在 `create` 时，通过一个 Text 类来处理文字，再挂在到父节点

```jsx
class Text {  // 文字处理
  constructor(text) {
    this.root = document.createTextNode(text)
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}
```

第三步：处理当前节点为 `普通元素` 时的情况

当节点为字符串时，不使用组件类，而是使用一个新的节点类，来渲染普通元素

```jsx
class Wrapper { // 普通标签
  constructor(type) { // config
    this.children = [];
    this.root = document.createElement(type);
  }

  set class(v) {  // properties
    console.log("parent::class", v);
  }

  setAttribute(name, value) { // attribute
    console.log(name, value);
    this.root.setAttribute(name, value);
  }

  appendChild(child) {  // Children
    console.log("appendChild", child)
    this.children.push(child);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    for(let child of this.children) {
      child.mountTo(this.root);
    }
  }
}
```

第四步：将元素一层一层的挂在到上层节点，形成 dom 树，然后渲染到页面

```tsx
mountTo(parent) {
  parent.appendChild(this.root);
}
```