# 每周总结

## 全局对象（Realm）

- Value Properties of the Global Object
  - Infinity
  - NaN
  - undefined
- Function Properties of the Global Object
  - eval()
  - isFinite()
  - isNaN()
  - parseFloat()
  - parseInt()
-  URI Handling Functions
  - decodeURI
  - decodeURLComponent()
  - encodeURI
  - encodeURIComponent()
- Constructor Properties of the Global Object
  - Array()
  - ArrayBuffer()
  - Boolean()
  - DataView()
  - Date()
  - Error()
  - EvalError()
  - Float32Array()
  - Float64Array()
  - Function()
  - Int8Array()
  - Int16Array()
  - Int32Array()
  - Map()
  - Number()
  - Object()
  - Promise()
  - RangeError()
  - ReferenceError()
  - RegExp()
  - Set()
  - SharedArrayBuffer()
  - String()
  - Symbol()
  - SyntaxError()
  - TypeError()
  - Uint8Array()
  - Uint8ClampedArray()
  - Uint16Array()
  - Uint32Array()
  - URIError()
  - WeakMap()
  - WeakSet()
- Other Properties of the Global Object
  - Atomics
  - JSON
  - Math
  - Reflect

## 函数调用栈（Execution Context Stack）

先进先出

- code evalluation state
  - async await（保存状态）
  - Generator
- Function
  - 可能是 null
- Script or Module
  - null
- Generator
  - yield
- Realm
  - 在 JS 中，函数表达式和对象直接量均会创建对象
  - 使用. 做隐式转化也会创建对象
  - 这些对象都有原型，如何我们没有Realm，我们就不知道他们的原型是谁
- LexialEnvironment
  - this
    - 箭头函数，执行的时候和变量一起指定指向
    - 普通函数，在执行时，才知道他的指向
  - new Target
  - super
  - 变量
- VariableEnvironment
  - with()
  - eval()

##  Environment Record
  
- Declarative Environment Record (声明环境记录)
  - Function Environment Record
  - module Environment Record
- Global Environment Record（全局环境）
- Object Environment Record（对象环境，with）