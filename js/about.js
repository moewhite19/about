indexs = 0;
indexs02 = 0;
var startTime;
var flags = {};

//然并卵的入口
function about_main() {
    //加载时间计时开始
    startTime = new timer;
    //然并卵的检测分辨率
    if (w < 500) {
        alert('当前屏幕分辨率过低，可能无法显示全部内容');
    }
    //测试用用
    if (debug) logout('测试');
    //阻止手势
    /*document.querySelector('body').addEventListener('touchstart', function (ev) {
        event.preventDefault();
    });*/
    loading();
    lastInfo();
}

//加载动画
function loading() {
    //坑未填
    //warp.style.display = "none";
    /*loadiv.style.display = "unset";
    loadh.src = "images/pic/head.jpg";
    loadiv.style.width = "100%";
    loadiv.style.height = "100%";
    loadiv.style.opacity = "1";
    loadh.style.opacity = "0";
    setTimeout("loadh.style.opacity = '1'", 2500);*/
}


//加载完成后运行
function loaddone() {
    console.log("网页加载耗时" + startTime.stop() / 1000 + "秒");
    if (w < 750) {
        cycle_b(false);
    }
    addClick() //绑定按键
    //player.play(0, 0); //自动播放音乐
}

//淡入文字
indexs01 = 0;
var box01_p = document.getElementById('box01_text').children;
for (var i = 0; i < box01_p.length; i++) {
    box01_p[i].style.opacity = '0';
}
boxOneTimer = setInterval(boxOne, 2400);

function boxOne() {
    if (indexs != 0) {
        //暂无
    } else if (indexs01 < box01_p.length) {
        box01_p[indexs01].style.opacity = '1';
        indexs01++;
    } else {
        clearInterval(boxOneTimer);
    }
}

var gitMove = document.getElementById('github_a');
var weiboMove = document.getElementById('weibo_a');
var blogMove = document.getElementById('blog_a');
//第一屏文字加载
var f_btn = document.getElementById("float_btn").children;
var nav_ul = document.getElementById('nav_ul').children;
var wrapBox = document.getElementById("wrapBox");
var foot = document.getElementById("foot");
var arrow = document.getElementById("arrow_img");
var boxs = document.getElementsByClassName("box");
var process = document.getElementById('bar_container').children; //进度条
var box02_text = document.getElementById('box02_text').children; //第二屏文字
var box02_timer;

function headclick() {
    var ran = RandomNum(-360, 360);
    cycle(ran, 300);
    setTimeout("cycle(" + ran + ",200);", 2250)

}

//气泡旋转 a为角度b为轴距
function cycle(a, b) {
    var cycarr = document.getElementsByClassName("cycle_a");
    var aa = a;
    if (b == undefined) b = 200;
    for (var i = 0; i < cycarr.length; i++) {
        aa += 120;
        cycarr[i].style.animation = "unset"
        cycarr[i].style.transform = "rotate(" + (aa - (aa * 2)) + "deg) translateX(+" + b + "px) rotate(" + aa + "deg)";
    }
}
//旧气泡选择?
function cycle2(a, b) {
    var cycarr = document.getElementsByClassName("cycle_a");
    var aa = a;
    if (b == undefined) b = 200;
    for (var i = 0; i < cycarr.length; i++) {
        aa += 120;
        cycarr[i].style.animation = "unset"
        cycarr[i].style.transform = "rotate(" + (aa - (aa * 2)) + "deg) translateX(+" + b + "px) rotate(" + aa + "deg)";
    }
}

//气泡变形
var cycle_b_flag = false;

function cycle_b(b) {
    var cyc = byid("cycle_item");
    if (b != undefined) cycle_b_flag = b;
    if (cycle_b_flag = !cycle_b_flag) {

        cyc.classList.add("cycle_item_b")

    } else {
        cyc.classList.remove("cycle_item_b")
    }
}

//第二屏动画
function boxTow() {
    if (indexs != 1) {
        //暂无
    } else if (indexs02 >= 0 && indexs02 < box02_text.length) {
        box02_text[indexs02].style.right = '0px';
        indexs02++;
        // console.log(indexs02)r
    } else {
        clearInterval(box02_timer);
    }
}

//滚动函数
function divMove(overHeight) {
    var wrapBox = document.getElementById("wrapBox");
    if (overHeight == 4) {
        wrapBox.style.top = (-h * 3 - foot.offsetHeight) + "px";
    } else {
        wrapBox.style.top = -indexs * h + "px";
    }
}

//滚动函数
function btnChange(index, flag, speed) {
    var height = window.innerHeight;
    var fh = foot.offsetHeight;
    for (var n = 0; n < f_btn.length; n++) {
        f_btn[n].classList.remove("btn_on")
    }

    for (var n = 0; n < nav_ul.length; n++) {
        nav_ul[n].classList.remove("nav_li_on")
    }

    if (flag) {
        if (index <= 0) {
            indexs = 0;
            f_btn[0].classList.add("btn_on")
            nav_ul[0].classList.add("nav_li_on")
            divMove(indexs);
        } else if (index > 0 && index <= 3) {
            f_btn[index].classList.add("btn_on")
            nav_ul[index].classList.add("nav_li_on")
            divMove(indexs);
        } else if (index == 4) {
            indexs = 4;
            divMove(indexs);
            nav_ul[index].classList.add("nav_li_on")
        } else {
            indexs = 4;
        }
    } else {
        if (index <= 0) {
            indexs = 0;
            f_btn[0].classList.add("btn_on")
            nav_ul[0].classList.add("nav_li_on")
            wrapBox.style.top = "0";
        } else if (index > 0 && index <= 3) {
            f_btn[index].classList.add("btn_on")
            nav_ul[index].classList.add("nav_li_on")
            wrapBox.style.top = (-indexs * 100) + "%";
        } else if (index == 4) {
            indexs = 4;
            wrapBox.style.top = (-height * 3 - fh) + "px";
            nav_ul[index].classList.add("nav_li_on")
        } else {
            indexs = 4;
        }
    }
    if (indexs == 1 && !flags.box02) {
        //第二屏动画
        for (var i = 0; i < process.length; i++) {
            process[i].className += ' active';
        }
        box02_timer = setInterval(boxTow, 1100);
        flags.box02 = true;
        indexs02 = 0;
        /*		for(var i = 0; i < box02_text.length; i++) {
                    box02_text[i].style.right = "-100%";
                }*/
    } else if (indexs == 2) {
        setTime_li()
    }
    if (indexs > 3) {
        arrow.style.bottom = "-50px"
    } else {
        arrow.style.bottom = "50px"
    }
}

//时间轴翻页
var e_li = document.getElementById('timeUl').children;
var li_times = 0;
var left_div = document.getElementById('left_div');
var right_div = document.getElementById('right_div');
left_div.onclick = function () {
    if (li_times > 0) {
        li_times--;
        setTime_li();
    }
}

right_div.onclick = function () {
    if (li_times < e_li.length - 2) {
        li_times++;
        setTime_li();
    }
}

function setTime_li() {
    var ii = document.getElementById('timeUl').children.length
    for (var i = 0; i < e_li.length; i++) {
        e_li[i].style.width = 100 / e_li.length + "%";
    }
    document.getElementById('timeUl').style.width = e_li.length * 40 + "%";
    var i = e_li[0].offsetWidth * li_times;
    document.getElementById('timeUl').style.left = 20 - i + 'px';
}

//触屏手势事件
window.addEventListener('touchstart', touchStart, false);
window.addEventListener('touchmove', touchMove, false);
window.addEventListener('touchend', touchEnd, false);
var touchO = {
    startY: 0,
    endY: 0,
    oldY: 0,
    flag: 0,
    startTop: 0,
}

function touchStart(event) {
    if (touchO.flag == 0) {
        ;
        wrapBox.classList.add("warpBox_tochMoveing");
        touchO.startY = event.touches[0].clientY;
        touchO.startTop = -indexs * 100;
        touchO.flag = 1;
    }
}

function touchMove(event) {
    if (touchO.flag == 1) {
        touchO.endY = event.touches[0].clientY;
        var movesize = touchO.endY - touchO.startY;
        wrapBox.style.top = touchO.startTop + (movesize / h * 100) + "%";
    }
}

function touchEnd(event) {
    if (touchO.flag == 1) {
        touchO.flag = 2;
        wrapBox.classList.remove("warpBox_tochMoveing");
        if (touchO.oldY == touchO.endY) {
            return;
        }
        touchO.oldY = touchO.endY;
        if (touchO.endY - touchO.startY > 100) {
            //向上滑动
            indexs = indexs - 1;
            btnChange(indexs, true, 1);
        } else if (touchO.startY - touchO.endY > 100) {
            //向下滑动
            indexs = indexs + 1;
            btnChange(indexs, true, 1);
        } else {
            btnChange(indexs, true, 1);
        }
        touchO.flag = -1;
        setTimeout("touchO.flag=0", 900);
    }
}

function addClick() {
    huam = byid("huam")
    //浮动点击事件
    for (var i = 0; i < f_btn.length; i++) {
        f_btn[i].indexs = i;
        f_btn[i].onclick = function () {
            var speed = Math.abs(indexs - this.indexs);
            indexs = this.indexs;
            btnChange(indexs, true, speed);
        }
    }

    //浮动nav事件
    for (var i = 0; i < nav_ul.length; i++) {
        nav_ul[i].indexs = i;
        nav_ul[i].onclick = function () {
            var speed = Math.abs(indexs - this.indexs);
            indexs = this.indexs;
            btnChange(indexs, true, speed);
        }
    }

    //箭头点击事件
    arrow.onclick = function () {
        indexs++
        btnChange(indexs, true, 1);
    }
    var oB = true;

    //鼠标滑动事件
    var scrollFunc = function (e) {
        var direct = 0;
        e = e || window.event;
        if (e.wheelDelta) { //IE/Opera/Chrome
            if (oB == true) {
                //向下滑动
                if (e.wheelDelta >= 120) {
                    oB = false;
                    indexs--;
                    btnChange(indexs, true, 1);
                    setTimeout(function () {
                        oB = true;
                    }, 700);

                } else if (e.wheelDelta <= -120) {
                    oB = false;
                    //向上滑动
                    indexs++;
                    btnChange(indexs, true, 1);
                    setTimeout(function () {
                        oB = true;
                    }, 700);
                }
            }

        } else if (e.detail) { //Firefox
            if (oB) {
                if (e.detail >= 3) {
                    oB = false;
                    indexs++;
                    btnChange(indexs, true, 1);
                    setTimeout(function () {
                        oB = true;
                    }, 700);
                } else if (e.detail <= -3) {
                    oB = false;
                    indexs--;
                    btnChange(indexs, true, 1);
                    setTimeout(function () {
                        oB = true;
                    }, 700);
                }
            }
        }
    }

    /*注册事件*/
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false); //W3C
    }
    window.onmousewheel = document.onmousewheel = scrollFunc; //IE/Opera/Chrome/Safari

    var iB = true;
    //监听窗口改变
    window.onresize = function () {
        //document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 20 + 'px';
        h = window.innerHeight;
        w = window.innerWidth;
        if (w / h >= 1920 / 1080) {
            iB = true;
        } else {
            iB = false;
        }
        divMove(indexs);
        setTime_li()
    }
}

/*计时函数
 * 用法
 * var time=new timer
 * time.stop()
 */
function timer() {
    var t = new Date();
    var time = t.getTime();
    this.stop = function () {
        var t = new Date();
        return t - time;
    };
};

about_main()