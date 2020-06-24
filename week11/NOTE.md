# 每周总结

## 异步编程

> callback 函数

最早的异步方式

回调地狱

> Promise

> generator

> async

> async & generator

```js
function sleep(time = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time * 1000);
  });
}

async function* g() {
  let i = 0;
  while (true) {
    await sleep(1);
    yield i++;
  }
}

for await (let v of g()) {
  console.log(v);
}
```

## 寻路

### 第一阶段: 画地图

### 第二阶段：设置起点、终点。看能否在地图找到对应路径

> 一、边界情况

1、地图线

2、边界情况

> 二、广度搜索

判断起点的上下左右是否有格子能走，能走则加入队列渲染。

> 三、数据结构：队列

> 四、算法：广度优先

> 五、寻找最短距离

【leetCode】 72. 编辑距离

在当前节点，找到下个节点

> 六、搜索路径优化

启发函数 A*

数据结构：改成小顶堆

**广义算法**

做一件事情，得分步骤

**狭义算法**

分治算法、贪心、动态规划等

## 正则

match、replace、exec

捕获 & 不捕获(:?)

```js
"abc".replace(/a(b)c/, function(str, $1){
  return $1
});
```

 