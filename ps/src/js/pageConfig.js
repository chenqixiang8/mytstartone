/**
 * 在线图像处理页面配置
 * @author 薛望
 * 2020/07/20
 */

let pageConfig = {
	$: function (el) {
		return document.querySelectorAll(el);
	},
	bindEvent: function () {
		let that = this;

		/* 页面顶部控件事件绑定 */

		// 导航栏事件绑定

		menus = that.$('#header-nav .nav-sub');

		// 文件
		menus[0].querySelectorAll('li')[0].addEventListener('click', function () {
			scale_range.value = 1;// 工作区恢复正常比例 
			scale_range_event();
			that.$('input[name=imageFile]')[0].click();
		});
		menus[0].querySelectorAll('li')[1].addEventListener('click', function () {
			that.$('#inputUrl')[0].showModal();
		});
		// 下载
		menus[0].querySelectorAll('li')[2].addEventListener('click', function () {
			that.$('#download')[0].showModal();
			that.$('#download input[name=img_name]')[0].value = Date.parse(new Date());
		});

		// 图像 
		let tx_els = ["#txbh", "#txzq", "#mh"];
		menus[1].querySelectorAll('li').forEach((el, index) => {
			el.addEventListener('click', function () {
				that.$(tx_els[index])[0].click();
			});
		});

		// 滤镜
		menus[2].querySelectorAll('li').forEach((el) => {
			el.addEventListener('click', function () {
				that.$('#lj')[0].click();
			});
		});

		//工具
		let gj_els = ["#jq", "#kt", "#hb", "#cz", "#xpc", "#ssq", "#yqt", "#wbgj", "#htgj"];
		menus[3].querySelectorAll('li').forEach((el, index) => {
			el.addEventListener('click', function () {
				that.$(gj_els[index])[0].click();
			});
		});


		// 右侧切换显示
		let toggle_flag = 0;
		that.$("#toggle")[0].addEventListener('click', function () {
			that.toggleShow(that.$(".toggle-show")[0], "flex");
			that.toggleShow(that.$(".toggle-show")[1], "block");
			toggle_flag ^= 1;
			icons = that.$("#toggle>span");
			icons[toggle_flag].style.display = "none";
			icons[toggle_flag ^ 1].style.display = "inline";

		});


		/* 页面中间控件事件绑定 */

		// 功能面板切换显示
		that.$('#main-panel span.close')[0].addEventListener('click', function () {
			that.toggleShow(that.$("#main-panel")[0], "flex");
			Array.prototype.some.call(that.$('#main-nav>ul>li'), (el) => {
				if (el.classList.contains('active')) {
					el.classList.remove('active');
					return true;
				}
			});
		});
		that.$('#main-nav>ul>li').forEach((el, index, arrays) => {
			el.addEventListener('click', function () {
				scale_range.value = 1;// 工作区恢复正常比例 
				scale_range_event();
				that.$("#main-panel")[0].style.display = "flex";
				that.$("#main-panel-title")[0].innerText = el.title;
				Array.prototype.some.call(arrays, (el) => {
					if (el.classList.contains('active')) {
						el.classList.remove('active');
						return true;
					}
				});
				el.classList.add('active');
			});
		});
		that.$('#main-panel-oper>button').forEach((el) => {
			el.addEventListener('click', function () {
				that.$('#main-panel span.close')[0].click();
			});
		});



		//历史记录选择
		let history_oper = that.$(".history-oper");
		history_oper[0].addEventListener('click', function () {
			let history_content = that.$('#history-content>ul>li');
			Array.prototype.some.call(history_content, (el, index, arrays) => {
				if (index !== 0 && el.classList.contains('active')) {
					el.classList.remove('active');
					arrays[index - 1].classList.add('active');
					arrays[index - 1].scrollIntoViewIfNeeded();
					arrays[index - 1].click();
					return true;
				};
			});
		});
		history_oper[1].addEventListener('click', function () {
			let history_content = that.$('#history-content>ul>li');
			Array.prototype.some.call(history_content, (el, index, arrays) => {
				if (index !== history_content.length - 1 && el.classList.contains('active')) {
					el.classList.remove('active');
					arrays[index + 1].classList.add('active');
					arrays[index + 1].scrollIntoViewIfNeeded();
					arrays[index + 1].click();
					return true;
				};
			});
		});

		// 图层选择

		let layer_oper = that.$('#layer-footer .layer-oper');
		layer_oper[0].addEventListener('click', function () {
			layer_content = that.$('#layer-content>ul>li');
			layer = that.$('#contains>div');
			let layer_num = layer.length - 1;
			Array.prototype.some.call(layer_content, (el, index, arrays) => {
				if (el.classList.contains('active')) {
					if (index == 0) {
						return true;
					}
					el.parentElement.insertBefore(el, arrays[index - 1]);
					el.scrollIntoViewIfNeeded();
					let i = layer_num - index;
					if (i === layer_content.length - 2) {
						layer[i].parentElement.appendChild(layer[i]);
					} else {
						layer[i].parentElement.insertBefore(layer[i], layer[i + 2]);
					}
					return true;
				};
			});
		});
		layer_oper[1].addEventListener('click', function() {
			menus[0].querySelectorAll('li')[0].click();
		});
		layer_oper[2].addEventListener('click', function () {
			layer_content = that.$('#layer-content>ul>li');
			layer = that.$('#contains>div');
			let layer_num = layer.length - 1;
			Array.prototype.some.call(layer_content, (el, index, arrays) => {
				if (el.classList.contains('active')) {
					if (index === layer_content.length - 1) {
						return true;
					}
					if (index === layer_content.length - 2) {
						el.parentElement.appendChild(el);
					} else {
						el.parentElement.insertBefore(el, arrays[index + 2]);
					}
					el.scrollIntoViewIfNeeded();
					let i = layer_num - index;
					layer[i].parentElement.insertBefore(layer[i], layer[i - 1]);
					return true;
				};
			});
		});



		/* 页面底部控件事件绑定 */

		// 工作区缩放相关控件事件绑定 
		let scale_range = that.$('#scale input[type=range]')[0];
		let scale_text = that.$('#scale input[type=text]')[0];
		function scale_range_event() {
			if (that.workSpaceScale(scale_range.value)) {
				scale_text.value = `${Number.parseInt(scale_range.value * 100)}%`;
			}
		}
		scale_range.addEventListener('input', scale_range_event);
		scale_text.addEventListener('input', function () {
			let value = Number.parseFloat(this.value) / 100;
			if (that.workSpaceScale(value)) {
				scale_range.value = value;
			}
		});
		that.$('#scale span.iconfont')[0].addEventListener('click', function () {
			let value = Number.parseFloat(scale_range.value, 10) - 0.1;
			scale_range.value = value;
			scale_range_event();
		});
		that.$('#scale span.iconfont')[1].addEventListener('click', function () {
			let value = Number.parseFloat(scale_range.value, 10) + 0.1;
			scale_range.value = value;
			scale_range_event();
		});

		/* 模态框 */

		let warning = that.$('#warning')[0];
		that.$('.model .close').forEach((el) => {
			el.addEventListener('click', function () {
				this.parentElement.parentElement.parentElement.close();
			});
		});

		that.$('.model-footer>button').forEach((el) => {
			el.addEventListener('click', function () {
				this.parentElement.parentElement.parentElement.close();
			});
		});

		that.$('#contains')[0].addEventListener('mousemove', function (e) {
			e = e || window.event;
			let info = this.getBoundingClientRect();
			let x = e.clientX - info.x;
			let y = e.clientY - info.y;
			that.$('#pos-info>span')[0].innerText = x;
			that.$('#pos-info>span')[1].innerText = y;
		});
		that.$('#contains')[0].addEventListener('mouseout', function (e) {
			that.$('#pos-info>span')[0].innerText = 0;
			that.$('#pos-info>span')[1].innerText = 0;
		});

		// 下载模态框
		that.$("#img_type>input[type=button]").forEach((el, index, arrays) => {
			let noun_suffix = that.$("#noun_suffix")[0];
			el.addEventListener("click", function () {
				Array.prototype.some.call(arrays, (el) => {
					if (el.classList.contains("active")) {
						el.classList.remove("active");
						return true;
					}
				});
				el.classList.add("active");
				noun_suffix.innerText = '.' + el.value;
				if (index === 0) {
					that.$("#quality")[0].style.visibility = "hidden";
				} else {
					that.$("#quality")[0].style.visibility = "visible";
				}
			});
		});
		let quality_text = that.$("#quality_text")[0];
		that.$("input[name=quality_range]")[0].addEventListener("input", function () {
			quality_text.innerText = Number.parseFloat(this.value, 10).toFixed(1) * 100 + "%";
		});



	},

	/* 切换显示 */
	toggleShow: function (el, mode) {
		if (el.style.display === "none") {
			el.style.display = mode;
		} else {
			el.style.display = "none";
		}
	},

	/* 工作区缩放 */
	workSpaceScale: function (value) {
		value = Number.parseFloat(value, 10);
		if (Number.isNaN(value)) {
			return false;
		}
		let contains = this.$("#contains")[0];
		let main = this.$("#main-content")[0];
		if (value <= 1) {
			contains.style.transformOrigin = "50% 50% 0";
		} else {
			contains.style.transformOrigin = "0 0 0";
		}
		contains.style.transform = `scale(${value})`;
		main.scrollTo(100000, 100000);
		let height = main.scrollTop / 2;
		let width = main.scrollLeft / 2;
		main.scrollTo(width, height);
		return true;
	},




};