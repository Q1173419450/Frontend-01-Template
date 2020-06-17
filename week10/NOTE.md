# 每周总结

## range API

range API 可以进行一些更加精细的操作

range 与 createDocumentFragment 的区别？

## CSSOM(语言等效)

document.styleSheets(获取样式表)
  - cssRules
    - document.styleSheets[0].cssRules[0].style.fontSize = '40px'
    - insertRule
    - removeRule(0)
  - rules
getComputedStyle

CSSStyleSheet 继承了 StyleSheet

Element 继承了 HTMLElement

```
1.05
%7B => {

%7D => }
```

## CSSOM(view 渲染结果)

- 窗口 API
  - open
  - moveBy
  - resizeBy
  - moveBy
- 视口
  - scorll
  - getClientRects()
    - 行盒的个数
  - document.documentElement.getBoundingClientRect()
    - 整个盒子的宽高
  - innerHeight\innerWidth
  - outerWidth
  - devicePixelRatio

## TicTacToe

棋盘

一维数组、二维数组、map

性能重不重要 => 性能好或坏

参考落子的点、全屏检查

如何落入不败之地？

我方没有 willWin 的点，对方有俩个 willWin 的点