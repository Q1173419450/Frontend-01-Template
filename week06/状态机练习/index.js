// function main (str) {
//   for (let p of str) {
//     if (p == 'a') {
//       return true
//     }
//   }
//   return false
// }

// var a = main('I am gerr');
// console.log(a);

// // ab
// function main1(str) {
//   let foundA = false
//   for (let p of str) {
//     if (p == 'a') {
//       foundA = true
//     } else if (foundA && p == 'b') {
//       return true
//     } else {
//       foundA = false
//     }
//   }
//   return false
// }

// abcdef
function main2(str) {
  let foundA = false
  let foundB = false
  let foundC = false
  let foundD = false
  let foundE = false

  for (let p of str) {
    if (p == 'a') {
      foundA = true
    } else if (foundA && p == 'b') {
      foundB = true
    } else if (foundB && p == 'c') {
      foundC = true
    } else if (foundC && p == 'd') {
      foundD = true
    } else if (foundD && p == 'e') {
      foundE = true
    } else if (foundE && p == 'f') {
      return true
    }
    else {
      foundA = false
      foundB = false
      foundC = false
      foundD = false
      foundE = false
    }
  }
  return false
}

var a = main2('I abcdem gerr');
console.log(a);


// 状态机
