# 每周总结

## layout & render

浏览器排版经历了三代技术

- 正常流
  - display: black
  - display: inline-black
  - display: inline
  - position: relative
  - position: absolute
  - position: fixed
  - flow
- flex
- grid

## 第一步：设置默认值，设置主轴，交叉轴

将主轴方向定义为 `flex-direction: row`

属性有：

Main：width、x、left、right

Cross：height y top bottom

将主轴定义为 `flex-direction: column`

属性有：

Main：height、y、top、bottom

Cross：width x left right

## 第二步：将内容分行，主要和 mainSize 有关，也就是主轴宽度

- 判断主轴是否设置了宽度，如果没有则直接按照 item 的值来定义宽度
- 分行
  - flex
  - flex-warp：nowarp 属性
  - 其他
    - 如果第一个 item 就比 style 大，则等于 style mainSize
    - 如果 item 过多，大于 style，则创建新行
    - 如果少于则算出 mainSpace
    - 取行高和 item 中的最高 crossSpace

- 盒模型
  - 计算盒的height
    - height
    - marign-top、marign-bottom
    - border
    - padding-top、padding-bottom
  - BFC
    - flow

### 第三步：计算主轴

- 找出 flex 元素
- 将主轴剩余尺寸按比例分配到这些元素
- 若剩余空间为负数，所以 flex 元素为 0, 等比压缩剩余元素

### 第四步：绘制单个元素

- 图形环境
- npm 包 images
- 绘制相关属性：background-color、border、background-image等

### 第五步：递归渲染

图形系统

webGL

openGL-node

## css 基础

### CSS 解析流程

- 收集 CSS 规则
- 添加调用
- 获取父元素序列
- 拆分选择器
- 计算选择器与元素匹配
- 生成 computed 属性
- 确定规则覆盖关系

### CSS 语法
  
- @charset
- @import
- rules
  - @media
  - @page
  - rule

### CSS @规则

- @charset
- @import
- @media
- @page
- @counter-style
- @keyframes
- @fontface
- @supports
- @namespace

### CSS @规则结构

- selector
- key
  - properties
  - variables
- value