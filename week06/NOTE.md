# 每周总结

## 有限状态机

> wiki 定义：

```
有限状态机（英语：finite-state machine，缩写：FSM）又称有限状态自动机（英语：finite-state automation，缩写：FSA），简称状态机，是表示有限个状态以及在这些状态之间的转移和动作等行为的数学计算模型。
```

- 每个状态都是一个机器
  - 每个机器中，我们都可以做计算、存储、输出
  - 所有机器的输入式一致的
  - 机器本身没状态
- 每个机器知道下一个状态
  - 每个机器都有确定的下一个状态（Moore）
  - 每个机器根据输入决定下一个状态（Mealy）

> 主要动作

一个完整的状态机应该包含进入动作、退出动作、输入动作、动作转移

输入动作：输入对应的值，来与当前状态进行对比，相同或者不同，都会触发动作的转移
动作转移：在不同的进入动作中，退出的动作可能一致也可能不一致，这时候都会又动作的转移，转移到下个状态，或者依旧在当前状态
进入动作：当前状态进入时
退出动作：当前状态退出时

> js 中的有限状态机
  
- 每个函数是一个状态
- 函数参数就是输入
- 在函数中，可以自由地编写代码，处理每个状态的逻辑
- 返回值作为下一个状态
- 使用
- 获取输入
- 把状态机的返回值作为下一个状态


> 应用场景

- 游戏中敌人的 AI 根据玩家的行为做出对应的反馈
- AST 渲染树，解析树的节点，不同符号对应不同状态
- 匹配字符串

> 匹配字符串栗子

### 问题1：使用条件语句匹配 abcdef

```js
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
```

我们使用条件语句来判断状态的迁移，虽然可以完成字符串的匹配，但如果持续添加条件，代码将不可扩展，且越来越复杂

接着我们就使用状态机来解决这个问题

### 问题二：状态机匹配 abcdef

```js
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
```

状态机都有一个固定的套路，也就是开始状态、结束状态的定义，接着就是不同的状态迁移，由不同机器（函数）处理，当匹配时，状态发生迁移，移动到下一个状态。最终当匹配到字符，或者所有字符都寻找完成时，状态机结束。

这里的时间复杂度是 O(n * m)
n 代表字符串长度，m 代表匹配字符的长度

### 问题三：KMP 匹配 abcdef

介绍下 KMP 算法

完成匹配字符串的最常用算法之一。以三个发明者命名，Knuth-Morris-Pratt 算法（简称 KMP）

状态机最大的问题在于重复搜索，遇到不匹配的字符时，会只是将搜索词后移一位，再从头比较，但这样效率很差，因为你要把"搜索位置"移到已经比较过的位置，重比一遍。

KMP 中的部分匹配表就是解决重复比较的问题，降低时间复杂度

> 部分匹配表

前缀："前缀"指除了最后一个字符以外，一个字符串的全部头部组合；

后缀："后缀"指除了第一个字符以外，一个字符串的全部尾部组合。

部分匹配值："部分匹配值"就是"前缀"和"后缀"的最长的共有元素的长度。

![前缀后缀匹配表](http://www.ruanyifeng.com/blogimg/asset/201305/bg2013050114.png)

代码请看作业 KMP.js

## bodyPaser 中的状态机

### 第一步：获取body数据，处理完成后返回对应的 DOM 树

在浏览器发送请求信息，服务端响应，浏览器获取到响应信息后。提取其中的 body 内容进行 HTML 解析。

主要是暴露一个方法接受 body， return DOM 

### 第二步：利用状态机处理 body 数据

遵循HTML规则（ https://html.spec.whatwg.org/multipage/parsing.html#before-attribute-name-state ），对body 进行处理

### 第三步：解析标签

主要的标签有：开始标签，结束标签和自封闭标签

状态机匹配对应标签

### 第四步：创建元素

我们在标签结束状态提交标签token

### 第五步：处理属性

属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理

属性结束时，我们把属性加到标签Token上

### 第六步：利用栈构建 DOM 树

遇到开始标签时创建元素并入栈，遇到结束标签时出栈

自封闭节点可视为入栈后立刻出栈

任何元素的父元素是它入栈前的栈顶

## css 样式处理

### 第一步：收集规则

将 style 标签中的文本保存起来

通过 css 包将规则渲染成 AST 树

### 添加调用

将 rule 通过 computeCSS 添加到 element 上

### 获取父元素序列

我们从上一步骤的stack，可以获取本元素所有的父元素

### 拆分选择器

将匹配的规则，按照对应空格进行拆分（子类选择器）

复合选择器（简单选择器）则是利用正则进行匹配

### 计算选择器与元素匹配，macth 算法

在匹配css规则时，我们必须将规则与 element 的父元素相对应

### 生成computed属性

一旦选择匹配，就应用选择器到元素上，形成computedStyle

### 确定规则覆盖关系

CSS规则根据specificity和后来优先规则覆盖

specificity是个四元组，越左边权重越高

## 总结

最终我们实现了一个从输入 URL， 发送 TCP `request请求`，得到服务器响应，获取到`状态码、响应头、body信息`。再通过 `parser` 函数，利用`状态机`来处理 body 将其渲染成 `DOM 树`。最后我们在 DOM 树上计算了CSS 样式，添加了 `CSS 样式`。实现一个有样式的 DOM 树。