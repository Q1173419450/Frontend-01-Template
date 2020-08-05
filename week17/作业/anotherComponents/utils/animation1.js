export class Timeline {
  constructor() {
    this.animations = new Set();
    this.finishAnimations = new Set();
    this.addTimes = new Map();
    this.state = 'inited';
    this.requestId = null;
  }

  tick() {
    let t = Date.now() - this.startTime;
    for (let animation of this.animations) {
      let {
        object,
        property,
        start,
        end,
        timingFunction,
        template,
        delay,
        duration
      } = animation;

      let addTime = this.addTimes.get(animation);

      console.log(addTime)

      if (t < delay + addTime) {
        continue;
      }

      let progression = timingFunction((t - delay - addTime) / duration);

      if (t > duration + delay + addTime) {
        progression = 1;
        this.animations.delete(animation);
        this.finishAnimations.add(animation);
      }


      // object[property] = template(timingFunction(start, end)(t - delay));
      let value = animation.valueFromProgression(progression);
      object[property] = template(value);
    }
    if (this.animations.size) {
      this.requestId = requestAnimationFrame(() => this.tick());
    } else {
      this.requestId = null
    }
  }

  start() {
    if (this.state != "inited") {
      return;
    }

    this.state = 'playing';

    this.startTime = Date.now();
    this.tick();
  }

  pause() {
    if (this.state != "playing") {
      return;
    }

    this.state = 'pause';

    this.pauseTime = Date.now();
    if (this.requestId !== null) {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  }

  resume() {
    if (this.state !== "pause") {
      return ""
    }

    this.state = 'playing';

    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  reset() {
    if (this.state == "playing") {
      this.pause();
    }
    // this.state = 'playing';
    
    this.animations = new Set();
    this.finishAnimations = new Set;
    this.addTimes = new Map();

    this.requestId = null;
    this.startTime = Date.now()
    this.pauseTime = null;
    this.state = 'inited';
  }

  restart() {
    if (this.state == "playing") {
      this.pause();
    }
    this.state = 'playing';

    for(let animation of this.finishAnimations) {
      this.animations.add(animation);
    }

    this.finishAnimations = new Set();
    this.requestId = null;
    this.startTime = Date.now()
    this.pauseTime = null;
    this.tick();
  }

  add(animation, addTime) {
    this.animations.add(animation);
    if (this.state === 'playing' && this.requestId === null) {
      this.tick()
    }
    
    if (this.state === 'playing') {
      this.addTimes.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime)
    } else {
      this.addTimes.set(animation, addTime !== void 0 ? addTime : 0)
    }
  }
}

export class Animation {
  constructor(object, property, start, end, duration, delay, timingFunction, template) {
    this.object = object;
    this.property = property;
    this.start = start;
    this.end = end;
    this.duration = duration || 2000;
    this.delay = delay || 0;
    this.timingFunction = timingFunction
    this.template = template;
  }

  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start);
  }
}

/* 

  let animation = new Animation(object, property, start, end, duration, delay, timingFunction);
  let animation2 = new Animation(object, property, start, end, duration, delay, timingFunction);

  let timeline = new Timeline;  // 时间线、可以有不同的时间线

  timeline.add(animation)
  timeline.add(animation2)
  
  timeline.start();
  timeline.pause();
  timeline.resume();
  timeline.stop();

  setTimeout();
  setInterval();
  requestAnimationFrame
*/