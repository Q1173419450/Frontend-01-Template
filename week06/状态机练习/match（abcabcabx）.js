function match(string) {
  let state = start;
  for(let s of string) {
    state = state(s);
  }
  return state === end;
}

function start(current) {
  if (current == 'a') {
    return foundA;
  } else {
    return start
  }
}

function end() {
  return end;
}

function foundA(current) {
  if (current == 'b') {
    return foundB
  } else {
    return start(current)
  }
}

function foundB(current) {
  if (current == 'c') {
    return foundC
  } else {
    return start(current)
  }
}

function foundC(current) {
  if (current == 'a') {
    return foundA2
  } else {
    return start(current)
  }
}

function foundA2(current) {
  if (current == 'b') {
    return foundB2
  } else {
    return start(current)
  }
}

function foundB2(current) {
  if (current == 'x') {
    return end
  } else if (current == 'c') {
    return foundB(current)
  } else {
    return start
  }
}

match('I\' m abcabcabd! or abcabcabx ahhhh');