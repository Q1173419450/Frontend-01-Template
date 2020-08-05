import { create, Text, Wrapper } from './createElement'

import { ease, linear } from './utils/cubicBezier';
import { Timeline, Animation } from './utils/animation1';

// import { enableGesture } from './utils/gesture';

export class Panel {
  constructor(config) {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
  }

  setAttribute(name, value) { //attribute
    this[name] = value;
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    return <div class='panel' style='border: 1px solid lightgreen;'>
      <h1 style='background-color: lightgreen;width:300px;margin: 0;'>{this.title}</h1>
      <div style='width:300px;margin: 0;'>
        {this.children}
      </div>
    </div>
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}