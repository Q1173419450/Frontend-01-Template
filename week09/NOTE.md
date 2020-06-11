# 每周总结

### HTML 标记语言

HTML 源于 SGML

- SGML
  - DTD
    - `&quot;` 双引号
    - `&amp;` & 符号
    - `&lt;`  小于号
    - `&gt;`  大于号
- XML
  - namespace

### HTML 语义化

懂得语义时可以用，如果不清楚标签的语义则使用 div、span

### DOM

#### DOM 节点

导航类
  - parentNode/parentElement
  - childNodes/children
    - livingCollection
  - firstChild/firstElementChild
  - lastChild/lastElementChild
  - nextSibling/nextElementSibling
  - previousSibling/previousElementSibling
修改操作
  - appendChild
    - 在 DOM 中只有一个节点，移动了就没了，livingCollection
  - insertBefore
  - removeChild
  - replaceChild
- 高级操作
  - compareDocumentPosition
  - contains
  - isEqualNode
  - cloneNode

#### DOM 事件

冒泡与捕获
