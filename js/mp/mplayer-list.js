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
			"img": "http://p1.music.126.net/8qhWDWoNejyMcAAwAm2pNA==/17752714742397400.jpg?param=130y130",
			"src": "http://m10.music.126.net/20180117182437/42d0263a5697970e38a45263cce77a40/ymusic/1762/1bd3/795c/a2520e858abe3c6c640d8087d165fa60.mp3",
			"lrc": "[00:00.00]歌词加载中...",
			"slrc":"audio/lrc/zuihoudeluxin.lrc"
		},
		{
			"name": "依伊-致上杉绘梨衣（《龙族》同人）",
			"singer": "琢彻",
			"img": "http://p1.music.126.net/J-ciggWVRzfg1zch7sBJNQ==/18198016951733246.jpg?param=130y130",
			"src": "http://m10.music.126.net/20180117182145/e4ec20be35819d33812db3af9c443657/ymusic/4b46/ea96/830d/b099e92153351233a8cb6c74a871c3f0.mp3",
			"lrc": "[00:00.00]歌词加载中...",
			"slrc":"audio/lrc/eyii.lrc"
		},
		{
			"name": "樱花的短篇（奏(かなで) ）",
			"singer": "千陵安浅",
			"img": "http://p1.music.126.net/5boOknJ-Oo1Dr0o2IF690g==/16579535835744609.jpg?param=130y130",
			"src": "http://m10.music.126.net/20180117181248/40be6db38a140c91fd2558bb1436ca7c/ymusic/1ad3/a546/c5df/a9d93963c3b81a4f067730379573bd07.mp3",
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
			"src": "http://m10.music.126.net/20180117183424/6a57be51eb46d41b13e9ffd80cb98845/ymusic/2a8c/16f3/3f11/5305dd437eec87db47edaaddb6a80d25.mp3",
			"lrc": "[00:00.00]歌词加载中...",
			"slrc":"audio/lrc/music3.lrc"
		},
		{
			"name": "銀河鉄道のペンギン (feat. nicamoq)",
			"singer": "Aiobahn Yunomi",
			"img": "http://p1.music.126.net/_3pNNriwuL--W5CUKHC2-Q==/3261151499483479.jpg?param=130y130",
			"src": "http://m10.music.126.net/20180117183014/c295ad3a41b927ec0bc41b974aae88ce/ymusic/411b/0c83/e8ed/7fe987886b6662cea3b0e8097bb4f0db.mp3",
			"lrc": "[00:00.00]歌词加载中...",
			"slrc":"audio/lrc/music2.lrc"
		},
		{
			"name": "Undertale",
			"singer": "Toby Fox",
			"img": "http://p4.music.126.net/oZe-JSuWYAR8zSa29g9g0g==/3254554423361647.jpg?param=177y177",
			"src": "http://m10.music.126.net/20180117183326/6d68a0628af99d5428443c8bae22a612/ymusic/dbd7/7ee3/768b/c5a830097d85169078ee61c4f83a366b.mp3",
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
			"img": "http://p1.music.126.net/cxjF4-0CX9TXMF50zxgxXg==/2426622162526064.jpg?param=177y177",
			"src": "http://m10.music.126.net/20180117183717/ddc1b5bcc67f2b917871ce862aca3b1f/ymusic/b279/e666/a766/f0829b527bbd07edd1f7ffca9cd13a74.mp3",
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
