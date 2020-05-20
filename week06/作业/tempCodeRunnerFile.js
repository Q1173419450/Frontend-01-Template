/* KMP 算法 */
let str = 'abababa ababababx';
let patten = 'abababx'

let getPMT = (str = '') => {
  if(str.length === 0) return [];
  let pmt = [0];
  let k = 2;
  while(k <= str.length){
      let temp = str.substring(0, k);
      let length = temp.length;

      // 前缀
      let prefix = temp.substring(0, length - 1).split('').map((item, index) => {
          return temp.substring(0, index + 1);
      });
      
      // 后缀
      let suffix = temp.substring(1).split('').map((item, index) => {
          return temp.substring(index + 1);
      });
      
      let publicLength = 0;
      // 比较前缀后缀得出最长公共字符长度
      prefix.forEach(preitem => {
          suffix.forEach(sufitem => {
              if(preitem === sufitem){
                  publicLength = preitem.length > publicLength ? preitem.length : publicLength;
              }
          })    
      })
      pmt.push(publicLength);
      k++;
  }
  return pmt;
}

let pmt = getPMT(patten);

function matchStr(str, patten) {
  let m = 0;
  let n = 0;

  while(m < str.length && n < patten.length) {
    if (str[m] === patten[n]) {   // 匹配时继续比较
      n++;
      m++
    } else if (n > 0) { // 不匹配则, 模式索引往前移动 pmt[n - 1]
      n = pmt[n - 1]
    } else {
      m ++;
    }
  }

  if (n == patten.length) {
    return `字符串包含patten，索引位置为${m - patten.length}到${m - 1}`
  } else {
    return '字符串不包含对应的索引'
  }
}

let res = matchStr(str, patten);
console.log(res);
