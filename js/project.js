var debug = false; //调试模式

//然并卵的入口

function about_main() {
	//然并卵的检测分辨率
	if (document.documentElement.clientWidth > 2050) {
		alert('屏幕分辨率可能超过我的网页理想数值');
	}
	//测试用的标题栏
	if (debug) log('测试');
	//点击播放音乐 未完成
	var play_music = document.getElementsByName('play_music');
	for (i in play_music) {
		play_music[i].onclick = function() {
			player.play(0, 0);
		};
	}
	//阻止手势
	/*document.querySelector('body').addEventListener('touchstart', function (ev) {
	    event.preventDefault();
	});*/
}




function byid(s) {
	return document.getElementById(s);
}

//动态执行 调试用

function ev() {
	var a = byid('mydebug').innerText;
	//var a = byid('mydebug').innerText.replace(/<br>/g, "\n").replace(/&nbsp;/g, ' ');
	if (a == '') {
		window.open('http://music.163.com/m/user/home?id=40632376');
	} else {
		try {
			eval(a);
		} catch (err) {
			alert(err.message);
		}
	}
}

//底部累计输出 如果k为true 那么覆盖输出否则累积

function logout(m, k) {
	var log = byid('mydebug');
	if (!k) {
		log.innerHTML = log.innerHTML + (log.innerHTML == '' ? '' : '<br>') + m;
	} else {
		log.innerHTML = m;
	}
}
//标题栏输出
function log(m) {
/*	var b=byid('debugtex');
	b.innerText=m;
	//b.style.fontSize='14px';
	*/
	document.title = m;
}

//计时

function show_date_time() {
	var tm = document.getElementsByName('show_time');
	window.setTimeout("show_date_time()", 1000);
	BirthDay = new Date("3/2/2017 07:59:09");
	today = new Date();
	timeold = (today.getTime() - BirthDay.getTime());
	sectimeold = timeold / 1000;
	secondsold = Math.floor(sectimeold);
	msPerDay = 24 * 60 * 60 * 1000;
	e_daysold = timeold / msPerDay;
	daysold = Math.floor(e_daysold);
	e_hrsold = (e_daysold - daysold) * 24;
	hrsold = Math.floor(e_hrsold);
	e_minsold = (e_hrsold - hrsold) * 60;
	minsold = Math.floor((e_hrsold - hrsold) * 60);
	seconds = Math.floor((e_minsold - minsold) * 60);
	for (i in tm) {
		tm[i].innerText = "辣鸡主页已存活" + checkTime(daysold) + "天" + checkTime(hrsold) + "小时" + checkTime(minsold) + "分" + checkTime(seconds) + "秒";
	}
}

show_date_time();

function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

//获取当前年月

function nowday() {
	var d = new Date();
	var doc = document.getElementById("now_day");
	var day = checkTime(d.getMonth() - 1) + "." + checkTime(d.getDate());
	doc.innerHTML = day;
}
nowday();

//获取URL数据
function urlData(n){
	var sc=window.location.search;
	var vr=window.location.search.split('&');
	var v={};
	if(vr.length>0){
		for(i in vr){
			var str=vr[i].split('=');
			if(str[0]=n){
				return str[1];
			}
		}
	}
	return "null";
}

function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if(typeof(callback) != "undefined"){
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
  }
  script.src = url;
  document.body.appendChild(script);
}

/*var vv=document.createElement('meta');
vv.setAttribute('name','viewpotr');
vv.setAttribute('content','width=device-width,initial-scale=1,maximum-scale=1.0,user-scalable=no');
    vv.onload = function(){
        vv.disabled = true;
        vv.disabled = false;
    };
*/

about_main();
