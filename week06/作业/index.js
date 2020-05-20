/* 使用状态机完成 abababx 的处理 */
function match(string) {
  let state = start;
  for(let s of string) {
    state = state(s);
  }

  return state === end
}

function start(current) {
  if (current === 'a') {
    return foundA;
  } else {
    return start;
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
  if (current == 'x') {
    return end
  } else {
    return start(current);
  }
}

var status = match('abababa abababa')
console.log(status);

// 一开始如何匹配?
// let patten = 'abcdabca';

// var j = 0;
// var arr = [0];
// for (let i = 1;i<patten.length;i++) {
//   if (patten[i] == patten[j]) {
//     j++
//     console.log(j);
//     arr.push(j);
//   } else if (j == 0) {
//     arr.push(j)
//   } else {
//     j --
//     // 发现匹配不上怎么办
//     // arr.push(arr[j])
//     if (patten[arr[j]] == patten[i]) {
//       arr.push(arr[j]);
//     }
//   }
// }