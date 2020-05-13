window.onload = function () {


  // 初始化生成li
  (function () {
    var len = 5 * 5 * 5; // 定义生成多少个li
    var oUl = document.getElementById('list').children[0];  // 获取ul元素
    var aLi = oUl.children; // 获取所有元素的集合
    // console.log(aLi);

    // 初始化
    (function () {
      // 循环创建len个li元素
      for (var i = 0; i < len; i++) {
        // 创建li元素
        var oLi = document.createElement('li');

        // 记录每一个li的索引
        oLi.index = i;

        // 确定元素所在的位置
        oLi.x = i % 5;
        oLi.y = Math.floor(i % 25 / 5);
        oLi.z = 4 - Math.floor(i / 25);

        // 获取数据
        var data = flyData[i] || flyData[0]
        // 给li 添加内容
        oLi.innerHTML = `
          <b class="liCover"></b>
          <p class="liTitle">${data.type}</p>
          <p class="liAuthor">${data.author}</p>
          <p class="liTime">${data.time}</p>
        `;


        // 随机确定li的位置
        var tX = Math.random() * 6000 - 3000,
          tY = Math.random() * 6000 - 3000,
          tZ = Math.random() * 6000 - 3000;

        oLi.style.transform = `translate3D(${tX}px,${tY}px, ${tZ}px)`



        // 将li元素添加到ul中
        oUl.appendChild(oLi)
      }

      setTimeout(Grid, 20)

    })();


    // 拖拽/ 滚轮事件
    (function () {
      // 定变量保存初始值
      var roX = 0,
        roY = 0,
        trZ = -2000;

      //清楚默认选中文字的事件
      document.onselectstart = function () {
        return false
      }

      // 鼠标按下
      document.onmousedown = function (e) {

        var sX = e.clientX,
          sY = e.clientY,
          lastX = sX,
          lastY = sY,
          x_ = 0, //存储鼠标移动时之间的差值
          y_ = 0;
        // 鼠标移动
        this.onmousemove = function (e) {
          x_ = e.clientX - lastX;
          y_ = e.clientY - lastY;

          roY += x_ * 0.15;
          roX -= y_ * 0.15;

          oUl.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`

          // 重新赋值
          lastX = e.clientX;
          lastY = e.clientY;
        }

        // 鼠标抬起
        this.onmouseup = function () {
          this.onmousemove = null

          // 计算缓冲
          function m() {
            x_ *= 0.9;
            y_ *= 0.9;

            // 重新计算我们旋转
            roY += x_ * 0.15;
            roX -= y_ * 0.15;

            oUl.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`

            // 条件满足将阻止requestAnimationFrame执行
            if (Math.abs(x_) < 0.1 && Math.abs(y_) < 0.1) return

            requestAnimationFrame(m)
          }
          requestAnimationFrame(m)
        }


      }

      // 滚轮滚动改变Z轴的变化
      !function (fn) {
        if (document.onmousewheel === undefined) {
          // 如果为true就是火狐浏览器
          document.addEventListener("DOMMouseScroll", function (e) {
            var d = -e.detail / 3
            fn(d)
          }, false)
        } else {
          document.onmousewheel = function (e) {
            var d = e.wheelDelta / 120;
            fn(d)
          }
        }

      }(function (d) {
        trZ += d * 100;
        oUl.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`
      })

    })()


    // Gride 层叠样式
    function Grid() {
      // li之间间距
      var disX = 350;  // 每个li 水平 (X) 方向的间距
      var disY = 350;  // 每个li 垂直 (y) 方向的间距
      var disZ = 800;  // 每个li 纵深 (z) 方向的间距

      console.log(aLi)
      for (var i = 0; i < len; i++) {
        var oLi = aLi[i];

        // 计算每一个li的位置偏移量
        var x = (oLi.x - 2) * disX,
          y = (oLi.y - 2) * disY,
          z = (oLi.z - 2) * disZ;

        // 设置每一个li是的重点值
        oLi.style.transform = `translate3D(${x}px,${y}px, ${z}px)`
      }
    }
  })()
}