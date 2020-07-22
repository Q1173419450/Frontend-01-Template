export class Timeline {
  animations: Animation[];
  startTime: number;
  requestId: number | null;
  state: string;
  pauseTime: number;

  
  constructor() {
    this.animations = [];
    this.startTime = 0;
    this.requestId = null;
    this.state = 'inited';
    this.pauseTime = 0;
  }

  tick() {
    let t: number = Date.now() - this.startTime;
    
    let animations = this.animations.filter(animation => !animation.finished);


    for(let animation of animations) {
      let {
        object,
        property,
        timingFunction,
        template,
        delay,
        duration,
        addTime
      } = animation;

      let progression: number = timingFunction((t - delay - (addTime as number)) / duration);
      
      if (t > duration + delay + (addTime as number)) {
        progression = 1;
        animation.finished = true;
      }

      let value: number = animation.valueFromProgression(progression);
      object[property] = template(value);
    }
    if (this.animations.length) {
      this.requestId = requestAnimationFrame(() => this.tick());
    }
  }

  add(animation: Animation, addTime: number):void {
    this.animations.push(animation);
    if (this.state === 'playing') {
      animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime
    } else {
      animation.addTime = addTime !== void 0 ? addTime : 0
    }
  }

  // 开始
  start():void {
    if (this.state !== 'inited') {
      return;
    }
    this.state = "playing";
    this.startTime = Date.now();
    this.tick();
  }

  // 重启
  restart():void {
    if (this.state === 'playing') {
      this.pause();
    }

    this.requestId = null;
    this.state = 'playing';
    this.startTime = Date.now();
    this.pauseTime = 0;
    this.tick();
  }
  
  // 暂停
  pause():void {
    if (this.state !== 'playing') {
      return;
    }

    this.state = 'paused'
    this.pauseTime = Date.now();
    if (this.requestId != null) {
      cancelAnimationFrame(this.requestId);
    }
  }

  // 启动
  resume(): void {
    if (this.state !== 'paused') {
      return ;
    }

    this.state = 'playing';
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }
}

interface AnimationObj {
  object: CSSStyleDeclaration;
  property: string;
  start: number;
  end: number;
  duration: number;
  delay: number;
  finished?: boolean;
  addTime?: number;
  timingFunction: (t: number) => number
  template: (v: number) => string;
}

interface color {
  r: number,
  g: number,
  b: number,
  a: number
}

interface ColorAnimationObj {
  object: CSSStyleDeclaration;
  property: string;
  start: number;
  end: number;
  duration: number;
  delay: number;
  finished?: boolean;
  addTime?: number;
  timingFunction: (t: number) => number
  template: (v: color) => string;
}


type TimingFunction = (t: number) => number;
type Template = (v: number) => string;

/**
  * 动画库
  * @param object 动画对象
  * @param property 动画属性
  * @param start 开始位置
  * @param end 结束位置
  * @param duration 时间周期
  * @param delay 延迟
  * @param timingFunction 动画方式
  * @param template 位移距离
  */
export class Animation {
  object: CSSStyleDeclaration;
  property: string;
  start: number;
  end: number;
  duration: number;
  delay: number;
  finished?: boolean;
  addTime?: number;
  timingFunction: TimingFunction
  template: Template

  constructor(animationObj: AnimationObj) {
    this.object = animationObj.object;
    this.property = animationObj.property;
    this.start = animationObj.start;
    this.end = animationObj.end;
    this.duration = animationObj.duration || 2000;
    this.delay = animationObj.delay || 0;
    this.timingFunction = animationObj.timingFunction
    this.template = animationObj.template;
  }

  valueFromProgression(progression: number): number {
    return this.start + progression * (this.end - this.start);
  }
}


/* 颜色 */
// 优化点：接口的定义要复用下
export class ColorAnimation {
  object: CSSStyleDeclaration;
  property: string;
  start: number;
  end: number;
  duration: number;
  delay: number;
  finished?: boolean;
  addTime?: number;
  timingFunction: TimingFunction
  template: (v: color) => string;

  constructor(animationObj: ColorAnimationObj) {
    this.object = animationObj.object;
    this.property = animationObj.property;
    this.start = animationObj.start;
    this.end = animationObj.end;
    this.duration = animationObj.duration || 2000;
    this.delay = animationObj.delay || 0;
    this.timingFunction = animationObj.timingFunction
    this.template = animationObj.template || (v => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
  }
}