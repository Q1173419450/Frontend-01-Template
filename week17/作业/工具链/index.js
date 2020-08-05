var ttys = require('ttys');
var readline = require('readline');
var hideCursor = require("hide-terminal-cursor")
hideCursor();

/* 光标上移下移 */
var stdin = ttys.stdin;
var stdout = ttys.stdout;
// stdout.write('hello world!!\n')
// stdout.write('\033[1B')
// stdout.write('\033[1B')

/* 读取行 */
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// async function ask(content) {
//   return new Promise((resolve, reject) => {
//     rl.question(content, (answer) => {
//       resolve(answer);
//     })
//   })
// }

// void async function() {
//   console.log(await ask("project name:"))

//   rl.close();
// }()

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

function getChar() {
  return new Promise((resolve, reject) => {
    stdin.once('data', (key) => {
      resolve(key);
    })
  })
}

async function getSelected(choices, selected) {
  while(true) {
    let char = await getChar();
    if (char === '\u0003') {
      process.exit()
    }
    if (char == 'w' && selected > 0) {
      await select(choices, selected);
      selected--;
      await select(choices, selected);
      left();
    }

    if (char == 's' && selected < choices.length - 1) {
      await select(choices, selected);
      selected++;
      await select(choices, selected);
      left();
    }

    if (char === '\r') {
      down(choices.length);

      left()
      return choices[selected]
    }
    // console.log(char.split('').map(c => c.charCodeAt(0)));
  }
}

function up(n = 1) {
  stdout.write('\033[' + n + 'A')
}

function down(n = 1) {
  stdout.write('\033[' + n + 'B')
}

function right(n = 1) {
  stdout.write('\033[' + n + 'C')
}

function left(n = 1) {
  stdout.write('\033[' + n + 'D')
}

async function select(choices, selected = 0) {
  stdout.write(' ');
  left();
  choices.map((item, i) => {
    if (i === selected) {
      stdout.write(`\x1b[34m> ${item}\x1b[0m\n`);
    } else {
      stdout.write(`  ${item}\n`);
    }
  })
  up(choices.length);
}

void async function () { 
  let choices = ['vue', 'react', 'angular'];
  let selected = 0;
  await select(choices, selected);
  let answer = await getSelected(choices, selected);
  
  stdout.write('\x1b[34m'+ answer + '\x1b[0m');
  process.exit()
}()

