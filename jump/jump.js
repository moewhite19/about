var url=window.location.search+"";
//url='?dm@-url-'
var dal=url.indexOf('?');
var daa=url.indexOf('@');
var home='http://about.whiteg.cn';
logout('开始解析');
if(dal>=0){
	var d1=null;
	var d2='';
	if(daa>0) {
d1=url.substring(dal+1,daa);
		d2=url.substring(daa+1);
	} else d1=url.substring(dal+1);
	jump(getlink(d1,d2));
	
} else if(url.length<2){
	logout('无参数\n将跳转致默认主页');
	jump(home);
}
function logout(m){
	var tex=document.getElementById('text');
	tex.innerText=tex.innerText+'\n'+m;
}
//demoo http://localhost/?dm@-url-
function getlink(n,d){;
	logout('开始加载模板: '+n);
	//遍历模板列表
	for(i in jumplist){
		if(jumplist[i].name==n){
			logout('已找到模板: '+n);
			st=jumplist[i].start==undefined?'':jumplist[i].start;
			logout('模板Start: '+st+'\n植入数据: '+d);
			en=jumplist[i].end==undefined?'':jumplist[i].end;
			logout('模板End: '+en);
			var newurl=st+d+en;
			logout('链接生成完毕: ');
			return newurl;
		}
	}
	logout('找不到模板: '+n+'\n将跳转到默认主页');
	return home;
}
//点击跳转链接
function setmanjump(m){
	var p=document.getElementById('manjump');
	p.innerHTML='<a href="'+m+'"><u>'+m+'</u></a>';
}
//跳转
function jump(l){
	setmanjump(l);
	window.location.href=l;
}
