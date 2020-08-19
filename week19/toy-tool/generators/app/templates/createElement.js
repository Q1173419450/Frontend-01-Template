import { enableGesture } from './utils/gesture';

export function create(Cls, attributes, ...children) {

  let o;

  if (typeof Cls === "string") {
    o = new Wrapper(Cls);
  } else {
    o = new Cls({
      timer: {}
    });
  }

  for (let name in attributes) {
    o.setAttribute(name, attributes[name]);
  }

  let visit = (children) => { //递归详细了解下
    for (let child of children) {

      if (typeof child === "object" && child instanceof Array) {
        visit(child)
        continue
      }
      if (typeof child === "string")
        child = new Text(child);
      o.appendChild(child);
    }
  }

  visit(children);

  return o;
}


export class Text {
  constructor(text) {
    this.children = [];
    this.root = document.createTextNode(text);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

export class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }

  setAttribute(name, value) { //attribute
    this.root.setAttribute(name, value);

    if (name.match(/^on([\s\S]+)$/)) {
      let eventName = RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase());

      console.log(eventName)

      this.addEventListener(eventName, value);
    }

    if (name === 'enableGesture') {
      enableGesture(this.root);
    }
  }

  addEventListener() {
    this.root.addEventListener(...arguments);
  }

  appendChild(child) {
    this.children.push(child);
  }

  get style() {
    return this.root.style;
  }

  mountTo(parent) {
    parent.appendChild(this.root);

    console.log('Wrapper', this.children)
    for (let child of this.children) {
      child.mountTo(this.root);
    }
  }

}