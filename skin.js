// Garden Gnome Software - Skin
// Pano2VR 8.0.1/22530
// Filename: colodete_skin_amaro2.ggsk
// Generated 2026-07-16T18:58:29Z

function pano2vrSkin(player,base) {
	player.addVariable('copiado', 2, false, { ignoreInState: 0  });
	var me=this;
	var skin=this;
	var flag=false;
	var skinKeyPressedKey = 0;
	var skinKeyPressedText = '';
	this.player=player;
	var pano=player;
	player.setApiVersion(7);
	this.rasterizeHTML = player.getRasterizeHTML();
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; });
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	var cssPrefix="";
	me.fontsLoaded=0;
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown={};
	this.elementMouseOver={};
	var i,hs,el,els,elo,ela,geometry,material;
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	for(var i=0;i<prefixes.length;i++) {
		if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
			cssPrefix='-' + prefixes[i].toLowerCase() + '-';
		}
	}
	
	var parameterToTransform=function(p) {
		return p.def + 'translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
	}
	this._=function(text, params) {
		return player._(text, params);
	}
	
	player.setMargins({'left': {'value': 0, 'unit': 'px'}, 'top': {'value': 0, 'unit': 'px'}, 'right': {'value': 0, 'unit': 'px'}, 'bottom': {'value': 0, 'unit': 'px'}});
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		if (player.is3dModel()) {
			let hg = player.get3dHotspotGroup();
			if (hg) {
				let startObject = null;
				if (startElement !== undefined && startElement != me.divSkin) {
					if (startElement.ggId) {
						hg.traverse(function(el) {
							if (el.userData && el.userData.ggId === startElement.ggId) {
								startObject = el;
							}
						});
					}
				} else {
					startObject = hg;
				}
				if (startObject) {
					startObject.traverse(function(el) {
						if (el.userData && el.userData.ggUpdatePosition) {
							el.userData.ggUpdatePosition();
						}
					});
				}
			}
		}
	}
	player.addListener('sizechanged', function () { me.updateSize(me.divSkin);});
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.languageChanged=function() {
		var stack=[];
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdateText) {
				e.ggUpdateText();
			}
			if (e.ggUpdateAria) {
				e.ggUpdateAria();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('languagechanged', this.languageChanged);
	
	this.getClassStyles = function(className) {
		className = '.' + className;
		for (let sheet of document.styleSheets) {
			try {
				for (let rule of sheet.cssRules || sheet.rules) {
					if (rule.selectorText === className) {
						return rule.style;
					}
				}
			} catch (e) {
				console.warn("Cannot access stylesheet: ", e);
			}
		}
		return null;
	};
	this.paintTextDivToCanvas = function(el, stylesString, textureHeightFromEl, autoSize, scrollbar, measureOnly) {
		if (measureOnly === undefined) measureOnly = false;
		const skinStyles = skin.getClassStyles('ggskin');
		const skinTextStyles = skin.getClassStyles('ggskin_text');
		const skinStylesString = skinStyles ? skinStyles.cssText : '';
		const skinTextStylesString = skinTextStyles ? skinTextStyles.cssText : '';
		let elementStylesString = '';
		if (Array.isArray(el.userData.cssClasses)) {
			el.userData.cssClasses.forEach(function(className) {
				const classStyles = skin.getClassStyles(className);
				if (classStyles) {
					elementStylesString += classStyles.cssText;
				}
			});
		}
		const outerDiv = document.createElement('div');
		const textDiv = document.createElement('div');
		textDiv.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
		textDiv.style = skinStylesString + skinTextStylesString + elementStylesString + stylesString;
		textDiv.innerHTML = el.userData.ggText;
		textDiv.style.position = 'absolute';
		textDiv.style.left = '0px';
		textDiv.style.top = '0px';
		outerDiv.appendChild(textDiv);
		document.body.appendChild(outerDiv);
		el.userData.boxWidthCanv = textDiv.clientWidth;
		el.userData.totalHeightCanv = textDiv.clientHeight;
		elStyle = window.getComputedStyle(textDiv);
		const lineHeight = elStyle.lineHeight;
		if (lineHeight !== 'normal') {
			el.userData.lineHeight = parseFloat(lineHeight);
		} else {
			el.userData.lineHeight = parseFloat(elStyle.fontSize) * 1.2;
		}
		if (measureOnly) {
			document.body.removeChild(outerDiv);
			return;
		}
		var canv = el.userData.tmpCanvas;
		var ctx = el.userData.tmpCanvasContext;
		canv.width = textDiv.clientWidth * 2;
		canv.height = textDiv.clientHeight * 2;
		ctx.clearRect(0, 0, canv.width, canv.height);
		if (autoSize) {
			el.userData.boxHeightCanv = el.userData.totalHeightCanv;
		} else {
			el.userData.boxHeightCanv = el.userData.height;
		}
		if (scrollbar && textDiv.clientHeight > el.userData.height) {
			el.userData.textCanvas.width = el.userData.width * 2;
		} else {
			el.userData.textCanvas.width = el.userData.boxWidthCanv * 2;
		}
		el.userData.textCanvas.height = el.userData.boxHeightCanv * 2;
		this.rasterizeHTML.drawHTML(outerDiv.innerHTML, canv, {zoom: 2, baseUrl: player.getBasePath() }).then((renderResult) => {
			el.userData.ggTextureFromCanvas();
		}, (err) => {
			console.error('Error rendering HTML to canvas:', err);
		});
		document.body.removeChild(outerDiv);
	};
	this.rectMaxRadius = function(el) {
		return Math.min(el.userData.width / 2.0 + (el.userData.borderWidth.left + el.userData.borderWidth.right) / 2.0, el.userData.height / 2.0 + (el.userData.borderWidth.top + el.userData.borderWidth.bottom) / 2.0);
	}
	this.rectCalcBorderRadiiInnerShape = function(el) {
		let maxRad = skin.rectMaxRadius(el);
		let bwTopLeft = (el.userData.borderWidth.top + el.userData.borderWidth.left) / 2.0;
		let brTopLeft = Math.max(el.userData.borderRadius.topLeft - bwTopLeft, 0.0);
		brTopLeft = Math.min(brTopLeft, maxRad - bwTopLeft);
		let bwTopRight = (el.userData.borderWidth.top + el.userData.borderWidth.right) / 2.0;
		let brTopRight = Math.max(el.userData.borderRadius.topRight - bwTopRight, 0.0);
		brTopRight = Math.min(brTopRight, maxRad - bwTopRight);
		let bwBottomRight = (el.userData.borderWidth.bottom + el.userData.borderWidth.right) / 2.0;
		let brBottomRight = Math.max(el.userData.borderRadius.bottomRight - bwBottomRight, 0.0);
		brBottomRight = Math.min(brBottomRight, maxRad - bwBottomRight);
		let bwBottomLeft = (el.userData.borderWidth.bottom + el.userData.borderWidth.left) / 2.0;
		let brBottomLeft = Math.max(el.userData.borderRadius.bottomLeft - bwBottomLeft, 0.0);
		brBottomLeft = Math.min(brBottomLeft, maxRad - bwBottomLeft);
		el.userData.borderRadiusInnerShape = {
			topLeft: brTopLeft,
			topRight: brTopRight,
			bottomRight: brBottomRight,
			bottomLeft: brBottomLeft
		};
	}
	this.rectHasRoundedCorners = function(el) {
		return (el.userData.borderRadius.topLeft > 0 || el.userData.borderRadius.topRight > 0 || el.userData.borderRadius.bottomRight > 0 || el.userData.borderRadius.bottomLeft > 0);
	}
	this.disposeGeometryAndMaterial = function(el) {
		if (el.geometry) el.geometry.dispose();
		el.geometry = null;
		if (el.material) el.material.dispose();
	}
	this.removeChildren = function(el, filter) {
		if (filter === undefined) filter ='^.*$';
		const pattern = new RegExp(filter);
		for (let i = el.children.length - 1; i >= 0; i--) {
			let child = el.children[i];
			if (pattern.test(child.name)) {
				if (child.isMesh) {
					skin.disposeGeometryAndMaterial(child);
				}
				el.remove(child);
			}
		}
	};
	this.getDepthFrom = function(root, object) {
		let depth = 0;
		let current = object;
		while (current && current !== root) {
			if (current.userData && current.userData.hasOwnProperty('ggId')) depth++;
			current = current.parent;
		}
		return current === root ? depth : -1;
	};
	this.getElementVrPosition = function(el, x, y) {
		var vrPos = {};
		var renderableEl = el.parent && (el.parent.type == 'Mesh' || el.parent.type == 'Group');
		switch (el.userData.hanchor) {
			case 0:
			vrPos.x = (0) - ((renderableEl ? el.parent.userData.width : 800) / 200.0) + (x / 100.0) + (el.userData.width / 200.0);
			break;
			case 1:
			vrPos.x = (0) + (x / 100.0);
			break;
			case 2:
			vrPos.x = (0) + ((renderableEl ? el.parent.userData.width : 800) / 200.0) - (x / 100.0) - (el.userData.width / 200.0);
			break;
		}
		switch (el.userData.vanchor) {
			case 0:
			vrPos.y = (0) + ((renderableEl ? el.parent.userData.height : 600) / 200.0) - (y / 100.0) - (el.userData.height / 200.0);
			break;
			case 1:
			vrPos.y = (0) - (y / 100.0);
			break;
			case 2:
			vrPos.y = (0) - ((renderableEl ? el.parent.userData.height : 600) / 200.0) + (y / 100.0) + (el.userData.height / 200.0);
			break;
		}
		vrPos.x += el.userData.curScaleOffX;
		vrPos.y += el.userData.curScaleOffY;
		return vrPos;
	}
	this.addSkin=function() {
		var hs='';
		var el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
		this.ggCurrentTime=new Date().getTime();
		el=me._image_1=document.createElement('div');
		els=me._image_1__img=document.createElement('img');
		els.className='ggskin ggskin_image';
		hs=basePath + 'images/image_1.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		hs ='';
		hs += 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;';
		els.setAttribute('style', hs);
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		el.userData=el;
		hs ='';
		hs+='height : 81px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 282px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._image_1.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_1.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._image_1);
		el=me._container_1=document.createElement('div');
		el.ggId="Container 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		el.userData=el;
		hs ='';
		hs+='height : 1060px;';
		hs+='position : absolute;';
		hs+='right : 12px;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 278px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._container_1.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_1.ggUpdatePosition=function (useTransition) {
		}
		el=me._scrollarea_menu=document.createElement('div');
		els=me._scrollarea_menu__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		el.ggContentWidth = 0;
		el.ggContentHeight = 0;
		el.ggDragInertiaX = 0;
		el.ggDragInertiaY = 0;
		el.ggVPercentVisible = 1.0;
		el.ggHPercentVisible = 1.0;
		el.ggInInteraction = false;
		el.ggIsDragging = false;
		hs ='';
		hs+='height : 569px;';
		hs+='left : 0px;';
		hs+='overflow-x : visible;';
		hs+='overflow-y : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 262px;';
		hs+="";
		els.setAttribute('style',hs);
		me._scrollarea_menu.ggScrollByX = function(diffX) {
			if(!me._scrollarea_menu.ggHorScrollVisible || diffX == 0 || me._scrollarea_menu.ggHPercentVisible >= 1.0) return;
			me._scrollarea_menu.ggScrollPosX = (me._scrollarea_menu__horScrollFg.offsetLeft + diffX);
			me._scrollarea_menu.ggScrollPosX = Math.max(me._scrollarea_menu.ggScrollPosX, 0);
			me._scrollarea_menu.ggScrollPosX = Math.min(me._scrollarea_menu.ggScrollPosX, me._scrollarea_menu__horScrollBg.offsetWidth - me._scrollarea_menu__horScrollFg.offsetWidth);
			me._scrollarea_menu__horScrollFg.style.left = me._scrollarea_menu.ggScrollPosX + 'px';
			let percentScrolled = me._scrollarea_menu.ggScrollPosX / (me._scrollarea_menu__horScrollBg.offsetWidth - me._scrollarea_menu__horScrollFg.offsetWidth);
			me._scrollarea_menu__content.style.left = -(Math.round((me._scrollarea_menu.ggContentWidth * (1.0 - me._scrollarea_menu.ggHPercentVisible)) * percentScrolled)) + me._scrollarea_menu.ggContentLeftOffset + 'px';
			me._scrollarea_menu.ggScrollPosXPercent = (me._scrollarea_menu__horScrollFg.offsetLeft / me._scrollarea_menu__horScrollBg.offsetWidth);
		}
		me._scrollarea_menu.ggScrollByXSmooth = function(diffX) {
			if(!me._scrollarea_menu.ggHorScrollVisible || diffX == 0 || me._scrollarea_menu.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._scrollarea_menu.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._scrollarea_menu.ggScrollPosX >= me._scrollarea_menu__horScrollBg.offsetWidth - me._scrollarea_menu__horScrollFg.offsetWidth)) {
					me._scrollarea_menu.ggScrollPosX = Math.min(me._scrollarea_menu.ggScrollPosX, me._scrollarea_menu__horScrollBg.offsetWidth - me._scrollarea_menu__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._scrollarea_menu.ggScrollPosX <= 0)) {
					me._scrollarea_menu.ggScrollPosX = Math.max(me._scrollarea_menu.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._scrollarea_menu__horScrollFg.style.left = me._scrollarea_menu.ggScrollPosX + 'px';
			let percentScrolled = me._scrollarea_menu.ggScrollPosX / (me._scrollarea_menu__horScrollBg.offsetWidth - me._scrollarea_menu__horScrollFg.offsetWidth);
			me._scrollarea_menu__content.style.left = -(Math.round((me._scrollarea_menu.ggContentWidth * (1.0 - me._scrollarea_menu.ggHPercentVisible)) * percentScrolled)) + me._scrollarea_menu.ggContentLeftOffset + 'px';
			me._scrollarea_menu.ggScrollPosXPercent = (me._scrollarea_menu__horScrollFg.offsetLeft / me._scrollarea_menu__horScrollBg.offsetWidth);
			}, 10);
		}
		me._scrollarea_menu.ggScrollByY = function(diffY) {
			if(!me._scrollarea_menu.ggVertScrollVisible || diffY == 0 || me._scrollarea_menu.ggVPercentVisible >= 1.0) return;
			me._scrollarea_menu.ggScrollPosY = (me._scrollarea_menu__vertScrollFg.offsetTop + diffY);
			me._scrollarea_menu.ggScrollPosY = Math.max(me._scrollarea_menu.ggScrollPosY, 0);
			me._scrollarea_menu.ggScrollPosY = Math.min(me._scrollarea_menu.ggScrollPosY, me._scrollarea_menu__vertScrollBg.offsetHeight - me._scrollarea_menu__vertScrollFg.offsetHeight);
			me._scrollarea_menu__vertScrollFg.style.top = me._scrollarea_menu.ggScrollPosY + 'px';
			let percentScrolled = me._scrollarea_menu.ggScrollPosY / (me._scrollarea_menu__vertScrollBg.offsetHeight - me._scrollarea_menu__vertScrollFg.offsetHeight);
			me._scrollarea_menu__content.style.top = -(Math.round((me._scrollarea_menu.ggContentHeight * (1.0 - me._scrollarea_menu.ggVPercentVisible)) * percentScrolled)) + me._scrollarea_menu.ggContentTopOffset + 'px';
			me._scrollarea_menu.ggScrollPosYPercent = (me._scrollarea_menu__vertScrollFg.offsetTop / me._scrollarea_menu__vertScrollBg.offsetHeight);
		}
		me._scrollarea_menu.ggScrollByYSmooth = function(diffY) {
			if(!me._scrollarea_menu.ggVertScrollVisible || diffY == 0 || me._scrollarea_menu.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._scrollarea_menu.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._scrollarea_menu.ggScrollPosY >= me._scrollarea_menu__vertScrollBg.offsetHeight - me._scrollarea_menu__vertScrollFg.offsetHeight)) {
					me._scrollarea_menu.ggScrollPosY = Math.min(me._scrollarea_menu.ggScrollPosY, me._scrollarea_menu__vertScrollBg.offsetHeight - me._scrollarea_menu__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._scrollarea_menu.ggScrollPosY <= 0)) {
					me._scrollarea_menu.ggScrollPosY = Math.max(me._scrollarea_menu.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._scrollarea_menu__vertScrollFg.style.top = me._scrollarea_menu.ggScrollPosY + 'px';
			let percentScrolled = me._scrollarea_menu.ggScrollPosY / (me._scrollarea_menu__vertScrollBg.offsetHeight - me._scrollarea_menu__vertScrollFg.offsetHeight);
			me._scrollarea_menu__content.style.top = -(Math.round((me._scrollarea_menu.ggContentHeight * (1.0 - me._scrollarea_menu.ggVPercentVisible)) * percentScrolled)) + me._scrollarea_menu.ggContentTopOffset + 'px';
			me._scrollarea_menu.ggScrollPosYPercent = (me._scrollarea_menu__vertScrollFg.offsetTop / me._scrollarea_menu__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._scrollarea_menu.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._scrollarea_menu.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._scrollarea_menu.ggHPercentVisible);
					me._scrollarea_menu.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._scrollarea_menu.clientWidth - (me._scrollarea_menu.ggVertScrollVisible ? 6 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._scrollarea_menu.clientWidth - (me._scrollarea_menu.ggVertScrollVisible ? 6 : 0))) * me._scrollarea_menu.ggHPercentVisible);
					me._scrollarea_menu.ggScrollByXSmooth(diffX);
				}
			}
			if (me._scrollarea_menu.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._scrollarea_menu.ggVPercentVisible);
					me._scrollarea_menu.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._scrollarea_menu.clientHeight - (me._scrollarea_menu.ggHorScrollVisible ? 6 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._scrollarea_menu.clientHeight - (me._scrollarea_menu.ggHorScrollVisible ? 6 : 0))) * me._scrollarea_menu.ggVPercentVisible);
					me._scrollarea_menu.ggScrollByYSmooth(diffY);
				}
			}
		}
		me._scrollarea_menu__content.mousetouchend = e => {
			let inertiaInterval = setInterval(function() {
				me._scrollarea_menu.ggDragInertiaX *= 0.96;
				me._scrollarea_menu.ggDragInertiaY *= 0.96;
				me._scrollarea_menu.ggScrollByX(me._scrollarea_menu.ggDragInertiaX);
				me._scrollarea_menu.ggScrollByY(me._scrollarea_menu.ggDragInertiaY);
				if (Math.abs(me._scrollarea_menu.ggDragInertiaX) < 1.0 && Math.abs(me._scrollarea_menu.ggDragInertiaY) < 1.0) {
					clearInterval(inertiaInterval);
				}
				}, 10);
			me._scrollarea_menu.ggInInteraction = false;
			setTimeout(function() { me._scrollarea_menu.ggIsDragging = false; }, 100);
		}
		me._scrollarea_menu__content.mousetouchmove = e => {
			if (!me._scrollarea_menu.ggInInteraction) return;
			e = e || window.event;
			if (e.buttons==0) {
				me._scrollarea_menu__content.mousetouchend();
				return;
			}
			e.preventDefault();
			var t = e.touches;
			var eventX = t ? t[0].clientX : e.clientX;
			var eventY = t ? t[0].clientY : e.clientY;
			if (Math.abs(eventX - me._scrollarea_menu.ggDragStartX) > 10 || Math.abs(eventY - me._scrollarea_menu.ggDragStartY) > 10) me._scrollarea_menu.ggIsDragging = true;
			var diffX = (eventX - me._scrollarea_menu.ggDragLastX) * me._scrollarea_menu.ggHPercentVisible;
			var diffY = (eventY - me._scrollarea_menu.ggDragLastY) * me._scrollarea_menu.ggVPercentVisible;
			me._scrollarea_menu.ggDragInertiaX = -diffX;
			me._scrollarea_menu.ggDragInertiaY = -diffY;
			me._scrollarea_menu.ggDragLastX = eventX;
			me._scrollarea_menu.ggDragLastY = eventY;
			me._scrollarea_menu.ggScrollByX(-diffX);
			me._scrollarea_menu.ggScrollByY(-diffY);
		}
		me._scrollarea_menu__content.mousetouchstart = e => {
			e = e || window.event;
			var t = e.touches;
			me._scrollarea_menu.ggDragLastX = me._scrollarea_menu.ggDragStartX = t ? t[0].clientX : e.clientX;
			me._scrollarea_menu.ggDragLastY = me._scrollarea_menu.ggDragStartY = t ? t[0].clientY : e.clientY;
			me._scrollarea_menu.ggInInteraction = true;
		}
		els.onmousedown = me._scrollarea_menu__content.mousetouchstart;
		els.ontouchstart = me._scrollarea_menu__content.mousetouchstart;
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = me._scrollarea_menu__content.mousetouchstart;
		}
		document.addEventListener('mouseup', me._scrollarea_menu.contentMouseupListener = function() { me._scrollarea_menu__content.mousetouchend(); });
		document.addEventListener('touchend', me._scrollarea_menu.contentTouchendListener = function() { me._scrollarea_menu__content.mousetouchend(); });
		document.addEventListener('mousemove', me._scrollarea_menu.contentMousemoveListener = function() { me._scrollarea_menu__content.mousetouchmove(); });
		document.addEventListener('touchmove', me._scrollarea_menu.contentTouchmoveListener = function() { me._scrollarea_menu__content.mousetouchmove(); });
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			document.addEventListener('pointerup', me._scrollarea_menu.pointerupListener = function() { me._scrollarea_menu__content.mousetouchend(); });
			document.addEventListener('pointermove', me._scrollarea_menu.pointermoveListener = function() { me._scrollarea_menu__content.mousetouchmove(); });
		}
		elVertScrollBg = me._scrollarea_menu__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 6px; height: 640px; background-color: rgba(128,128,128,1); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._scrollarea_menu__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 6px; height: 640px; background-color: rgba(192,192,192,1); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._scrollarea_menu.ggScrollPosY = 0;
		me._scrollarea_menu.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._scrollarea_menu.ggDragLastY = e.clientY;
			document.addEventListener('mouseup', me._scrollarea_menu.vertMouseupListener = function() {
				let inertiaInterval = setInterval(function() {
					me._scrollarea_menu.ggDragInertiaY *= 0.96;
					me._scrollarea_menu.ggScrollByY(me._scrollarea_menu.ggDragInertiaY);
					if (Math.abs(me._scrollarea_menu.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 10);
				document.removeEventListener('mouseup', me._scrollarea_menu.vertMouseupListener);
				document.removeEventListener('mousemove', me._scrollarea_menu.vertMousemoveListener);
			});
			document.addEventListener('mousemove', me._scrollarea_menu.vertMousemoveListener = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._scrollarea_menu.ggDragLastY;
				me._scrollarea_menu.ggDragInertiaY = diffY;
				me._scrollarea_menu.ggDragLastY = e.clientY;
				me._scrollarea_menu.ggScrollByY(diffY);
			});
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._scrollarea_menu.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._scrollarea_menu.vertTouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._scrollarea_menu.ggDragInertiaY *= 0.96;
					me._scrollarea_menu.ggScrollByY(me._scrollarea_menu.ggDragInertiaY);
					if (Math.abs(me._scrollarea_menu.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 10);
				document.removeEventListener('touchend', me._scrollarea_menu.vertTouchendListener);
				document.removeEventListener('touchmove', me._scrollarea_menu.vertTouchmoveListener);
				document.removeEventListener('pointerup', me._scrollarea_menu.vertPointerupListener);
				document.removeEventListener('pointermove', me._scrollarea_menu.vertPointermoveListener);
			}
			document.addEventListener('touchend', me._scrollarea_menu.vertTouchendListener = function() { me._scrollarea_menu.vertTouchend(); });
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.addEventListener('pointerup', me._scrollarea_menu.vertPointerupListener = function() { me._scrollarea_menu.vertTouchend(); });
			}
			me._scrollarea_menu.vertTouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffY = (t ? t[0].clientY : e.clientY) - me._scrollarea_menu.ggDragLastY;
				me._scrollarea_menu.ggDragInertiaY = diffY;
				me._scrollarea_menu.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._scrollarea_menu.ggScrollByY(diffY);
			}
			document.addEventListener('touchmove', me._scrollarea_menu.vertTouchmoveListener = function(e) { me._scrollarea_menu.vertTouchmove(e); });
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.addEventListener('pointermove', me._scrollarea_menu.vertPointermoveListener = function(e) { me._scrollarea_menu.vertTouchmove(e); });
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elVertScrollFg.onpointerdown = elVertScrollFg.ontouchstart;
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._scrollarea_menu.ggScrollHeight;
			if (e.offsetY < me._scrollarea_menu.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._scrollarea_menu.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._scrollarea_menu__vertScrollBg.getBoundingClientRect();
			var diffY = me._scrollarea_menu.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._scrollarea_menu.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._scrollarea_menu.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._scrollarea_menu.ggScrollByYSmooth(30 * me._scrollarea_menu.ggVPercentVisible * wheelDelta);
		});
		elCornerBg = me._scrollarea_menu__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 6px; height: 6px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="Scrollarea_menu";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		el.userData=el;
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='height : 640px;';
		hs+='left : 28px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 1px;';
		hs+='visibility : inherit;';
		hs+='width : 287px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._scrollarea_menu.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._scrollarea_menu.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none' && (e.offsetWidth != 0 || e.offsetHeight != 0)) {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none' && e.style['overflow']!='hidden') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				var contentWidth = maxX - minX;
				this.ggContent.style.width = contentWidth + 'px';
				var contentHeight = maxY - minY;
				this.ggContent.style.height = contentHeight + 'px';
			var scaleX = this.getBoundingClientRect().width / this.offsetWidth;
				this.ggContentWidth = contentWidth / scaleX;
			var scaleY = this.getBoundingClientRect().height / this.offsetHeight;
				this.ggContentHeight = contentHeight / scaleY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.marginLeft = '0px';
				this.ggContent.style.top = -(Math.round(me._scrollarea_menu.ggScrollPosY / me._scrollarea_menu.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if ((me._scrollarea_menu.ggHorScrollVisible && contentHeight > this.clientHeight - 6) || (!me._scrollarea_menu.ggHorScrollVisible && contentHeight > this.clientHeight)) {
					me._scrollarea_menu__vertScrollBg.style.visibility = 'inherit';
					me._scrollarea_menu__vertScrollFg.style.visibility = 'inherit';
					me._scrollarea_menu.ggVertScrollVisible = true;
				} else {
					me._scrollarea_menu__vertScrollBg.style.visibility = 'hidden';
					me._scrollarea_menu__vertScrollFg.style.visibility = 'hidden';
					me._scrollarea_menu.ggVertScrollVisible = false;
				}
				if(me._scrollarea_menu.ggVertScrollVisible) {
					me._scrollarea_menu.ggAvailableWidth = me._scrollarea_menu.clientWidth - 6;
					if (me._scrollarea_menu.ggHorScrollVisible) {
						me._scrollarea_menu.ggAvailableHeight = me._scrollarea_menu.clientHeight - 6;
						me._scrollarea_menu.ggAvailableHeightWithScale = me._scrollarea_menu.getBoundingClientRect().height - me._scrollarea_menu__vertScrollBg.getBoundingClientRect().width;
						me._scrollarea_menu__cornerBg.style.visibility = 'inherit';
					} else {
						me._scrollarea_menu.ggAvailableHeight = me._scrollarea_menu.clientHeight;
						me._scrollarea_menu.ggAvailableHeightWithScale = me._scrollarea_menu.getBoundingClientRect().height;
						me._scrollarea_menu__cornerBg.style.visibility = 'hidden';
					}
					me._scrollarea_menu__vertScrollBg.style.height = me._scrollarea_menu.ggAvailableHeight + 'px';
					me._scrollarea_menu.ggVPercentVisible = contentHeight != 0 ? me._scrollarea_menu.ggAvailableHeightWithScale / contentHeight : 0.0;
					if (me._scrollarea_menu.ggVPercentVisible > 1.0) me._scrollarea_menu.ggVPercentVisible = 1.0;
					me._scrollarea_menu.ggScrollHeight =  Math.round(me._scrollarea_menu__vertScrollBg.offsetHeight * me._scrollarea_menu.ggVPercentVisible);
					me._scrollarea_menu__vertScrollFg.style.height = me._scrollarea_menu.ggScrollHeight + 'px';
					me._scrollarea_menu.ggScrollPosY = me._scrollarea_menu.ggScrollPosYPercent * me._scrollarea_menu.ggAvailableHeight;
					me._scrollarea_menu.ggScrollPosY = Math.min(me._scrollarea_menu.ggScrollPosY, me._scrollarea_menu__vertScrollBg.offsetHeight - me._scrollarea_menu__vertScrollFg.offsetHeight);
					me._scrollarea_menu__vertScrollFg.style.top = me._scrollarea_menu.ggScrollPosY + 'px';
					if (me._scrollarea_menu.ggVPercentVisible < 1.0) {
						let percentScrolled = me._scrollarea_menu.ggScrollPosY / (me._scrollarea_menu__vertScrollBg.offsetHeight - me._scrollarea_menu__vertScrollFg.offsetHeight);
						me._scrollarea_menu__content.style.top = -(Math.round((me._scrollarea_menu.ggContentHeight * (1.0 - me._scrollarea_menu.ggVPercentVisible)) * percentScrolled)) + me._scrollarea_menu.ggContentTopOffset + 'px';
					}
				} else {
					me._scrollarea_menu.ggAvailableWidth = me._scrollarea_menu.clientWidth;
					me._scrollarea_menu.ggScrollPosY = 0;
					me._scrollarea_menu.ggScrollPosYPercent = 0.0;
					me._scrollarea_menu__content.style.top = this.ggContentTopOffset + 'px';
					me._scrollarea_menu__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._scrollarea_menu.ggHorScrollVisible || vertScrollWasVisible != me._scrollarea_menu.ggVertScrollVisible) {
					skin.updateSize(me._scrollarea_menu);
					me._scrollarea_menu.ggUpdatePosition();
				}
			}
		}
		el=me._scroll_amostra=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._scroll_amostra;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		els=me._scroll_amostra__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		el.ggContentWidth = 0;
		el.ggContentHeight = 0;
		el.ggDragInertiaX = 0;
		el.ggDragInertiaY = 0;
		el.ggVPercentVisible = 1.0;
		el.ggHPercentVisible = 1.0;
		el.ggInInteraction = false;
		el.ggIsDragging = false;
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='overflow-x : visible;';
		hs+='overflow-y : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 61px;';
		hs+="";
		els.setAttribute('style',hs);
		me._scroll_amostra.ggScrollByX = function(diffX) {
			if(!me._scroll_amostra.ggHorScrollVisible || diffX == 0 || me._scroll_amostra.ggHPercentVisible >= 1.0) return;
			me._scroll_amostra.ggScrollPosX = (me._scroll_amostra__horScrollFg.offsetLeft + diffX);
			me._scroll_amostra.ggScrollPosX = Math.max(me._scroll_amostra.ggScrollPosX, 0);
			me._scroll_amostra.ggScrollPosX = Math.min(me._scroll_amostra.ggScrollPosX, me._scroll_amostra__horScrollBg.offsetWidth - me._scroll_amostra__horScrollFg.offsetWidth);
			me._scroll_amostra__horScrollFg.style.left = me._scroll_amostra.ggScrollPosX + 'px';
			let percentScrolled = me._scroll_amostra.ggScrollPosX / (me._scroll_amostra__horScrollBg.offsetWidth - me._scroll_amostra__horScrollFg.offsetWidth);
			me._scroll_amostra__content.style.left = -(Math.round((me._scroll_amostra.ggContentWidth * (1.0 - me._scroll_amostra.ggHPercentVisible)) * percentScrolled)) + me._scroll_amostra.ggContentLeftOffset + 'px';
			me._scroll_amostra.ggScrollPosXPercent = (me._scroll_amostra__horScrollFg.offsetLeft / me._scroll_amostra__horScrollBg.offsetWidth);
		}
		me._scroll_amostra.ggScrollByXSmooth = function(diffX) {
			if(!me._scroll_amostra.ggHorScrollVisible || diffX == 0 || me._scroll_amostra.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._scroll_amostra.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._scroll_amostra.ggScrollPosX >= me._scroll_amostra__horScrollBg.offsetWidth - me._scroll_amostra__horScrollFg.offsetWidth)) {
					me._scroll_amostra.ggScrollPosX = Math.min(me._scroll_amostra.ggScrollPosX, me._scroll_amostra__horScrollBg.offsetWidth - me._scroll_amostra__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._scroll_amostra.ggScrollPosX <= 0)) {
					me._scroll_amostra.ggScrollPosX = Math.max(me._scroll_amostra.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._scroll_amostra__horScrollFg.style.left = me._scroll_amostra.ggScrollPosX + 'px';
			let percentScrolled = me._scroll_amostra.ggScrollPosX / (me._scroll_amostra__horScrollBg.offsetWidth - me._scroll_amostra__horScrollFg.offsetWidth);
			me._scroll_amostra__content.style.left = -(Math.round((me._scroll_amostra.ggContentWidth * (1.0 - me._scroll_amostra.ggHPercentVisible)) * percentScrolled)) + me._scroll_amostra.ggContentLeftOffset + 'px';
			me._scroll_amostra.ggScrollPosXPercent = (me._scroll_amostra__horScrollFg.offsetLeft / me._scroll_amostra__horScrollBg.offsetWidth);
			}, 10);
		}
		me._scroll_amostra.ggScrollByY = function(diffY) {
			if(!me._scroll_amostra.ggVertScrollVisible || diffY == 0 || me._scroll_amostra.ggVPercentVisible >= 1.0) return;
			me._scroll_amostra.ggScrollPosY = (me._scroll_amostra__vertScrollFg.offsetTop + diffY);
			me._scroll_amostra.ggScrollPosY = Math.max(me._scroll_amostra.ggScrollPosY, 0);
			me._scroll_amostra.ggScrollPosY = Math.min(me._scroll_amostra.ggScrollPosY, me._scroll_amostra__vertScrollBg.offsetHeight - me._scroll_amostra__vertScrollFg.offsetHeight);
			me._scroll_amostra__vertScrollFg.style.top = me._scroll_amostra.ggScrollPosY + 'px';
			let percentScrolled = me._scroll_amostra.ggScrollPosY / (me._scroll_amostra__vertScrollBg.offsetHeight - me._scroll_amostra__vertScrollFg.offsetHeight);
			me._scroll_amostra__content.style.top = -(Math.round((me._scroll_amostra.ggContentHeight * (1.0 - me._scroll_amostra.ggVPercentVisible)) * percentScrolled)) + me._scroll_amostra.ggContentTopOffset + 'px';
			me._scroll_amostra.ggScrollPosYPercent = (me._scroll_amostra__vertScrollFg.offsetTop / me._scroll_amostra__vertScrollBg.offsetHeight);
		}
		me._scroll_amostra.ggScrollByYSmooth = function(diffY) {
			if(!me._scroll_amostra.ggVertScrollVisible || diffY == 0 || me._scroll_amostra.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._scroll_amostra.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._scroll_amostra.ggScrollPosY >= me._scroll_amostra__vertScrollBg.offsetHeight - me._scroll_amostra__vertScrollFg.offsetHeight)) {
					me._scroll_amostra.ggScrollPosY = Math.min(me._scroll_amostra.ggScrollPosY, me._scroll_amostra__vertScrollBg.offsetHeight - me._scroll_amostra__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._scroll_amostra.ggScrollPosY <= 0)) {
					me._scroll_amostra.ggScrollPosY = Math.max(me._scroll_amostra.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._scroll_amostra__vertScrollFg.style.top = me._scroll_amostra.ggScrollPosY + 'px';
			let percentScrolled = me._scroll_amostra.ggScrollPosY / (me._scroll_amostra__vertScrollBg.offsetHeight - me._scroll_amostra__vertScrollFg.offsetHeight);
			me._scroll_amostra__content.style.top = -(Math.round((me._scroll_amostra.ggContentHeight * (1.0 - me._scroll_amostra.ggVPercentVisible)) * percentScrolled)) + me._scroll_amostra.ggContentTopOffset + 'px';
			me._scroll_amostra.ggScrollPosYPercent = (me._scroll_amostra__vertScrollFg.offsetTop / me._scroll_amostra__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._scroll_amostra.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._scroll_amostra.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._scroll_amostra.ggHPercentVisible);
					me._scroll_amostra.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._scroll_amostra.clientWidth - (me._scroll_amostra.ggVertScrollVisible ? 6 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._scroll_amostra.clientWidth - (me._scroll_amostra.ggVertScrollVisible ? 6 : 0))) * me._scroll_amostra.ggHPercentVisible);
					me._scroll_amostra.ggScrollByXSmooth(diffX);
				}
			}
			if (me._scroll_amostra.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._scroll_amostra.ggVPercentVisible);
					me._scroll_amostra.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._scroll_amostra.clientHeight - (me._scroll_amostra.ggHorScrollVisible ? 6 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._scroll_amostra.clientHeight - (me._scroll_amostra.ggHorScrollVisible ? 6 : 0))) * me._scroll_amostra.ggVPercentVisible);
					me._scroll_amostra.ggScrollByYSmooth(diffY);
				}
			}
		}
		me._scroll_amostra__content.mousetouchend = e => {
			let inertiaInterval = setInterval(function() {
				me._scroll_amostra.ggDragInertiaX *= 0.96;
				me._scroll_amostra.ggDragInertiaY *= 0.96;
				me._scroll_amostra.ggScrollByX(me._scroll_amostra.ggDragInertiaX);
				me._scroll_amostra.ggScrollByY(me._scroll_amostra.ggDragInertiaY);
				if (Math.abs(me._scroll_amostra.ggDragInertiaX) < 1.0 && Math.abs(me._scroll_amostra.ggDragInertiaY) < 1.0) {
					clearInterval(inertiaInterval);
				}
				}, 10);
			me._scroll_amostra.ggInInteraction = false;
			setTimeout(function() { me._scroll_amostra.ggIsDragging = false; }, 100);
		}
		me._scroll_amostra__content.mousetouchmove = e => {
			if (!me._scroll_amostra.ggInInteraction) return;
			e = e || window.event;
			if (e.buttons==0) {
				me._scroll_amostra__content.mousetouchend();
				return;
			}
			e.preventDefault();
			var t = e.touches;
			var eventX = t ? t[0].clientX : e.clientX;
			var eventY = t ? t[0].clientY : e.clientY;
			if (Math.abs(eventX - me._scroll_amostra.ggDragStartX) > 10 || Math.abs(eventY - me._scroll_amostra.ggDragStartY) > 10) me._scroll_amostra.ggIsDragging = true;
			var diffX = (eventX - me._scroll_amostra.ggDragLastX) * me._scroll_amostra.ggHPercentVisible;
			var diffY = (eventY - me._scroll_amostra.ggDragLastY) * me._scroll_amostra.ggVPercentVisible;
			me._scroll_amostra.ggDragInertiaX = -diffX;
			me._scroll_amostra.ggDragInertiaY = -diffY;
			me._scroll_amostra.ggDragLastX = eventX;
			me._scroll_amostra.ggDragLastY = eventY;
			me._scroll_amostra.ggScrollByX(-diffX);
			me._scroll_amostra.ggScrollByY(-diffY);
		}
		me._scroll_amostra__content.mousetouchstart = e => {
			e = e || window.event;
			var t = e.touches;
			me._scroll_amostra.ggDragLastX = me._scroll_amostra.ggDragStartX = t ? t[0].clientX : e.clientX;
			me._scroll_amostra.ggDragLastY = me._scroll_amostra.ggDragStartY = t ? t[0].clientY : e.clientY;
			me._scroll_amostra.ggInInteraction = true;
		}
		els.onmousedown = me._scroll_amostra__content.mousetouchstart;
		els.ontouchstart = me._scroll_amostra__content.mousetouchstart;
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = me._scroll_amostra__content.mousetouchstart;
		}
		document.addEventListener('mouseup', me._scroll_amostra.contentMouseupListener = function() { me._scroll_amostra__content.mousetouchend(); });
		document.addEventListener('touchend', me._scroll_amostra.contentTouchendListener = function() { me._scroll_amostra__content.mousetouchend(); });
		document.addEventListener('mousemove', me._scroll_amostra.contentMousemoveListener = function() { me._scroll_amostra__content.mousetouchmove(); });
		document.addEventListener('touchmove', me._scroll_amostra.contentTouchmoveListener = function() { me._scroll_amostra__content.mousetouchmove(); });
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			document.addEventListener('pointerup', me._scroll_amostra.pointerupListener = function() { me._scroll_amostra__content.mousetouchend(); });
			document.addEventListener('pointermove', me._scroll_amostra.pointermoveListener = function() { me._scroll_amostra__content.mousetouchmove(); });
		}
		elVertScrollBg = me._scroll_amostra__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 6px; height: 407px; background-color: rgba(128,128,128,1); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._scroll_amostra__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 6px; height: 407px; background-color: rgba(192,192,192,1); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._scroll_amostra.ggScrollPosY = 0;
		me._scroll_amostra.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._scroll_amostra.ggDragLastY = e.clientY;
			document.addEventListener('mouseup', me._scroll_amostra.vertMouseupListener = function() {
				let inertiaInterval = setInterval(function() {
					me._scroll_amostra.ggDragInertiaY *= 0.96;
					me._scroll_amostra.ggScrollByY(me._scroll_amostra.ggDragInertiaY);
					if (Math.abs(me._scroll_amostra.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 10);
				document.removeEventListener('mouseup', me._scroll_amostra.vertMouseupListener);
				document.removeEventListener('mousemove', me._scroll_amostra.vertMousemoveListener);
			});
			document.addEventListener('mousemove', me._scroll_amostra.vertMousemoveListener = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._scroll_amostra.ggDragLastY;
				me._scroll_amostra.ggDragInertiaY = diffY;
				me._scroll_amostra.ggDragLastY = e.clientY;
				me._scroll_amostra.ggScrollByY(diffY);
			});
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._scroll_amostra.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._scroll_amostra.vertTouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._scroll_amostra.ggDragInertiaY *= 0.96;
					me._scroll_amostra.ggScrollByY(me._scroll_amostra.ggDragInertiaY);
					if (Math.abs(me._scroll_amostra.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 10);
				document.removeEventListener('touchend', me._scroll_amostra.vertTouchendListener);
				document.removeEventListener('touchmove', me._scroll_amostra.vertTouchmoveListener);
				document.removeEventListener('pointerup', me._scroll_amostra.vertPointerupListener);
				document.removeEventListener('pointermove', me._scroll_amostra.vertPointermoveListener);
			}
			document.addEventListener('touchend', me._scroll_amostra.vertTouchendListener = function() { me._scroll_amostra.vertTouchend(); });
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.addEventListener('pointerup', me._scroll_amostra.vertPointerupListener = function() { me._scroll_amostra.vertTouchend(); });
			}
			me._scroll_amostra.vertTouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffY = (t ? t[0].clientY : e.clientY) - me._scroll_amostra.ggDragLastY;
				me._scroll_amostra.ggDragInertiaY = diffY;
				me._scroll_amostra.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._scroll_amostra.ggScrollByY(diffY);
			}
			document.addEventListener('touchmove', me._scroll_amostra.vertTouchmoveListener = function(e) { me._scroll_amostra.vertTouchmove(e); });
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.addEventListener('pointermove', me._scroll_amostra.vertPointermoveListener = function(e) { me._scroll_amostra.vertTouchmove(e); });
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elVertScrollFg.onpointerdown = elVertScrollFg.ontouchstart;
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._scroll_amostra.ggScrollHeight;
			if (e.offsetY < me._scroll_amostra.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._scroll_amostra.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._scroll_amostra__vertScrollBg.getBoundingClientRect();
			var diffY = me._scroll_amostra.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._scroll_amostra.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._scroll_amostra.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._scroll_amostra.ggScrollByYSmooth(30 * me._scroll_amostra.ggVPercentVisible * wheelDelta);
		});
		elCornerBg = me._scroll_amostra__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 6px; height: 6px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="Scroll_amostra";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		el.userData=el;
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='height : 407px;';
		hs+='left : 0px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 163px;';
		hs+='visibility : inherit;';
		hs+='width : 263px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._scroll_amostra.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._scroll_amostra.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none' && (e.offsetWidth != 0 || e.offsetHeight != 0)) {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none' && e.style['overflow']!='hidden') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				var contentWidth = maxX - minX;
				this.ggContent.style.width = contentWidth + 'px';
				var contentHeight = maxY - minY;
				this.ggContent.style.height = contentHeight + 'px';
			var scaleX = this.getBoundingClientRect().width / this.offsetWidth;
				this.ggContentWidth = contentWidth / scaleX;
			var scaleY = this.getBoundingClientRect().height / this.offsetHeight;
				this.ggContentHeight = contentHeight / scaleY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.marginLeft = '0px';
				this.ggContent.style.top = -(Math.round(me._scroll_amostra.ggScrollPosY / me._scroll_amostra.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if ((me._scroll_amostra.ggHorScrollVisible && contentHeight > this.clientHeight - 6) || (!me._scroll_amostra.ggHorScrollVisible && contentHeight > this.clientHeight)) {
					me._scroll_amostra__vertScrollBg.style.visibility = 'inherit';
					me._scroll_amostra__vertScrollFg.style.visibility = 'inherit';
					me._scroll_amostra.ggVertScrollVisible = true;
				} else {
					me._scroll_amostra__vertScrollBg.style.visibility = 'hidden';
					me._scroll_amostra__vertScrollFg.style.visibility = 'hidden';
					me._scroll_amostra.ggVertScrollVisible = false;
				}
				if(me._scroll_amostra.ggVertScrollVisible) {
					me._scroll_amostra.ggAvailableWidth = me._scroll_amostra.clientWidth - 6;
					if (me._scroll_amostra.ggHorScrollVisible) {
						me._scroll_amostra.ggAvailableHeight = me._scroll_amostra.clientHeight - 6;
						me._scroll_amostra.ggAvailableHeightWithScale = me._scroll_amostra.getBoundingClientRect().height - me._scroll_amostra__vertScrollBg.getBoundingClientRect().width;
						me._scroll_amostra__cornerBg.style.visibility = 'inherit';
					} else {
						me._scroll_amostra.ggAvailableHeight = me._scroll_amostra.clientHeight;
						me._scroll_amostra.ggAvailableHeightWithScale = me._scroll_amostra.getBoundingClientRect().height;
						me._scroll_amostra__cornerBg.style.visibility = 'hidden';
					}
					me._scroll_amostra__vertScrollBg.style.height = me._scroll_amostra.ggAvailableHeight + 'px';
					me._scroll_amostra.ggVPercentVisible = contentHeight != 0 ? me._scroll_amostra.ggAvailableHeightWithScale / contentHeight : 0.0;
					if (me._scroll_amostra.ggVPercentVisible > 1.0) me._scroll_amostra.ggVPercentVisible = 1.0;
					me._scroll_amostra.ggScrollHeight =  Math.round(me._scroll_amostra__vertScrollBg.offsetHeight * me._scroll_amostra.ggVPercentVisible);
					me._scroll_amostra__vertScrollFg.style.height = me._scroll_amostra.ggScrollHeight + 'px';
					me._scroll_amostra.ggScrollPosY = me._scroll_amostra.ggScrollPosYPercent * me._scroll_amostra.ggAvailableHeight;
					me._scroll_amostra.ggScrollPosY = Math.min(me._scroll_amostra.ggScrollPosY, me._scroll_amostra__vertScrollBg.offsetHeight - me._scroll_amostra__vertScrollFg.offsetHeight);
					me._scroll_amostra__vertScrollFg.style.top = me._scroll_amostra.ggScrollPosY + 'px';
					if (me._scroll_amostra.ggVPercentVisible < 1.0) {
						let percentScrolled = me._scroll_amostra.ggScrollPosY / (me._scroll_amostra__vertScrollBg.offsetHeight - me._scroll_amostra__vertScrollFg.offsetHeight);
						me._scroll_amostra__content.style.top = -(Math.round((me._scroll_amostra.ggContentHeight * (1.0 - me._scroll_amostra.ggVPercentVisible)) * percentScrolled)) + me._scroll_amostra.ggContentTopOffset + 'px';
					}
				} else {
					me._scroll_amostra.ggAvailableWidth = me._scroll_amostra.clientWidth;
					me._scroll_amostra.ggScrollPosY = 0;
					me._scroll_amostra.ggScrollPosYPercent = 0.0;
					me._scroll_amostra__content.style.top = this.ggContentTopOffset + 'px';
					me._scroll_amostra__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._scroll_amostra.ggHorScrollVisible || vertScrollWasVisible != me._scroll_amostra.ggVertScrollVisible) {
					skin.updateSize(me._scroll_amostra);
					me._scroll_amostra.ggUpdatePosition();
				}
			}
		}
		el=me._cloner_amostras=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._cloner_amostras;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		el.ggNumRepeat = 4;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggCloneOffset = 0;
		el.ggCloneOffsetChanged = false;
		el.ggWidth = 64;
		el.ggHeight = 31;
		el.ggSizeChanged = false;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggFilterHsSkinId = '';
		el.ggInstances = [];
		el.ggNumFilterPassed = 0;
		el.getFilteredNodes = function(tourNodes, filter) {
			var filteredNodes = [];
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (!nodeData['tags'] || nodeData['tags'].indexOf(filter[j].trim()) == -1) passed = false;
					}
				}
				if (passed) {
					filteredNodes.push(nodeId);
				}
			}
			return filteredNodes;
		}
		el.ggUpdate = function(filter) {
			if(me._cloner_amostras.ggUpdating == true) return;
			me._cloner_amostras.ggUpdating = true;
			var el=me._cloner_amostras;
			var curNumCols = 0;
			curNumCols = me._cloner_amostras.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && !el.ggSizeChanged && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._cloner_amostras.ggUpdating = false;
				return;
			} else {
				el.ggSizeChanged = false;
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			var centerOffsetHor = 0;
			var centerOffsetVert = 0;
				me._cloner_amostras.ggCloneOffsetChanged = false;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			if (tourNodes.length == 0) {
				me._cloner_amostras.ggUpdating = false;
				return;
			}
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var keepCloning = true;
			tourNodes = me._cloner_amostras.getFilteredNodes(tourNodes, filter);
			me._cloner_amostras.ggNumFilterPassed = tourNodes.length;
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var nodeData = player.getNodeUserdata(nodeId);
				if (!keepCloning || i < me._cloner_amostras.ggCloneOffset) continue;
				var parameter={};
				parameter.top = centerOffsetVert + (row * me._cloner_amostras.ggHeight) + 'px';
				parameter.left = centerOffsetHor + (column * me._cloner_amostras.ggWidth) + 'px';
				parameter.width=me._cloner_amostras.ggWidth + 'px';
				parameter.height=me._cloner_amostras.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_cloner_amostras_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
			}
			me._cloner_amostras.ggNodeCount = me._cloner_amostras.ggNumFilterPassed;
			me._cloner_amostras.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._cloner_amostras.parentNode && me._cloner_amostras.parentNode.classList.contains('ggskin_subelement') && me._cloner_amostras.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._cloner_amostras.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggFilter[0] = "amostras";
		el.ggId="Cloner_amostras";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		el.userData=el;
		hs ='';
		hs+='height : 31px;';
		hs+='left : -2px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 2px;';
		hs+='visibility : inherit;';
		hs+='width : 64px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._cloner_amostras.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._cloner_amostras.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._cloner_amostras.childNodes.length; i++) {
				var child=me._cloner_amostras.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._cloner_amostras.ggUpdatePosition=function (useTransition) {
			me._cloner_amostras.ggUpdate();
		}
		me._scroll_amostra__content.appendChild(me._cloner_amostras);
		me._scrollarea_menu__content.appendChild(me._scroll_amostra);
		el=me._santo_amaro_amostras=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._santo_amaro_amostras;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		els=me._santo_amaro_amostras__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="SANTO AMARO AMOSTRAS";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		el.userData=el;
		hs ='';
		hs+='background : #9c1406;';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='height : 39px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 122px;';
		hs+='visibility : inherit;';
		hs+='width : 253px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs='';
		hs+='box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='max-height: 100%;';
		hs+='font-size: 14px;';
		hs+='font-weight: 900;';
		hs+='text-align: center;';
		hs+='position: absolute;';
		hs+='top: 50%;';
		hs+='transform: translate(0, -50%);';
		hs+='white-space: pre;';
		hs+='padding: 0px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._santo_amaro_amostras.ggUpdateText=function() {
			var params = [];
			var hs = player._("SANTO AMARO AMOSTRAS", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._santo_amaro_amostras.ggUpdateText();
		el.appendChild(els);
		me._santo_amaro_amostras.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._santo_amaro_amostras.ggUpdatePosition=function (useTransition) {
		}
		me._scrollarea_menu__content.appendChild(me._santo_amaro_amostras);
		el=me._scrol_imoveis=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._scrol_imoveis;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		els=me._scrol_imoveis__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		el.ggContentWidth = 0;
		el.ggContentHeight = 0;
		el.ggDragInertiaX = 0;
		el.ggDragInertiaY = 0;
		el.ggVPercentVisible = 1.0;
		el.ggHPercentVisible = 1.0;
		el.ggInInteraction = false;
		el.ggIsDragging = false;
		hs ='';
		hs+='height : 72px;';
		hs+='left : 0px;';
		hs+='overflow-x : visible;';
		hs+='overflow-y : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 251px;';
		hs+="";
		els.setAttribute('style',hs);
		me._scrol_imoveis.ggScrollByX = function(diffX) {
			if(!me._scrol_imoveis.ggHorScrollVisible || diffX == 0 || me._scrol_imoveis.ggHPercentVisible >= 1.0) return;
			me._scrol_imoveis.ggScrollPosX = (me._scrol_imoveis__horScrollFg.offsetLeft + diffX);
			me._scrol_imoveis.ggScrollPosX = Math.max(me._scrol_imoveis.ggScrollPosX, 0);
			me._scrol_imoveis.ggScrollPosX = Math.min(me._scrol_imoveis.ggScrollPosX, me._scrol_imoveis__horScrollBg.offsetWidth - me._scrol_imoveis__horScrollFg.offsetWidth);
			me._scrol_imoveis__horScrollFg.style.left = me._scrol_imoveis.ggScrollPosX + 'px';
			let percentScrolled = me._scrol_imoveis.ggScrollPosX / (me._scrol_imoveis__horScrollBg.offsetWidth - me._scrol_imoveis__horScrollFg.offsetWidth);
			me._scrol_imoveis__content.style.left = -(Math.round((me._scrol_imoveis.ggContentWidth * (1.0 - me._scrol_imoveis.ggHPercentVisible)) * percentScrolled)) + me._scrol_imoveis.ggContentLeftOffset + 'px';
			me._scrol_imoveis.ggScrollPosXPercent = (me._scrol_imoveis__horScrollFg.offsetLeft / me._scrol_imoveis__horScrollBg.offsetWidth);
		}
		me._scrol_imoveis.ggScrollByXSmooth = function(diffX) {
			if(!me._scrol_imoveis.ggHorScrollVisible || diffX == 0 || me._scrol_imoveis.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._scrol_imoveis.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._scrol_imoveis.ggScrollPosX >= me._scrol_imoveis__horScrollBg.offsetWidth - me._scrol_imoveis__horScrollFg.offsetWidth)) {
					me._scrol_imoveis.ggScrollPosX = Math.min(me._scrol_imoveis.ggScrollPosX, me._scrol_imoveis__horScrollBg.offsetWidth - me._scrol_imoveis__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._scrol_imoveis.ggScrollPosX <= 0)) {
					me._scrol_imoveis.ggScrollPosX = Math.max(me._scrol_imoveis.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._scrol_imoveis__horScrollFg.style.left = me._scrol_imoveis.ggScrollPosX + 'px';
			let percentScrolled = me._scrol_imoveis.ggScrollPosX / (me._scrol_imoveis__horScrollBg.offsetWidth - me._scrol_imoveis__horScrollFg.offsetWidth);
			me._scrol_imoveis__content.style.left = -(Math.round((me._scrol_imoveis.ggContentWidth * (1.0 - me._scrol_imoveis.ggHPercentVisible)) * percentScrolled)) + me._scrol_imoveis.ggContentLeftOffset + 'px';
			me._scrol_imoveis.ggScrollPosXPercent = (me._scrol_imoveis__horScrollFg.offsetLeft / me._scrol_imoveis__horScrollBg.offsetWidth);
			}, 10);
		}
		me._scrol_imoveis.ggScrollByY = function(diffY) {
			if(!me._scrol_imoveis.ggVertScrollVisible || diffY == 0 || me._scrol_imoveis.ggVPercentVisible >= 1.0) return;
			me._scrol_imoveis.ggScrollPosY = (me._scrol_imoveis__vertScrollFg.offsetTop + diffY);
			me._scrol_imoveis.ggScrollPosY = Math.max(me._scrol_imoveis.ggScrollPosY, 0);
			me._scrol_imoveis.ggScrollPosY = Math.min(me._scrol_imoveis.ggScrollPosY, me._scrol_imoveis__vertScrollBg.offsetHeight - me._scrol_imoveis__vertScrollFg.offsetHeight);
			me._scrol_imoveis__vertScrollFg.style.top = me._scrol_imoveis.ggScrollPosY + 'px';
			let percentScrolled = me._scrol_imoveis.ggScrollPosY / (me._scrol_imoveis__vertScrollBg.offsetHeight - me._scrol_imoveis__vertScrollFg.offsetHeight);
			me._scrol_imoveis__content.style.top = -(Math.round((me._scrol_imoveis.ggContentHeight * (1.0 - me._scrol_imoveis.ggVPercentVisible)) * percentScrolled)) + me._scrol_imoveis.ggContentTopOffset + 'px';
			me._scrol_imoveis.ggScrollPosYPercent = (me._scrol_imoveis__vertScrollFg.offsetTop / me._scrol_imoveis__vertScrollBg.offsetHeight);
		}
		me._scrol_imoveis.ggScrollByYSmooth = function(diffY) {
			if(!me._scrol_imoveis.ggVertScrollVisible || diffY == 0 || me._scrol_imoveis.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._scrol_imoveis.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._scrol_imoveis.ggScrollPosY >= me._scrol_imoveis__vertScrollBg.offsetHeight - me._scrol_imoveis__vertScrollFg.offsetHeight)) {
					me._scrol_imoveis.ggScrollPosY = Math.min(me._scrol_imoveis.ggScrollPosY, me._scrol_imoveis__vertScrollBg.offsetHeight - me._scrol_imoveis__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._scrol_imoveis.ggScrollPosY <= 0)) {
					me._scrol_imoveis.ggScrollPosY = Math.max(me._scrol_imoveis.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._scrol_imoveis__vertScrollFg.style.top = me._scrol_imoveis.ggScrollPosY + 'px';
			let percentScrolled = me._scrol_imoveis.ggScrollPosY / (me._scrol_imoveis__vertScrollBg.offsetHeight - me._scrol_imoveis__vertScrollFg.offsetHeight);
			me._scrol_imoveis__content.style.top = -(Math.round((me._scrol_imoveis.ggContentHeight * (1.0 - me._scrol_imoveis.ggVPercentVisible)) * percentScrolled)) + me._scrol_imoveis.ggContentTopOffset + 'px';
			me._scrol_imoveis.ggScrollPosYPercent = (me._scrol_imoveis__vertScrollFg.offsetTop / me._scrol_imoveis__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._scrol_imoveis.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._scrol_imoveis.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._scrol_imoveis.ggHPercentVisible);
					me._scrol_imoveis.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._scrol_imoveis.clientWidth - (me._scrol_imoveis.ggVertScrollVisible ? 6 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._scrol_imoveis.clientWidth - (me._scrol_imoveis.ggVertScrollVisible ? 6 : 0))) * me._scrol_imoveis.ggHPercentVisible);
					me._scrol_imoveis.ggScrollByXSmooth(diffX);
				}
			}
			if (me._scrol_imoveis.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._scrol_imoveis.ggVPercentVisible);
					me._scrol_imoveis.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._scrol_imoveis.clientHeight - (me._scrol_imoveis.ggHorScrollVisible ? 6 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._scrol_imoveis.clientHeight - (me._scrol_imoveis.ggHorScrollVisible ? 6 : 0))) * me._scrol_imoveis.ggVPercentVisible);
					me._scrol_imoveis.ggScrollByYSmooth(diffY);
				}
			}
		}
		me._scrol_imoveis__content.mousetouchend = e => {
			let inertiaInterval = setInterval(function() {
				me._scrol_imoveis.ggDragInertiaX *= 0.96;
				me._scrol_imoveis.ggDragInertiaY *= 0.96;
				me._scrol_imoveis.ggScrollByX(me._scrol_imoveis.ggDragInertiaX);
				me._scrol_imoveis.ggScrollByY(me._scrol_imoveis.ggDragInertiaY);
				if (Math.abs(me._scrol_imoveis.ggDragInertiaX) < 1.0 && Math.abs(me._scrol_imoveis.ggDragInertiaY) < 1.0) {
					clearInterval(inertiaInterval);
				}
				}, 10);
			me._scrol_imoveis.ggInInteraction = false;
			setTimeout(function() { me._scrol_imoveis.ggIsDragging = false; }, 100);
		}
		me._scrol_imoveis__content.mousetouchmove = e => {
			if (!me._scrol_imoveis.ggInInteraction) return;
			e = e || window.event;
			if (e.buttons==0) {
				me._scrol_imoveis__content.mousetouchend();
				return;
			}
			e.preventDefault();
			var t = e.touches;
			var eventX = t ? t[0].clientX : e.clientX;
			var eventY = t ? t[0].clientY : e.clientY;
			if (Math.abs(eventX - me._scrol_imoveis.ggDragStartX) > 10 || Math.abs(eventY - me._scrol_imoveis.ggDragStartY) > 10) me._scrol_imoveis.ggIsDragging = true;
			var diffX = (eventX - me._scrol_imoveis.ggDragLastX) * me._scrol_imoveis.ggHPercentVisible;
			var diffY = (eventY - me._scrol_imoveis.ggDragLastY) * me._scrol_imoveis.ggVPercentVisible;
			me._scrol_imoveis.ggDragInertiaX = -diffX;
			me._scrol_imoveis.ggDragInertiaY = -diffY;
			me._scrol_imoveis.ggDragLastX = eventX;
			me._scrol_imoveis.ggDragLastY = eventY;
			me._scrol_imoveis.ggScrollByX(-diffX);
			me._scrol_imoveis.ggScrollByY(-diffY);
		}
		me._scrol_imoveis__content.mousetouchstart = e => {
			e = e || window.event;
			var t = e.touches;
			me._scrol_imoveis.ggDragLastX = me._scrol_imoveis.ggDragStartX = t ? t[0].clientX : e.clientX;
			me._scrol_imoveis.ggDragLastY = me._scrol_imoveis.ggDragStartY = t ? t[0].clientY : e.clientY;
			me._scrol_imoveis.ggInInteraction = true;
		}
		els.onmousedown = me._scrol_imoveis__content.mousetouchstart;
		els.ontouchstart = me._scrol_imoveis__content.mousetouchstart;
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = me._scrol_imoveis__content.mousetouchstart;
		}
		document.addEventListener('mouseup', me._scrol_imoveis.contentMouseupListener = function() { me._scrol_imoveis__content.mousetouchend(); });
		document.addEventListener('touchend', me._scrol_imoveis.contentTouchendListener = function() { me._scrol_imoveis__content.mousetouchend(); });
		document.addEventListener('mousemove', me._scrol_imoveis.contentMousemoveListener = function() { me._scrol_imoveis__content.mousetouchmove(); });
		document.addEventListener('touchmove', me._scrol_imoveis.contentTouchmoveListener = function() { me._scrol_imoveis__content.mousetouchmove(); });
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			document.addEventListener('pointerup', me._scrol_imoveis.pointerupListener = function() { me._scrol_imoveis__content.mousetouchend(); });
			document.addEventListener('pointermove', me._scrol_imoveis.pointermoveListener = function() { me._scrol_imoveis__content.mousetouchmove(); });
		}
		elVertScrollBg = me._scrol_imoveis__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 6px; height: 114px; background-color: rgba(128,128,128,1); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._scrol_imoveis__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 6px; height: 114px; background-color: rgba(192,192,192,1); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._scrol_imoveis.ggScrollPosY = 0;
		me._scrol_imoveis.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._scrol_imoveis.ggDragLastY = e.clientY;
			document.addEventListener('mouseup', me._scrol_imoveis.vertMouseupListener = function() {
				let inertiaInterval = setInterval(function() {
					me._scrol_imoveis.ggDragInertiaY *= 0.96;
					me._scrol_imoveis.ggScrollByY(me._scrol_imoveis.ggDragInertiaY);
					if (Math.abs(me._scrol_imoveis.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 10);
				document.removeEventListener('mouseup', me._scrol_imoveis.vertMouseupListener);
				document.removeEventListener('mousemove', me._scrol_imoveis.vertMousemoveListener);
			});
			document.addEventListener('mousemove', me._scrol_imoveis.vertMousemoveListener = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._scrol_imoveis.ggDragLastY;
				me._scrol_imoveis.ggDragInertiaY = diffY;
				me._scrol_imoveis.ggDragLastY = e.clientY;
				me._scrol_imoveis.ggScrollByY(diffY);
			});
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._scrol_imoveis.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._scrol_imoveis.vertTouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._scrol_imoveis.ggDragInertiaY *= 0.96;
					me._scrol_imoveis.ggScrollByY(me._scrol_imoveis.ggDragInertiaY);
					if (Math.abs(me._scrol_imoveis.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 10);
				document.removeEventListener('touchend', me._scrol_imoveis.vertTouchendListener);
				document.removeEventListener('touchmove', me._scrol_imoveis.vertTouchmoveListener);
				document.removeEventListener('pointerup', me._scrol_imoveis.vertPointerupListener);
				document.removeEventListener('pointermove', me._scrol_imoveis.vertPointermoveListener);
			}
			document.addEventListener('touchend', me._scrol_imoveis.vertTouchendListener = function() { me._scrol_imoveis.vertTouchend(); });
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.addEventListener('pointerup', me._scrol_imoveis.vertPointerupListener = function() { me._scrol_imoveis.vertTouchend(); });
			}
			me._scrol_imoveis.vertTouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffY = (t ? t[0].clientY : e.clientY) - me._scrol_imoveis.ggDragLastY;
				me._scrol_imoveis.ggDragInertiaY = diffY;
				me._scrol_imoveis.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._scrol_imoveis.ggScrollByY(diffY);
			}
			document.addEventListener('touchmove', me._scrol_imoveis.vertTouchmoveListener = function(e) { me._scrol_imoveis.vertTouchmove(e); });
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.addEventListener('pointermove', me._scrol_imoveis.vertPointermoveListener = function(e) { me._scrol_imoveis.vertTouchmove(e); });
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elVertScrollFg.onpointerdown = elVertScrollFg.ontouchstart;
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._scrol_imoveis.ggScrollHeight;
			if (e.offsetY < me._scrol_imoveis.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._scrol_imoveis.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._scrol_imoveis__vertScrollBg.getBoundingClientRect();
			var diffY = me._scrol_imoveis.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._scrol_imoveis.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._scrol_imoveis.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._scrol_imoveis.ggScrollByYSmooth(30 * me._scrol_imoveis.ggVPercentVisible * wheelDelta);
		});
		elCornerBg = me._scrol_imoveis__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 6px; height: 6px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="Scrol_imoveis";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		el.userData=el;
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='height : 114px;';
		hs+='left : 0px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 263px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._scrol_imoveis.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._scrol_imoveis.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none' && (e.offsetWidth != 0 || e.offsetHeight != 0)) {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none' && e.style['overflow']!='hidden') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				var contentWidth = maxX - minX;
				this.ggContent.style.width = contentWidth + 'px';
				var contentHeight = maxY - minY;
				this.ggContent.style.height = contentHeight + 'px';
			var scaleX = this.getBoundingClientRect().width / this.offsetWidth;
				this.ggContentWidth = contentWidth / scaleX;
			var scaleY = this.getBoundingClientRect().height / this.offsetHeight;
				this.ggContentHeight = contentHeight / scaleY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.marginLeft = '0px';
				this.ggContent.style.top = -(Math.round(me._scrol_imoveis.ggScrollPosY / me._scrol_imoveis.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if ((me._scrol_imoveis.ggHorScrollVisible && contentHeight > this.clientHeight - 6) || (!me._scrol_imoveis.ggHorScrollVisible && contentHeight > this.clientHeight)) {
					me._scrol_imoveis__vertScrollBg.style.visibility = 'inherit';
					me._scrol_imoveis__vertScrollFg.style.visibility = 'inherit';
					me._scrol_imoveis.ggVertScrollVisible = true;
				} else {
					me._scrol_imoveis__vertScrollBg.style.visibility = 'hidden';
					me._scrol_imoveis__vertScrollFg.style.visibility = 'hidden';
					me._scrol_imoveis.ggVertScrollVisible = false;
				}
				if(me._scrol_imoveis.ggVertScrollVisible) {
					me._scrol_imoveis.ggAvailableWidth = me._scrol_imoveis.clientWidth - 6;
					if (me._scrol_imoveis.ggHorScrollVisible) {
						me._scrol_imoveis.ggAvailableHeight = me._scrol_imoveis.clientHeight - 6;
						me._scrol_imoveis.ggAvailableHeightWithScale = me._scrol_imoveis.getBoundingClientRect().height - me._scrol_imoveis__vertScrollBg.getBoundingClientRect().width;
						me._scrol_imoveis__cornerBg.style.visibility = 'inherit';
					} else {
						me._scrol_imoveis.ggAvailableHeight = me._scrol_imoveis.clientHeight;
						me._scrol_imoveis.ggAvailableHeightWithScale = me._scrol_imoveis.getBoundingClientRect().height;
						me._scrol_imoveis__cornerBg.style.visibility = 'hidden';
					}
					me._scrol_imoveis__vertScrollBg.style.height = me._scrol_imoveis.ggAvailableHeight + 'px';
					me._scrol_imoveis.ggVPercentVisible = contentHeight != 0 ? me._scrol_imoveis.ggAvailableHeightWithScale / contentHeight : 0.0;
					if (me._scrol_imoveis.ggVPercentVisible > 1.0) me._scrol_imoveis.ggVPercentVisible = 1.0;
					me._scrol_imoveis.ggScrollHeight =  Math.round(me._scrol_imoveis__vertScrollBg.offsetHeight * me._scrol_imoveis.ggVPercentVisible);
					me._scrol_imoveis__vertScrollFg.style.height = me._scrol_imoveis.ggScrollHeight + 'px';
					me._scrol_imoveis.ggScrollPosY = me._scrol_imoveis.ggScrollPosYPercent * me._scrol_imoveis.ggAvailableHeight;
					me._scrol_imoveis.ggScrollPosY = Math.min(me._scrol_imoveis.ggScrollPosY, me._scrol_imoveis__vertScrollBg.offsetHeight - me._scrol_imoveis__vertScrollFg.offsetHeight);
					me._scrol_imoveis__vertScrollFg.style.top = me._scrol_imoveis.ggScrollPosY + 'px';
					if (me._scrol_imoveis.ggVPercentVisible < 1.0) {
						let percentScrolled = me._scrol_imoveis.ggScrollPosY / (me._scrol_imoveis__vertScrollBg.offsetHeight - me._scrol_imoveis__vertScrollFg.offsetHeight);
						me._scrol_imoveis__content.style.top = -(Math.round((me._scrol_imoveis.ggContentHeight * (1.0 - me._scrol_imoveis.ggVPercentVisible)) * percentScrolled)) + me._scrol_imoveis.ggContentTopOffset + 'px';
					}
				} else {
					me._scrol_imoveis.ggAvailableWidth = me._scrol_imoveis.clientWidth;
					me._scrol_imoveis.ggScrollPosY = 0;
					me._scrol_imoveis.ggScrollPosYPercent = 0.0;
					me._scrol_imoveis__content.style.top = this.ggContentTopOffset + 'px';
					me._scrol_imoveis__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._scrol_imoveis.ggHorScrollVisible || vertScrollWasVisible != me._scrol_imoveis.ggVertScrollVisible) {
					skin.updateSize(me._scrol_imoveis);
					me._scrol_imoveis.ggUpdatePosition();
				}
			}
		}
		el=me._cloner_imoveis=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._cloner_imoveis;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		el.ggNumRepeat = 4;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggCloneOffset = 0;
		el.ggCloneOffsetChanged = false;
		el.ggWidth = 64;
		el.ggHeight = 31;
		el.ggSizeChanged = false;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggFilterHsSkinId = '';
		el.ggInstances = [];
		el.ggNumFilterPassed = 0;
		el.getFilteredNodes = function(tourNodes, filter) {
			var filteredNodes = [];
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (!nodeData['tags'] || nodeData['tags'].indexOf(filter[j].trim()) == -1) passed = false;
					}
				}
				if (passed) {
					filteredNodes.push(nodeId);
				}
			}
			return filteredNodes;
		}
		el.ggUpdate = function(filter) {
			if(me._cloner_imoveis.ggUpdating == true) return;
			me._cloner_imoveis.ggUpdating = true;
			var el=me._cloner_imoveis;
			var curNumCols = 0;
			curNumCols = me._cloner_imoveis.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && !el.ggSizeChanged && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._cloner_imoveis.ggUpdating = false;
				return;
			} else {
				el.ggSizeChanged = false;
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			var centerOffsetHor = 0;
			var centerOffsetVert = 0;
				me._cloner_imoveis.ggCloneOffsetChanged = false;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			if (tourNodes.length == 0) {
				me._cloner_imoveis.ggUpdating = false;
				return;
			}
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var keepCloning = true;
			tourNodes = me._cloner_imoveis.getFilteredNodes(tourNodes, filter);
			me._cloner_imoveis.ggNumFilterPassed = tourNodes.length;
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var nodeData = player.getNodeUserdata(nodeId);
				if (!keepCloning || i < me._cloner_imoveis.ggCloneOffset) continue;
				var parameter={};
				parameter.top = centerOffsetVert + (row * me._cloner_imoveis.ggHeight) + 'px';
				parameter.left = centerOffsetHor + (column * me._cloner_imoveis.ggWidth) + 'px';
				parameter.width=me._cloner_imoveis.ggWidth + 'px';
				parameter.height=me._cloner_imoveis.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_cloner_imoveis_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
			}
			me._cloner_imoveis.ggNodeCount = me._cloner_imoveis.ggNumFilterPassed;
			me._cloner_imoveis.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._cloner_imoveis.parentNode && me._cloner_imoveis.parentNode.classList.contains('ggskin_subelement') && me._cloner_imoveis.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._cloner_imoveis.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggFilter[0] = "SantoAmaro360";
		el.ggId="Cloner_imoveis";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		el.userData=el;
		hs ='';
		hs+='height : 31px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 42px;';
		hs+='visibility : inherit;';
		hs+='width : 64px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._cloner_imoveis.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._cloner_imoveis.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._cloner_imoveis.childNodes.length; i++) {
				var child=me._cloner_imoveis.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._cloner_imoveis.ggUpdatePosition=function (useTransition) {
			me._cloner_imoveis.ggUpdate();
		}
		me._scrol_imoveis__content.appendChild(me._cloner_imoveis);
		el=me._terreno_santo_amaro=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._terreno_santo_amaro;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		els=me._terreno_santo_amaro__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="TERRENO SANTO AMARO";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		el.userData=el;
		hs ='';
		hs+='background : #9c1406;';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : 39px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 253px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs='';
		hs+='box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='max-height: 100%;';
		hs+='font-size: 14px;';
		hs+='font-weight: 900;';
		hs+='text-align: center;';
		hs+='position: absolute;';
		hs+='top: 50%;';
		hs+='transform: translate(0, -50%);';
		hs+='white-space: pre;';
		hs+='padding: 0px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._terreno_santo_amaro.ggUpdateText=function() {
			var params = [];
			var hs = player._("TERRENO SANTO AMARO", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._terreno_santo_amaro.ggUpdateText();
		el.appendChild(els);
		me._terreno_santo_amaro.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._terreno_santo_amaro.ggUpdatePosition=function (useTransition) {
		}
		me._scrol_imoveis__content.appendChild(me._terreno_santo_amaro);
		me._scrollarea_menu__content.appendChild(me._scrol_imoveis);
		me._container_1.appendChild(me._scrollarea_menu);
		me.divSkin.appendChild(me._container_1);
		el=me._container_2=document.createElement('div');
		el.ggId="Container 2";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		el.userData=el;
		hs ='';
		hs+='height : 82px;';
		hs+='left : calc(50% - ((451px + 0px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 451px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._container_2.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_2.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.ggUserdata.tags.indexOf("Lote") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._container_2.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._container_2.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._container_2.style.transition='';
				if (me._container_2.ggCurrentLogicStateVisible == 0) {
					me._container_2.style.visibility="hidden";
					me._container_2.ggVisible=false;
				}
				else {
					me._container_2.style.visibility=(Number(me._container_2.style.opacity)>0||!me._container_2.style.opacity)?'inherit':'hidden';
					me._container_2.ggVisible=true;
				}
			}
		}
		me._container_2.ggUpdatePosition=function (useTransition) {
		}
		el=me._rectangle_1=document.createElement('div');
		el.ggId="Rectangle 1";
		el.ggDx=3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		el.userData=el;
		hs ='';
		hs+='background : rgba(155,20,6,0.588235);';
		hs+='border : 1px solid #ff0000;';
		hs+='border-radius : 10px;';
		hs+='height : 82px;';
		hs+='left : calc(50% - ((447px + 2px) / 2) + 3px);';
		hs+='position : absolute;';
		hs+='top : 1px;';
		hs+='visibility : inherit;';
		hs+='width : 447px;';
		hs+='pointer-events:auto;';
		hs+='backdrop-filter: blur(10px)';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		me._rectangle_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._rectangle_1.ggUpdatePosition=function (useTransition) {
		}
		me._container_2.appendChild(me._rectangle_1);
		el=me._txt_maps_link=document.createElement('div');
		els=me._txt_maps_link__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="txt_maps_link";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		el.userData=el;
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : calc(50% - ((90% + 0px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='top : 56px;';
		hs+='visibility : inherit;';
		hs+='width : 90%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs='';
		hs+='box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='font-size: 14px;';
		hs+='font-weight: 600;';
		hs+='text-align: center;';
		hs+='white-space: pre;';
		hs+='padding: 0px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._txt_maps_link.ggUpdateText=function() {
			var params = [];
			var hs = player._("\ud83d\udccdVer no Google Maps", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._txt_maps_link.ggUpdateText();
		el.appendChild(els);
		me._txt_maps_link.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._txt_maps_link.onclick=function (e) {
			player.openUrl(player._(me.ggUserdata.comment),"_blank");
		}
		me._txt_maps_link.ggUpdatePosition=function (useTransition) {
		}
		me._container_2.appendChild(me._txt_maps_link);
		el=me._txt_endereco=document.createElement('div');
		els=me._txt_endereco__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="txt_endereco";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		el.userData=el;
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : pointer;';
		hs+='height : 39px;';
		hs+='left : calc(50% - ((80% + 0px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 80%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs='';
		hs+='box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='font-size: 11px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: pre-line;';
		hs+='padding: 0px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._txt_endereco.ggUpdateText=function() {
			var params = [];
			params.push(String(player._(me.ggUserdata.description)));
			var hs = player._("%1", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._txt_endereco.ggUpdateText();
		player.addListener('changenode', function() {
			me._txt_endereco.ggUpdateText();
		});
		el.appendChild(els);
		me._txt_endereco.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._txt_endereco.onclick=function (e) {
			var ud = player.getNodeUserdata(player.getCurrentNode()); if (ud && ud.description) { navigator.clipboard.writeText(ud.description); player.setVariableValue('copiado', true); setTimeout(function() { player.setVariableValue('copiado', false); }, 2000); }
		}
		me._txt_endereco.ggUpdatePosition=function (useTransition) {
		}
		me._container_2.appendChild(me._txt_endereco);
		el=me._txt_copiado=document.createElement('div');
		els=me._txt_copiado__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="txt_copiado";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		el.userData=el;
		hs ='';
		hs+='background : #550000;';
		hs+='border : 0px solid #000000;';
		hs+='border-radius : 6px;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : calc(50% - ((32.9552% + 0px) / 2) + 0px);';
		hs+='position : absolute;';
		hs+='top : -7px;';
		hs+='visibility : hidden;';
		hs+='width : 32.9552%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs='';
		hs+='box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='max-height: 100%;';
		hs+='text-align: center;';
		hs+='position: absolute;';
		hs+='top: 50%;';
		hs+='transform: translate(0, -50%);';
		hs+='white-space: pre;';
		hs+='padding: 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._txt_copiado.ggUpdateText=function() {
			var params = [];
			var hs = player._("Endere\xe7o copiado!", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._txt_copiado.ggUpdateText();
		el.appendChild(els);
		me._txt_copiado.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._txt_copiado.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('copiado') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._txt_copiado.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._txt_copiado.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._txt_copiado.style.transition='';
				if (me._txt_copiado.ggCurrentLogicStateVisible == 0) {
					me._txt_copiado.style.visibility=(Number(me._txt_copiado.style.opacity)>0||!me._txt_copiado.style.opacity)?'inherit':'hidden';
					me._txt_copiado.ggVisible=true;
				}
				else {
					me._txt_copiado.style.visibility="hidden";
					me._txt_copiado.ggVisible=false;
				}
			}
		}
		me._txt_copiado.onclick=function (e) {
			navigator.clipboard.writeText('$(ud)'.replace(/\\n/g, '\n'));
player.setVariableValue('copiado', true);
setTimeout(function() { player.setVariableValue('copiado', false); }, 2000);
		}
		me._txt_copiado.ggUpdatePosition=function (useTransition) {
		}
		me._container_2.appendChild(me._txt_copiado);
		me.divSkin.appendChild(me._container_2);
		me._container_2.logicBlock_visible();
		me._txt_copiado.logicBlock_visible();
		player.addListener('changenode', function(event) {
			for(var i = 0; i < me._cloner_imoveis.ggInstances.length; i++) {
				me._cloner_imoveis.ggInstances[i].ggEvent_changenode(event);
			}
			for(var i = 0; i < me._cloner_amostras.ggInstances.length; i++) {
				me._cloner_amostras.ggInstances[i].ggEvent_changenode(event);
			}
			me._cloner_amostras.ggUpdateConditionNodeChange();
			me._cloner_imoveis.ggUpdateConditionNodeChange();
			me._container_2.logicBlock_visible();
			me._txt_copiado.logicBlock_visible();
		});
		player.addListener('configloaded', function(event) {
			me._scrollarea_menu.ggUpdatePosition();
			me._scroll_amostra.ggUpdatePosition();
			me._scrol_imoveis.ggUpdatePosition();
			me._txt_copiado.logicBlock_visible();
		});
		player.addListener('varchanged_copiado', function(event) {
			me._txt_copiado.logicBlock_visible();
		});
		player.addListener('viewerinit', function(event) {
			me._cloner_amostras.ggUpdate();
			me._cloner_imoveis.ggUpdate();
		});
	};
	function SkinCloner_cloner_imoveis_Class(nodeId, parentScope, ggParent, parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.ggUserdata.nodeid=me.ggNodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
			me.__div=document.createElement('div');
			me.__div.setAttribute('style','visibility: inherit; overflow: visible;');
			me.__div.style.position='absolute';
			me.__div.style.left=parameter.left;
			me.__div.style.top=parameter.top;
			me.__div.style.width='';
			me.__div.style.height='';
			me.__div.style.width=parameter.width;
			me.__div.style.height=parameter.height;
			me.__div.ggIsActive = function() {
				return player.getCurrentNode()==me.ggNodeId;
			}
			me.__div.ggElementNodeId=function() {
				return me.ggNodeId;
			}
		el=me._text_imoveis=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._text_imoveis;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		els=me._text_imoveis__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text_imoveis";
		el.ggDx=-3;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		el.userData=el;
		hs ='';
		hs+='background : #9c1406;';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : 90%;';
		hs+='left : calc(50% - ((61px + 0px) / 2) - 3px);';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((90% + 0px) / 2) + 0px);';
		hs+='visibility : inherit;';
		hs+='width : 61px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs='';
		hs+='box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='max-height: 100%;';
		hs+='font-size: 9px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='position: absolute;';
		hs+='top: 50%;';
		hs+='transform: translate(0, -50%);';
		hs+='white-space: pre;';
		hs+='padding: 0px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._text_imoveis.ggUpdateText=function() {
			var params = [];
			params.push(String(player._(me.ggUserdata.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._text_imoveis.ggUpdateText();
		player.addListener('changenode', function() {
			me._text_imoveis.ggUpdateText();
		});
		el.appendChild(els);
		me._text_imoveis.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._text_imoveis.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((me._text_imoveis.ggIsActive() == true))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._text_imoveis.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._text_imoveis.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._text_imoveis.style.transition='background-color 0s';
				if (me._text_imoveis.ggCurrentLogicStateBackgroundColor == 0) {
					me._text_imoveis.style.backgroundColor="rgba(172,161,8,1)";
				}
				else {
					me._text_imoveis.style.backgroundColor="rgba(156,20,6,1)";
				}
			}
		}
		me._text_imoveis.onclick=function (e) {
			if (me._text_imoveis.isDragging()) return;
			player.openNext("{"+me.ggNodeId+"}","");
		}
		me._text_imoveis.ggUpdatePosition=function (useTransition) {
		}
		me.__div.appendChild(me._text_imoveis);
		me._text_imoveis.logicBlock_backgroundcolor();
			me.ggEvent_changenode=function(event) {
				me._text_imoveis.logicBlock_backgroundcolor();
			};
	};
	function SkinCloner_cloner_amostras_Class(nodeId, parentScope, ggParent, parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.ggUserdata.nodeid=me.ggNodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
			me.__div=document.createElement('div');
			me.__div.setAttribute('style','visibility: inherit; overflow: visible;');
			me.__div.style.position='absolute';
			me.__div.style.left=parameter.left;
			me.__div.style.top=parameter.top;
			me.__div.style.width='';
			me.__div.style.height='';
			me.__div.style.width=parameter.width;
			me.__div.style.height=parameter.height;
			me.__div.ggIsActive = function() {
				return player.getCurrentNode()==me.ggNodeId;
			}
			me.__div.ggElementNodeId=function() {
				return me.ggNodeId;
			}
		el=me._text_amostras=document.createElement('div');
		el.isDragging = function() {
			let scrollerParent = me._text_amostras;
			while ((scrollerParent = scrollerParent.parentNode) != null) {
				if (scrollerParent.hasOwnProperty('ggIsDragging') && scrollerParent.ggIsDragging == true) return true;
			}
			return false;
		}
		els=me._text_amostras__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text_amostras";
		el.ggDx=-3;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1,def:'' };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		el.userData=el;
		hs ='';
		hs+='background : #9c1406;';
		hs+='border : 0px solid #000000;';
		hs+='color : rgba(255,255,255,1);';
		hs+='cursor : default;';
		hs+='height : 90%;';
		hs+='left : calc(50% - ((61px + 0px) / 2) - 3px);';
		hs+='position : absolute;';
		hs+='top : calc(50% - ((90% + 0px) / 2) + 0px);';
		hs+='visibility : inherit;';
		hs+='width : 61px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style.transformOrigin='50% 50%';
		hs='';
		hs+='box-sizing: border-box;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='max-height: 100%;';
		hs+='font-size: 8px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='position: absolute;';
		hs+='top: 50%;';
		hs+='transform: translate(0, -50%);';
		hs+='white-space: pre;';
		hs+='padding: 0px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._text_amostras.ggUpdateText=function() {
			var params = [];
			params.push(String(player._(me.ggUserdata.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._text_amostras.ggUpdateText();
		player.addListener('changenode', function() {
			me._text_amostras.ggUpdateText();
		});
		el.appendChild(els);
		me._text_amostras.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._text_amostras.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((me._text_amostras.ggIsActive() == true))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._text_amostras.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._text_amostras.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._text_amostras.style.transition='background-color 0s';
				if (me._text_amostras.ggCurrentLogicStateBackgroundColor == 0) {
					me._text_amostras.style.backgroundColor="rgba(172,161,8,1)";
				}
				else {
					me._text_amostras.style.backgroundColor="rgba(156,20,6,1)";
				}
			}
		}
		me._text_amostras.onclick=function (e) {
			if (me._text_amostras.isDragging()) return;
			player.openNext("{"+me.ggNodeId+"}","");
		}
		me._text_amostras.ggUpdatePosition=function (useTransition) {
		}
		me.__div.appendChild(me._text_amostras);
		me._text_amostras.logicBlock_backgroundcolor();
			me.ggEvent_changenode=function(event) {
				me._text_amostras.logicBlock_backgroundcolor();
			};
	};
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		if (player.isInVR()) return;
		me.ggCurrentTime=new Date().getTime();
	};
	player.addListener('timer', me.skinTimerEvent);
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: normal; } .ggmarkdown p,.ggmarkdown h1,.ggmarkdown h2,.ggmarkdown h3,.ggmarkdown h4 { margin-top: 0px } .ggmarkdown { white-space:normal }'));
	document.head.appendChild(style);
	document.addEventListener('keyup', function(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			let activeElement = document.activeElement;
			if (activeElement.classList.contains('ggskin') && activeElement.onclick) activeElement.onclick();
		}
	});
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			let activeElement = document.activeElement;
			if (activeElement.classList.contains('ggskin') && activeElement.onmousedown) activeElement.onmousedown();
		}
	});
	document.addEventListener('keyup', function(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			let activeElement = document.activeElement;
			if (activeElement.classList.contains('ggskin') && activeElement.onmouseup) activeElement.onmouseup();
		}
	});
	me.skinTimerEvent();
	document.fonts.onloadingdone = () => {
		if (me.fontsLoaded < 3) {
			me.updateSize(me.divSkin);
			me.fontsLoaded++;
		}
	}
};