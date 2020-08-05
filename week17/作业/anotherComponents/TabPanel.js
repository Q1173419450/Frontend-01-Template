import { create, Text, Wrapper } from './createElement'

import { ease, linear } from './utils/cubicBezier';
import { Timeline, Animation } from './utils/animation1';
// import { enableGesture } from './utils/gesture';

export class TabPanel {
  constructor(config) {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
    this.state = Object.create(null);
  }

  setAttribute(name, value) { //attribute
    this[name] = value;
  }

  getAttribute(name) {
    return this[name];
  }

  appendChild(child) {
    this.children.push(child);
  }

  select(i) {
    for(let view of this.childViews) {
      view.style.display = 'none';
    }
    this.childViews[i].style.display = '';
    
    for(let view of this.titleViews) {
      view.classList.remove('selected');
    }
    this.titleViews[i].classList.add('selected');
  }

  render() {
    this.titleViews = this.children.map((child, i) => <span onClick={() => this.select(i)} style='width: 300px;'>{child.getAttribute('title')}</span>);
    this.childViews = this.children.map(child => <div style='width: 300px;'>{child}</div>);

    setTimeout(() => this.select(0), 16);
    return <div class='tab-panel'>
      <h1 style='background-color: lightgreen;width:300px;margin: 0;'>{this.titleViews}</h1>
      <div>
        {this.childViews}
      </div>
    </div>
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}