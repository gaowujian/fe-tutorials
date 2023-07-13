// es6 使用 Proxy 对一个对象的所有属性进行监听

const obj = {
  name: "wujian",
  age: 18,
  hobbies: ["coding", "listening"],
  relations: {
    company: "bytedance",
    family: "hebei",
  },
};

// proxy
// 1. 可以创建一个新的代理对象，他的内容和被代理的对象是一样的
// 2. 但是对代理对象的赋值和读取操作可以比较方便的被捕获，浏览器原生支持;
const proxyObj = new Proxy(obj, {
  get: function (target, prop, receiver) {
    console.log("读取属性", prop);
    // console.log("target[prop]:", target[prop]);
    return target[prop];
  },
  set: function (target, prop, value) {
    console.log("属性赋值", prop);
    target[prop] = value;
  },
});

console.log("proxyObj.name:", proxyObj.name);
// 会触发set
proxyObj.name = "xxer";
console.log("proxyObj.name:", proxyObj.name);
// 不会触发set
obj.name = "wuyu";
console.log("proxyObj.name:", proxyObj.name);

// ??
console.log("proxyObj.name:", proxyObj.relations.company);
