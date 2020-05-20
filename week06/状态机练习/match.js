function match (string) {
  let state = start;
  for(let current of string) {
    state = state(current)
  }
  return state === end;
}

// 开始状态
function start(current) {
  if (c === 'a') {
    return foundA;
  } else {
    return start(current); // 状态不变
  }
}

function end(current) {
  return end;
}

function foundA(current) {
  if (c === 'b') {
    return foundB;
  } else {
    return start(current);
  }
}

function foundB(current) {
  if (c === 'c') {
    return foundC;
  } else {
    return start(current);
  }
}

function foundC(current) {
  if (c === 'd') {
    return foundD;
  } else {
    return start(current);
  }
}

function foundD(current) {
  if (c === 'e') {
    return foundE;
  } else {
    return start(current);
  }
}

function foundE(current) {
  if (c === 'f') {
    return end;
  } else {
    return start(current);
  }
}