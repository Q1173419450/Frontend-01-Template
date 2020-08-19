export function enableGesture(element) {
  let contexts = Object.create(null);
  
  // 防止冲突
  let MOUSE_SYMBOL = Symbol('mouse');
  
  if(document.ontouchstart !== null) {
    element.addEventListener('mousedown', (event) => {
    
      // start 里存contexts
      contexts[MOUSE_SYMBOL] = Object.create(null);
    
      start(event, contexts[MOUSE_SYMBOL]);
      let mousemove = event => {
        move(event, contexts[MOUSE_SYMBOL])
        // console.log(event.clientX, event.clientY);
      }
    
      let mouseend = event => {
        end(event, contexts[MOUSE_SYMBOL]);
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseend);
      }
    
      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseend);
    })
  }
  
  // tap
  // pan - panStart panMove panEnd 
  // flick
  //press - press-start pressEnd
  
  element.addEventListener('touchstart', event => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier]);
    }
  })
  
  element.addEventListener('touchmove', event => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier]);
    }
  })
  
  element.addEventListener('touchend', event => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier]
    }
  })
  
  /* 突然终止 */
  element.addEventListener('touchcancel', event => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier]
    }
  })
  
  /* 抽象 */
  let start = (point, contexts) => {
    console.log(point)

    element.dispatchEvent(Object.assign(new CustomEvent('start', {
      startX: point.clientX,
      startY: point.clientY,
      clientX: point.clientX,
      clientY: point.clientY
    })))

    contexts.moves = [];
    contexts.startX = point.clientX;
    contexts.startY = point.clientY;
    contexts.isTap = true;
    contexts.isPan = false;
    contexts.isPress = false;
    contexts.timeoutHandler = setTimeout(() => {
      if (contexts.isPan) { // 优先级高
        return;
      }
  
      contexts.isTap = false;
      contexts.isPan = false;
      contexts.isPress = true;
  
      // console.log("pressStart")
      element.dispatchEvent(new CustomEvent('pressStart', {}))
    }, 500)
    // console.log("touchstart", point.clientX, point.clientY);
  }
  
  let move = (point, contexts) => {
    let dx = point.clientX - contexts.startX;
    let dy = point.clientY - contexts.startY;
  
    if (dx ** 2 + dy ** 2 > 100 && !contexts.isPan) {
      if (contexts.isPress) {
        element.dispatchEvent(new CustomEvent('pressCancel', {}))
      }

      contexts.isTap = false;
      contexts.isPan = true;
      contexts.isPress = false;

      let event = new CustomEvent('panStart');
      Object.assign(event, {
        startX: contexts.startX,
        startY: contexts.startY,
        clientX: point.clientX,
        clientY: point.clientY
      })
      element.dispatchEvent(event);
      // console.log("panStart")
    }
  
    if (contexts.isPan) {
      contexts.moves.push({
        dx, dy,
        t: Date.now()
      })
      contexts.moves = contexts.moves.filter(record => Date.now() - record.t < 300);
      // console.log("pan");

      let event = new CustomEvent('pan');
      Object.assign(event, {
        startX: contexts.startX,
        startY: contexts.startY,
        clientX: point.clientX,
        clientY: point.clientY
      })
      element.dispatchEvent(event);
    }
    // console.log('touchmove', dx, dy);
  }
  
  let end = (point, contexts) => {
    if (contexts.isPan) {
      let dx = point.clientX - contexts.startX;
      let dy = point.clientY - contexts.startY;
  
      let record = contexts.moves[0];
      // console.log(record)
      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
      // console.log(speed);
      // console.log("panEnd")
      let isFlick = speed > 2.5;
      if (isFlick) {
        element.dispatchEvent(Object.assign(new CustomEvent('flick', {
          startX: contexts.startX,
          startY: contexts.startY,
          clientX: point.clientX,
          clientY: point.clientY,
          speed
        })))
      }

      element.dispatchEvent(Object.assign(new CustomEvent('panend'), {
        startX: contexts.startX,
        startY: contexts.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        speed,
        isFlick
      }))
    }
    if (contexts.isTap) {
      element.dispatchEvent(new CustomEvent('tap'), {});
    }
    if (contexts.isPress) {
      element.dispatchEvent(new CustomEvent('pressEnd'), {});
      // console.log("pressEnd")
    }

    clearTimeout(contexts.timeoutHandler);
    // console.log('touchend', point.clientX, point.clientY)
  }
  
  let cancel = () => {
    element.dispatchEvent(new CustomEvent('canceled'), {});
    clearTimeout(contexts.timeoutHandler);
    // console.log('touchcancel');
  }
}
