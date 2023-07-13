// es 5使用 Object.DefineProperty 对一个对象的所有属性进行监听

const obj = {
  name: "wujian",
  age: 18,
  hobbies: ["coding", "listening"],
  relations: {
    company: "bytedance",
    family: "hebei",
  },
};

function observe(obj) {
  for (const key in obj) {
    // 使属性变成响应式

    if (typeof obj[key] !== "object") {
      if (Object.hasOwnProperty.call(obj, key)) {
        // ! 需要一个辅助变量来缓存属性值
        var helpValue = obj[key];

        Object.defineProperty(obj, key, {
          set: (val) => {
            console.log("属性赋值");
            helpValue = val;
          },
          get: () => {
            console.log("属性取值");
            return helpValue;
          },
        });
      }
    } else {
      observe(obj[key]);
    }
  }
}

observe(obj);
obj.age = 20;
console.log("obj.age:", obj.age);
