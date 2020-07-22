export class Timeline {
  constructor() {
    this.animations = [];
    this.state = 'inited';
    this.requestId = null;
  }

  tick() {
    let t = Date.now() - this.startTime;
    let animations = this.animations.filter(animation => !animation.finished);
    console.log(t)
    for (let animation of animations) {

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

      let progression = timingFunction((t - delay) / duration);

      if (t > animation.duration + animation.delay) {
        progression = 1;
        animation.finished = true;
      }

      let value = start + progression * (end - start);

      // object[property] = template(timingFunction(start, end)(t - delay));
      object[property] = template(value);
    }
    this.requestId = requestAnimationFrame(() => this.tick());
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

  restart() {
    if (this.state == "playing") {
      this.pause();
    }

    this.state = 'playing';
    this.animations = [];
    this.requestId = null;
    this.startTime = Date.now()
    this.pauseTime = null;
    this.tick();
  }

  add(animation, startTime) {
    this.animations.push(animation);
  }
}

export class Animation {
  constructor(object, property, template, start, end, duration, delay, timingFunction) {
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration || 2000;
    this.delay = delay || 0;
    this.timingFunction = timingFunction
    //  || ((start, end) => {
    //   return (t) => start + (t / duration) * (end - start);
    // });
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