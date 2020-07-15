// attributes = null
// 先子后父
/**
 * 
 * @param {*} Cls 
 * @param {*} attributes 
 * @param  {...any} children 
 */
function create(Cls, attributes, ...children) {
  let o;

  if (typeof Cls === 'string') {
    o = new Wrapper(Cls);
  } else {
    o = new Cls({ // hooks 改了这里
      time: '111'
    })
  }

  if (attributes !== null) {
    for (let name in attributes) {
      o.setAttribute(name, attributes[name])
    }
  }

  for(let child of children) {
    if (typeof child === 'string') {
      child = new Text(child);
    }
    o.appendChild(child);
  }

  return o;
}

class Text {  // 文字处理
  constructor(text) {
    this.root = document.createTextNode(text)
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

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

class Div { // 组件第一版
  constructor(config) { // config
    console.log('config', config)
    this.children = [];
    this.root = document.createElement('div');
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
    for(let child of this.children) { // 执行子元素的mountTo
      child.mountTo(this.root);
    }
  }
}

class MyComponent { // 组件第二版
  constructor(config) { // config
    console.log('config', config)
    this.children = [];
    this.root = document.createElement('div');
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

  render() {
    return (
      <article>
        <header>I 'm header</header>
        {this.slot}
        <footer>I 'm footer</footer>
      </article>
    )
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    this.slot = <div></div>
    for(let child of this.children) { // 执行子元素的mountTo
      this.slot.appendChild(child);
    }
    this.render().mountTo(this.root);
  }
}

let component = <MyComponent id='a' class='class' style='width: 100px;height: 100px; background: pink;'>
  <div>1</div>
  <p>2</p>
  <Div>3</Div>
  <div>4</div>
</MyComponent>

component.mountTo(document.body);

// console.log(component)
// component.class = 'test'