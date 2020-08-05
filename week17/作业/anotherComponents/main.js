import { create, Text, Wrapper } from './createElement'

import { Carousel } from './Carousel';
// import { Panel } from './Panel';
// import { TabPanel } from './TabPanel';
import { ListView } from './ListView';

import './carousel.css'

// console.log(css)
// let style = document.createElement('style');
// style.innerHTML = css[0][1];
// document.documentElement.appendChild(style);

let carousel = <Carousel data={[  // 轮播
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />

// let panel = <Panel title='this is my panel'> // 内容
//   <span title='title1'>child</span>
//   <span title='title2'>child</span>
//   <span title='title3'>child</span>
//   <span title='title4'>child</span>
// </Panel>

// let tabpanel = <TabPanel title='this is my panel'> // tab
//   <span title='title1'>child1</span>
//   <span title='title2'>child2</span>
//   <span title='title3'>child3</span>
//   <span title='title4'>child4</span>
// </TabPanel>

// let data = [
//   {
//     title: '蓝猫', 
//     url: 'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
//   },
//   {
//     title: '橘猫', 
//     url: 'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
//   },
//   {
//     title: '狸猫', 
//     url: 'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg'
//   },
//   {
//     title: '山猫', 
//     url: 'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
//   }
// ]

// let list = <ListView data={data}>  // 列表
//   {record => <figure>
//     <img src={record.url} />
//     <figcaption>{record.title}</figcaption>
//   </figure>}
// </ListView>

carousel.mountTo(document.body)
// panel.mountTo(document.body);
// tabpanel.mountTo(document.body);
// list.mountTo(document.body);

