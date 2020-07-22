import {Timeline, Animation} from './animation.js';
import { create, Text, Wrapper } from './createElement.js'

// let el = document.getElementById('el');
let lt = new Timeline();

// type TimingFunction = (t: number) => number;
// type Template = (v: number) => string;

let linear = t => t;
// let template: Template = v => `translateX(${v}px)`;

// let AnimationObj = {
//   object: el.style,
//   property: 'transform',
//   start: 0,
//   end: 200,
//   duration: 3000,
//   delay: 0,
//   timingFunction: linear,
//   template: template
// }

// lt.add(new Animation(AnimationObj), 0);


class Carousel {
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
    let children = this.data.map(url => {
      let element = <img src={url} />
      element.addEventListener('dragstart', event => event.preventDefault());

      return element
    });

    let root = <div class='carousel'>
      {children}
    </div>

    let position = 0;

      let nextPic = () => {
        let nextPosition = (position + 1) % this.data.length;

        let current = children[position];
        let next = children[nextPosition];

        current.style.transition = "ease 0s";
        next.style.transition = "ease 0s";

        // current.style.transform = `translateX(${- 100 * position}%)`
        // next.style.transform = `translateX(${100 - 100 * nextPosition}%)`

        let currentAnimation = {
          object: current.style,
          property: 'transform',
          start: 0,
          end: 100,
          duration: 3000,
          delay: 0,
          timingFunction: linear,
          template: position => `translateX(${-1 * position}%)`
        }

        let nextAnimation = {
          object: next.style,
          property: 'transform',
          start: 0,
          end: 1,
          duration: 3000,
          delay: 0,
          timingFunction: linear,
          template: nextPosition => `translateX(${100 - 100 * nextPosition}%)`
        }

        
        lt.add(new Animation(currentAnimation), 3000);
        lt.add(new Animation(nextAnimation), 3000);

        lt.start();

        current.style.transition = ""; // 反直觉，打开动画
        next.style.transition = "";

        // setTimeout(() => {
        //   current.style.transition = ""; // 反直觉，打开动画
        //   next.style.transition = "";

        //   // current.style.transform = `translateX(${- 100 - 100 * position}%)`
        //   // next.style.transform = `translateX(${- 100 * nextPosition}%)`

        //   let currentAnimation = {
        //     object: current.style,
        //     property: 'transform',
        //     start: 0,
        //     end: 200,
        //     duration: 3000,
        //     delay: 0,
        //     timingFunction: linear,
        //     template: position => `translateX(${- 100 - 100 * position}%)`
        //   }
  
        //   let nextAnimation = {
        //     object: next.style,
        //     property: 'transform',
        //     start: 0,
        //     end: 200,
        //     duration: 3000,
        //     delay: 0,
        //     timingFunction: linear,
        //     template: nextPosition => `translateX(${- 100 * nextPosition}%)`
        //   }
          
        //   lt.add(new Animation(currentAnimation), 0);
        //   lt.add(new Animation(nextAnimation), 0);

        //   position = nextPosition;
        // }, 16)

        // setTimeout(nextPic, 3000);
      }
      nextPic()
      // setTimeout(nextPic, 3000);

      // root.addEventListener("mousedown", event => { // 拖拽同时使用三张图片
      //   let startX = event.clientX,
      //     startY = event.clientY;

      //   let lastPosition = (position - 1 + this.data.length) % this.data.length;
      //   let nextPosition = (position + 1) % this.data.length;

      //   let current = children[position];
      //   let last = children[lastPosition];
      //   let next = children[nextPosition];

      //   current.style.transition = "ease 0s";
      //   last.style.transition = "ease 0s";
      //   next.style.transition = "ease 0s";

      //   current.style.transform = `translateX(${- 500 * position}px)`
      //   last.style.transform = `translateX(${- 500 - 500 * lastPosition}px)`
      //   next.style.transform = `translateX(${500 - 500 * nextPosition}px)`

      //   let move = event => {
      //     current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`
      //     last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`
      //     next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`
      //   };

      //   let up = event => {
      //     let offset = 0;

      //     if (event.clientX - startX > 250) {
      //       offset = 1;
      //     } else if (event.clientX - startX < -250) {
      //       offset = -1
      //     }

      //     current.style.transition = "";
      //     last.style.transition = "";
      //     next.style.transition = "";

      //     current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
      //     last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`
      //     next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`

      //     position = (position - offset + this.data.length) % this.data.length;

      //     document.removeEventListener("mousemove", move);
      //     document.removeEventListener("mouseup", up);
      //   };
      //   document.addEventListener("mousemove", move);
      //   document.addEventListener("mouseup", up);
      // })


    return root
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}

let components = <Carousel data={[
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />

components.mountTo(document.body);

// let startBtn = document.getElementById('start-btn') as HTMLElement
// let pauseBtn = document.getElementById('pause-btn') as HTMLElement
// let resumeBtn = document.getElementById('resume-btn') as HTMLElement
// let restartBtn = document.getElementById('restart-btn') as HTMLElement

// startBtn.addEventListener('click', () => {
//   lt.start()
// })

// pauseBtn.addEventListener('click', () => {
//   lt.pause()
// })

// resumeBtn.addEventListener('click', () => {
//   lt.resume();
// })

// restartBtn.addEventListener('click', () => {
//   lt.restart();
// })