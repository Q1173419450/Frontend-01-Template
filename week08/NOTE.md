# 每周总结

## 基础CSS（二）

### 简单选择器

- 属性选择器看看 MDN

### 简单选择器组合

- 复合选择器
    - 连在一起写
- 复杂选择器
    - 'sp'
    - '>'
    - '~'
    - '+'
    - || (Level 4)
    - ,

### 选择器优先级

分析选择器、四元组

属性选择器的优先级和 class 选择器优先级一致

伪类、伪元素不占优先级

* 不参与优先级运算

transform

### 伪类

- 链接/行为
    - :any-link
    - :link :visited
    - :hover
    - :active
    - :focus
    - :target
- 树形结构
    - :empty
    - :nth-child()
    - :nth-last-child()(需要回溯)
    - :first-child、:last-child、:only-child
- 逻辑型
    - :not 伪类
    - :where、:has

### 伪元素
    
- ::before
- ::after
- ::firstLine
    - font 系列
    - color 系列
    - background 系列
    - word-spacing
    - letter-spacing
    - text-decoration
    - text-transform
    - line-height
- ::firstletter
    - font 系列
    - color 系列
    - background 系列
    - word-spacing
    - letter-spacing
    - text-decoration
    - text-transform
    - line-height
    - float
    - vertical-align
    - 盒模型：margin、padding、border

## CSS 基础排版

### 盒

toy browers 直接拿元素去排版

排版和渲染的基本单位是盒，在排版过程中可能产生多个盒。

盒模型

- IE 盒模型
    - content
    - padding
    - border
    - margin
- 现代浏览器 盒模型
    - box-sizing

### 正常流

- 行模型
    - 收集盒进行
    - 计算行中的排布
    - 计算行的排布

- IFC：从左到到右
- BFC：从右到左

- 行内行模型
    - baseline
    - 根据最高的元素来作为行高
    - 最佳实践：vertical-align: top\bottom\middle

### float & clear

- font-size：0 解决 inline-block 边距空白问题

### margin 折叠

- 因为边距折叠只会发生在 BFC, 所有边距折叠只会发生在垂直方向
- 块级上下文指的不是某个元素，而是一段代码的格式化上下文，在同一个上下文中margin 会发生重叠，而想要解决重叠问题，就需要创建一个新的 格式化上下文
- 正常流里放正常流的东西，才会发生合并

### overflow: visible & BFC

### display

- 有里外之分：inline（外）-inline（内）
- flex inline-block
- block inline-block
- grid inline-grid
- table inline-table
- inline
- run-in

问答：

- 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？

- first-line 改变 font 也会发生变化，为什么就可以改变呢？

因为这些属性不是作用在行上面的，而是作用在文字上面的


- BEM ?

- 字体的兼容问题