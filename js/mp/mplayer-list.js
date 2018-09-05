/**
 * 播放列表
 * @type {Array}
 * 请用数组来定义总列表
 * 再用二维数组定义每个列表
 * 其中列表里的每首歌需用对象定义
 * 请在每个列表中的第一个元素定义列表信息（必须位于第一位）
 * 列表信息必须有一个basic属性，值为true
 * 还要有一个name属性，值为列表名称
 * 可选参数为singer、image，用于为定义的该属性的歌曲调用
 * 每首歌必须有name、src、lrc三个属性
 * src为歌曲相对于index.html的相对路径或绝对路径
 * 可选singer和image属性
 * 在每首歌没有定义singer或image时将使用列表的singer或image
 * 请确保一定有一个被定义
 * 其中name为歌曲名称
 * src为歌曲文件路径
 * lrc为歌词，请用\n或\r将每行歌词隔开，否则无法识别
 * slrc为歌词文件路径 可有可无
 */
//获取网易云音乐
function music163(i) {
	return "http://music.163.com/song/media/outer/url?id=" + i + ".mp3"
}
var mplayer_song = [
	[
		{
			"basic": true,
			"name": "Ricardo",
			"singer": "某不知名白狼",
			"img": "image/pic/head.jpg"
		},
		{
			"name": "最后的旅行",
			"singer": "Rainton桐",
			"img": "http://p1.music.126.net/8qhWDWoNejyMcAAwAm2pNA==/17752714742397400.jpg?param=177y177",
			"src": music163("423703394"),
			"lrc": "[00:00.00]歌词加载中...",
			"slrc": "audio/lrc/zuihoudeluxin.lrc"
		},
		{
			"name": "樱花的短篇（奏(かなで) ）",
			"singer": "千陵安浅",
			"img": "http://p1.music.126.net/5boOknJ-Oo1Dr0o2IF690g==/16579535835744609.jpg?param=177y177",
			"src": music163("41671021"),
			"lrc": "[00:00.00]歌词加载中...",
			"slrc": "audio/lrc/eyii.lrc"
		},
		{
			"name": "依伊-致上杉绘梨衣（《龙族》同人）",
			"singer": "琢彻",
			"img": "http://p1.music.126.net/J-ciggWVRzfg1zch7sBJNQ==/18198016951733246.jpg?param=177y177",
			"src": music163("423015999"),
			"lrc": "[00:00.00]歌词加载中...",
			"slrc": "audio/lrc/eyii.lrc"
		}
	],
	[
		{
			"basic": true,
			"name": "M",
			"singer": "某不知名白狼",
			"img": "image/pic/head.jpg"
		},
		{
			"name": "Bad Apple!!!",
			"singer": "Alstroemeria",
			"img": "http://p1.music.126.net/l6J6zceZI5YtkmD6-PMnmw==/888405395266525.jpg?param=117y117",
			"src": music163("22645196"),
			//"src": "audio/Alstroemeria_Records-Bad_Apple!!.mp3",
			"lrc": "",
			"slrc": "audio/lrc/Alstroemeria_Records-Bad_Apple!!.lrc"
		}
	],
	[
		{
			"basic": true,
			"name": "Lu",
			"singer": "某不知名白狼",
			"img": "image/pic/head.jpg"
		},
		{
			"name": "I'm So Happy",
			"singer": "中原龍太郎",
			"img": "http://p1.music.126.net/cxjF4-0CX9TXMF50zxgxXg==/2426622162526064.jpg?param=177y177",
			"src": music163("26123157"),
			"lrc": "",
			"slrc": "audio/lrc/happy.lrc"
		},
		{
			"name": "404",
			"singer": "-",
			"img": "images/404.jpg",
			"src": "audio/404.mp3",
			"lrc": ""
		},
		{
			"name": "Undertale",
			"singer": "Toby Fox",
			"img": "http://p4.music.126.net/oZe-JSuWYAR8zSa29g9g0g==/3254554423361647.jpg?param=177y177",
			"src": music163("39227624"),
			"lrc": ""
		}
	]
];