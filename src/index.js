import { sub } from "./math.js";
import "./index.css";
import webpackImg from "./assets/img/webpack.png";

const add = (a, b) => a + b;

console.log(add(1, 2));
console.log(sub(1, 2));

// 将引入的图片添加到页面中
const img = document.createElement("img");
img.src = webpackImg;
img.alt = "webpack";
document.body.appendChild(img);
