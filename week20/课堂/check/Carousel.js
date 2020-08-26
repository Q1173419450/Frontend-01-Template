import { create, Text, Wrapper } from './createElement'

import { ease, linear } from './utils/cubicBezier';
import { Timeline, Animation } from './utils/animation1';

// import { enableGesture } from './utils/gesture';

export class Carousel {
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
    let timeline = new Timeline;
    // window.xtimeline = timeline;
    timeline.start();
    
    let position = 0;
    let nextPicStopHandler = null;

    let children = this.data.map((url, currentPosition) => {  // 
      let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
      let nextPosition = (currentPosition + 1) % this.data.length;

      // let currentElement = children[currentPosition] // children undefined

      let offset = 0;

      let onStart = () => {
        timeline.pause()
        clearTimeout(nextPicStopHandler);

        let currentElement = children[currentPosition]

        let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1])

        offset = currentTransformValue + 500 * currentPosition;
      }
  
      let onPan = event => {
        let dx = event.clientX - event.startX;

        let lastElement = children[lastPosition]  // element 的 translate 算出新的 translate 的值
        let currentElement = children[currentPosition]
        let nextElement = children[nextPosition]
        
        let lastTransformValue = -500 - 500 * lastPosition + offset + dx;
        let currentTransformValue = -500 * currentPosition + offset + dx;
        let nextTransformValue = 500 - 500 * nextPosition + offset + dx;


        lastElement.style.transform = `translateX(${lastTransformValue}px)`
        currentElement.style.transform = `translateX(${currentTransformValue}px)`
        nextElement.style.transform = `translateX(${nextTransformValue}px)`

      }

      let onPanEnd = event => {
        let direction = 0;
        let dx = event.clientX - event.startX;

        // flick
        if (dx + offset > 250 || dx > 0 && event.isFlick) {
          direction = 1;
        } else if (dx + offset < -250 || dx < 0 && event.isFlick) {
          direction = -1;
        }

        console.log(dx)

        timeline.reset();
        timeline.start();

        let lastElement = children[lastPosition]  // element 的 translate 算出新的 translate 的值
        let currentElement = children[currentPosition]
        let nextElement = children[nextPosition]

        // if (direction) {
          let lastAnimation = new Animation(lastElement.style, 'transform', 
            - 500 - 500 * lastPosition + offset + dx, - 500 - 500 * lastPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`)
          let currentAnimation = new Animation(currentElement.style, 'transform', 
            - 500 * currentPosition + offset + dx, - 500 * currentPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`)
          let nextAnimation = new Animation(nextElement.style, 'transform', 
            500 - 500 * nextPosition + offset + dx, 500 - 500 * nextPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`)
        // }

        timeline.add(lastAnimation);
        timeline.add(currentAnimation);
        timeline.add(nextAnimation);

        position = (position - direction + this.data.length) % this.data.length;

        setTimeout(nextPic, 3000);
      } 

      let element = <img src={url} onStart={onStart} onPan={onPan} onpanend={onPanEnd} enableGesture={true} />
      element.style.transform = "translateX(0px)"
      element.addEventListener('dragstart', event => event.preventDefault());

      return element
    });

    let root = <div class='carousel'>
      {children}
    </div>

      let nextPic = () => {
        let nextPosition = (position + 1) % this.data.length;

        let current = children[position];
        let next = children[nextPosition];

        let currentAnimation = new Animation(current.style, 'transform', 
          - 100 * position, - 100 - 100 * position, 500, 0, ease, v => `translateX(${5 * v}px)`)
        let nextAnimation = new Animation(next.style, 'transform', 
          100 - 100 * nextPosition, - 100 * nextPosition, 500, 0, ease, v => `translateX(${5 * v}px)`)  // 在这里存一下位移距离，在拖动的时候需要用

        timeline.add(currentAnimation);
        timeline.add(nextAnimation);
        
        position = nextPosition;

        // window.xstopHandler = setTimeout(nextPic, 3000); // restart
        nextPicStopHandler = setTimeout(nextPic, 3000);
      }
      nextPicStopHandler = setTimeout(nextPic, 3000);

    return root
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}