"use strict";
exports.__esModule = true;
exports.ColorAnimation = exports.Animation = exports.Timeline = void 0;
var Timeline = /** @class */ (function () {
    function Timeline() {
        this.animations = [];
        this.startTime = 0;
        this.requestId = null;
        this.state = 'inited';
        this.pauseTime = 0;
    }
    Timeline.prototype.tick = function () {
        var _this = this;
        var t = Date.now() - this.startTime;
        var animations = this.animations.filter(function (animation) { return !animation.finished; });
        for (var _i = 0, animations_1 = animations; _i < animations_1.length; _i++) {
            var animation = animations_1[_i];
            var object = animation.object, property = animation.property, timingFunction = animation.timingFunction, template = animation.template, delay = animation.delay, duration = animation.duration, addTime = animation.addTime;
            var progression = timingFunction((t - delay - addTime) / duration);
            if (t > duration + delay + addTime) {
                progression = 1;
                animation.finished = true;
            }
            var value = animation.valueFromProgression(progression);
            object[property] = template(value);
        }
        if (this.animations.length) {
            this.requestId = requestAnimationFrame(function () { return _this.tick(); });
        }
    };
    Timeline.prototype.add = function (animation, addTime) {
        this.animations.push(animation);
        if (this.state === 'playing') {
            animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;
        }
        else {
            animation.addTime = addTime !== void 0 ? addTime : 0;
        }
    };
    // 开始
    Timeline.prototype.start = function () {
        if (this.state !== 'inited') {
            return;
        }
        this.state = "playing";
        this.startTime = Date.now();
        this.tick();
    };
    // 重启
    Timeline.prototype.restart = function () {
        if (this.state === 'playing') {
            this.pause();
        }
        this.requestId = null;
        this.state = 'playing';
        this.startTime = Date.now();
        this.pauseTime = 0;
        this.tick();
    };
    // 暂停
    Timeline.prototype.pause = function () {
        if (this.state !== 'playing') {
            return;
        }
        this.state = 'paused';
        this.pauseTime = Date.now();
        if (this.requestId != null) {
            cancelAnimationFrame(this.requestId);
        }
    };
    // 启动
    Timeline.prototype.resume = function () {
        if (this.state !== 'paused') {
            return;
        }
        this.state = 'playing';
        this.startTime += Date.now() - this.pauseTime;
        this.tick();
    };
    return Timeline;
}());
exports.Timeline = Timeline;
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
var Animation = /** @class */ (function () {
    function Animation(animationObj) {
        this.object = animationObj.object;
        this.property = animationObj.property;
        this.start = animationObj.start;
        this.end = animationObj.end;
        this.duration = animationObj.duration || 2000;
        this.delay = animationObj.delay || 0;
        this.timingFunction = animationObj.timingFunction;
        this.template = animationObj.template;
    }
    Animation.prototype.valueFromProgression = function (progression) {
        return this.start + progression * (this.end - this.start);
    };
    return Animation;
}());
exports.Animation = Animation;
/* 颜色 */
// 优化点：接口的定义要复用下
var ColorAnimation = /** @class */ (function () {
    function ColorAnimation(animationObj) {
        this.object = animationObj.object;
        this.property = animationObj.property;
        this.start = animationObj.start;
        this.end = animationObj.end;
        this.duration = animationObj.duration || 2000;
        this.delay = animationObj.delay || 0;
        this.timingFunction = animationObj.timingFunction;
        this.template = animationObj.template || (function (v) { return "rgba(" + v.r + ", " + v.g + ", " + v.b + ", " + v.a + ")"; });
    }
    return ColorAnimation;
}());
exports.ColorAnimation = ColorAnimation;
