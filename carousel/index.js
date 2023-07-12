window.onload = function () {
  const carousel = document.querySelector(".carousel");
  const images = document.querySelectorAll("img");
  const indicator = document.querySelector(".indicator");

  const left = document.querySelector(".left-arrow");
  const right = document.querySelector(".right-arrow");
  console.log("images:", images);
  // 轮播图的索引
  let cur = 0;
  // 图片的数量
  const count = images.length;
  //   轮播图的跳转函数
  function moveTo(number) {
    carousel.style.transform = `translateX(-${number * 100}%)`;
    // 删除已有激活元素
    const activeEl = document.querySelector(".indicator span.active");
    activeEl?.classList.remove("active");
    //添加新的
    indicator.children[number]?.classList.add("active");
    // 更新轮播图索引
    cur = number;
    // 重置轮播图的过渡效果
    carousel.style.transition = "all 0.5s";
  }

  left.addEventListener("click", () => {
    // 如果是第一张，需要无缝轮播图，或者不能点击
    if (cur === 0) {
      //  瞬间跳转回 我们拷贝插入的最后一张
      carousel.style.transform = `translateX(-${count * 100}%)`;
      carousel.style.transition = "none";
      // 强制渲染
      carousel.clientHeight;
      moveTo(count - 1);
    } else {
      moveTo(--cur);
    }
  });
  right.addEventListener("click", () => {
    // 如果是最后一张，需要无缝轮播图，或者不能点击
    if (cur === count - 1) {
      // 正100 先回到我们拷贝复制的最后一张图
      carousel.style.transform = `translateX(100%)`;
      carousel.style.transition = "none";
      carousel.clientHeight;
      moveTo(0);
    } else {
      moveTo(++cur);
    }
  });
  indicator.addEventListener("click", (e) => {
    const index = Array.prototype.indexOf.call(indicator.children, e.target);
    console.log("index:", index);
    if (index >= 0) {
      moveTo(index);
    }
  });

  //  无缝轮播图的一些必要初始化
  function init() {
    const firstCopy = carousel.firstElementChild.cloneNode();
    const lastCopy = carousel.lastElementChild.cloneNode();
    carousel.append(firstCopy);
    carousel.insertBefore(lastCopy, carousel.firstElementChild);

    lastCopy.style.position = "absolute";
    lastCopy.style.transform = "translateX(-100%)";
  }
  init();
};
