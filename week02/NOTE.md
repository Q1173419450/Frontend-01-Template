# 每周总结

### ASCII 码

含义：在初期计算机编码中，一个字节有8位，一个字节有 256 种状态，规定了 0-128位为 ASCII 码的码点

- U+0000 - U+007F

缺点: 存储范围太小，容易冲突

### unicode

为了收揽全世界的符号，每个符号都有独一无二的编码，那么就不会产生乱码了。

缺点：
  - 只规定了符号的二进制代码，却没有规定这个二进制代码应该如何存储。
  - 本来一个英文字母只需要一个字节，如果 Unicode 统一规定，每个符号用三个或四个字节表示，那么每个英文字母前都必然有二到三个字节是0，这对于存储来说是极大的浪费，文本文件的大小会因此大出二三倍，这是无法接受的。

### UTF-8（编码方法）

UTF-8 是 Unicode 的实现方式之一。

- 单字节的符号，字节的第一位设为 0，后面7位为符号的 Unicode 码。
- 对于 n 字节 符号，第一个字节的前 n 位都设为 1，第 n + 1 位设为 0，后面字节的前俩位一律设为 10

### 编码 API

- fromCodePoint()
  - 传入各种进制的数字，会转化为对应的字符
- codePointAt()
  - 返回码点的值
- charCodeAt()
  - 返回 0xFFFF 以下的值
- charAt
  - 只返回一个字节
```js
// fromCodePoint
String.fromCodePoint(42);       // "*"
String.fromCodePoint(65, 90);   // "AZ"
String.fromCodePoint(0x404);    // "\u0404"
String.fromCodePoint(0x2F804);  // "\uD87E\uDC04"
String.fromCodePoint(194564);   // "\uD87E\uDC04"
String.fromCodePoint(0x1D306, 0x61, 0x1D307) // "\uD834\uDF06a\uD834\uDF07"

// 若不符合规范，则会报错
String.fromCodePoint('_');      // RangeError

// codePointAt
'\u1F37E'.codePointAt()   // 7991

// charCodeAt
"严格".charCodeAt(0)  // 20005
"严格".charCodeAt(1)  // 26684

// charAt
"严格".charAt(0)
```

### Number 类型的语法
- 十进制
  - 点
  - e、E
  - +、- 号
- 二进制
  - 0b、0B
- 八进制
  - 0o、0O
- 16进制
  - 0x、0X

### String 类型的语法

BMP U+0000 - U+FFFF

- 单引号
  - 除了 " 、\
  - Ls
  - PS
  - \ 转义
    - \x10
    - \u000A
    - '、"、\、b、f、n、r、t、v
  - LineContinuation
- 双引号
  - 除了 ' 、\
  - Ls
  - PS
  - \ 转义
  - LineContinuation
- template
  - 导致4 种顶级输入元素