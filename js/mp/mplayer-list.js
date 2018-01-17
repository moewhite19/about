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
var mplayer_song = [
	[{
			"basic": true,
			"name": "Ricardo",
			"singer": "某不知名白狼",
			"img": "image/pic/head.jpg"
		},
		{
			"name": "最后的旅行",
			"singer": "Rainton桐",
			"img": "audio/album/zuihoudeluxin.jpg",
			"src": "audio/zuihoudeluxin.mp3",
			"lrc": "[00:00.00]歌词加载中...",
			"slrc":"audio/lrc/zuihoudeluxin.lrc"
		},
		{
			"name": "依伊-致上杉绘梨衣（《龙族》同人）",
			"singer": "琢彻",
			"img": "http://p1.music.126.net/J-ciggWVRzfg1zch7sBJNQ==/18198016951733246.jpg?param=130y130",
			"src": "audio/eyii.mp3",
			"lrc": "[00:00.00]歌词加载中...",
			"slrc":"audio/lrc/eyii.lrc"
		},
		{
			"name": "樱花的短篇（奏(かなで) ）",
			"singer": "千陵安浅",
			"img": "http://p1.music.126.net/5boOknJ-Oo1Dr0o2IF690g==/16579535835744609.jpg?param=130y130",
			"src": "audio/sakura.mp3",
			"lrc": "[00:00.00]歌词加载中...",
			"slrc":"audio/lrc/eyii.lrc"
		}
	],
	[{
			"basic": true,
			"name": "M",
			"singer": " ",
			"img": "image/null.jpg"
		},
		{
			"name": "东京不太热",
			"singer": "囧菌",
			"img": "images/404.jpg",
			"src": "audio/music3.mp3",
			"lrc": "[00:00.00]歌词加载中...",
			"slrc":"audio/lrc/music3.lrc"
		},
		{
			"name": "銀河鉄道のペンギン (feat. nicamoq)",
			"singer": "Aiobahn Yunomi",
			"img": "audio/album/music2.jpg",
			"src": "audio/music2.mp3",
			"lrc": "[00:00.00]歌词加载中...",
			"slrc":"audio/lrc/music2.lrc"
		},
		{
			"name": "Undertale",
			"singer": "Toby Fox",
			"img": "http://p4.music.126.net/oZe-JSuWYAR8zSa29g9g0g==/3254554423361647.jpg?param=177y177",
			"src": "audio/Toby_Fox-Undertale.mp3",
			"lrc": ""
		}
	],
	[{
			"basic": true,
			"name": "Lu",
			"singer": "某不知名白狼",
			"img": "image/pic/head.jpg"
		},
		{
			"name": "I'm So Happy",
			"singer": "中原龍太郎",
			"img": "audio/album/music4.jpg",
			"src": "audio/music4.mp3",
			"lrc": "",
			"slrc":"audio/lrc/music4.lrc"
		},
		{
			"name": "404",
			"singer": "-",
			"img": "images/404.jpg",
			"src": "audio/404.mp3",
			"lrc": ""
		}
	]
];
//加载歌词文件——开发中

/*player.list[0][0].lrc
player._parseLrc(mplayer_song[0][1].lrc)

player._setLrc(player._parseLrc(mplayer_song[0][1].lrc))*/
