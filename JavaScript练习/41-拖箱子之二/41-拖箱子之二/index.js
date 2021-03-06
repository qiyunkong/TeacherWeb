var game = (function () {
  var Game = {
    //获取元素
    oWrap: document.getElementById('wrap'),

    // 地图大小
    size: {
      x: 16,
      y: 16
    },

    // 第几关
    level: 0,

    // 关卡数据
    mapData: [
      // 第一关的数据
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 1, 3, 0, 3, 2, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 2, 0, 3, 4, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 1, 1, 3, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],

      // 第二关
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 4, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 3, 3, 1, 0, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 3, 0, 1, 0, 1, 2, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 2, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 2, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      // 第三个数据
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 0, 0, 3, 2, 2, 2, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 3, 0, 1, 5, 2, 1, 0, 0, 0,
        0, 0, 0, 1, 1, 0, 1, 1, 3, 1, 0, 1, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 3, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 4, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      // 第四个数据
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 3, 0, 1, 1, 0, 0,
        0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 3, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 2, 2, 2, 2, 0, 3, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 2, 2, 2, 1, 0, 0, 0, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
        1, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 1, 0, 0, 1, 0,
        1, 0, 0, 0, 0, 3, 3, 0, 0, 0, 3, 0, 3, 0, 1, 0,
        1, 1, 1, 0, 3, 0, 3, 0, 3, 0, 0, 1, 1, 1, 1, 0,
        0, 0, 1, 1, 0, 0, 0, 3, 0, 3, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ]
    ],


    // 定义一个步骤的次数统计
    stepNum: 0,

    // 步骤的存储器
    step: {
      // 保存人物步骤的存储
      person: [],
      // 保存箱子的存储
      box: []
    },


    // 自动过关
    auto: [
      [40, 38, 37, 37, 39, 38, 38, 40, 39, 39],
      [],
      [],
    ],



    // 初始化游戏
    init: function () {
      // console.log(1)
      // 初始化地图大小(宽高)
      this.oWrap.style.cssText = "width:" + this.size.x * 35 + "px;height:" + this.size.y * 35 + "px;"

      // 上一步
      document.getElementById("prev").onclick = this.prev.bind(this);

      // 上一关
      document.getElementById("prevLevel").onclick = function () {
        if (this.level <= 0) return;
        this.level--;
        this.createMap(this.level);
      }.bind(this)

      // 下一关
      document.getElementById("nextLevel").onclick = function () {

        if (this.level <= this.mapData.length - 2) {
          this.level++
        } else {
          alert("恭喜你,你已经全部通关了")
          this.level = 0
        }
        this.createMap(this.level)
      }.bind(this)

      // 自动过关
      document.getElementById("auto").onclick = function () {
        // 创建地图
        this.createMap(this.level);

        // 获取人物
        var oParent = this.getBox('person')[0];
        // 获取人物的图片信息
        var oP = oParent.children[0];

        // 计数器
        var kNum = 0;

        // 开启一个定时器
        var timer = setInterval(function (This) {
          var keycode = This.auto[This.level][kNum];
          This.controlFn(oP, oParent, keycode);

          // 计数器增加
          kNum++;

          // 判断清楚定时器
          if (kNum == This.auto[This.level].length) {
            clearInterval(timer)
          }
        }, 500, this)
      }.bind(this)

      // 创建地图
      this.createMap(this.level)
    },

    // 创建地图
    createMap: function (lv) {
      // console.log(lv)
      var This = this;

      // 创建使用变量
      var oPerson, oDiv, oImg;

      // 清空地图信息
      this.oWrap.innerHTML = "";

      // 清除所有的步骤信息
      this.step.person = [];
      this.step.box = [];
      this.stepNum = 0;

      // 需要创建16*16个小格子
      for (var i = 0; i < this.size.x * this.size.y; i++) {
        switch (this.mapData[lv][i]) {
          case 1:
            appDiv(i);
            oDiv.className = "wall"
            oImg.src = 'img/wall.png'
            break;
          case 2:
            appDiv(i)
            oDiv.className = "ball"
            oImg.src = 'img/ball.png'
            break;
          case 3:
            appDiv(i)
            oDiv.className = "box"
            oImg.src = 'img/box.png'
            break;
          case 4:
            appDiv(i)
            oDiv.className = "person";
            oImg.src = 'img/down.png';
            oPerson = oImg;
            break;
        }
      }


      // 创建div与div里面img标签
      function appDiv(i) {
        // 计算当前创建的div的位置在哪里
        var x = i % This.size.x;
        var y = parseInt(i / This.size.x);
        // console.log(x, y)

        oDiv = document.createElement("div");

        // 让div记录自己所在的位置
        oDiv.x = x;
        oDiv.y = y;
        oDiv.style.cssText = "left:" + x * 35 + "px;top:" + y * 35 + "px;z-index:" + (y * This.size.x) + ";"

        oImg = new Image();

        oDiv.appendChild(oImg);
        This.oWrap.appendChild(oDiv)
      }


      // console.log(oPerson)

      this.controlPerson(oPerson)
    },


    // 定义人物运动的控制器
    controlPerson: function (oP) {

      var oParent = oP.parentNode;

      // 绑定键盘按下事件
      document.onkeydown = function (ev) {
        ev = ev || window.event;

        // 获取键码
        var keycode = ev.keyCode;

        this.controlFn(oP, oParent, keycode)
      }.bind(this)
    },

    // 控制人物运动的函数
    controlFn: function (oP, oParent, keycode) {
      // 记录人物运动的信息,只要你键盘一按,就理解在记录人物运动的数组中创建一个对象,记录人物信息
      this.step.person[this.stepNum] = {};
      this.step.person[this.stepNum].src = oP.src;

      //  判断按键方向
      switch (keycode) {
        // 左方向
        case 37:
          oP.src = 'img/left.png';
          this.movePerson({ x: -1 }, oParent)
          break;
        // 上方向
        case 38:
          oP.src = 'img/up.png';
          this.movePerson({ y: -1 }, oParent)
          break;
        // 右方向
        case 39:
          oP.src = 'img/right.png';
          this.movePerson({ x: 1 }, oParent)
          break;
        // 下方向
        case 40:
          oP.src = 'img/down.png';
          this.movePerson({ y: 1 }, oParent)
          break;
      }
    },


    // 人物运动
    movePerson: function (mJson, oParent) {
      // console.log(oParent.x, oParent.y)
      var x = mJson.x || 0;
      var y = mJson.y || 0;

      // 获取所有的箱子
      var aBox = this.getBox('box', this.oWrap);
      // console.log(aBox)

      // 判断下一步的位置是不是墙壁,如果不是就运动,如果是,那么就不能运动
      if (this.mapData[this.level][(oParent.x + x) + (oParent.y + y) * this.size.x] !== 1) {
        // 记录人物运动前的定位信息
        this.step.person[this.stepNum].x = oParent.x;
        this.step.person[this.stepNum].y = oParent.y;

        // 人物运动
        oParent.x += x;
        oParent.y += y;
        oParent.style.left = oParent.x * 35 + 'px';
        oParent.style.top = oParent.y * 35 + 'px';
        oParent.style.zIndex = oParent.x + oParent.y * this.size.x;


        // 人物运动完成以后,步骤加一
        this.stepNum++;

        // 判断你的下一步是不是箱子
        for (var i = 0; i < aBox.length; i++) {

          // 判断人物运动的下一步的位置是箱子
          if (aBox[i].x == oParent.x && aBox[i].y == oParent.y) {


            // 判断箱子的下一步是不是墙壁
            if (this.mapData[this.level][(aBox[i].x + x) + (aBox[i].y + y) * this.size.x] !== 1) {
              // 箱子的下一步不是墙壁


              // 判断箱子的下一步是不是另外一个箱子
              if (this.collision(aBox[i], x, y)) {   // 如果为true说明移动 箱子下一步不是箱子

                // 记录箱子的运动步骤信息
                this.step.box[this.stepNum - 1] = {};
                this.step.box[this.stepNum - 1].x = aBox[i].x;
                this.step.box[this.stepNum - 1].y = aBox[i].y;
                this.step.box[this.stepNum - 1].index = i;

                // 移动的下一步既不是墙壁也不是箱子就应该让箱子也进行移动
                aBox[i].x += x;
                aBox[i].y += y;
                aBox[i].style.left = aBox[i].x * 35 + 'px';
                aBox[i].style.top = aBox[i].y * 35 + 'px';
                aBox[i].style.zIndex = aBox[i].x + aBox[i].y * this.size.x;

                // 检测是否过关
                // setTimeout(pass, 1000)
                this.pass()
              } else {

                // 如果箱子的下一步是箱子,那么移动的箱子将不进行移动,
                // 同时已经移动后的人物将退回原位
                oParent.x -= x;
                oParent.y -= y;
                oParent.style.left = oParent.x * 35 + 'px';
                oParent.style.top = oParent.y * 35 + 'px';
                oParent.style.zIndex = oParent.x + oParent.y * this.size.x;

                // 人物回退,减掉步骤信息
                this.stepNum--;
                this.step.person.pop();
              }

            } else {
              // 箱子的下一步是墙壁,那么就不能让人物进行移动
              oParent.x -= x;
              oParent.y -= y;
              oParent.style.left = oParent.x * 35 + 'px';
              oParent.style.top = oParent.y * 35 + 'px';
              oParent.style.zIndex = oParent.x + oParent.y * this.size.x;

              // 人物回退,减掉步骤信息
              this.stepNum--;
              this.step.person.pop();
            }
          }
        }

      }
    },

    // 获取所有box箱子的个数
    getBox: function (cName, obj) {
      obj = obj || document;

      // 判断用户使用浏览器是不是支持class类名获取元素
      if (obj.getElementsByClassName) {
        return obj.getElementsByClassName(cName)
      } else {
        var arr = [];
        var arrT = obj.getElementsByTagName('*');
        for (var i = 0; i < arrT.length; i++) {
          // 切割获取标签的数组
          var arrTArr = arrT[i].className.split(' ');
          for (var j = 0; j < arrTArr.length; j++) {
            if (arrTArr[j] == cName) {
              arr.push(arrT[i]);
              break;
            }
          }
        }

        return arr;
      }
    },


    // 箱子和箱子是不是碰撞了,说白了就是检测箱子移动下一步是不是箱子
    // 如果箱子移动后的位置有箱子就返回false, 否则返回true;
    collision: function (obj, x, y) {
      // 获取所有的箱子
      var aBox = this.getBox('box', this.oWrap);

      // 循环遍历所有的箱子
      for (var i = 0; i < aBox.length; i++) {
        if (aBox[i] !== obj) { // 取消要移动的箱子自身

          // 如果obj移动的箱子移动后的位置和遍历的某个箱子的坐标相同,那么说明箱子碰撞了
          if ((obj.x + x) === aBox[i].x && (obj.y + y) === aBox[i].y) {
            return false;
          }
        }
      }

      return true;
    },


    // 检查是否过关
    // 过关的条件是左右小球的位置和所有箱子的位置一一对应
    pass: function () {

      // 获取所有的小球和箱子
      var aBox = this.getBox('box', this.oWrap);
      var aBall = this.getBox('ball', this.oWrap);

      var passNum = 0;

      // 循环遍历所有的小球
      for (var i = 0; i < aBall.length; i++) {
        // 循环遍历所有的箱子
        for (var j = 0; j < aBox.length; j++) {
          // 判断所有的小球和箱子的位置是不是一样的
          if (aBall[i].x === aBox[j].x && aBall[i].y === aBox[j].y) {
            passNum++;
          }
        }
      }

      // 所有的for循环结束后,判断我们用于记录小球和箱子位置一样的计数器的个数和小球的个数是不是一样
      // 判断是否过关
      if (passNum == aBall.length) {
        if (this.level <= this.mapData.length - 2) {
          alert('你过关了');
          this.level++;
        } else {
          alert("你通全关了");
          this.level = 0;
        }
        this.createMap(this.level)
      }

    },


    // 定义上一步的函数
    prev: function () {
      // 获取人物
      var oPerson = this.getBox('person', this.oWrap)[0];
      // 获取所有盒子
      var aBox = this.getBox('box', this.oWrap);
      // 定义盒子的变量
      var oBoxNow;

      // 判断你的步骤不为0
      if (this.stepNum == 0) return
      //  通过step.person 来获取人物的上一步的位置
      oPerson.x = this.step.person[this.stepNum - 1].x;
      oPerson.y = this.step.person[this.stepNum - 1].y;

      // 通过人物的位置让人物进行回退
      oPerson.style.left = oPerson.x * 35 + 'px';
      oPerson.style.top = oPerson.y * 35 + 'px';
      oPerson.style.zIndex = oPerson.x + oPerson.y * this.size.x;
      oPerson.children[0].src = this.step.person[this.stepNum - 1].src;

      // 判断盒子有没有移动
      if (this.step.box[this.stepNum - 1]) {
        // 通过记录盒子的下标来查询到对应移动的盒子
        oBoxNow = aBox[this.step.box[this.stepNum - 1].index];
        oBoxNow.x = this.step.box[this.stepNum - 1].x;
        oBoxNow.y = this.step.box[this.stepNum - 1].y;

        // 设置盒子的回退
        oBoxNow.style.left = oBoxNow.x * 35 + 'px';
        oBoxNow.style.top = oBoxNow.y * 35 + 'px';
        oBoxNow.style.zIndex = oBoxNow.x + oBoxNow.y * this.size.x;
      }

      this.stepNum--;

    }
  }

  return Game.init.bind(Game);
})()