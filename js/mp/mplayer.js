/**
 * MPlayer音乐播放器
 * @authors 0936zz(zz5840@qq.com)
 * 本插件依赖：jQuery 1.6及以上
 */
var MPlayer = (function () {
	function MPlayer(settings,callback) {
		var $this = this;
		init(callback);
		bindEvents();
		formatData();
		// 切换播放模式
		$this.changePlayMode($this.settings.playMode);
		// 循环输出列表标题
		var listHTML = '';
		$.each($this.list, function (i) {
			listHTML += '<li class="mp-list-title-'+ i +'">' + $this.list[i].listName + '</li>';
		});
		$this.dom.listTitle.html(listHTML);
		$this._setLrc($this.list[0][0].lrc);
		// 输出列表
		$this.changeList($this.settings.playList);
		// afterInit事件
		$this._trigger('afterInit');
		// 自动播放
		if ($this.settings.autoPlay) {
			$this.play($this.settings.playList,$this.settings.playSong);
		} else {
			$this._setInfo($this.settings.playList,$this.settings.playSong);
		}
		/**
		 * 初始化播放器
		 */
		function init (callback) {
			// 设置默认参数
			$this.settings = {
				playMode:3,
				playList:0,
				playSong:0,
				autoPlay:false,
				lrcTopPos:0,
				defaultVolume:100
			};
			$this.callbacks = {
				afterInit:null,
				beforePlay:null,
				timeUpdate:null,
				end:null,
				mute:null,
				changeMode:null
			};
			// 合并设置项
			$.extend(true,$this.settings,settings);
			// 获取container容器
			var con = $($this.settings.containerSelector);
			// 创建audio标签
			$this.audio = $('<audio></audio>').attr({
				'data-currentLrc':0,
				'data-currentSong':0,
				'data-currentList':0,
				'data-displayList':0,
				'data-playMode':0,
				'preload':'preload'
			});
			// 存储dom方便以后使用
			$this.dom = {
				container:con,
				cover:con.find('.mp-cover'),
				name:con.find('.mp-name'),
				singer:con.find('.mp-singer'),
				currentTime:con.find('.mp-time-current'),
				allTime:con.find('.mp-time-all'),
				prev:con.find('.mp-prev'),
				play:con.find('.mp-pause'),
				next:con.find('.mp-next'),
				vol:con.find('.mp-vol-img'),
				volRange:con.find('.mp-vol-range'),
				progress:con.find('.mp-pro-current'),
				progressAll:con.find('.mp-pro'),
				lrc:con.find('.mp-lrc'),
				listTitle:con.find('.mp-list-title'),
				list:con.find('.mp-list')
			};
			$this.settings.lineHeight = parseInt($this.dom.lrc.css('line-height'));
			// 计算列表模板的有效元素
			$this.settings.listEleName = $.parseHTML($this.settings.listFormat)[0].nodeName.toLowerCase();
			// 调用绑定事件的回调函数
			callback.apply($this);
		}


		/**
		 * 绑定事件
		 */
		function bindEvents () {
			// 专辑图片加载失败将使用默认图片
			$this.dom.cover.error(function () {
				$(this).attr('src',$this.settings.defaultImg);
			});
			// 上一首
			$this.dom.prev.click(function() {
				$this.prev();
			});
			// 下一首
			$this.dom.next.click(function () {
				$this.next();
			});
			// 播放 or 暂停
			$this.dom.play.click(function () {
				if ($this.audio.prop('paused')) {
					$this.play();
				} else {
					$this.pause();
				}
			});
			// 改变音量
			$this.dom.volRange.on($this.settings.volSlideEventName,function (event,val) {
				$this.audio.prop('volume',val/100);
			});
			// 静音
			$this.dom.vol.click(function () {
				$this.toggleMute();
			});
			// 列表切换
			$this.dom.listTitle.on('click','li', function () {
				// 获取索引
				var list = $(this).index();
				$this.changeList(list);
			});
			$this.audio.on('canplay',function () {
				setTime($this.getDuration(),$this.dom.allTime);
			}).on('timeupdate', function () {
				var currentTime = $this.getCurrentTime();
				// 修改时间
				setTime(currentTime,$this.dom.currentTime);
				// 更新进度条
				$this.dom.progress.css('width',$this.getPercent()*100+'%');
				// 更新歌词
				var dataLrc = parseInt($this.audio.attr('data-currentLrc'));
				var currentLrc = $this.getLrc(currentTime,false);
				// 判断是否需要切换歌词
				if (dataLrc != currentLrc) {
					// 设置当前歌词
					$this.audio.attr('data-currentLrc',currentLrc);
					// 删除以前添加的class
					$this.dom.lrc.find('.mp-lrc-current').removeClass('mp-lrc-current');
					// 添加class
					var position = $this.dom.lrc.find('.mp-lrc-time-'+currentLrc).addClass('mp-lrc-current').position();
					// 计算滚动的高度
					var positionTop = position ? position.top : 0;
					var top = $this.dom.lrc.scrollTop();
					// 动画滚动
					$this.dom.lrc.animate({
						scrollTop:top + positionTop - $this.settings.lrcTopPos
					},200);
				}
				// 触发onTimeUpdate事件
				$this._trigger('timeUpdate');
			}).on('ended', function () {
				// 触发onEnd事件
				var flag = $this._trigger('end');
				if (flag !== false) {
					next();
				}
			});
			// 计算列表模板的有效元素
			var eleName = $.parseHTML($this.settings.listFormat)[0].nodeName.toLowerCase();
			$this.dom.list.on('click',eleName, function () {
				$this.play(parseInt($this.audio.attr('data-displayList')),$(this).index());
			});
			// 进度条
			$this.dom.progressAll.click(function (event) {
				var width = $(this).width();
				var offset = Math.min(Math.max(event.offsetX,0),width);
				var percent = offset / width;
				$this.setCurrentTime($this.getDuration() * percent);
			});
			// 列表点击切换歌曲
			$this.dom.list.on('click',$this.settings.listEleName, function () {
				$this.play(parseInt($this.audio.attr('data-displayList')),$(this).index());
			});
			// 禁止点击
			$this.dom.container.on('mousedown','.mp-disabled', function () {
				return false;
			})
		}

		/**
		 * 格式化数据
		 */
		function formatData () {
			$this.list = [];
			var list = $this.settings.songList;
			for (var i = 0; i < list.length;i++) {
				$this.list[i] = [];
				// 寻找列表公用数据
				for (var j = 0; j < list[i].length;j++) {
					if (list[i][j].basic) {
						$this.list[i].listName = list[i][j].name || '-';
						$this.list[i].singerName = list[i][j].singer || '-';
						$this.list[i].imgSrc = list[i][j].img || $this.settings.defaultImg;
						list[i].splice(j,1);
						break;
					}
				}
				// 添加歌曲
				$this.addSong(list[i],i);
			}
		}

		/**
		 * 计算正常播放下一曲
		 */
		function next () {
			var mode = parseInt($this.audio.attr('data-playMode'));
			var songNum = $this.getSongNum();
			switch (mode) {
				case 0: // 顺序
					var currentSong = $this.audio.attr('data-currentSong');
					if (currentSong != songNum-1) {
						$this.next();
					} else {
						$this.pause();
					}
					break;
				case 1: // 单曲
					$this.play();
					break;
				case 2: // 随机
				case 3:
				default: // 列表
					$this.next();
					break;
			}
		}

		/**
		 * 设置时间
		 * @param time {number} 时间，单位秒
		 * @param ele {jQuery} 元素
		 */
		function setTime (time,ele) {
			var minute = fillByZero(Math.floor(time/60),2);
			var second = fillByZero(Math.floor(time % 60),2);
			ele.html(minute + ':' + second);
		}

		/**
		 * 用0填充
		 * @param num
		 * @param digit
		 * @returns {string|number}
		 */
		function fillByZero (num,digit) {
			num = String(num);
			for (var i = num.length; i < digit; i++) {
				num = '0' + num;
			}
			return num;
		}
	}
	$.extend(MPlayer.prototype,{
		/**
		 * 更换歌词
		 * @param lrc
		 * @private
		 */
		_setLrc: function (lrc) {
			var $this = this;
			$this.dom.lrc.html('').scrollTop(0);
			$.each(lrc, function (index,val) {
				$this.dom.lrc.append($('<li></li>').addClass('mp-lrc-time-'+index).html(val));
			});
		},
		/**
		 * 更换播放器的歌曲信息
		 * @param list
		 * @param song
		 * @private
		 */
		_setInfo: function (list,song) {
			var $this = this;
			var songInfo = $this.getInfo(list,song);
			// 设置当前播放歌曲
			$this.audio.attr({
				'src':songInfo.src,
				'data-currentList':list,
				'data-currentSong':song
			});
			// 输出歌名和歌手
			$this.dom.name.html(songInfo.name);
			$this.dom.singer.html(songInfo.singer);
			// 更换封面
			$this.dom.cover.attr('src',songInfo.img);
			// 更换歌词
			$this._setLrc(songInfo.lrc);
			// 进度条归零
			$this.dom.progress.width(0);
			// 列表添加样式
			if (list == $this.getDisplayList()) {
				$this._setCurrent(song);
			}
		},
		/**
		 * 为当前播放歌曲添加class
		 * @param song
		 * @private
		 */
		_setCurrent: function (song) {
			var $this = this;
			var items = $this.dom.list;
			items.find('.mp-list-current').removeClass('mp-list-current');
			items.children().eq(song).addClass('mp-list-current');
		},
		/**
		 * 解析歌词字符串
		 * @param lrc
		 * @returns {Object}
		 * @private
		 */
		_parseLrc: function  (lrc) {
			var reg = /\[(\d{2})(&#58;|:)(\d{2})(&#46;|\.)(\d{2})\]([^\[]+)/g;
			var obj = {};
			// 匹配歌词
			while (true) {
				var result = reg.exec(lrc);
				if (!result) {
					break;
				}
				var time = Math.round((parseInt(result[1])*60 + parseInt(result[3]) + parseInt(result[5])/100)*1000);
				obj[time] = $.trim(result[6]) || ' ';
			}
			return obj;
		},
		/**
		 * 触发事件
		 * @param name
		 * @private
		 */
		_trigger: function (name) {
			var $this = this;
			return $this.callbacks[name] && $this.callbacks[name].apply($this);
		},
		/**
		 * 获取随机数
		 * @param min
		 * @param max
		 * @returns {number}
		 * @private
		 */
		_rand: function (min,max) {
			if (max === undefined) {
				max = min;
				min = 0;
			}
			var r = 0;
			do {
				r = Math.round(Math.random() * max);
			} while(r < min);
			return r;
		},
		/**
		 * 下一首
		 */
		next: function () {
			var $this = this;
			var mode = $this.getPlayMode();
			var songNum = $this.getSongNum();
			switch (mode) {
				case 2: // 随机
					var song = $this._rand(0,songNum-1);
					$this.play(song);
					break;
				case 0: // 顺序
				case 3: // 列表
				case 1: // 单曲
				default:
					var nextSong = $this.getCurrentSong() + 1;
					if (nextSong >= songNum) {
						nextSong = 0;
					}
					$this.play(nextSong);
					break;
			}
		},
		/**
		 * 上一首
		 */
		prev: function () {
			var $this = this;
			var lastSong = $this.getCurrentSong() - 1;
			var currentList = $this.getCurrentList(true);
			if (lastSong < 0) {
				lastSong = currentList.num - 1;
			}
			$this.play(lastSong);
		},
		/**
		 * 播放
		 * @param list 可选，详细见下方说明
		 * @param song 可选，详细见下方说明
		 * 注：此函数有三种传参形式
		 * 1. 不传任何参数：代表播放已暂停的歌曲，如果正在播放就什么也不做
		 * 2. 只传一个参数：代表播放当前列表的第list首歌
		 * 3. 两个参数都传：代表播放第list个列表的第song首歌
		 */
		play: function (list,song) {
			var $this = this;
			if (list === undefined && song === undefined) {
				var flag = $this._trigger('beforePlay');
				if (flag === false) {
					return false;
				} else{
					$this.audio.get(0).play();
					$this.dom.play.addClass('mp-play');
				}
			} else if (list !== undefined && song === undefined) {
				song = list;
				list = $this.getCurrentList();
				$this.play(list,song);
			} else {
				var num = $this.getSongNum(list);
				if (song >= num) {
					song = num - 1;
				} else if (song < 0) {
					song = 0;
				}
				$this._setInfo(list,song);
				$this.play();
			}
		},
		/**
		 * 暂停，如果已暂停就什么也不做
		 */
		pause: function () {
			var $this = this;
			$this.dom.play.removeClass('mp-play');
			$this.audio.get(0).pause();
		},
		/**
		 * 获取当前歌曲的总时长
		 * @returns {number}
		 */
		getDuration: function () {
			return this.audio.prop('duration');
		},
		/**
		 * 获取正在播放歌曲的当前时间
		 * @returns {number}
		 */
		getCurrentTime: function () {
			return this.audio.prop('currentTime');
		},
		/**
		 * 获取当前歌曲已播放的百分比
		 * @returns {number}
		 */
		getPercent: function () {
			return this.getCurrentTime()/this.getDuration();
		},
		/**
		 * 设置歌曲正在播放的时间
		 * @param time {number} 时间，单位秒
		 */
		setCurrentTime: function (time) {
			var $this = this;
			time = Math.min(time,$this.getDuration());
			time = Math.max(0,time);
			var buffered = $this.audio.get(0).buffered;
			var start = buffered.start(0);
			var end = buffered.end(0);
			time = Math.max(start,Math.min(end,time));
			$this.audio.prop('currentTime',time);
		},
		/**
		 * 向列表最后添加歌曲
		 * @param data {Array} 歌曲信息列表
		 * @param list {number} 可选，不传代表当前列表
		 */
		addSong: function (data,list) {
			var $this = this;
			list = list !== undefined ? list : $this.getCurrentList();
			if (data instanceof Array) {
				for (var i = 0; i < data.length;i++) {
					$this.addSong(data[i],list);
				}
			} else {
				var basic = {
					lrc:$this._parseLrc(data.lrc || '-'),
					name:data.name || '-',
					singer:data.singer || $this.list[list].singerName,
					src:data.src || '-',
					img:data.img || $this.list[list].imgSrc
				};
				var song = $.extend({},data,basic);
				$this.list[list].push(song);
				// 更新播放列表
				if (list == $this.getCurrentList()) {
					$this.changeList(list);
				}
			}
		},
		/**
		 * 获取列表中歌曲的数目
		 * @param list {number} 可选，不传代表当前列表
		 * @returns {number}
		 */
		getSongNum: function (list) {
			var $this = this;
			list = list !== undefined ? list : $this.getCurrentList();
			return $this.list[list].length;
		},
		/**
		 * 获取当前播放歌曲的信息
		 * @param info {boolean|} 可选，默认false，将返回歌曲id，填true可返回详细歌曲信息
		 * @returns {object|int}
		 */
		getCurrentSong: function (info) {
			var $this = this;
			info = info !== undefined ? info : false;
			if (info) {
				return $this.getInfo();
			} else {
				return parseInt($this.audio.attr('data-currentSong'));
			}
		},
		/**
		 * 获取当前播放列表的信息
		 * @param info {boolean} 可选，默认false，将返回列表id，填true可返回详细列表信息
		 * @returns {object|int}
		 */
		getCurrentList: function (info) {
			var $this = this;
			info = info !== undefined ? info : false;
			if (info) {
				return $this.getList($this.getCurrentList());
			} else {
				return parseInt($this.audio.attr('data-currentList'));
			}
		},
		/**
		 * 获取当前播放列表的信息
		 * @param info {boolean} 可选，默认false，将返回列表id，填true可返回详细列表信息
		 * @returns {object|int}
		 */
		getDisplayList: function (info) {
			var $this = this;
			info = info !== undefined ? info : false;
			if (info) {
				return $this.getList($this.getDisplayList());
			} else {
				return parseInt($this.audio.attr('data-displayList'));
			}
		},
		/**
		 * 返回指定listID的信息
		 * @param list
		 * @returns {{name: (string|*), num, songs: *}}
		 */
		getList: function (list) {
			var $this = this;
			var listArr = $this.list[list];
			return {
				name: listArr.listName,
				num: listArr.length,
				songs: listArr
			};
		},
		/**
		 * 获取指定id的歌曲信息
		 * @param list {number} 列表id 可选，不填代表当前列表
		 * @param song {number} 歌曲id 可选，不填代表当前歌曲
		 * 注：当只传一个参数时代表获取列表信息，两个都不传或两个都传代表获取歌曲信息
		 * @returns {object}
		 */
		getInfo: function (list,song) {
			var $this = this;
			list = list !== undefined ? list : $this.getCurrentList();
			song = song !== undefined ? song : $this.getCurrentSong();
			return $this.list[list][song];
		},
		/**
		 * 通过传入的时间返回指定时间的歌词
		 * @param time {number} 可选，不传代表当前时间，单位秒
		 * @param info {boolean} 可选，默认true，将返回歌词字符串，填false返回歌词开始时间（单位：毫秒）
		 */
		getLrc: function (time,info) {
			var $this = this;
			info = info !== undefined ? info : true;
			time = time !== undefined ? time * 1000 : $this.getCurrentTime() * 1000;
			var lrcList = $this.getCurrentSong(true)['lrc'];
			var lrc,lastIndex = 0;
			$.each(lrcList, function (index) {
				if (time < index) {
					return false;
				}
				lastIndex = index;
			});
			lrc = lastIndex;
			return info ? $this.getCurrentSong(true).lrc[lrc] : lrc;
		},
		/**
		 * 更换显示的列表
		 * @param list {number} 列表id
		 */
		changeList: function (list) {
			var $this = this;
			// 设置列表活动类
			$this.dom.listTitle.find('.mp-list-title-current').removeClass('mp-list-title-current');
			$this.dom.listTitle.find('.mp-list-title-'+list).addClass('mp-list-title-current');
			// 切换audio标签的显示列表
			$this.audio.attr('data-displayList',list);
			// 清除播放列表
			$this.dom.list.html('');
			// 获取列表模板
			var format = $this.settings.listFormat;
			// 匹配正则
			var reg = /\$\{(\w+)}\$/g;
			for (var i = 0; i < $this.list[list].length;i++) {
				var content = format;
				while (true) {
					var result = reg.exec(format);
					if (!result) {
						break;
					}
					// 替换模板里的${}$为实际数据
					content = content.replace(result[0],$this.list[list][i][result[1]] || '-');
				}
				// 输出列表
				$this.dom.list.append(content);
			}
			// 为列表当前播放歌曲添加样式
			if (list == $this.getCurrentList()) {
				$this._setCurrent($this.getCurrentSong());
			}
		},
		/**
		 * 更换播放模式
		 * @param mode {number}
		 */
		changePlayMode: function (mode) {
			var $this = this;
			mode = Math.max(Math.min(parseInt(mode),3),0);
			$this.audio.attr('data-playMode',mode);
			$this._trigger('changeMode');
		},
		/**
		 * 获取播放模式(0->顺序播放 1->列表循环 2->单曲循环 3->随机播放)
		 * @returns {number}
		 */
		getPlayMode: function () {
			return parseInt(this.audio.attr('data-playMode'));
		},
		/**
		 * 获取是否静音
		 * @returns {boolean}
		 */
		getIsMuted: function () {
			return this.audio.prop('muted');
		},
		/**
		 * 静音，如果已静音就什么都不做
		 */
		mute: function () {
			var $this = this;
			$this.dom.vol.addClass('mp-mute');
			$this.audio.prop('muted',true);
			$this._trigger('mute');
		},
		/**
		 * 取消静音，如果没有静音就什么都不做
		 */
		cancelMute: function () {
			var $this = this;
			$this.audio.prop('muted',false);
			$this.dom.vol.removeClass('mp-mute');
			$this._trigger('mute');
		},
		/**
		 * 切换静音状态
		 */
		toggleMute: function () {
			var $this = this;
			if ($this.getIsMuted()) {
				$this.cancelMute();
			} else {
				$this.mute();
			}
		},
		/**
		 * 绑定事件
		 * @param name string
		 * @param fun function
		 * @returns {MPlayer}
		 */
		on: function (name,fun) {
			var $this = this;
			$this.callbacks[name] = fun;
			return $this;
		},
		/**
		 * 解除事件绑定
		 * @param name
		 * @returns {MPlayer}
		 */
		unBindEvent: function (name) {
			var $this = this;
			$this.callbacks[name] = null;
			return $this;
		}
	});
	return MPlayer;
}());