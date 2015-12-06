(function() {
	var template,
		fetching = false,
		page = 10,
		loaded = {},
		loadedBirds = {},
		slideCache = [],
		slideMap = {},
		lastScrollY = window.pageYOffset,
		scrollY = window.pageYOffset,
		innerHeight,
		topViewPort,
		bottomViewPort,
		visCache = {};
	var direction = 0;
	var startPos = 0;
	var lastPos = 0;
	var onend = true;
	var fruititemhtml = $('#fruitcaritem').html().replace(/\\/g, '');
	var fruittemplate = Handlebars.compile(fruititemhtml);
	var wrapper = document.getElementById('fruitcat_content_wrapper');
	var loading = document.getElementById('loading');
	var TRANSITION     = 'transition',
		TRANSFORM      = 'transform',
		TRANSITION_END = 'transitionend',
		TRANSFORM_CSS  = 'transform',
		TRANSITION_CSS = 'transition';
	if(typeof document.body.style.webkitTransform !== undefined) {
		TRANSITION = 'webkitTransition';
		TRANSFORM = 'webkitTransform';
		TRANSITION_END = 'webkitTransitionEnd';
		TRANSFORM_CSS = '-webkit-transform';
		TRANSITION_CSS = '-webkit-transition'
	}
	var already = true;
	function addTransitions(node, callback) {
		node.style[TRANSITION] = TRANSFORM_CSS+' .25s ease-in-out';
		node.addEventListener(TRANSITION_END, function(e) {
			window.setTimeout(function() {
				e.target.style[TRANSITION] = 'none';
				if (callback) {
					callback();
				}
			});
		})
	}
	
	function handleTouchEvents(e) {
		if (e.type == 'touchstart') {
			$('#loadingword').val('放松加载');
			startPos = e.touches[0].clientY;
			lastPos = startPos;
			direction = 0;
		} else if (e.type == 'touchmove') {
			e.preventDefault();
			if (lastPos > startPos) {
				direction = -1;
			} else {
				direction = 1;

			}
			if (direction < 0) {
				var duration = e.touches[0].clientY - startPos;
			} else if (direction > 0) {
				var duration = e.touches[0].clientY - startPos;
				wrapper.style[TRANSFORM] = "translate3d(0," + duration + "px,0)";
			}
			lastPos = e.touches[0].clientY;
		} else if (e.type == 'touchend') {
			if (lastPos - startPos > 150) {

			} else if (lastPos - startPos < -150) {
				addTransitions(wrapper, function() {
					loading.style.display = 'none';
					
				});
				wrapper.style[TRANSFORM] = "translate3d(0,0,0)";
			} else {
				wrapper.style[TRANSFORM] = "translate3d(0,0,0)";
			}
		}
	}
	function attactTouchEvents() {
		var bd = document.querySelector('html');
		bd.addEventListener('touchmove', handleTouchEvents);
		bd.addEventListener('touchstart', handleTouchEvents);
		bd.addEventListener('touchend', handleTouchEvents);
	}

	function detactToucnEvents() {
		var bd = document.querySelector('html');
		bd.removeEventListener('touchmove', handleTouchEvents);
		bd.removeEventListener('touchstart', handleTouchEvents);
		bd.removeEventListener('touchend', handleTouchEvents);
	}

	function updateSlideCache(node) {
		var list = node.querySelectorAll('.fruitcat_content_detail');
		var len = list.length;
		slideCache = [];
		var obj;
		for (var i = 0; i < len; i++) {
			obj = {
				node: list[i],
				id: list[i].getAttribute('data-id')
			}
			slideCache.push(obj);
		};
	}

	function parseDom(arg) {
		var objE = document.createElement("div");
		objE.innerHTML = arg;
		return objE.childNodes;
	};

	function Trim(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	
	function fetchFruitCar() {
		if (fetching) {
			return;
		} else {
			fetching = true;
		}
		var senddata = {
			fruitname: "",
			pagestart: page,
			pagecount: 10,
			addr: '',
			starttime: '',
			endtime: ''
		};
		var sendparams = {
			data: senddata
		}
		window.fruitCarData.fetchFruitCarInfo('ptygo', sendparams, function(data) {
			var str = fruittemplate(data);
			handleScroll(null, true);
			var finnallist = document.querySelectorAll('.fruitcat_content_detail');
			var lastresult = finnallist[finnallist.length - 1];
			lastresult.insertAdjacentHTML('afterend', str);
			//detactToucnEvents();
			//onend = false;
			//loading.style.display = 'none';
			fetching = false;
			page = page + 10;
		});
	}
	function handleScroll(e, force) {
		if ((page) > global_totalpage) {
			return;
		}
		if (!force && lastScrollY == window.pageYOffset) {
			window.setTimeout(handleScroll, 100);
			return;
		} else {
			lastScrollY = window.pageYOffset;
		}
		scrollY = window.pageYOffset;
		innerHeight = window.innerHeight;
		if (scrollY + innerHeight >= document.body.scrollHeight) {
			//if(onend){
				//addTransitions(wrapper);//增加
				//attactTouchEvents();//
				fetchFruitCar();
			//}
		}
		window.setTimeout(handleScroll, 100);
	}
	window.setTimeout(handleScroll, 100);

}());