function testExec(source) {
  var regexp = /(function|new|return)|([ \t\n\r]+)|([a-zA-Z][a-zA-Z0-9]*)|([\(\)\{\}\,\;])/g;

  var dictionary = ["keywords", "whitespace", "indentifier", "punctuator"];

  var token = null;
  var lastIndex = 0;

  do {
    lastIndex = regexp.lastIndex;
    token = regexp.exec(source);
    if (!token) break;

    for(let i = 1; i < 5; i++) {
      if (token[i]) {
        console.log(dictionary[i - 1], token[0])
      }
    }
  } while(token)
}

testExec(`
  function sleep(t) {
    return new Promise(function (resolve) {
      setTimeout(resolve, t);
    });
  }
`)