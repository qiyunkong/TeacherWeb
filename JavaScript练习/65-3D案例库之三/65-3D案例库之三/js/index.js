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

    //  关于弹窗的问题
    (function () {
      // 获取弹窗的所有元素
      var oAlert = document.getElementById("alert"),
        oATitle = oAlert.getElementsByClassName('title')[0].getElementsByTagName('span')[0],
        oAImg = oAlert.getElementsByClassName('img')[0].getElementsByTagName('img')[0],
        oAAuthor = oAlert.getElementsByClassName('author')[0].getElementsByTagName('span')[0],
        oAInfo = oAlert.getElementsByClassName('info')[0].getElementsByTagName('span')[0];


      // 获取所有点击弹窗的元素
      var oAll = document.getElementById('all');
      var oFrame = document.getElementById('frame');
      var oBack = document.getElementById('back');

      // 利用事件委托给所有的绑定事件
      oUl.onclick = function (e) {
        var target = e.target;
        // console.log(target)
        if (target.nodeName == 'B') {
          if (target.goudan) {
            target.goudan = false;
          } else {
            if (oAlert.style.display === 'block') {
              hide()
            } else {
              // 动态的改变alert里面的内容
              var index = target.parentNode.index;
              var data = flyData[index] || flyData[0];
              console.log(data)

              // oAlert.index = index;
              oAlert.src = data.src;

              // 动态的改变内容
              oATitle.innerHTML = `课题:${data.title}`;
              oAImg.src = `./src/${data.src}/index.png`;
              oAAuthor.innerHTML = `主讲老师:${data.author}`;
              oAInfo.innerHTML = `描述:${data.desc}`;

              // 显示函数
              show()
            }
          }
        }

        // 阻止事件冒泡
        e.cancelBubble = true;
      }

      // document 点击消失
      document.onclick = function () {
        hide()
      }

      // 当alert被点击时,右侧出现
      oAlert.onclick = function () {
        // var data = flyData[this.index] || flyData[0]
        oAll.className = "left";
        oFrame.src = `/src/${this.src}/index.html`
      }

      // 绑定返回按钮事件
      oBack.onclick = function () {
        oAll.className = "";
      }

      // 定义一个隐藏的函数
      function hide() {
        if (oAlert.style.display === 'block' && !oAlert.timer) {

          // 弹出层消失开始值
          oAlert.style.display = 'block';
          oAlert.style.transform = 'rotateY(0deg) scale(1)';
          oAlert.style.opacity = 1;

          // 定义动画时长
          var time = 300;
          var sTime = new Date()  // 获取开始时间

          //动画函数
          function m() {
            var prop = (new Date() - sTime) / time;  // prop  范围  0-1
            if (prop >= 1) {
              prop = 1
              oAlert.style.display = 'none';
            } else {
              requestAnimationFrame(m);
            }
            oAlert.style.transform = `rotateY(${180 * prop}deg) scale(${1 - prop})`;
            oAlert.style.opacity = 1 - prop;

          }
          requestAnimationFrame(m)


        }
      }
      // 显示的函数
      function show() {
        if (oAlert.timer) return

        oAlert.timer = true;
        oAlert.style.display = 'block';

        //  设置弹出层的初始值
        oAlert.style.transform = 'rotateY(0deg) scale(2)';
        oAlert.style.opacity = 0;

        var time = 300;  // 动画多久完成
        var sTime = new Date();  // 获取动画开始以的时间戳
        //动画函数
        function m() {
          var prop = (new Date() - sTime) / time;  // prop  范围  0-1
          if (prop >= 1) {
            prop = 1
            oAlert.timer = false;
          } else {
            requestAnimationFrame(m);
          }
          oAlert.style.transform = `rotateY(0deg) scale(${2 - prop})`;
          oAlert.style.opacity = prop;
        }
        requestAnimationFrame(m)

      }

    })();


    // 拖拽 / 滚轮事件
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

        var ifMove = false;  // 判断你有没有移动
        var ifTime = new Date();


        //  用于解决当mousedown 和 mouseup 作用在一个li上会触发弹窗的问题
        if (e.target.nodeName === 'B') {
          var thisLi = e.target;
        }

        // 鼠标移动
        this.onmousemove = function (e) {
          // 鼠标移动
          ifMove = true;

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
          if (ifMove && (e.target === thisLi) && (new Date - ifTime) > 500) {
            thisLi.goudan = true;
          }


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

    })();

    // 左下角的点击事件
    (function () {
      var aBtn = document.getElementById('btn').getElementsByTagName('li');

      aBtn[0].onclick = Table;
    })()

    // Table 元素周期表
    function Table() {

      // 计算坐标
      var n = Math.ceil(len / 18) + 2; // 计算有多少行
      var midY = n / 2 - 0.5;
      var midX = 18 / 2 - 0.5;

      // 每个li 水平垂直间距
      var disY = 210;
      var disX = 170;

      var arr = [
        { x: 0, y: 0 },
        { x: 17, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 12, y: 1 },
        { x: 13, y: 1 },
        { x: 14, y: 1 },
        { x: 15, y: 1 },
        { x: 16, y: 1 },
        { x: 17, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 12, y: 2 },
        { x: 13, y: 2 },
        { x: 14, y: 2 },
        { x: 15, y: 2 },
        { x: 16, y: 2 },
        { x: 17, y: 2 },
      ];

      // 循环计算li的位置
      for (var i = 0; i < len; i++) {
        var x, y;
        if (i < 18) {
          x = arr[i].x;
          y = arr[i].y;
        } else {
          x = i % 18;
          y = Math.floor(i / 18) + 2
        }

        aLi[i].style.transform = `translate3D(${(x - midX) * disX}px,${(y - midY) * disY}px,0px)`
      }
    }

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