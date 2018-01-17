var debug = false; //调试模式

//然并卵的入口

function about_main() {
	//然并卵的检测分辨率
	if(document.documentElement.clientWidth < 500) {
		alert('此屏幕分辨率可能无法展现全部内容');
	}
	//测试用用
	if(debug) logout('测试');

	//点击播放音乐 未完成
	var playes = document.getElementsByName('play_music');
	for(i in playes) {
		playes[i].onclick = function() {
			player.play();
			player.dom.container.toggleClass('mp-show');
		};
	};

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
	if(a == '') {
		window.open('http://music.163.com/m/user/home?id=40632376');
	} else {
		try {
			eval(a);
		} catch(err) {
			alert(err.message);
		}
	}
}

//主动调试输出 如果k为true 那么覆盖输出否则累计
var logflg = {
	s: "",
	i: 1
};

function logout(m, k) {
	var e = byid('mydebug');
	if(k) {
		e.innerText = m;
	} else if(m == logflg.s) {
		var m = e.innerText.split("\n");
		var en = logflg.s + " " + logflg.i;
		m[m.length - 2] = en;
		m = m.join("\n");
		e.innerText = m;
		logflg.i += 1;
	} else {
		e.innerText = e.innerText + m + "\n";
		logflg.s = m;
		logflg.i = 1;
	}
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
	for(i in tm) {
		tm[i].innerText = "辣鸡主页已存活" + checkTime(daysold) + "天" + checkTime(hrsold) + "小时" + checkTime(minsold) + "分" + checkTime(seconds) + "秒";
	}
}

show_date_time();

function checkTime(i) {
	if(i < 10) {
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
function urlData(n) {
	var sc = window.location.search;
	var vr = window.location.search.split('&');
	var v = {};
	if(vr.length > 0) {
		for(i in vr) {
			var str = vr[i].split('=');
			if(str[0] = n) {
				return str[1];
			}
		}
	}
	return "null";
}

function loadScript(url, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	if(typeof(callback) != "undefined") {
		if(script.readyState) {
			script.onreadystatechange = function() {
				if(script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			script.onload = function() {
				callback();
			};
		}
	}
	script.src = url;
	document.body.appendChild(script);
}

function getURL(url, fun, bool) {
	var xmlhttp;
	if(bool == undefined) bool = true;
	if(window.XMLHttpRequest) {
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//logout(xmlhttp.responseText);
			fun(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
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