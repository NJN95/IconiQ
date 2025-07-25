// Garden Gnome Software - VR - Skin
// Pano2VR 7.1.8/20986
// Filename: custom_feather_vr.ggsk
// Generated 2025-07-25T15:14:56

function pano2vrVrSkin(player,base) {
	player.addVariable('node_cloner_vr_hasUp', 2, false, { ignoreInState: 0  });
	player.addVariable('node_cloner_vr_hasDown', 2, false, { ignoreInState: 0  });
	player.addVariable('open_image_hs', 0, "", { ignoreInState: 0  });
	player.addVariable('open_info_hs', 0, "", { ignoreInState: 0  });
	player.addVariable('open_video_hs', 0, "", { ignoreInState: 0  });
	var me=this;
	var skin=this;
	var flag=false;
	var vrSkinAdded=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.vrSkinObj=this;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
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
	var i;
	var hs,el,els,elo,ela,geometry,material;
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.skinGroup);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.userData.ggId)) r.push(e);
			} else {
				if (e.userData.ggId==id) r.push(e);
			}
			if (e.children.length > 0) {
				for(var i=0;i<e.children.length;i++) {
					stack.push(e.children[i]);
				}
			}
		}
		return r;
	}
	
	this.posInSkin=function(el, clonerParent) {
		var curParent = el.parent;
		var pos = {x: el.position.x, y: el.position.y};
		while (curParent && curParent != me.skinGroup) {
			pos.x += curParent.position.x;
			pos.y += curParent.position.y;
			if (curParent.parent) {
				curParent = curParent.parent;
			} else {
				curParent = clonerParent
			}
		}
		return pos;
	}
	
	this._=function(text, params) {
		return player._(text, params);
	}
	this.languageChanged=function() {
		if (!me.skinGroup) return;
		var stack=[];
		stack.push(me.skinGroup);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.userData && e.userData.ggUpdateText) {
				e.userData.ggUpdateText();
			}
			for(var i=0;i<e.children.length;i++) {
				stack.push(e.children[i]);
			}
		}
	}
	player.addListener('languagechanged', this.languageChanged);
	this.getElementVrPosition = function(el, x, y) {
		var vrPos = {};
		var renderableEl = el.parent && (el.parent.type == 'Mesh' || el.parent.type == 'Group');
		switch (el.userData.hanchor) {
			case 0:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) - ((renderableEl ? el.parent.userData.width : 800) / 200.0) + (x / 100.0) + (el.userData.width / 200.0);
			break;
			case 1:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) + (x / 100.0);
			break;
			case 2:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) + ((renderableEl ? el.parent.userData.width : 800) / 200.0) - (x / 100.0) - (el.userData.width / 200.0);
			break;
		}
		switch (el.userData.vanchor) {
			case 0:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) + ((renderableEl ? el.parent.userData.height : 600) / 200.0) - (y / 100.0) - (el.userData.height / 200.0);
			break;
			case 1:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) - (y / 100.0);
			break;
			case 2:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) - ((renderableEl ? el.parent.userData.height : 600) / 200.0) + (y / 100.0) + (el.userData.height / 200.0);
			break;
		}
		vrPos.x += el.userData.curScaleOffX;
		vrPos.y += el.userData.curScaleOffY;
		return vrPos;
	}
	this.skin_nodechangeCallback = function() {
		me.ggUserdata=player.userdata;
	};
	this.addSkin=function() {
		if (me.vrSkinAdded) return;
		me.vrSkinAdded = true;
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		this.skinGroup=player.getSkinGroup();
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(0.07);
		el.translateY(-1.76);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 640;
		el.userData.height = 115;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'thumbnails';
		el.userData.x = 0.07;
		el.userData.y = -1.76;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._thumbnails.material) me._thumbnails.material.opacity = v;
			me._thumbnails.visible = (v>0 && me._thumbnails.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._thumbnails.visible
			let parentEl = me._thumbnails.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._thumbnails.userData.opacity = v;
			v = v * me._thumbnails.userData.parentOpacity;
			me._thumbnails.userData.setOpacityInternal(v);
			for (let i = 0; i < me._thumbnails.children.length; i++) {
				let child = me._thumbnails.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._thumbnails.userData.parentOpacity = v;
			v = v * me._thumbnails.userData.opacity
			me._thumbnails.userData.setOpacityInternal(v);
			for (let i = 0; i < me._thumbnails.children.length; i++) {
				let child = me._thumbnails.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._thumbnails = el;
		el.userData.ggId="thumbnails";
		me._thumbnails.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsTour() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._thumbnails.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._thumbnails.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._thumbnails.ggCurrentLogicStateVisible == 0) {
			me._thumbnails.visible=false;
			me._thumbnails.userData.visible=false;
				}
				else {
			me._thumbnails.visible=((!me._thumbnails.material && Number(me._thumbnails.userData.opacity>0)) || Number(me._thumbnails.material.opacity)>0)?true:false;
			me._thumbnails.userData.visible=true;
				}
			}
		}
		me._thumbnails.logicBlock_visible();
		me._thumbnails.userData.ggUpdatePosition=function (useTransition) {
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(-2.45);
		el.translateY(0.075);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 150;
		el.userData.height = 100;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'node_cloner_vr';
		el.userData.x = -2.45;
		el.userData.y = 0.075;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._node_cloner_vr.material) me._node_cloner_vr.material.opacity = v;
			me._node_cloner_vr.visible = (v>0 && me._node_cloner_vr.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._node_cloner_vr.visible
			let parentEl = me._node_cloner_vr.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._node_cloner_vr.userData.opacity = v;
			v = v * me._node_cloner_vr.userData.parentOpacity;
			me._node_cloner_vr.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_cloner_vr.children.length; i++) {
				let child = me._node_cloner_vr.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._node_cloner_vr.userData.parentOpacity = v;
			v = v * me._node_cloner_vr.userData.opacity
			me._node_cloner_vr.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_cloner_vr.children.length; i++) {
				let child = me._node_cloner_vr.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._node_cloner_vr = el;
		el.userData.ggNumRepeat = 1;
		el.userData.ggNumRows = 0;
		el.userData.ggNumCols = 0;
		el.userData.ggUpdating = false;
		el.userData.ggFilter = [];
		el.userData.ggInstances = [];
		el.getFilteredNodes = function(tourNodes, filter) {
			var filteredNodes = [];
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j].trim()) == -1) passed = false;
					}
				}
				if (passed) {
					filteredNodes.push(nodeId);
				}
			}
			return filteredNodes;
		}
		el.userData.ggUpdate = function(filter) {
			if(me._node_cloner_vr.userData.ggUpdating == true) return;
			me._node_cloner_vr.userData.ggUpdating = true;
			var el=me._node_cloner_vr;
			var curNumRows = 0;
			curNumRows = me._node_cloner_vr.userData.ggNumRepeat;
			if (curNumRows < 1) curNumRows = 1;
			if (typeof filter=='object') {
				el.userData.ggFilter = filter;
			} else {
				filter = el.userData.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.userData.ggNumRows == curNumRows) && (el.userData.ggInstances.length > 0) && (filter.length === el.userData.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.userData.ggCurrentFilter[index] }) )) {
				me._node_cloner_vr.userData.ggUpdating = false;
				return;
			} else {
				el.userData.ggNumCols = 1;
				el.userData.ggNumRows = curNumRows;
			var centerOffsetHor = 0;
			var centerOffsetVert = 0;
				me._node_cloner_vr.userData.ggCloneOffsetChanged = false;
			}
			el.userData.ggCurrentFilter = filter;
			el.userData.ggInstances = [];
			el.remove(...el.children);
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var keepCloning = true;
			me._node_cloner_vr.userData.ggNumFilterPassed = 0;
			var firstNode;
			for (var i = 0; i < el.userData.ggTagTable.length; i++) {
				var cItem = el.userData.ggTagTable[i];
				firstNode = '';
				cItem.nodecount = 0;
				for (var j=0; j < tourNodes.length; j++) {
					var nodeData = player.getNodeUserdata(tourNodes[j]);
					if ((nodeData['tags'].indexOf(cItem.tag) != -1) || (cItem.tag=='')) {
						var passed = true;
						if (filter.length > 0) {
							for (var k=0; k < filter.length; k++) {
								if (nodeData['tags'].indexOf(filter[k].trim()) == -1) passed = false;
							}
						}
						if (passed) {
							cItem.nodecount++;
							if (firstNode == '') firstNode = tourNodes[j];
						}
					}
				}
				cItem.firstnode=firstNode;
				if (cItem.nodecount == 0) continue;
				me._node_cloner_vr.userData.ggNumFilterPassed++;
				var nodeId = {};
				nodeId['tag'] = cItem.tag;
				nodeId['title'] = cItem.title;
				nodeId['description'] = cItem.description;
				nodeId['nodecount'] = cItem.nodecount;
				nodeId['firstnode'] = cItem.firstnode;
				if (!keepCloning || i < me._node_cloner_vr.userData.ggCloneOffset) continue;
				var parameter={};
				parameter.top = -(centerOffsetVert / 100.0) - (row * me._node_cloner_vr.userData.height) / 100.0;
				parameter.left = (centerOffsetHor / 100.0) + (column * me._node_cloner_vr.userData.width) / 100.0;
				parameter.index=currentIndex;
				var inst = new SkinCloner_node_cloner_vr_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.userData.ggInstances.push(inst);
				var bbox = new THREE.Box3().setFromObject(inst.__obj);
				var clonerPosInSkin = skin.posInSkin(me._node_cloner_vr, me.ggParent);
				if (bbox.min.x + clonerPosInSkin.x >= -4 && bbox.max.x + clonerPosInSkin.x <= 4 && bbox.min.y + clonerPosInSkin.y >= -3 && bbox.max.y + clonerPosInSkin.y <= 3) el.add(inst.__obj);
				row++;
				if (row >= el.userData.ggNumRows) {
					row = 0;
					column++;
					el.userData.ggNumCols++;
				}
			}
			me._node_cloner_vr.userData.ggNodeCount = me._node_cloner_vr.userData.ggNumFilterPassed;
			me._node_cloner_vr.userData.ggUpdating = false;
			player.triggerEvent('clonerchanged');
		}
		el.userData.ggFilter = [];
		el.userData.ggTagTable = [
			{tag:"GF_Thumb",title:"Ground Floor",description:""},
			{tag:"apartment_thumb",title:"Apartment Floor",description:""},
			{tag:"12th_thumb",title:"12th Floor",description:""},
			{tag:"Roof_Floor_thumb",title:"Pool",description:""},
			{tag:"Theatre_thumb",title:"Mini theatre",description:""},
			];
		el.userData.ggId="node_cloner_vr";
		me._node_cloner_vr.userData.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnails.add(me._node_cloner_vr);
		width = 0.42;
		height = 0.42;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'page_up_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'page_up_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._page_up_bg.material.opacity = v * me._page_up_bg.userData.backgroundColorAlpha;
			if (me._page_up_bg.userData.ggSubElement) {
				me._page_up_bg.userData.ggSubElement.material.opacity = v
				me._page_up_bg.userData.ggSubElement.visible = (v>0 && me._page_up_bg.userData.visible);
			}
			me._page_up_bg.visible = (v>0 && me._page_up_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._page_up_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._page_up_bg.userData.backgroundColorAlpha = v;
			me._page_up_bg.userData.setOpacity(me._page_up_bg.userData.opacity);
		}
		el.translateX(3.34);
		el.translateY(0.065);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 42;
		el.userData.height = 42;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_up_bg';
		el.userData.x = 3.34;
		el.userData.y = 0.065;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._page_up_bg.visible
			let parentEl = me._page_up_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_up_bg.userData.opacity = v;
			v = v * me._page_up_bg.userData.parentOpacity;
			me._page_up_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up_bg.children.length; i++) {
				let child = me._page_up_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_up_bg.userData.parentOpacity = v;
			v = v * me._page_up_bg.userData.opacity
			me._page_up_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up_bg.children.length; i++) {
				let child = me._page_up_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_up_bg = el;
		el.userData.ggId="page_up_bg";
		me._page_up_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['page_up_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._page_up_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._page_up_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._page_up_bg.ggCurrentLogicStateScaling == 0) {
					me._page_up_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._page_up_bg.userData.transitions.length; i++) {
						if (me._page_up_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_up_bg.userData.transitions[i].interval);
							me._page_up_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._page_up_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_up_bg.scale.set(transition_scale.startScale.x + (me._page_up_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_up_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_up_bg.position.x = (me._page_up_bg.position.x - me._page_up_bg.userData.curScaleOffX) + scaleOffX;
						me._page_up_bg.userData.curScaleOffX = scaleOffX;
						me._page_up_bg.position.y = (me._page_up_bg.position.y - me._page_up_bg.userData.curScaleOffY) + scaleOffY;
						me._page_up_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_up_bg.userData.transitions.splice(me._page_up_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_up_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._page_up_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._page_up_bg.userData.transitions.length; i++) {
						if (me._page_up_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_up_bg.userData.transitions[i].interval);
							me._page_up_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._page_up_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_up_bg.scale.set(transition_scale.startScale.x + (me._page_up_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_up_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_up_bg.position.x = (me._page_up_bg.position.x - me._page_up_bg.userData.curScaleOffX) + scaleOffX;
						me._page_up_bg.userData.curScaleOffX = scaleOffX;
						me._page_up_bg.position.y = (me._page_up_bg.position.y - me._page_up_bg.userData.curScaleOffY) + scaleOffY;
						me._page_up_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_up_bg.userData.transitions.splice(me._page_up_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_up_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._page_up_bg.logicBlock_scaling();
		me._page_up_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('node_cloner_vr_hasUp') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._page_up_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._page_up_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._page_up_bg.ggCurrentLogicStateVisible == 0) {
			me._page_up_bg.visible=((!me._page_up_bg.material && Number(me._page_up_bg.userData.opacity>0)) || Number(me._page_up_bg.material.opacity)>0)?true:false;
			me._page_up_bg.userData.visible=true;
				}
				else {
			me._page_up_bg.visible=false;
			me._page_up_bg.userData.visible=false;
				}
			}
		}
		me._page_up_bg.logicBlock_visible();
		me._page_up_bg.userData.onclick=function (e) {
			skin.findElements('node_cloner_vr')[0].userData.ggGoUp();
		}
		me._page_up_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['page_up_bg']=true;
			me._page_up_bg.logicBlock_scaling();
		}
		me._page_up_bg.userData.ontouchend=function (e) {
			me._page_up_bg.logicBlock_scaling();
		}
		me._page_up_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['page_up_bg']=false;
			me._page_up_bg.logicBlock_scaling();
		}
		me._page_up_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.42, 0.42, 5, 5 );
		geometry.name = 'page_up_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAABcklEQVR4nO3bMYoCQRRF0TvSezAUDBpmdmFqYjLLNHEFrkIGOhAmdA8GE7Ti5Db89z7vhp3U59BVSVGQUkoppZRSSimllFJKKaXUro+yla/XDff7gWE4sd3+ls2xcHWg03QBvoAbsGMcf8pmWbBV9QDAGjgzTZ/VgyxRJeg3898JjVDrtjzwADwzg0KD7V8LCu1Q60GhFaoGKLRB1QGFFqhaoGCPqgcK1qiaoGCLqgsKlqjaoGCHqg8KVqgeoGCD6gMKFqheoCCP6gcK0qieoCCL6gsKkqjeoCCHqnCn9F4z3O7flzVwLJqmAahY/qCvLf/sxnwBWJL3GSp2foIzqCAmuIKKYoIjqDAmuIGKY4ITqAEmuICaYIIDqBEmqIOaYYIyqCEmqIKaYoIiqD'+
	'EmqIGaY4ISaANMUAFtggkKoI0woRq0GSbUPvxqhwm1VyBHmmGCxp1SG0yAoW7lYd/x8WxKKaWUUkoppZRSSimllFLD/gAnv9WwdCN4EQAAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'page_up_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(-0.01);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 42;
		el.userData.height = 42;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_up';
		el.userData.x = -0.01;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._page_up.material) me._page_up.material.opacity = v;
			me._page_up.visible = (v>0 && me._page_up.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._page_up.visible
			let parentEl = me._page_up.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_up.userData.opacity = v;
			v = v * me._page_up.userData.parentOpacity;
			me._page_up.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up.children.length; i++) {
				let child = me._page_up.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_up.userData.parentOpacity = v;
			v = v * me._page_up.userData.opacity
			me._page_up.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up.children.length; i++) {
				let child = me._page_up.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_up = el;
		el.userData.ggId="page_up";
		me._page_up.userData.ggUpdatePosition=function (useTransition) {
		}
		me._page_up_bg.add(me._page_up);
		me._thumbnails.add(me._page_up_bg);
		width = 0.42;
		height = 0.42;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'page_down_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'page_down_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._page_down_bg.material.opacity = v * me._page_down_bg.userData.backgroundColorAlpha;
			if (me._page_down_bg.userData.ggSubElement) {
				me._page_down_bg.userData.ggSubElement.material.opacity = v
				me._page_down_bg.userData.ggSubElement.visible = (v>0 && me._page_down_bg.userData.visible);
			}
			me._page_down_bg.visible = (v>0 && me._page_down_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._page_down_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._page_down_bg.userData.backgroundColorAlpha = v;
			me._page_down_bg.userData.setOpacity(me._page_down_bg.userData.opacity);
		}
		el.translateX(-3.34);
		el.translateY(0.065);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 42;
		el.userData.height = 42;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_down_bg';
		el.userData.x = -3.34;
		el.userData.y = 0.065;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._page_down_bg.visible
			let parentEl = me._page_down_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_down_bg.userData.opacity = v;
			v = v * me._page_down_bg.userData.parentOpacity;
			me._page_down_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down_bg.children.length; i++) {
				let child = me._page_down_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_down_bg.userData.parentOpacity = v;
			v = v * me._page_down_bg.userData.opacity
			me._page_down_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down_bg.children.length; i++) {
				let child = me._page_down_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_down_bg = el;
		el.userData.ggId="page_down_bg";
		me._page_down_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['page_down_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._page_down_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._page_down_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._page_down_bg.ggCurrentLogicStateScaling == 0) {
					me._page_down_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._page_down_bg.userData.transitions.length; i++) {
						if (me._page_down_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_down_bg.userData.transitions[i].interval);
							me._page_down_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._page_down_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_down_bg.scale.set(transition_scale.startScale.x + (me._page_down_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_down_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_down_bg.position.x = (me._page_down_bg.position.x - me._page_down_bg.userData.curScaleOffX) + scaleOffX;
						me._page_down_bg.userData.curScaleOffX = scaleOffX;
						me._page_down_bg.position.y = (me._page_down_bg.position.y - me._page_down_bg.userData.curScaleOffY) + scaleOffY;
						me._page_down_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_down_bg.userData.transitions.splice(me._page_down_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_down_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._page_down_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._page_down_bg.userData.transitions.length; i++) {
						if (me._page_down_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_down_bg.userData.transitions[i].interval);
							me._page_down_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._page_down_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_down_bg.scale.set(transition_scale.startScale.x + (me._page_down_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_down_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_down_bg.position.x = (me._page_down_bg.position.x - me._page_down_bg.userData.curScaleOffX) + scaleOffX;
						me._page_down_bg.userData.curScaleOffX = scaleOffX;
						me._page_down_bg.position.y = (me._page_down_bg.position.y - me._page_down_bg.userData.curScaleOffY) + scaleOffY;
						me._page_down_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_down_bg.userData.transitions.splice(me._page_down_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_down_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._page_down_bg.logicBlock_scaling();
		me._page_down_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('node_cloner_vr_hasDown') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._page_down_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._page_down_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._page_down_bg.ggCurrentLogicStateVisible == 0) {
			me._page_down_bg.visible=((!me._page_down_bg.material && Number(me._page_down_bg.userData.opacity>0)) || Number(me._page_down_bg.material.opacity)>0)?true:false;
			me._page_down_bg.userData.visible=true;
				}
				else {
			me._page_down_bg.visible=false;
			me._page_down_bg.userData.visible=false;
				}
			}
		}
		me._page_down_bg.logicBlock_visible();
		me._page_down_bg.userData.onclick=function (e) {
			skin.findElements('node_cloner_vr')[0].userData.ggGoDown();
		}
		me._page_down_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['page_down_bg']=true;
			me._page_down_bg.logicBlock_scaling();
		}
		me._page_down_bg.userData.ontouchend=function (e) {
			me._page_down_bg.logicBlock_scaling();
		}
		me._page_down_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['page_down_bg']=false;
			me._page_down_bg.logicBlock_scaling();
		}
		me._page_down_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.42, 0.42, 5, 5 );
		geometry.name = 'page_down_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAABaUlEQVR4nO3bMUoDURhF4aNkDymFFAPiKrICmyzTxhVkFwopApbuIYVFFA2mDLx7H+dsYH4+eDMPfgbMzMzMzMzMzMzMzMym6270ADfteHzgdHpmtXpls/kYMcI8oIfDI7AH1sAby/I0Yoz7EQ+9eZeYQ+sH/Y/5CexGjdN95K9jblmW91Ej9YIGYkIraCgmNIIGY0IbaDgmNIEWYEILaAkmNIAWYUI6aBkmJIMWYkIqaCkmJIIWY0IaaDkmJIFOgAkpoJNgQgLoRJgwGnQyTBgJOiEmjF2BvHC5A6rHhBl2SmGNBN1xPuY/7b9fA9X5UbpxXptu3HhQmAo1AxSmQc0BhSlQs0ChHjUPFKpRM0GhFjUXFCpRs0GhDjUfFKpQO0ChBrUHFCpQu0AhHr'+
	'UPFKJRO0EhFrUXFCJRu0EhDrV/p3SG2/K7TllzXgAOqR8UrqEOq//I/y3g51kzMzMzMzMzMzMzM7MJ+wIQ7NY29+tQMAAAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'page_down_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 42;
		el.userData.height = 42;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_down';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.050);
		el.renderOrder = 5;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._page_down.material) me._page_down.material.opacity = v;
			me._page_down.visible = (v>0 && me._page_down.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._page_down.visible
			let parentEl = me._page_down.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_down.userData.opacity = v;
			v = v * me._page_down.userData.parentOpacity;
			me._page_down.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down.children.length; i++) {
				let child = me._page_down.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_down.userData.parentOpacity = v;
			v = v * me._page_down.userData.opacity
			me._page_down.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down.children.length; i++) {
				let child = me._page_down.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_down = el;
		el.userData.ggId="page_down";
		me._page_down.userData.ggUpdatePosition=function (useTransition) {
		}
		me._page_down_bg.add(me._page_down);
		me._thumbnails.add(me._page_down_bg);
		me.skinGroup.add(me._thumbnails);
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(-3.27);
		el.translateY(2.27);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 46;
		el.userData.height = 46;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = '_close_skin';
		el.userData.x = -3.27;
		el.userData.y = 2.27;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me.__close_skin.material) me.__close_skin.material.opacity = v;
			me.__close_skin.visible = (v>0 && me.__close_skin.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me.__close_skin.visible
			let parentEl = me.__close_skin.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me.__close_skin.userData.opacity = v;
			v = v * me.__close_skin.userData.parentOpacity;
			me.__close_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me.__close_skin.children.length; i++) {
				let child = me.__close_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me.__close_skin.userData.parentOpacity = v;
			v = v * me.__close_skin.userData.opacity
			me.__close_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me.__close_skin.children.length; i++) {
				let child = me.__close_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me.__close_skin = el;
		el.userData.ggId="_close_skin";
		me.__close_skin.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.46;
		height = 0.46;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'exit_vr_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'exit_vr_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._exit_vr.material.opacity = v * me._exit_vr.userData.backgroundColorAlpha;
			if (me._exit_vr.userData.ggSubElement) {
				me._exit_vr.userData.ggSubElement.material.opacity = v
				me._exit_vr.userData.ggSubElement.visible = (v>0 && me._exit_vr.userData.visible);
			}
			me._exit_vr.visible = (v>0 && me._exit_vr.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._exit_vr.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._exit_vr.userData.backgroundColorAlpha = v;
			me._exit_vr.userData.setOpacity(me._exit_vr.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.55);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 46;
		el.userData.height = 46;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'exit_vr';
		el.userData.x = 0;
		el.userData.y = -0.55;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._exit_vr.visible
			let parentEl = me._exit_vr.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._exit_vr.userData.opacity = v;
			v = v * me._exit_vr.userData.parentOpacity;
			me._exit_vr.userData.setOpacityInternal(v);
			for (let i = 0; i < me._exit_vr.children.length; i++) {
				let child = me._exit_vr.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._exit_vr.userData.parentOpacity = v;
			v = v * me._exit_vr.userData.opacity
			me._exit_vr.userData.setOpacityInternal(v);
			for (let i = 0; i < me._exit_vr.children.length; i++) {
				let child = me._exit_vr.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._exit_vr = el;
		el.userData.ggId="exit_vr";
		me._exit_vr.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['exit_vr'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._exit_vr.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._exit_vr.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._exit_vr.ggCurrentLogicStateScaling == 0) {
					me._exit_vr.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._exit_vr.userData.transitions.length; i++) {
						if (me._exit_vr.userData.transitions[i].property == 'scale') {
							clearInterval(me._exit_vr.userData.transitions[i].interval);
							me._exit_vr.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._exit_vr.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._exit_vr.scale.set(transition_scale.startScale.x + (me._exit_vr.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._exit_vr.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._exit_vr.position.x = (me._exit_vr.position.x - me._exit_vr.userData.curScaleOffX) + scaleOffX;
						me._exit_vr.userData.curScaleOffX = scaleOffX;
						me._exit_vr.position.y = (me._exit_vr.position.y - me._exit_vr.userData.curScaleOffY) + scaleOffY;
						me._exit_vr.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._exit_vr.userData.transitions.splice(me._exit_vr.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._exit_vr.userData.transitions.push(transition_scale);
				}
				else {
					me._exit_vr.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._exit_vr.userData.transitions.length; i++) {
						if (me._exit_vr.userData.transitions[i].property == 'scale') {
							clearInterval(me._exit_vr.userData.transitions[i].interval);
							me._exit_vr.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._exit_vr.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._exit_vr.scale.set(transition_scale.startScale.x + (me._exit_vr.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._exit_vr.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._exit_vr.position.x = (me._exit_vr.position.x - me._exit_vr.userData.curScaleOffX) + scaleOffX;
						me._exit_vr.userData.curScaleOffX = scaleOffX;
						me._exit_vr.position.y = (me._exit_vr.position.y - me._exit_vr.userData.curScaleOffY) + scaleOffY;
						me._exit_vr.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._exit_vr.userData.transitions.splice(me._exit_vr.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._exit_vr.userData.transitions.push(transition_scale);
				}
			}
		}
		me._exit_vr.logicBlock_scaling();
		me._exit_vr.userData.onclick=function (e) {
			player.exitVR();
			player.setVRSkinVisibility("0");
		}
		me._exit_vr.userData.onmouseenter=function (e) {
			me.elementMouseOver['exit_vr']=true;
			me._exit_vr.logicBlock_scaling();
		}
		me._exit_vr.userData.ontouchend=function (e) {
			me._exit_vr.logicBlock_scaling();
		}
		me._exit_vr.userData.onmouseleave=function (e) {
			me.elementMouseOver['exit_vr']=false;
			me._exit_vr.logicBlock_scaling();
		}
		me._exit_vr.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.37, 0.37, 5, 5 );
		geometry.name = 'exit_vr_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABKCAYAAAAc0MJxAAAGTUlEQVR4nO3baYjcZBzH8e8/M9vDWrHHC5ex1bV5JlKrRVREEMRSVHwhKHWxYhVvvFDwoL7TgmdBvFA8UKiIxXoWsSJVUYtVaPVN3d1MYq0uq4IWK7UutTP5+2IOZ3eOnUxmN2lnf6+yT548+eeTTWYmB0wnZFx3Ib6/KO4ykhoLKCKJeATBbjzv8phrSmSKUKnUbOBoII3qG9NYtSlC2fYwIlcCBSA1jVUbGfOX512O6htACiggshpjNsVSWcIiNS3TWHVTCwWTg5XL3YnIOZHGGB/V7WSzT3V0zAapDwWdxdq9+wTy+T1tLTtRRJZhzPeTMnZV0g3nGLMJz6OCVTzB0xbWoUOzkTH7ZG/oMcZmQWVKpPHO7mAaQ0FnscpRvQPHebbt5QFc93ZEng'+
	'GgUMhHGqvFWBP2MGYTIqvp8q8OE0NBdCzL2gsU97zIr+HLjD+tQUE0LGN+B84FVmHMO+0UGndah4JoWNnsN2SzbyOi4cuMP+GgoGvPWeGhoCux2oOCrsNqHwq6CisaFHQNVnQo6AqszkDBEY/VOSg4orE6CwVHLFbzqwfVUU3huotJp+e00HsQuA/V9RSxNuL787DtF0NXODDQy4wZC8a0qfaipS/4lmXw/da3o5x8/gCO8zMihVa6T3wt54cfFlMorAWuAOaFLmjM2uR+jHm05f6+fwZBsB3oibTexvkT2IhlPYJtDzfr2PzQ87x+CoUB4BaiIgGoPhTqMFRdyOQhQXGbbiEIBvG8/mYdm10KXoXqm1V9tqK6E5EfUW3p37US1TOxrBsp7pjWLyurCrncRUCmTt2nIbIP1Z9C1QIgkkK1D5EzgJXltSHSjzFv1V2k'+
	'7kADA72k0y4wF/gV1atxnK2hC6pOUu/uuO5KRDYAvcB+8nmHpUtrrpnVP/RSqXspIoHq9ZGRILmfho6zFdUbSn/NLW17TWqhVAWR8vG6HcfZ0rGikov1IfA1ACL9qNYcabVQQ0PzKZ8TVL/reFFJxYLytmZKBmNS79CbW5kSCX+ibCXJxNpTNT13/MyJvpkHHS2lOsnDarqtnf8JEybJw2qYeKHgsMGKHwoOC6xkQEHisZIDBYnGShYUJBYreVCQSKxkQkHisJILBYnCSjYUJAYr+VCQCKzwF+UnI7t2zWfmzEuB01G9jOJFNBBZQzr9AX19+yblMckQiRfqs8/SZDK3AetQPaZmvuprHDp0gFzuMUZGHokTK75Dz/OOJ5PZATwJlJHq/YKfA6wjk9nC8PDsuA7DeKB83yYItgHLSy17UL0MkaPIZgVjLFSPR/Ua4I'+
	'9Sn5WMjm7B846JA2vqoXx/GYXCl4icAIDIe4yOLsNx3sWYg6U2xXFGcJwN9PScCnxbWvo84BMGBxdMNdZEUJ2FdN2zCILPETkOAJGXse1VLF9+oOEyfX2/kUqtALYBxVtfqdTnDAz0TiVWLYRl/V2ZFlncsTV53nmIfArML439BLZ9U0u3tJcs+Ys5cy4EPi61nEI6/SWDgydOFVYtVDa7F9XfAFBdXjO/nbjuxah+RPHlSRB5ANu+J9QTwpnMP4hcArxballCKrUN1z25Q1gHK1OqB8fPrIUSUSyrfLf0XIaGVoRc4dh4Xj8i7wOzSkXcjTEPtvUYtTEHGRnpR/W1UksGkS/wvNMjY/377+vAq8B99W6A1r9T7PuLCIIh4CjgZyxrNbb9VaiNUrXI5e5CZD3FHaKo3ozjvBRqnMZjP4PIraWWArAGYzbi+6sm4450'+
	's2cP1qC6oVwaqpsR2YnIboKg8XnFsnpQNcAFwNlVy1+J42yMWnAlxecSHkZkbaWteA58G5EsQXAHxR0UAGvJZtdHWV3zx35yuWuB54GZEdaxH5GrMGZzhDEax/OuQ/Vxql9NqxeR2zDmuXZX0/zjP5t9lVTq1NI54Z+QY+8DXkBk6aQhARjzCoWCg+pzwP6G/VSfjvJp2PpLgbt2zWDWrCyqR0/YNwj28csvPuefPyXv0lWyY0cPxx7rjKtxBarriHjOmpK3J2NPBx456g4oiIzVPVAQCau7oKBtrO6DgrawuhMKQmN1LxSEwupuKGgZaxoKWsKahipnAqxpqOo0wZqGGp+xWHks6yRse/jwuKU+lfn/Smke+JtCYTTukpId31+E6y6Mu4zDLv8Bu+dYK47UurkAAAAASUVORK5CYII=');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'exit_vr_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 37;
		el.userData.height = 37;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'exit_vr_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._exit_vr_icon.material) me._exit_vr_icon.material.opacity = v;
			me._exit_vr_icon.visible = (v>0 && me._exit_vr_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._exit_vr_icon.visible
			let parentEl = me._exit_vr_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._exit_vr_icon.userData.opacity = v;
			v = v * me._exit_vr_icon.userData.parentOpacity;
			me._exit_vr_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._exit_vr_icon.children.length; i++) {
				let child = me._exit_vr_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._exit_vr_icon.userData.parentOpacity = v;
			v = v * me._exit_vr_icon.userData.opacity
			me._exit_vr_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._exit_vr_icon.children.length; i++) {
				let child = me._exit_vr_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._exit_vr_icon = el;
		el.userData.ggId="exit_vr_icon";
		me._exit_vr_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._exit_vr.add(me._exit_vr_icon);
		me.__close_skin.add(me._exit_vr);
		width = 0.46;
		height = 0.46;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'close_skin_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'close_skin_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._close_skin.material.opacity = v * me._close_skin.userData.backgroundColorAlpha;
			if (me._close_skin.userData.ggSubElement) {
				me._close_skin.userData.ggSubElement.material.opacity = v
				me._close_skin.userData.ggSubElement.visible = (v>0 && me._close_skin.userData.visible);
			}
			me._close_skin.visible = (v>0 && me._close_skin.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._close_skin.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._close_skin.userData.backgroundColorAlpha = v;
			me._close_skin.userData.setOpacity(me._close_skin.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 46;
		el.userData.height = 46;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'close_skin';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._close_skin.visible
			let parentEl = me._close_skin.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._close_skin.userData.opacity = v;
			v = v * me._close_skin.userData.parentOpacity;
			me._close_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me._close_skin.children.length; i++) {
				let child = me._close_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._close_skin.userData.parentOpacity = v;
			v = v * me._close_skin.userData.opacity
			me._close_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me._close_skin.children.length; i++) {
				let child = me._close_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._close_skin = el;
		el.userData.ggId="close_skin";
		me._close_skin.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['close_skin'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._close_skin.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._close_skin.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._close_skin.ggCurrentLogicStateScaling == 0) {
					me._close_skin.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._close_skin.userData.transitions.length; i++) {
						if (me._close_skin.userData.transitions[i].property == 'scale') {
							clearInterval(me._close_skin.userData.transitions[i].interval);
							me._close_skin.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._close_skin.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._close_skin.scale.set(transition_scale.startScale.x + (me._close_skin.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._close_skin.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._close_skin.position.x = (me._close_skin.position.x - me._close_skin.userData.curScaleOffX) + scaleOffX;
						me._close_skin.userData.curScaleOffX = scaleOffX;
						me._close_skin.position.y = (me._close_skin.position.y - me._close_skin.userData.curScaleOffY) + scaleOffY;
						me._close_skin.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._close_skin.userData.transitions.splice(me._close_skin.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._close_skin.userData.transitions.push(transition_scale);
				}
				else {
					me._close_skin.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._close_skin.userData.transitions.length; i++) {
						if (me._close_skin.userData.transitions[i].property == 'scale') {
							clearInterval(me._close_skin.userData.transitions[i].interval);
							me._close_skin.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._close_skin.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._close_skin.scale.set(transition_scale.startScale.x + (me._close_skin.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._close_skin.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._close_skin.position.x = (me._close_skin.position.x - me._close_skin.userData.curScaleOffX) + scaleOffX;
						me._close_skin.userData.curScaleOffX = scaleOffX;
						me._close_skin.position.y = (me._close_skin.position.y - me._close_skin.userData.curScaleOffY) + scaleOffY;
						me._close_skin.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._close_skin.userData.transitions.splice(me._close_skin.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._close_skin.userData.transitions.push(transition_scale);
				}
			}
		}
		me._close_skin.logicBlock_scaling();
		me._close_skin.userData.onclick=function (e) {
			player.setVRSkinVisibility("0");
		}
		me._close_skin.userData.onmouseenter=function (e) {
			me.elementMouseOver['close_skin']=true;
			me._close_skin.logicBlock_scaling();
		}
		me._close_skin.userData.ontouchend=function (e) {
			me._close_skin.logicBlock_scaling();
		}
		me._close_skin.userData.onmouseleave=function (e) {
			me.elementMouseOver['close_skin']=false;
			me._close_skin.logicBlock_scaling();
		}
		me._close_skin.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.44, 0.44, 5, 5 );
		geometry.name = 'close_skin_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAACDElEQVR4nO3bQU7CQBiG4VfDLdrL9BiwwJ0Lj8ROE/QYs/ISdNvegkQXtooEDOr8na/6PYnRsIDpa63QmQEzMzMzMzMzMzMzMzMzi3SV/RlTWlDXtwB03Yam2Wd/jZzmNl7a9o7d7mX42pLSovSQzkppwW63fR9v297lfonr3E94ZEVV3UtGTmlBVd0Dq8iXyR+46zbA48EjepFPx30cxp5V/mswnD+Avr8pfo2beGwxgUEzcoExxQUGrciFxhIbGDQiFxxDfGAoG7nwL3iawFDmQAX+eqYLDNMesEBcmDowTHPgInGhRGCIDSAUF0oFhpgQYnGhZGDIG0QwLpQODHnCiMYFhcDwu0DCcUElMPwslHhcUAoM3ws2g7igFhguCzeTuKAYGL4OCMwlLq'+
	'gGhnORn4bvy4PHZOOCcmC4ZN5MOi6oB4Yx8gOfz1qAJ/p+rRwX4meV/z3twB+XiOOzF2ApN1t9gu4l4o/8k9M8g8+/TVvT92vU110c0DuD/UEjkD8qB/LNnkC+XRnIN9wDecookCc9A3naPpAXngTy0qlAXvwXyMtXAwmcRX93AbZC3MJj8SaYWW6CUYw7mv02LuW4ownHmH9G421jtW5cgKbZD4tYPs+MjJvCM4qeMtKLOzodObv881hdt6GuP35WjDtqmj0p3VDXzwARe5XNzMzMzMzMzMzMzMzMLNYrJj5btLoCV6EAAAAASUVORK5CYII=');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'close_skin_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 44;
		el.userData.height = 44;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'close_skin_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.050);
		el.renderOrder = 5;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._close_skin_icon.material) me._close_skin_icon.material.opacity = v;
			me._close_skin_icon.visible = (v>0 && me._close_skin_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._close_skin_icon.visible
			let parentEl = me._close_skin_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._close_skin_icon.userData.opacity = v;
			v = v * me._close_skin_icon.userData.parentOpacity;
			me._close_skin_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._close_skin_icon.children.length; i++) {
				let child = me._close_skin_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._close_skin_icon.userData.parentOpacity = v;
			v = v * me._close_skin_icon.userData.opacity
			me._close_skin_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._close_skin_icon.children.length; i++) {
				let child = me._close_skin_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._close_skin_icon = el;
		el.userData.ggId="close_skin_icon";
		me._close_skin_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._close_skin.add(me._close_skin_icon);
		me.__close_skin.add(me._close_skin);
		me.player.setVRHideSkinButton(me.__close_skin);
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(-3.27);
		el.translateY(2.27);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 46;
		el.userData.height = 46;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = '_open_skin';
		el.userData.x = -3.27;
		el.userData.y = 2.27;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me.__open_skin.material) me.__open_skin.material.opacity = v;
			me.__open_skin.visible = (v>0 && me.__open_skin.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me.__open_skin.visible
			let parentEl = me.__open_skin.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me.__open_skin.userData.opacity = v;
			v = v * me.__open_skin.userData.parentOpacity;
			me.__open_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me.__open_skin.children.length; i++) {
				let child = me.__open_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me.__open_skin.userData.parentOpacity = v;
			v = v * me.__open_skin.userData.opacity
			me.__open_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me.__open_skin.children.length; i++) {
				let child = me.__open_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me.__open_skin = el;
		el.userData.ggId="_open_skin";
		me.__open_skin.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.46;
		height = 0.46;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'open_skin_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'open_skin_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._open_skin.material.opacity = v * me._open_skin.userData.backgroundColorAlpha;
			if (me._open_skin.userData.ggSubElement) {
				me._open_skin.userData.ggSubElement.material.opacity = v
				me._open_skin.userData.ggSubElement.visible = (v>0 && me._open_skin.userData.visible);
			}
			me._open_skin.visible = (v>0 && me._open_skin.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._open_skin.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._open_skin.userData.backgroundColorAlpha = v;
			me._open_skin.userData.setOpacity(me._open_skin.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 46;
		el.userData.height = 46;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'open_skin';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._open_skin.visible
			let parentEl = me._open_skin.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._open_skin.userData.opacity = v;
			v = v * me._open_skin.userData.parentOpacity;
			me._open_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me._open_skin.children.length; i++) {
				let child = me._open_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._open_skin.userData.parentOpacity = v;
			v = v * me._open_skin.userData.opacity
			me._open_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me._open_skin.children.length; i++) {
				let child = me._open_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._open_skin = el;
		el.userData.ggId="open_skin";
		me._open_skin.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['open_skin'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._open_skin.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._open_skin.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._open_skin.ggCurrentLogicStateScaling == 0) {
					me._open_skin.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._open_skin.userData.transitions.length; i++) {
						if (me._open_skin.userData.transitions[i].property == 'scale') {
							clearInterval(me._open_skin.userData.transitions[i].interval);
							me._open_skin.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._open_skin.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._open_skin.scale.set(transition_scale.startScale.x + (me._open_skin.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._open_skin.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._open_skin.position.x = (me._open_skin.position.x - me._open_skin.userData.curScaleOffX) + scaleOffX;
						me._open_skin.userData.curScaleOffX = scaleOffX;
						me._open_skin.position.y = (me._open_skin.position.y - me._open_skin.userData.curScaleOffY) + scaleOffY;
						me._open_skin.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._open_skin.userData.transitions.splice(me._open_skin.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._open_skin.userData.transitions.push(transition_scale);
				}
				else {
					me._open_skin.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._open_skin.userData.transitions.length; i++) {
						if (me._open_skin.userData.transitions[i].property == 'scale') {
							clearInterval(me._open_skin.userData.transitions[i].interval);
							me._open_skin.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._open_skin.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._open_skin.scale.set(transition_scale.startScale.x + (me._open_skin.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._open_skin.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._open_skin.position.x = (me._open_skin.position.x - me._open_skin.userData.curScaleOffX) + scaleOffX;
						me._open_skin.userData.curScaleOffX = scaleOffX;
						me._open_skin.position.y = (me._open_skin.position.y - me._open_skin.userData.curScaleOffY) + scaleOffY;
						me._open_skin.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._open_skin.userData.transitions.splice(me._open_skin.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._open_skin.userData.transitions.push(transition_scale);
				}
			}
		}
		me._open_skin.logicBlock_scaling();
		me._open_skin.userData.onclick=function (e) {
			player.setVRSkinVisibility("1");
		}
		me._open_skin.userData.onmouseenter=function (e) {
			me.elementMouseOver['open_skin']=true;
			me._open_skin.logicBlock_scaling();
		}
		me._open_skin.userData.ontouchend=function (e) {
			me._open_skin.logicBlock_scaling();
		}
		me._open_skin.userData.onmouseleave=function (e) {
			me.elementMouseOver['open_skin']=false;
			me._open_skin.logicBlock_scaling();
		}
		me._open_skin.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.44, 0.44, 5, 5 );
		geometry.name = 'open_skin_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAADHUlEQVR4nO3XwYsbZRjH8e+zK7hs8FA020PQIsy8m5VCYW9CC/Vu0UtBdA8Vt9tzETz5FwjaW6HdlR6kQump+y+00HPxkGYmRVDiYbfiQQw5bPL0MDPJWFts30lP/X0gMPO8k+ed98nkfd8BEREREREREREREREREREREREREREREREREXm92UKy9Psd3N8GfqXb/XshOZ/mvkyWpQCEkGM2eSX9PHz4FvA+Zn+yvj5smq5ZgfP8A9z3gA/LyBHu1xmPv+HUqX+a3hwA7sZg8AXu3wNrZfQAs69JkpuY+UL6efCgxcrKd5jtAG+U0fvAV4TQi00bX+A8/wT3W8Cb/81qGWZnSJKD6PxQFfca7hef2W62S5JcalzkwWAN97u4h2e0jjH7jDS9E5N6Ke'+
	'qGiinhBvPijoDfgGKg7oHpdA/3Zv+Q4smtF/ew/FD2c5HB4PNGfbgb0+mPteI6xVhG5fkK7jfo9zsx6eMKbPYtcKw826fVahPCCSaTLvMCnOPRo7NR+aGYc4tpoTrfIU2Pk6bHcd+pxX/AfTm6n37/I+Dj8uyQyaRLCCdotdrAfhk/Vo75pcUVGE7Pjsyu0OkUv/bGRob77Vmb+5nI/JQLWjXnHhLCHmaOmRPCHvMfcm22+MVYXp6Pxf02GxsZAJ3OCLMrtStPEyG2wPKCYgt8b3bkfpnhcBWAXi9gdn7WZnY3+s5CyIFqkWyTZdu4G+5Glm0D7bLtoLw2zmQyH4vZeXq9Yi4eDldxv1y78h4R4hahfr+D2S/M5+ER8Bh4t5ZznzT9tNEKn+dbuP9Ui1TTQnsWMdsiTW9G9+Fu5Pkd4FwVAX4H3gFWy9hfTKcn6Xb/'+
	'eNn0cU/w+voQsy+BcRlZBd6jKm6xTdtuvH0q9rm7tUibfxd3lyT5uVEfZs7S0jZmWRWhGEtV3DFmF2KKC03m4GJfuEmxGa8c4X6V0WiTND18zjdfnJmX+9wt5tMFFC8aWwvZAwMkyQGj0SbuV4GjWst9YJM03X/ON/+XXpWftuBXZRERERERERERERERERERERERERERERERERF53T0BJ3sLsLQlCvEAAAAASUVORK5CYII=');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'open_skin_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 44;
		el.userData.height = 44;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'open_skin_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.050);
		el.renderOrder = 5;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._open_skin_icon.material) me._open_skin_icon.material.opacity = v;
			me._open_skin_icon.visible = (v>0 && me._open_skin_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._open_skin_icon.visible
			let parentEl = me._open_skin_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._open_skin_icon.userData.opacity = v;
			v = v * me._open_skin_icon.userData.parentOpacity;
			me._open_skin_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._open_skin_icon.children.length; i++) {
				let child = me._open_skin_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._open_skin_icon.userData.parentOpacity = v;
			v = v * me._open_skin_icon.userData.opacity
			me._open_skin_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._open_skin_icon.children.length; i++) {
				let child = me._open_skin_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._open_skin_icon = el;
		el.userData.ggId="open_skin_icon";
		me._open_skin_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._open_skin.add(me._open_skin_icon);
		me.__open_skin.add(me._open_skin);
		me.player.setVRShowSkinButton(me.__open_skin);
		me._thumbnails.logicBlock_visible();
		me._thumbnails.userData.setOpacity(1.00);
		me._node_cloner_vr.userData.setOpacity(1.00);
		me._node_cloner_vr.userData.ggUpdate();
		me._page_up_bg.logicBlock_scaling();
		me._page_up_bg.logicBlock_visible();
		me._page_up_bg.userData.setOpacity(1.00);
		me.elementMouseOver['page_up_bg']=false;
		me._page_up.userData.setOpacity(1.00);
		me._page_down_bg.logicBlock_scaling();
		me._page_down_bg.logicBlock_visible();
		me._page_down_bg.userData.setOpacity(1.00);
		me.elementMouseOver['page_down_bg']=false;
		me._page_down.userData.setOpacity(1.00);
		me._exit_vr.logicBlock_scaling();
		me._exit_vr.userData.setOpacity(1.00);
		me.elementMouseOver['exit_vr']=false;
		me._exit_vr_icon.userData.setOpacity(1.00);
		me._close_skin.logicBlock_scaling();
		me._close_skin.userData.setOpacity(1.00);
		me.elementMouseOver['close_skin']=false;
		me._close_skin_icon.userData.setOpacity(1.00);
		me._open_skin.logicBlock_scaling();
		me._open_skin.userData.setOpacity(1.00);
		me.elementMouseOver['open_skin']=false;
		me._open_skin_icon.userData.setOpacity(1.00);
		me.eventactivehotspotchangedCallback = function() {
			for(var i = 0; i < me._node_cloner_vr.userData.ggInstances.length; i++) {
				me._node_cloner_vr.userData.ggInstances[i].ggEvent_activehotspotchanged();
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_activehotspotchanged();
				}
			}
		};
		player.addListener('activehotspotchanged', me.eventactivehotspotchangedCallback);
		me.eventchangenodeCallback = function() {
			for(var i = 0; i < me._node_cloner_vr.userData.ggInstances.length; i++) {
				me._node_cloner_vr.userData.ggInstances[i].ggEvent_changenode();
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_changenode();
				}
			}
			me.skin_nodechangeCallback();
			me._page_up_bg.logicBlock_visible();
			me._page_down_bg.logicBlock_visible();
		};
		player.addListener('changenode', me.eventchangenodeCallback);
		me.eventconfigloadedCallback = function() {
			for(var i = 0; i < me._node_cloner_vr.userData.ggInstances.length; i++) {
				me._node_cloner_vr.userData.ggInstances[i].ggEvent_configloaded();
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_configloaded();
				}
			}
			me._thumbnails.logicBlock_visible();
			me._page_up_bg.logicBlock_visible();
			me._page_down_bg.logicBlock_visible();
		};
		player.addListener('configloaded', me.eventconfigloadedCallback);
		me.eventvarchanged_node_cloner_vr_hasDownCallback = function() {
			me._page_down_bg.logicBlock_visible();
		};
		player.addListener('varchanged_node_cloner_vr_hasDown', me.eventvarchanged_node_cloner_vr_hasDownCallback);
		me.eventvarchanged_node_cloner_vr_hasUpCallback = function() {
			me._page_up_bg.logicBlock_visible();
		};
		player.addListener('varchanged_node_cloner_vr_hasUp', me.eventvarchanged_node_cloner_vr_hasUpCallback);
		me.eventvarchanged_open_image_hsCallback = function() {
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_varchanged_open_image_hs();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_varchanged_open_image_hs();
				}
			}
		};
		player.addListener('varchanged_open_image_hs', me.eventvarchanged_open_image_hsCallback);
		me.eventvarchanged_open_info_hsCallback = function() {
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_varchanged_open_info_hs();
				}
			}
		};
		player.addListener('varchanged_open_info_hs', me.eventvarchanged_open_info_hsCallback);
		me.eventvarchanged_open_video_hsCallback = function() {
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_varchanged_open_video_hs();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_varchanged_open_video_hs();
				}
			}
		};
		player.addListener('varchanged_open_video_hs', me.eventvarchanged_open_video_hsCallback);
	};
	this.removeSkin=function() {
	};
	function SkinCloner_node_cloner_vr_Class(item, parentScope, ggParent, parameter) {
		var me=this;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggTag = item['tag'];
		me.ggTitle = item['title'];
		me.ggDescription = item['description'];
		me.ggNodeCount = item['nodecount'];
		me.ggNodeId=item['firstnode'];
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.ggUserdata.nodeId=me.ggNodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
			me.__obj = new THREE.Group;
			me.__obj.name = 'node_cloner_vr_subElement';
			me.__obj.position.x = parameter.left;
			me.__obj.position.y = parameter.top;
			me.__obj.userData.ggIsActive = function() {
				var tags = player.userdata.tags;
				if (tags.indexOf(me.ggTag) == -1) return false;
				for(var i=0;i<me.parent.userData.ggCurrentFilter.length;i++) {
					if (tags.indexOf(me.parent.userData.ggCurrentFilter[i])==-1) return false;
				}
				return true;
			}
			me.__obj.userData.ggElementNodeId=function() {
				return me.userData.ggNodeId;
			}
		width = 1.5;
		height = 0.92;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
		roundedRectShape.arc(0, -0.2, 0.2, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.arc(-0.2, 0, 0.2, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.arc(0, 0.2, 0.2, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
		roundedRectShape.arc(0.2, 0, 0.2, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'node_image_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		loader = new THREE.TextureLoader();
		el.userData.ggNodeId=nodeId;
		texture = loader.load(basePath + 'images_vr/node_image_' + nodeId + '.webp');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'node_image_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.87, 0.87, 1.0);
		el.userData.width = 150;
		el.userData.height = 92;
		el.userData.scale = {x: 0.87, y: 0.87, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'node_image';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._node_image.material) me._node_image.material.opacity = v;
			me._node_image.visible = (v>0 && me._node_image.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._node_image.visible
			let parentEl = me._node_image.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._node_image.userData.opacity = v;
			v = v * me._node_image.userData.parentOpacity;
			me._node_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_image.children.length; i++) {
				let child = me._node_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._node_image.userData.parentOpacity = v;
			v = v * me._node_image.userData.opacity
			me._node_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_image.children.length; i++) {
				let child = me._node_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._node_image = el;
		el.userData.ggId="node_image";
		me._node_image.userData.ggIsActive=function() {
			return player.getCurrentNode()==this.userData.ggElementNodeId();
		}
		el.userData.ggElementNodeId=function() {
			return this.userData.ggNodeId;
		}
		me._node_image.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['node_image'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._node_image.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._node_image.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._node_image.ggCurrentLogicStateScaling == 0) {
					me._node_image.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._node_image.userData.transitions.length; i++) {
						if (me._node_image.userData.transitions[i].property == 'scale') {
							clearInterval(me._node_image.userData.transitions[i].interval);
							me._node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._node_image.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._node_image.scale.set(transition_scale.startScale.x + (me._node_image.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._node_image.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._node_image.position.x = (me._node_image.position.x - me._node_image.userData.curScaleOffX) + scaleOffX;
						me._node_image.userData.curScaleOffX = scaleOffX;
						me._node_image.position.y = (me._node_image.position.y - me._node_image.userData.curScaleOffY) + scaleOffY;
						me._node_image.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._node_image.userData.transitions.splice(me._node_image.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._node_image.userData.transitions.push(transition_scale);
				}
				else {
					me._node_image.userData.transitionValue_scale = {x: 0.87, y: 0.87, z: 1.0};
					for (var i = 0; i < me._node_image.userData.transitions.length; i++) {
						if (me._node_image.userData.transitions[i].property == 'scale') {
							clearInterval(me._node_image.userData.transitions[i].interval);
							me._node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._node_image.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._node_image.scale.set(transition_scale.startScale.x + (me._node_image.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._node_image.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._node_image.position.x = (me._node_image.position.x - me._node_image.userData.curScaleOffX) + scaleOffX;
						me._node_image.userData.curScaleOffX = scaleOffX;
						me._node_image.position.y = (me._node_image.position.y - me._node_image.userData.curScaleOffY) + scaleOffY;
						me._node_image.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._node_image.userData.transitions.splice(me._node_image.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._node_image.userData.transitions.push(transition_scale);
				}
			}
		}
		me._node_image.logicBlock_scaling();
		me._node_image.userData.onclick=function (e) {
			player.openNext("{"+me.ggNodeId+"}","");
		}
		me._node_image.userData.onmouseenter=function (e) {
			me.elementMouseOver['node_image']=true;
			me._node_title.logicBlock_alpha();
			me._node_image.logicBlock_scaling();
		}
		me._node_image.userData.ontouchend=function (e) {
			me._node_image.logicBlock_scaling();
		}
		me._node_image.userData.onmouseleave=function (e) {
			me.elementMouseOver['node_image']=false;
			me._node_title.logicBlock_alpha();
			me._node_image.logicBlock_scaling();
		}
		me._node_image.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 1.5;
		height = 0.4;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.arc(-0.2, 0, 0.2, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.arc(0, 0.2, 0.2, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'node_title_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'node_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._node_title.material.opacity = v;
			if (me._node_title.userData.hasScrollbar) {
				me._node_title.userData.scrollbar.material.opacity = v;
				me._node_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._node_title.userData.ggSubElement) {
				me._node_title.userData.ggSubElement.material.opacity = v
				me._node_title.userData.ggSubElement.visible = (v>0 && me._node_title.userData.visible);
			}
			me._node_title.visible = (v>0 && me._node_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._node_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._node_title.userData.backgroundColorAlpha = v;
			me._node_title.userData.setOpacity(me._node_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.26);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 150;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'node_title';
		el.userData.x = 0;
		el.userData.y = -0.26;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._node_title.visible
			let parentEl = me._node_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._node_title.userData.opacity = v;
			v = v * me._node_title.userData.parentOpacity;
			me._node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_title.children.length; i++) {
				let child = me._node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._node_title.userData.parentOpacity = v;
			v = v * me._node_title.userData.opacity
			me._node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_title.children.length; i++) {
				let child = me._node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._node_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0, 0, 0).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0, 0.854902, 0.854902).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 300;
		canvas.height = 80;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._node_title.userData.totalHeightCanv = 2 * (18);
			me._node_title.userData.textLines = [];
			var ctx = me._node_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._node_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._node_title.userData.textLines.push(line);
					line = '';
					me._node_title.userData.totalHeightCanv += me._node_title.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._node_title.userData.width - 10 - (scrollbar ? 25 : 0))) && i > 0) {
					me._node_title.userData.textLines.push(line);
					line = words[i];
					me._node_title.userData.totalHeightCanv += me._node_title.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._node_title.userData.textLines.push(line);
			me._node_title.userData.totalHeightCanv += me._node_title.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._node_title.userData.textCanvas;
			var ctx = me._node_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._node_title.userData.backgroundColor.r * 255 + ', ' + me._node_title.userData.backgroundColor.g * 255 + ', ' + me._node_title.userData.backgroundColor.b * 255 + ', ' + me._node_title.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._node_title.userData.textColor.r * 255 + ', ' + me._node_title.userData.textColor.g * 255 + ', ' + me._node_title.userData.textColor.b * 255 + ', ' + me._node_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._node_title.userData.boxWidthCanv - (me._node_title.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 13;
			y += (canv.height - me._node_title.userData.totalHeightCanv - (2 * 5)) / 2;
			for (var i = 0; i < me._node_title.userData.textLines.length; i++) {
				ctx.fillText(me._node_title.userData.textLines[i], x, y);
				y += me._node_title.userData.lineHeightCanv;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'node_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._node_title.material.map) {
				me._node_title.material.map.dispose();
			}
			me._node_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._node_title.children.length; i++) {
				let child = me._node_title.children[i];
				if (child.name.includes('scrollbar')) me._node_title.remove(child);
			}
			var canv = me._node_title.userData.textCanvas;
			var ctx = me._node_title.userData.textCanvasContext;
			ctx.font = '32px Verdana';
			me._node_title.userData.lineHeightCanv = 32 * 1.2;
			me._node_title.userData.ggWrapText(false);
			me._node_title.userData.boxWidthCanv = 2 * me._node_title.userData.width;
			me._node_title.userData.boxHeightCanv = 2 * me._node_title.userData.height;
			me._node_title.userData.hasScrollbar = false;
			canv.width = me._node_title.userData.boxWidthCanv;
			canv.height = me._node_title.userData.boxHeightCanv;
			ctx.font = '32px Verdana';
			me._node_title.userData.ggPaintCanvasText();
		}
		me._node_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(me.ggUserdata.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._node_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._node_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._node_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._node_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._node_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._node_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="node_title";
		me._node_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['node_image'] == true)) && 
				((me.ggUserdata.title != ""))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._node_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._node_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._node_title.ggCurrentLogicStateAlpha == 0) {
					me._node_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._node_title.userData.transitions.length; i++) {
						if (me._node_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._node_title.userData.transitions[i].interval);
							me._node_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._node_title.material ? me._node_title.material.opacity : me._node_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._node_title.userData.setOpacity(transition_alpha.startAlpha + (me._node_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._node_title.userData.transitions.splice(me._node_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._node_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._node_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._node_title.userData.transitions.length; i++) {
						if (me._node_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._node_title.userData.transitions[i].interval);
							me._node_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._node_title.material ? me._node_title.material.opacity : me._node_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._node_title.userData.setOpacity(transition_alpha.startAlpha + (me._node_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._node_title.userData.transitions.splice(me._node_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._node_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._node_title.logicBlock_alpha();
		me._node_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._node_image.add(me._node_title);
		me.__obj.add(me._node_image);
		me._node_image.logicBlock_scaling();
		me._node_image.userData.setOpacity(1.00);
		me.elementMouseOver['node_image']=false;
		me._node_title.logicBlock_alpha();
		me._node_title.userData.setOpacity(0.00);
			me.ggEvent_activehotspotchanged=function() {
				me._node_title.logicBlock_alpha();
			};
			me.ggEvent_changenode=function() {
				me._node_title.logicBlock_alpha();
			};
			me.ggEvent_configloaded=function() {
				me._node_title.logicBlock_alpha();
			};
	};
	function SkinHotspotClass_ht_video_url(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_video_url';
		el.userData.x = 3.28;
		el.userData.y = 2.08;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url.visible
			let parentEl = me._ht_video_url.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url.userData.opacity = v;
			v = v * me._ht_video_url.userData.parentOpacity;
			me._ht_video_url.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url.children.length; i++) {
				let child = me._ht_video_url.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url.userData.parentOpacity = v;
			v = v * me._ht_video_url.userData.opacity
			me._ht_video_url.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url.children.length; i++) {
				let child = me._ht_video_url.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url = el;
		el.userData.ggId="ht_video_url";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_url.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_url']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_url']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_video_url_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_url_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_url_bg.material.opacity = v * me._ht_video_url_bg.userData.backgroundColorAlpha;
			if (me._ht_video_url_bg.userData.ggSubElement) {
				me._ht_video_url_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_url_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_url_bg.userData.visible);
			}
			me._ht_video_url_bg.visible = (v>0 && me._ht_video_url_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_bg.userData.backgroundColorAlpha = v;
			me._ht_video_url_bg.userData.setOpacity(me._ht_video_url_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_bg.visible
			let parentEl = me._ht_video_url_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_bg.userData.opacity = v;
			v = v * me._ht_video_url_bg.userData.parentOpacity;
			me._ht_video_url_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_bg.children.length; i++) {
				let child = me._ht_video_url_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_bg.userData.parentOpacity = v;
			v = v * me._ht_video_url_bg.userData.opacity
			me._ht_video_url_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_bg.children.length; i++) {
				let child = me._ht_video_url_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_bg = el;
		el.userData.ggId="ht_video_url_bg";
		me._ht_video_url_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_video_url_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_url_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_url_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_url_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_url_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_url_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_bg.position.x = (me._ht_video_url_bg.position.x - me._ht_video_url_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_bg.position.y = (me._ht_video_url_bg.position.y - me._ht_video_url_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_url_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_url_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_bg.position.x = (me._ht_video_url_bg.position.x - me._ht_video_url_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_bg.position.y = (me._ht_video_url_bg.position.y - me._ht_video_url_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_url_bg.logicBlock_scaling();
		me._ht_video_url_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_url_bg.ggCurrentLogicStateVisible == 0) {
			me._ht_video_url_bg.visible=((!me._ht_video_url_bg.material && Number(me._ht_video_url_bg.userData.opacity>0)) || Number(me._ht_video_url_bg.material.opacity)>0)?true:false;
			me._ht_video_url_bg.userData.visible=true;
				}
				else {
			me._ht_video_url_bg.visible=false;
			me._ht_video_url_bg.userData.visible=false;
				}
			}
		}
		me._ht_video_url_bg.logicBlock_visible();
		me._ht_video_url_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_url_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_bg.material ? me._ht_video_url_bg.material.opacity : me._ht_video_url_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_url_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_bg.material ? me._ht_video_url_bg.material.opacity : me._ht_video_url_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_url_bg.logicBlock_alpha();
		me._ht_video_url_bg.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs') + "<"+me.hotspot.id+">");
			me._ht_video_url_popup.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_url_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_video_url_bg']=true;
			me._ht_video_url_title.logicBlock_alpha();
			me._ht_video_url_bg.logicBlock_scaling();
		}
		me._ht_video_url_bg.userData.ontouchend=function (e) {
			me._ht_video_url_bg.logicBlock_scaling();
		}
		me._ht_video_url_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_video_url_bg']=false;
			me._ht_video_url_title.logicBlock_alpha();
			me._ht_video_url_bg.logicBlock_scaling();
		}
		me._ht_video_url_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_video_url_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAD6UlEQVR4nO2bwYsbVRzHP7/Z5LILAT10kfVSyCRFcAttwdaTFDwJisWLB9HV1f4DstB6bylS8OrW2u7Fi2hRvBXaY1eohWxBNjMD4iGIHioE3Mtu3s/Dy2Rns5sYJpmYnXmf03svb+b3y5f3vnlMfgMOh8PhcDgcDofD4XDMGDL00yg6wd6ez9xceUr5DKbT2aVUCqlW/5pm2KMFCsM3Ub0KvDLNZEbkZ0Su4fs/TiPYQYEePy5TqXwJrEwj+Jjcod2+zLlzu1kGKR3oHRSnBdxF9Sme92eWSYyEMYuIvAx8ACwBK1QqAB9mGXZ/Bdlt9QMAqt/ieav4fjvL4KkIwwqqt4F3ABB5K8vt5vVa1nMAWjMrDoDvtxH5CLvCQfVKluGsQFF0gn1Dvjuz4s'+
	'RYkTa6vfPd/CfD9vZJtrdPxl0r0N6e35ug+nRiwbLEmK1eO5l/WlQ9gmANz2viec1YJCtQ8pwzC4Y8Csk8xz2nheGLRNF94AZQBsrMzb0KSQ8qKkFwCdUtVC/2fdKC/p/5ItFoLDA//wWqq70xkQDVWnJaMQWKorOofpMQ4xmqq4j8DTxMTi3WFouN2JhHPXFEHqC6TL1+76hLirOCrBFvALHX7AKfUa3eRMQMuqwYAlkj/gp4DrBeA+/i+0/+69J8b7FGY4EwvAV8RywOrLOzc2YUcSDPK2iQEQ/wmkHkbwWlMOJh5GsFpTTiYeRHoDGMeBj52GIinzKGEQ8jHyvImDe6rVRGPIzjK5DqC339h8B71OutSYbJxxYDEBn+F1ZKjq9AIn/0jbyGyBbN5tuTDHN8BUoi8lO39Twi3xOG6zQaC5O4dT4EgpuoXgKeAaD6'+
	'MfPzT4iis+PeOC8CQb1+D9VlRB4AoFrDmEcEwRqqqb9nfgQCqNdbVKuvA2vYU3QZuEEU3afZXEpzy3wJBCBiqNU+x/MudE/ToHoxrYHnT6CYavUXdnbOIHKrO5LKwPMrEMDp0//g+5+MY+D5FihmDAMvhkCQ2sCLIxCkMvBiCRQzyMBV1/unFlMgONrA4VARRHEFiuk38D6sQJ3Ofp2fMYvTyWxMknkm80/DYQPfpdP5HWKBSqWwN9nWAc4+nrfcayfzT0ts4J1ODWPqnDr1GyRrFINgE1tl1kLkpZmuMrN1ir9iizk3qdUuZBVq34NErnVbS6jeJgwrWQUdi/0iTnt2EbmeZbiDjymD4GuSZcAiGxizNRNVZ8Ys4nnLqL5PLA7coVbLtAz44EP7dvtyt/Z4BbuSriICqlnmMBqH87CF5FmHPXLU1kxfAc5nnUAKNh'+
	'G5/v+8itCPe5nF4XA4HA6Hw+FwOByO2eNfIXOgcXFaAdkAAAAASUVORK5CYII=');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_icon.material) me._ht_video_url_icon.material.opacity = v;
			me._ht_video_url_icon.visible = (v>0 && me._ht_video_url_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_icon.visible
			let parentEl = me._ht_video_url_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_icon.userData.opacity = v;
			v = v * me._ht_video_url_icon.userData.parentOpacity;
			me._ht_video_url_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_icon.children.length; i++) {
				let child = me._ht_video_url_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_icon.userData.parentOpacity = v;
			v = v * me._ht_video_url_icon.userData.opacity
			me._ht_video_url_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_icon.children.length; i++) {
				let child = me._ht_video_url_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_icon = el;
		el.userData.ggId="ht_video_url_icon";
		me._ht_video_url_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_bg.add(me._ht_video_url_icon);
		geometry = new THREE.PlaneGeometry(1, 0.2, 5, 5 );
		geometry.name = 'ht_video_url_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_url_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_url_title.material.opacity = v;
			if (me._ht_video_url_title.userData.hasScrollbar) {
				me._ht_video_url_title.userData.scrollbar.material.opacity = v;
				me._ht_video_url_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_video_url_title.userData.ggSubElement) {
				me._ht_video_url_title.userData.ggSubElement.material.opacity = v
				me._ht_video_url_title.userData.ggSubElement.visible = (v>0 && me._ht_video_url_title.userData.visible);
			}
			me._ht_video_url_title.visible = (v>0 && me._ht_video_url_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_title.userData.backgroundColorAlpha = v;
			me._ht_video_url_title.userData.setOpacity(me._ht_video_url_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.325);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_title';
		el.userData.x = 0;
		el.userData.y = -0.325;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_title.visible
			let parentEl = me._ht_video_url_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_title.userData.opacity = v;
			v = v * me._ht_video_url_title.userData.parentOpacity;
			me._ht_video_url_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_title.children.length; i++) {
				let child = me._ht_video_url_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_title.userData.parentOpacity = v;
			v = v * me._ht_video_url_title.userData.opacity
			me._ht_video_url_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_title.children.length; i++) {
				let child = me._ht_video_url_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0, 0.854902, 0.854902).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 40;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_video_url_title.userData.totalHeightCanv = 2 * (3);
			me._ht_video_url_title.userData.textLines = [];
			var ctx = me._ht_video_url_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_video_url_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_video_url_title.userData.textLines.push(line);
					line = '';
					me._ht_video_url_title.userData.totalHeightCanv += me._ht_video_url_title.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_video_url_title.userData.width - 0 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_video_url_title.userData.textLines.push(line);
					line = words[i];
					me._ht_video_url_title.userData.totalHeightCanv += me._ht_video_url_title.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_video_url_title.userData.textLines.push(line);
			me._ht_video_url_title.userData.totalHeightCanv += me._ht_video_url_title.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_video_url_title.userData.textCanvas;
			var ctx = me._ht_video_url_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_video_url_title.userData.textColor.r * 255 + ', ' + me._ht_video_url_title.userData.textColor.g * 255 + ', ' + me._ht_video_url_title.userData.textColor.b * 255 + ', ' + me._ht_video_url_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_video_url_title.userData.boxWidthCanv - (me._ht_video_url_title.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 3;
			for (var i = 0; i < me._ht_video_url_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_video_url_title.userData.textLines[i], x, y);
				y += me._ht_video_url_title.userData.lineHeightCanv;
			}
			geometry = new THREE.PlaneGeometry(me._ht_video_url_title.userData.boxWidthCanv / 200.0, me._ht_video_url_title.userData.boxHeightCanv / 200.0, 5, 5 );
			geometry.name = 'ht_video_url_title_geometry';
			me._ht_video_url_title.geometry.dispose();
			me._ht_video_url_title.geometry = geometry;
			var diffY = (me._ht_video_url_title.userData.boxHeightCanv / 2) - me._ht_video_url_title.userData.height;
			me._ht_video_url_title.position.y = me._ht_video_url_title.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_video_url_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_video_url_title.material.map) {
				me._ht_video_url_title.material.map.dispose();
			}
			me._ht_video_url_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_video_url_title.children.length; i++) {
				let child = me._ht_video_url_title.children[i];
				if (child.name.includes('scrollbar')) me._ht_video_url_title.remove(child);
			}
			var canv = me._ht_video_url_title.userData.textCanvas;
			var ctx = me._ht_video_url_title.userData.textCanvasContext;
			ctx.font = '36px Verdana';
			me._ht_video_url_title.userData.lineHeightCanv = 36 * 1.2;
			me._ht_video_url_title.userData.textLines = [];
			me._ht_video_url_title.userData.textLines.push(me._ht_video_url_title.userData.ggText);
			me._ht_video_url_title.userData.totalHeightCanv = 2 * (3);
			me._ht_video_url_title.userData.totalHeightCanv += me._ht_video_url_title.userData.lineHeightCanv;
			me._ht_video_url_title.userData.boxWidthCanv = ctx.measureText(me._ht_video_url_title.userData.ggText).width + (2 * 0);
			me._ht_video_url_title.userData.boxHeightCanv = me._ht_video_url_title.userData.totalHeightCanv;
			canv.width = me._ht_video_url_title.userData.boxWidthCanv;
			canv.height = me._ht_video_url_title.userData.boxHeightCanv;
			ctx.font = '36px Verdana';
			me._ht_video_url_title.userData.ggPaintCanvasText();
		}
		me._ht_video_url_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_video_url_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_video_url_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_video_url_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_video_url_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_video_url_title";
		me._ht_video_url_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_video_url_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_url_title.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_url_title.userData.transitions.length; i++) {
						if (me._ht_video_url_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_title.userData.transitions[i].interval);
							me._ht_video_url_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_title.material ? me._ht_video_url_title.material.opacity : me._ht_video_url_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_title.userData.transitions.splice(me._ht_video_url_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_url_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_url_title.userData.transitions.length; i++) {
						if (me._ht_video_url_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_title.userData.transitions[i].interval);
							me._ht_video_url_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_title.material ? me._ht_video_url_title.material.opacity : me._ht_video_url_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_title.userData.transitions.splice(me._ht_video_url_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_url_title.logicBlock_alpha();
		me._ht_video_url_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_bg.add(me._ht_video_url_title);
		me._ht_video_url.add(me._ht_video_url_bg);
		width = 6.6;
		height = 4.8;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.3, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.3, (height / 2.0));
		roundedRectShape.arc(0, -0.3, 0.3, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.arc(-0.3, 0, 0.3, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.3, (-height / 2.0));
		roundedRectShape.arc(0, 0.3, 0.3, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.arc(0.3, 0, 0.3, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_video_url_popup_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_url_popup_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_url_popup_bg.material.opacity = v * me._ht_video_url_popup_bg.userData.backgroundColorAlpha;
			if (me._ht_video_url_popup_bg.userData.ggSubElement) {
				me._ht_video_url_popup_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_url_popup_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_url_popup_bg.userData.visible);
			}
			me._ht_video_url_popup_bg.visible = (v>0 && me._ht_video_url_popup_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_popup_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_popup_bg.userData.backgroundColorAlpha = v;
			me._ht_video_url_popup_bg.userData.setOpacity(me._ht_video_url_popup_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.10, 0.10, 1.0);
		el.userData.width = 660;
		el.userData.height = 480;
		el.userData.scale = {x: 0.10, y: 0.10, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_popup_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_popup_bg.visible
			let parentEl = me._ht_video_url_popup_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_popup_bg.userData.opacity = v;
			v = v * me._ht_video_url_popup_bg.userData.parentOpacity;
			me._ht_video_url_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup_bg.children.length; i++) {
				let child = me._ht_video_url_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_popup_bg.userData.parentOpacity = v;
			v = v * me._ht_video_url_popup_bg.userData.opacity
			me._ht_video_url_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup_bg.children.length; i++) {
				let child = me._ht_video_url_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_popup_bg = el;
		el.userData.ggId="ht_video_url_popup_bg";
		me._ht_video_url_popup_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_url_popup_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_url_popup_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_url_popup_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_url_popup_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_popup_bg.userData.transitions[i].interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_url_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_popup_bg.position.x = (me._ht_video_url_popup_bg.position.x - me._ht_video_url_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_popup_bg.position.y = (me._ht_video_url_popup_bg.position.y - me._ht_video_url_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(me._ht_video_url_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_popup_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_url_popup_bg.userData.transitionValue_scale = {x: 0.1, y: 0.1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_popup_bg.userData.transitions[i].interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_url_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_popup_bg.position.x = (me._ht_video_url_popup_bg.position.x - me._ht_video_url_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_popup_bg.position.y = (me._ht_video_url_popup_bg.position.y - me._ht_video_url_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(me._ht_video_url_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_popup_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_url_popup_bg.logicBlock_scaling();
		me._ht_video_url_popup_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url_popup_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url_popup_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_url_popup_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url_popup_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_url_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_popup_bg.userData.transitions[i].interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_popup_bg.material ? me._ht_video_url_popup_bg.material.opacity : me._ht_video_url_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(me._ht_video_url_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_popup_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_url_popup_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_url_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_popup_bg.userData.transitions[i].interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_popup_bg.material ? me._ht_video_url_popup_bg.material.opacity : me._ht_video_url_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_popup_bg.userData.transitions.splice(me._ht_video_url_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_popup_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_url_popup_bg.logicBlock_alpha();
		me._ht_video_url_popup_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(6, 3.8, 5, 5 );
		geometry.name = 'ht_video_url_popup_geometry';
		material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_popup_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(-0.1);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 600;
		el.userData.height = 380;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_popup';
		el.userData.x = 0;
		el.userData.y = -0.1;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_popup.material) me._ht_video_url_popup.material.opacity = v;
			me._ht_video_url_popup.visible = (v>0 && me._ht_video_url_popup.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_popup.visible
			let parentEl = me._ht_video_url_popup.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_popup.userData.opacity = v;
			v = v * me._ht_video_url_popup.userData.parentOpacity;
			me._ht_video_url_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup.children.length; i++) {
				let child = me._ht_video_url_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_popup.userData.parentOpacity = v;
			v = v * me._ht_video_url_popup.userData.opacity
			me._ht_video_url_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup.children.length; i++) {
				let child = me._ht_video_url_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_popup = el;
		me._ht_video_url_popup.userData.seekbars = [];
		me._ht_video_url_popup.userData.ggInitMedia = function(media) {
			if (me._ht_video_url_popup__vid) me._ht_video_url_popup__vid.pause();
			me._ht_video_url_popup__vid = document.createElement('video');
			player.registerVideoElement('ht_video_url_popup', me._ht_video_url_popup__vid);
			me._ht_video_url_popup__vid.setAttribute('autoplay', '');
			me._ht_video_url_popup__vid.setAttribute('crossOrigin', 'anonymous');
			me._ht_video_url_popup__source = document.createElement('source');
			me._ht_video_url_popup__source.setAttribute('src', media);
			me._ht_video_url_popup__vid.addEventListener('loadedmetadata', function() {
				let videoAR = me._ht_video_url_popup__vid.videoWidth / me._ht_video_url_popup__vid.videoHeight;
				let elAR = me._ht_video_url_popup.userData.width / me._ht_video_url_popup.userData.height;
				if (videoAR > elAR) {
					me._ht_video_url_popup.scale.set(1, (me._ht_video_url_popup.userData.width / videoAR) / me._ht_video_url_popup.userData.height, 1);
				} else {
					me._ht_video_url_popup.scale.set((me._ht_video_url_popup.userData.height * videoAR) / me._ht_video_url_popup.userData.width, 1, 1);
				}
			}, false);
			me._ht_video_url_popup__vid.appendChild(me._ht_video_url_popup__source);
			videoTexture = new THREE.VideoTexture( me._ht_video_url_popup__vid );
			videoTexture.name = 'ht_video_url_popup_videoTexture';
			videoTexture.minFilter = THREE.LinearFilter;
			videoTexture.magFilter = THREE.LinearFilter;
			videoTexture.format = THREE.RGBAFormat;
			videoMaterial = new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.DoubleSide, transparent: true} );
			videoMaterial.name = 'ht_video_url_popup_videoMaterial';
			videoMaterial.alphaTest = 0.5;
			me._ht_video_url_popup.material = videoMaterial;
		}
		el.userData.ggId="ht_video_url_popup";
		me._ht_video_url_popup.userData.ggIsActive=function() {
			if (me._ht_video_url_popup__vid != null) {
				return (me._ht_video_url_popup__vid.paused == false && me._ht_video_url_popup__vid.ended == false);
			} else {
				return false;
			}
		}
		me._ht_video_url_popup.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_popup.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_popup.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_url_popup.ggCurrentLogicStateVisible == 0) {
			me._ht_video_url_popup.visible=((!me._ht_video_url_popup.material && Number(me._ht_video_url_popup.userData.opacity>0)) || Number(me._ht_video_url_popup.material.opacity)>0)?true:false;
			me._ht_video_url_popup.userData.visible=true;
					if (me._ht_video_url_popup.userData.ggVideoNotLoaded) {
						me._ht_video_url_popup.userData.ggInitMedia(me._ht_video_url_popup.ggVideoSource);
					}
				}
				else {
			me._ht_video_url_popup.visible=false;
			me._ht_video_url_popup.userData.visible=false;
					me._ht_video_url_popup.userData.ggInitMedia('');
				}
			}
		}
		me._ht_video_url_popup.logicBlock_visible();
		me._ht_video_url_popup.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_popup_bg.add(me._ht_video_url_popup);
		geometry = new THREE.PlaneGeometry(0.4, 0.4, 5, 5 );
		geometry.name = 'ht_video_url_popup_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABJElEQVR4nO3bSw6DMBAEUSs341icfrLJSJGFAeNfY9c7QU9JiJVDAAAAAAAAAADgdcxsM7Nt9I4U6X2/cW4fvSdmZvvfPr2IUUCpiFE8zYAhHA4dHlFx0ymlwUpbsigMV9hQZOQBr4/nRhwyTTzX86Dp4rkeh00bz7U8cPp4rsWhy8RzNQ9eLp6rcfiy8VxJgOXjuSchiBfJCUK8hDthiHfhLBDxbjoKRbxMB8GIlysRUTLeZ/QAVMYnXICfSIGzUES8cCcQERNywhAx8iQIEX9KQiwfsUaAZSPWPHy5iC0OXiZiy0Onj9jjwGkj9jxsuogjDpom4shDXh9R4QCFDY8oDVfacoviYMVNh4xnDmWMhzblTPkpVdDfBwAAAAAAAABA2hcaGfeSY++bsA'+
	'AAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_popup_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.85);
		el.translateY(2.05);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 40;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_popup_close';
		el.userData.x = 2.85;
		el.userData.y = 2.05;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_popup_close.material) me._ht_video_url_popup_close.material.opacity = v;
			me._ht_video_url_popup_close.visible = (v>0 && me._ht_video_url_popup_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_popup_close.visible
			let parentEl = me._ht_video_url_popup_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_popup_close.userData.opacity = v;
			v = v * me._ht_video_url_popup_close.userData.parentOpacity;
			me._ht_video_url_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup_close.children.length; i++) {
				let child = me._ht_video_url_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_popup_close.userData.parentOpacity = v;
			v = v * me._ht_video_url_popup_close.userData.opacity
			me._ht_video_url_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_popup_close.children.length; i++) {
				let child = me._ht_video_url_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_popup_close = el;
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABjUlEQVR4nO3bTW6DMBBA4SHqUZByDnIrcoD0Vsk5HPks0EVkmlLI39h4wO+TukgWaPyUqo0NIgAAAAAAAAAArI/3jXjf5B5jVoL5dtGu5H0jXXeWrjuLc22068biXDvMFzFivID3qupkKqJzrVTVKcWl4wWs64v0/XF4bSXiOF7fH6WuLxknesK5Vq7XfvjJGdHSLG+xMLiFGVRyLmD18YIcC9lMvGDJBW0uXrDEwjYbL0i5wM3HC1IstJh4QcwFFxcviLHwYuMFmgDFxws+CUG8kXeCEG/GK2GI98SjQIbjVbkH+GNq705E/r23338vPtsMWwFFHu8eG4snYjGgyHREg/FEUp2JFMTeJ5BfYYUV/hH5yj3AYCpeCOXcb8TbaZ9Yipgf/0gr8FVOgc'+
	'0EBbazFNhQVWBLX4FDJQWONRU4WFfg1g4Fbi5S4PY2BQsLsDDDRywNbmmWl1gcOPFM8TZUw3MigaWNz/Fe4253iHWnfpozEUvxRG6br/ePYJhV4KNeAAAAAAAAAAAs4wf6cWDrkP66yAAAAABJRU5ErkJggg==');
		textureOver.colorSpace = player.getVRTextureColorSpace();
		el.userData.materialOver = new THREE.MeshBasicMaterial( {map: textureOver, side: THREE.DoubleSide, transparent: true} );
		el.userData.materialOver.name = 'ht_video_url_popup_close_materialOver';
		el.userData.ggId="ht_video_url_popup_close";
		me._ht_video_url_popup_close.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_video_url_popup_close.userData.onmouseenter=function (e) {
			me._ht_video_url_popup_close.material = me._ht_video_url_popup_close.userData.materialOver;
			me.elementMouseOver['ht_video_url_popup_close']=true;
		}
		me._ht_video_url_popup_close.userData.onmouseleave=function (e) {
			me._ht_video_url_popup_close.material = me._ht_video_url_popup_close.userData.materialNormal;
			me.elementMouseOver['ht_video_url_popup_close']=false;
		}
		me._ht_video_url_popup_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_popup_bg.add(me._ht_video_url_popup_close);
		me._ht_video_url.add(me._ht_video_url_popup_bg);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_customimage.userData.ggSubElement) {
				me._ht_video_url_customimage.userData.ggSubElement.material.opacity = v
				me._ht_video_url_customimage.userData.ggSubElement.visible = (v>0 && me._ht_video_url_customimage.userData.visible);
			}
			me._ht_video_url_customimage.visible = (v>0 && me._ht_video_url_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_customimage.visible
			let parentEl = me._ht_video_url_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_customimage.userData.opacity = v;
			v = v * me._ht_video_url_customimage.userData.parentOpacity;
			me._ht_video_url_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_customimage.children.length; i++) {
				let child = me._ht_video_url_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_customimage.userData.parentOpacity = v;
			v = v * me._ht_video_url_customimage.userData.opacity
			me._ht_video_url_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_customimage.children.length; i++) {
				let child = me._ht_video_url_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_video_url_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_video_url_CustomImage_subElementMaterial';
				me._ht_video_url_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_video_url_customimage.userData.ggUpdatePosition();
				me._ht_video_url_customimage.userData.ggText = extUrl;
				me._ht_video_url_customimage.userData.setOpacity(me._ht_video_url_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_video_url_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_video_url_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_video_url_CustomImage";
		me._ht_video_url_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == "")) || 
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_url_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_video_url_customimage.visible=false;
			me._ht_video_url_customimage.userData.visible=false;
				}
				else {
			me._ht_video_url_customimage.visible=((!me._ht_video_url_customimage.material && Number(me._ht_video_url_customimage.userData.opacity>0)) || Number(me._ht_video_url_customimage.material.opacity)>0)?true:false;
			me._ht_video_url_customimage.userData.visible=true;
				}
			}
		}
		me._ht_video_url_customimage.logicBlock_visible();
		me._ht_video_url_customimage.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs') + "<"+me.hotspot.id+">");
			me._ht_video_url_popup.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_url_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_video_url_customimage.userData.clientWidth;
			var parentHeight = me._ht_video_url_customimage.userData.clientHeight;
			var img = me._ht_video_url_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_video_url_CustomImage_imgGeometry';
			}
		}
		me._ht_video_url.add(me._ht_video_url_customimage);
		me._ht_video_url.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_url']=false;
		me._ht_video_url_bg.logicBlock_scaling();
		me._ht_video_url_bg.logicBlock_visible();
		me._ht_video_url_bg.logicBlock_alpha();
		me._ht_video_url_bg.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_url_bg']=false;
		me._ht_video_url_icon.userData.setOpacity(1.00);
		me._ht_video_url_title.logicBlock_alpha();
		me._ht_video_url_title.userData.setOpacity(0.00);
		me._ht_video_url_popup_bg.logicBlock_scaling();
		me._ht_video_url_popup_bg.logicBlock_alpha();
		me._ht_video_url_popup_bg.userData.setOpacity(0.00);
		me._ht_video_url_popup.logicBlock_visible();
		me._ht_video_url_popup.userData.setOpacity(1.00);
		me._ht_video_url_popup.userData.ggVideoSource = '';
		me._ht_video_url_popup.userData.ggVideoNotLoaded = true;
		me._ht_video_url_popup_close.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_url_popup_close']=false;
		me._ht_video_url_customimage.logicBlock_visible();
		me._ht_video_url_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_video_url_bg.logicBlock_visible();
				me._ht_video_url_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_video_url_bg.logicBlock_visible();
				me._ht_video_url_bg.logicBlock_alpha();
					me._ht_video_url_title.userData.ggUpdateText();
				me._ht_video_url_popup_bg.logicBlock_scaling();
				me._ht_video_url_popup_bg.logicBlock_alpha();
				me._ht_video_url_popup.logicBlock_visible();
				me._ht_video_url_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_video_url_bg.logicBlock_visible();
				me._ht_video_url_bg.logicBlock_alpha();
				me._ht_video_url_popup_bg.logicBlock_scaling();
				me._ht_video_url_popup_bg.logicBlock_alpha();
				me._ht_video_url_popup.logicBlock_visible();
				me._ht_video_url_customimage.logicBlock_visible();
			};
			me.ggEvent_varchanged_open_video_hs=function() {
				me._ht_video_url_bg.logicBlock_alpha();
				me._ht_video_url_popup_bg.logicBlock_scaling();
				me._ht_video_url_popup_bg.logicBlock_alpha();
				me._ht_video_url_popup.logicBlock_visible();
				me._ht_video_url_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_video_url;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_video_file(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_video_file';
		el.userData.x = 2.72;
		el.userData.y = 2.08;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file.visible
			let parentEl = me._ht_video_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file.userData.opacity = v;
			v = v * me._ht_video_file.userData.parentOpacity;
			me._ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file.children.length; i++) {
				let child = me._ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file.userData.parentOpacity = v;
			v = v * me._ht_video_file.userData.opacity
			me._ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file.children.length; i++) {
				let child = me._ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file = el;
		el.userData.ggId="ht_video_file";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_file.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_file']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_file']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_video_file_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_file_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_file_bg.material.opacity = v * me._ht_video_file_bg.userData.backgroundColorAlpha;
			if (me._ht_video_file_bg.userData.ggSubElement) {
				me._ht_video_file_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_file_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_file_bg.userData.visible);
			}
			me._ht_video_file_bg.visible = (v>0 && me._ht_video_file_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_bg.userData.backgroundColorAlpha = v;
			me._ht_video_file_bg.userData.setOpacity(me._ht_video_file_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_bg.visible
			let parentEl = me._ht_video_file_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_bg.userData.opacity = v;
			v = v * me._ht_video_file_bg.userData.parentOpacity;
			me._ht_video_file_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_bg.children.length; i++) {
				let child = me._ht_video_file_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_bg.userData.parentOpacity = v;
			v = v * me._ht_video_file_bg.userData.opacity
			me._ht_video_file_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_bg.children.length; i++) {
				let child = me._ht_video_file_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_bg = el;
		el.userData.ggId="ht_video_file_bg";
		me._ht_video_file_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_video_file_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_file_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_file_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_file_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_file_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_file_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_bg.position.x = (me._ht_video_file_bg.position.x - me._ht_video_file_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_bg.position.y = (me._ht_video_file_bg.position.y - me._ht_video_file_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_file_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_file_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_bg.position.x = (me._ht_video_file_bg.position.x - me._ht_video_file_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_bg.position.y = (me._ht_video_file_bg.position.y - me._ht_video_file_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_file_bg.logicBlock_scaling();
		me._ht_video_file_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_bg.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_bg.visible=((!me._ht_video_file_bg.material && Number(me._ht_video_file_bg.userData.opacity>0)) || Number(me._ht_video_file_bg.material.opacity)>0)?true:false;
			me._ht_video_file_bg.userData.visible=true;
				}
				else {
			me._ht_video_file_bg.visible=false;
			me._ht_video_file_bg.userData.visible=false;
				}
			}
		}
		me._ht_video_file_bg.logicBlock_visible();
		me._ht_video_file_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_file_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_bg.material ? me._ht_video_file_bg.material.opacity : me._ht_video_file_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_file_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_bg.material ? me._ht_video_file_bg.material.opacity : me._ht_video_file_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_file_bg.logicBlock_alpha();
		me._ht_video_file_bg.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs') + "<"+me.hotspot.id+">");
			me._ht_video_file_popup.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_file_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_video_file_bg']=true;
			me._ht_video_file_title.logicBlock_alpha();
			me._ht_video_file_bg.logicBlock_scaling();
		}
		me._ht_video_file_bg.userData.ontouchend=function (e) {
			me._ht_video_file_bg.logicBlock_scaling();
		}
		me._ht_video_file_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_video_file_bg']=false;
			me._ht_video_file_title.logicBlock_alpha();
			me._ht_video_file_bg.logicBlock_scaling();
		}
		me._ht_video_file_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_video_file_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAD6UlEQVR4nO2bwYsbVRzHP7/Z5LILAT10kfVSyCRFcAttwdaTFDwJisWLB9HV1f4DstB6bylS8OrW2u7Fi2hRvBXaY1eohWxBNjMD4iGIHioE3Mtu3s/Dy2Rns5sYJpmYnXmf03svb+b3y5f3vnlMfgMOh8PhcDgcDofD4XDMGDL00yg6wd6ez9xceUr5DKbT2aVUCqlW/5pm2KMFCsM3Ub0KvDLNZEbkZ0Su4fs/TiPYQYEePy5TqXwJrEwj+Jjcod2+zLlzu1kGKR3oHRSnBdxF9Sme92eWSYyEMYuIvAx8ACwBK1QqAB9mGXZ/Bdlt9QMAqt/ieav4fjvL4KkIwwqqt4F3ABB5K8vt5vVa1nMAWjMrDoDvtxH5CLvCQfVKluGsQFF0gn1Dvjuz4s'+
	'RYkTa6vfPd/CfD9vZJtrdPxl0r0N6e35ug+nRiwbLEmK1eO5l/WlQ9gmANz2viec1YJCtQ8pwzC4Y8Csk8xz2nheGLRNF94AZQBsrMzb0KSQ8qKkFwCdUtVC/2fdKC/p/5ItFoLDA//wWqq70xkQDVWnJaMQWKorOofpMQ4xmqq4j8DTxMTi3WFouN2JhHPXFEHqC6TL1+76hLirOCrBFvALHX7AKfUa3eRMQMuqwYAlkj/gp4DrBeA+/i+0/+69J8b7FGY4EwvAV8RywOrLOzc2YUcSDPK2iQEQ/wmkHkbwWlMOJh5GsFpTTiYeRHoDGMeBj52GIinzKGEQ8jHyvImDe6rVRGPIzjK5DqC339h8B71OutSYbJxxYDEBn+F1ZKjq9AIn/0jbyGyBbN5tuTDHN8BUoi8lO39Twi3xOG6zQaC5O4dT4EgpuoXgKeAaD6'+
	'MfPzT4iis+PeOC8CQb1+D9VlRB4AoFrDmEcEwRqqqb9nfgQCqNdbVKuvA2vYU3QZuEEU3afZXEpzy3wJBCBiqNU+x/MudE/ToHoxrYHnT6CYavUXdnbOIHKrO5LKwPMrEMDp0//g+5+MY+D5FihmDAMvhkCQ2sCLIxCkMvBiCRQzyMBV1/unFlMgONrA4VARRHEFiuk38D6sQJ3Ofp2fMYvTyWxMknkm80/DYQPfpdP5HWKBSqWwN9nWAc4+nrfcayfzT0ts4J1ODWPqnDr1GyRrFINgE1tl1kLkpZmuMrN1ir9iizk3qdUuZBVq34NErnVbS6jeJgwrWQUdi/0iTnt2EbmeZbiDjymD4GuSZcAiGxizNRNVZ8Ys4nnLqL5PLA7coVbLtAz44EP7dvtyt/Z4BbuSriICqlnmMBqH87CF5FmHPXLU1kxfAc5nnUAKNh'+
	'G5/v+8itCPe5nF4XA4HA6Hw+FwOByO2eNfIXOgcXFaAdkAAAAASUVORK5CYII=');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_icon.material) me._ht_video_file_icon.material.opacity = v;
			me._ht_video_file_icon.visible = (v>0 && me._ht_video_file_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_icon.visible
			let parentEl = me._ht_video_file_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_icon.userData.opacity = v;
			v = v * me._ht_video_file_icon.userData.parentOpacity;
			me._ht_video_file_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_icon.children.length; i++) {
				let child = me._ht_video_file_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_icon.userData.parentOpacity = v;
			v = v * me._ht_video_file_icon.userData.opacity
			me._ht_video_file_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_icon.children.length; i++) {
				let child = me._ht_video_file_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_icon = el;
		el.userData.ggId="ht_video_file_icon";
		me._ht_video_file_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_bg.add(me._ht_video_file_icon);
		geometry = new THREE.PlaneGeometry(1, 0.2, 5, 5 );
		geometry.name = 'ht_video_file_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_file_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_file_title.material.opacity = v;
			if (me._ht_video_file_title.userData.hasScrollbar) {
				me._ht_video_file_title.userData.scrollbar.material.opacity = v;
				me._ht_video_file_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_video_file_title.userData.ggSubElement) {
				me._ht_video_file_title.userData.ggSubElement.material.opacity = v
				me._ht_video_file_title.userData.ggSubElement.visible = (v>0 && me._ht_video_file_title.userData.visible);
			}
			me._ht_video_file_title.visible = (v>0 && me._ht_video_file_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_title.userData.backgroundColorAlpha = v;
			me._ht_video_file_title.userData.setOpacity(me._ht_video_file_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.325);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_title';
		el.userData.x = 0;
		el.userData.y = -0.325;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_title.visible
			let parentEl = me._ht_video_file_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_title.userData.opacity = v;
			v = v * me._ht_video_file_title.userData.parentOpacity;
			me._ht_video_file_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_title.children.length; i++) {
				let child = me._ht_video_file_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_title.userData.parentOpacity = v;
			v = v * me._ht_video_file_title.userData.opacity
			me._ht_video_file_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_title.children.length; i++) {
				let child = me._ht_video_file_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0, 0.854902, 0.854902).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 40;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_video_file_title.userData.totalHeightCanv = 2 * (3);
			me._ht_video_file_title.userData.textLines = [];
			var ctx = me._ht_video_file_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_video_file_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_video_file_title.userData.textLines.push(line);
					line = '';
					me._ht_video_file_title.userData.totalHeightCanv += me._ht_video_file_title.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_video_file_title.userData.width - 0 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_video_file_title.userData.textLines.push(line);
					line = words[i];
					me._ht_video_file_title.userData.totalHeightCanv += me._ht_video_file_title.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_video_file_title.userData.textLines.push(line);
			me._ht_video_file_title.userData.totalHeightCanv += me._ht_video_file_title.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_video_file_title.userData.textCanvas;
			var ctx = me._ht_video_file_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_video_file_title.userData.textColor.r * 255 + ', ' + me._ht_video_file_title.userData.textColor.g * 255 + ', ' + me._ht_video_file_title.userData.textColor.b * 255 + ', ' + me._ht_video_file_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_video_file_title.userData.boxWidthCanv - (me._ht_video_file_title.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 3;
			for (var i = 0; i < me._ht_video_file_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_video_file_title.userData.textLines[i], x, y);
				y += me._ht_video_file_title.userData.lineHeightCanv;
			}
			geometry = new THREE.PlaneGeometry(me._ht_video_file_title.userData.boxWidthCanv / 200.0, me._ht_video_file_title.userData.boxHeightCanv / 200.0, 5, 5 );
			geometry.name = 'ht_video_file_title_geometry';
			me._ht_video_file_title.geometry.dispose();
			me._ht_video_file_title.geometry = geometry;
			var diffY = (me._ht_video_file_title.userData.boxHeightCanv / 2) - me._ht_video_file_title.userData.height;
			me._ht_video_file_title.position.y = me._ht_video_file_title.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_video_file_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_video_file_title.material.map) {
				me._ht_video_file_title.material.map.dispose();
			}
			me._ht_video_file_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_video_file_title.children.length; i++) {
				let child = me._ht_video_file_title.children[i];
				if (child.name.includes('scrollbar')) me._ht_video_file_title.remove(child);
			}
			var canv = me._ht_video_file_title.userData.textCanvas;
			var ctx = me._ht_video_file_title.userData.textCanvasContext;
			ctx.font = '36px Verdana';
			me._ht_video_file_title.userData.lineHeightCanv = 36 * 1.2;
			me._ht_video_file_title.userData.textLines = [];
			me._ht_video_file_title.userData.textLines.push(me._ht_video_file_title.userData.ggText);
			me._ht_video_file_title.userData.totalHeightCanv = 2 * (3);
			me._ht_video_file_title.userData.totalHeightCanv += me._ht_video_file_title.userData.lineHeightCanv;
			me._ht_video_file_title.userData.boxWidthCanv = ctx.measureText(me._ht_video_file_title.userData.ggText).width + (2 * 0);
			me._ht_video_file_title.userData.boxHeightCanv = me._ht_video_file_title.userData.totalHeightCanv;
			canv.width = me._ht_video_file_title.userData.boxWidthCanv;
			canv.height = me._ht_video_file_title.userData.boxHeightCanv;
			ctx.font = '36px Verdana';
			me._ht_video_file_title.userData.ggPaintCanvasText();
		}
		me._ht_video_file_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_video_file_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_video_file_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_video_file_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_video_file_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_video_file_title";
		me._ht_video_file_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_video_file_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_file_title.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_file_title.userData.transitions.length; i++) {
						if (me._ht_video_file_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_title.userData.transitions[i].interval);
							me._ht_video_file_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_title.material ? me._ht_video_file_title.material.opacity : me._ht_video_file_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_title.userData.transitions.splice(me._ht_video_file_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_file_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_file_title.userData.transitions.length; i++) {
						if (me._ht_video_file_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_title.userData.transitions[i].interval);
							me._ht_video_file_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_title.material ? me._ht_video_file_title.material.opacity : me._ht_video_file_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_title.userData.transitions.splice(me._ht_video_file_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_file_title.logicBlock_alpha();
		me._ht_video_file_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_bg.add(me._ht_video_file_title);
		me._ht_video_file.add(me._ht_video_file_bg);
		width = 6.6;
		height = 4.8;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.3, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.3, (height / 2.0));
		roundedRectShape.arc(0, -0.3, 0.3, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.arc(-0.3, 0, 0.3, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.3, (-height / 2.0));
		roundedRectShape.arc(0, 0.3, 0.3, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.arc(0.3, 0, 0.3, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_video_file_popup_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_file_popup_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_file_popup_bg.material.opacity = v * me._ht_video_file_popup_bg.userData.backgroundColorAlpha;
			if (me._ht_video_file_popup_bg.userData.ggSubElement) {
				me._ht_video_file_popup_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_file_popup_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_file_popup_bg.userData.visible);
			}
			me._ht_video_file_popup_bg.visible = (v>0 && me._ht_video_file_popup_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_popup_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_popup_bg.userData.backgroundColorAlpha = v;
			me._ht_video_file_popup_bg.userData.setOpacity(me._ht_video_file_popup_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.10, 0.10, 1.0);
		el.userData.width = 660;
		el.userData.height = 480;
		el.userData.scale = {x: 0.10, y: 0.10, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_popup_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_popup_bg.visible
			let parentEl = me._ht_video_file_popup_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_popup_bg.userData.opacity = v;
			v = v * me._ht_video_file_popup_bg.userData.parentOpacity;
			me._ht_video_file_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup_bg.children.length; i++) {
				let child = me._ht_video_file_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_popup_bg.userData.parentOpacity = v;
			v = v * me._ht_video_file_popup_bg.userData.opacity
			me._ht_video_file_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup_bg.children.length; i++) {
				let child = me._ht_video_file_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_popup_bg = el;
		el.userData.ggId="ht_video_file_popup_bg";
		me._ht_video_file_popup_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_file_popup_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_file_popup_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_file_popup_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_file_popup_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_popup_bg.userData.transitions[i].interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_file_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_popup_bg.position.x = (me._ht_video_file_popup_bg.position.x - me._ht_video_file_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_popup_bg.position.y = (me._ht_video_file_popup_bg.position.y - me._ht_video_file_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(me._ht_video_file_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_popup_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_file_popup_bg.userData.transitionValue_scale = {x: 0.1, y: 0.1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_popup_bg.userData.transitions[i].interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_file_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_popup_bg.position.x = (me._ht_video_file_popup_bg.position.x - me._ht_video_file_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_popup_bg.position.y = (me._ht_video_file_popup_bg.position.y - me._ht_video_file_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(me._ht_video_file_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_popup_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_file_popup_bg.logicBlock_scaling();
		me._ht_video_file_popup_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file_popup_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file_popup_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_file_popup_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file_popup_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_file_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_popup_bg.userData.transitions[i].interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_popup_bg.material ? me._ht_video_file_popup_bg.material.opacity : me._ht_video_file_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(me._ht_video_file_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_popup_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_file_popup_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_file_popup_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_popup_bg.userData.transitions[i].interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_popup_bg.material ? me._ht_video_file_popup_bg.material.opacity : me._ht_video_file_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_popup_bg.userData.transitions.splice(me._ht_video_file_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_popup_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_file_popup_bg.logicBlock_alpha();
		me._ht_video_file_popup_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(6, 3.8, 5, 5 );
		geometry.name = 'ht_video_file_popup_geometry';
		material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_popup_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(-0.1);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 600;
		el.userData.height = 380;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_popup';
		el.userData.x = 0;
		el.userData.y = -0.1;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_popup.material) me._ht_video_file_popup.material.opacity = v;
			me._ht_video_file_popup.visible = (v>0 && me._ht_video_file_popup.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_popup.visible
			let parentEl = me._ht_video_file_popup.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_popup.userData.opacity = v;
			v = v * me._ht_video_file_popup.userData.parentOpacity;
			me._ht_video_file_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup.children.length; i++) {
				let child = me._ht_video_file_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_popup.userData.parentOpacity = v;
			v = v * me._ht_video_file_popup.userData.opacity
			me._ht_video_file_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup.children.length; i++) {
				let child = me._ht_video_file_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_popup = el;
		me._ht_video_file_popup.userData.seekbars = [];
		me._ht_video_file_popup.userData.ggInitMedia = function(media) {
			if (me._ht_video_file_popup__vid) me._ht_video_file_popup__vid.pause();
			me._ht_video_file_popup__vid = document.createElement('video');
			player.registerVideoElement('ht_video_file_popup', me._ht_video_file_popup__vid);
			me._ht_video_file_popup__vid.setAttribute('autoplay', '');
			me._ht_video_file_popup__vid.setAttribute('crossOrigin', 'anonymous');
			me._ht_video_file_popup__source = document.createElement('source');
			me._ht_video_file_popup__source.setAttribute('src', media);
			me._ht_video_file_popup__vid.addEventListener('loadedmetadata', function() {
				let videoAR = me._ht_video_file_popup__vid.videoWidth / me._ht_video_file_popup__vid.videoHeight;
				let elAR = me._ht_video_file_popup.userData.width / me._ht_video_file_popup.userData.height;
				if (videoAR > elAR) {
					me._ht_video_file_popup.scale.set(1, (me._ht_video_file_popup.userData.width / videoAR) / me._ht_video_file_popup.userData.height, 1);
				} else {
					me._ht_video_file_popup.scale.set((me._ht_video_file_popup.userData.height * videoAR) / me._ht_video_file_popup.userData.width, 1, 1);
				}
			}, false);
			me._ht_video_file_popup__vid.appendChild(me._ht_video_file_popup__source);
			videoTexture = new THREE.VideoTexture( me._ht_video_file_popup__vid );
			videoTexture.name = 'ht_video_file_popup_videoTexture';
			videoTexture.minFilter = THREE.LinearFilter;
			videoTexture.magFilter = THREE.LinearFilter;
			videoTexture.format = THREE.RGBAFormat;
			videoMaterial = new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.DoubleSide, transparent: true} );
			videoMaterial.name = 'ht_video_file_popup_videoMaterial';
			videoMaterial.alphaTest = 0.5;
			me._ht_video_file_popup.material = videoMaterial;
		}
		el.userData.ggId="ht_video_file_popup";
		me._ht_video_file_popup.userData.ggIsActive=function() {
			if (me._ht_video_file_popup__vid != null) {
				return (me._ht_video_file_popup__vid.paused == false && me._ht_video_file_popup__vid.ended == false);
			} else {
				return false;
			}
		}
		me._ht_video_file_popup.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_popup.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_popup.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_popup.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_popup.visible=((!me._ht_video_file_popup.material && Number(me._ht_video_file_popup.userData.opacity>0)) || Number(me._ht_video_file_popup.material.opacity)>0)?true:false;
			me._ht_video_file_popup.userData.visible=true;
					if (me._ht_video_file_popup.userData.ggVideoNotLoaded) {
						me._ht_video_file_popup.userData.ggInitMedia(me._ht_video_file_popup.ggVideoSource);
					}
				}
				else {
			me._ht_video_file_popup.visible=false;
			me._ht_video_file_popup.userData.visible=false;
					me._ht_video_file_popup.userData.ggInitMedia('');
				}
			}
		}
		me._ht_video_file_popup.logicBlock_visible();
		me._ht_video_file_popup.userData.onclick=function (e) {
			player.playPauseSound("ht_video_file_popup","1");
		}
		me._ht_video_file_popup.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_popup_bg.add(me._ht_video_file_popup);
		geometry = new THREE.PlaneGeometry(0.4, 0.4, 5, 5 );
		geometry.name = 'ht_video_file_popup_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABJElEQVR4nO3bSw6DMBAEUSs341icfrLJSJGFAeNfY9c7QU9JiJVDAAAAAAAAAADgdcxsM7Nt9I4U6X2/cW4fvSdmZvvfPr2IUUCpiFE8zYAhHA4dHlFx0ymlwUpbsigMV9hQZOQBr4/nRhwyTTzX86Dp4rkeh00bz7U8cPp4rsWhy8RzNQ9eLp6rcfiy8VxJgOXjuSchiBfJCUK8hDthiHfhLBDxbjoKRbxMB8GIlysRUTLeZ/QAVMYnXICfSIGzUES8cCcQERNywhAx8iQIEX9KQiwfsUaAZSPWPHy5iC0OXiZiy0Onj9jjwGkj9jxsuogjDpom4shDXh9R4QCFDY8oDVfacoviYMVNh4xnDmWMhzblTPkpVdDfBwAAAAAAAABA2hcaGfeSY++bsA'+
	'AAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_popup_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.85);
		el.translateY(2.05);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 40;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_popup_close';
		el.userData.x = 2.85;
		el.userData.y = 2.05;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_popup_close.material) me._ht_video_file_popup_close.material.opacity = v;
			me._ht_video_file_popup_close.visible = (v>0 && me._ht_video_file_popup_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_popup_close.visible
			let parentEl = me._ht_video_file_popup_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_popup_close.userData.opacity = v;
			v = v * me._ht_video_file_popup_close.userData.parentOpacity;
			me._ht_video_file_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup_close.children.length; i++) {
				let child = me._ht_video_file_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_popup_close.userData.parentOpacity = v;
			v = v * me._ht_video_file_popup_close.userData.opacity
			me._ht_video_file_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_popup_close.children.length; i++) {
				let child = me._ht_video_file_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_popup_close = el;
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABjUlEQVR4nO3bTW6DMBBA4SHqUZByDnIrcoD0Vsk5HPks0EVkmlLI39h4wO+TukgWaPyUqo0NIgAAAAAAAAAArI/3jXjf5B5jVoL5dtGu5H0jXXeWrjuLc22068biXDvMFzFivID3qupkKqJzrVTVKcWl4wWs64v0/XF4bSXiOF7fH6WuLxknesK5Vq7XfvjJGdHSLG+xMLiFGVRyLmD18YIcC9lMvGDJBW0uXrDEwjYbL0i5wM3HC1IstJh4QcwFFxcviLHwYuMFmgDFxws+CUG8kXeCEG/GK2GI98SjQIbjVbkH+GNq705E/r23338vPtsMWwFFHu8eG4snYjGgyHREg/FEUp2JFMTeJ5BfYYUV/hH5yj3AYCpeCOXcb8TbaZ9Yipgf/0gr8FVOgc'+
	'0EBbazFNhQVWBLX4FDJQWONRU4WFfg1g4Fbi5S4PY2BQsLsDDDRywNbmmWl1gcOPFM8TZUw3MigaWNz/Fe4253iHWnfpozEUvxRG6br/ePYJhV4KNeAAAAAAAAAAAs4wf6cWDrkP66yAAAAABJRU5ErkJggg==');
		textureOver.colorSpace = player.getVRTextureColorSpace();
		el.userData.materialOver = new THREE.MeshBasicMaterial( {map: textureOver, side: THREE.DoubleSide, transparent: true} );
		el.userData.materialOver.name = 'ht_video_file_popup_close_materialOver';
		el.userData.ggId="ht_video_file_popup_close";
		me._ht_video_file_popup_close.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_video_file_popup_close.userData.onmouseenter=function (e) {
			me._ht_video_file_popup_close.material = me._ht_video_file_popup_close.userData.materialOver;
			me.elementMouseOver['ht_video_file_popup_close']=true;
		}
		me._ht_video_file_popup_close.userData.onmouseleave=function (e) {
			me._ht_video_file_popup_close.material = me._ht_video_file_popup_close.userData.materialNormal;
			me.elementMouseOver['ht_video_file_popup_close']=false;
		}
		me._ht_video_file_popup_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_popup_bg.add(me._ht_video_file_popup_close);
		me._ht_video_file.add(me._ht_video_file_popup_bg);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_customimage.userData.ggSubElement) {
				me._ht_video_file_customimage.userData.ggSubElement.material.opacity = v
				me._ht_video_file_customimage.userData.ggSubElement.visible = (v>0 && me._ht_video_file_customimage.userData.visible);
			}
			me._ht_video_file_customimage.visible = (v>0 && me._ht_video_file_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_customimage.visible
			let parentEl = me._ht_video_file_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_customimage.userData.opacity = v;
			v = v * me._ht_video_file_customimage.userData.parentOpacity;
			me._ht_video_file_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_customimage.children.length; i++) {
				let child = me._ht_video_file_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_customimage.userData.parentOpacity = v;
			v = v * me._ht_video_file_customimage.userData.opacity
			me._ht_video_file_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_customimage.children.length; i++) {
				let child = me._ht_video_file_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_video_file_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_video_file_CustomImage_subElementMaterial';
				me._ht_video_file_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_video_file_customimage.userData.ggUpdatePosition();
				me._ht_video_file_customimage.userData.ggText = extUrl;
				me._ht_video_file_customimage.userData.setOpacity(me._ht_video_file_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_video_file_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_video_file_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_video_file_CustomImage";
		me._ht_video_file_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == "")) || 
				(((player.getVariableValue('open_video_hs') !== null) && (player.getVariableValue('open_video_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_customimage.visible=false;
			me._ht_video_file_customimage.userData.visible=false;
				}
				else {
			me._ht_video_file_customimage.visible=((!me._ht_video_file_customimage.material && Number(me._ht_video_file_customimage.userData.opacity>0)) || Number(me._ht_video_file_customimage.material.opacity)>0)?true:false;
			me._ht_video_file_customimage.userData.visible=true;
				}
			}
		}
		me._ht_video_file_customimage.logicBlock_visible();
		me._ht_video_file_customimage.userData.onclick=function (e) {
			player.setVariableValue('open_video_hs', player.getVariableValue('open_video_hs') + "<"+me.hotspot.id+">");
			me._ht_video_file_popup.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_file_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_video_file_customimage.userData.clientWidth;
			var parentHeight = me._ht_video_file_customimage.userData.clientHeight;
			var img = me._ht_video_file_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_video_file_CustomImage_imgGeometry';
			}
		}
		me._ht_video_file.add(me._ht_video_file_customimage);
		me._ht_video_file.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_file']=false;
		me._ht_video_file_bg.logicBlock_scaling();
		me._ht_video_file_bg.logicBlock_visible();
		me._ht_video_file_bg.logicBlock_alpha();
		me._ht_video_file_bg.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_file_bg']=false;
		me._ht_video_file_icon.userData.setOpacity(1.00);
		me._ht_video_file_title.logicBlock_alpha();
		me._ht_video_file_title.userData.setOpacity(0.00);
		me._ht_video_file_popup_bg.logicBlock_scaling();
		me._ht_video_file_popup_bg.logicBlock_alpha();
		me._ht_video_file_popup_bg.userData.setOpacity(0.00);
		me._ht_video_file_popup.logicBlock_visible();
		me._ht_video_file_popup.userData.setOpacity(1.00);
		me._ht_video_file_popup.userData.ggVideoSource = 'media_vr/';
		me._ht_video_file_popup.userData.ggVideoNotLoaded = true;
		me._ht_video_file_popup_close.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_file_popup_close']=false;
		me._ht_video_file_customimage.logicBlock_visible();
		me._ht_video_file_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_video_file_bg.logicBlock_visible();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_video_file_bg.logicBlock_visible();
				me._ht_video_file_bg.logicBlock_alpha();
					me._ht_video_file_title.userData.ggUpdateText();
				me._ht_video_file_popup_bg.logicBlock_scaling();
				me._ht_video_file_popup_bg.logicBlock_alpha();
				me._ht_video_file_popup.logicBlock_visible();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_video_file_bg.logicBlock_visible();
				me._ht_video_file_bg.logicBlock_alpha();
				me._ht_video_file_popup_bg.logicBlock_scaling();
				me._ht_video_file_popup_bg.logicBlock_alpha();
				me._ht_video_file_popup.logicBlock_visible();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_varchanged_open_video_hs=function() {
				me._ht_video_file_bg.logicBlock_alpha();
				me._ht_video_file_popup_bg.logicBlock_scaling();
				me._ht_video_file_popup_bg.logicBlock_alpha();
				me._ht_video_file_popup.logicBlock_visible();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_video_file;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_info(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_info';
		el.userData.x = 0.65;
		el.userData.y = 2.08;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info.visible
			let parentEl = me._ht_info.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info.userData.opacity = v;
			v = v * me._ht_info.userData.parentOpacity;
			me._ht_info.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info.children.length; i++) {
				let child = me._ht_info.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info.userData.parentOpacity = v;
			v = v * me._ht_info.userData.opacity
			me._ht_info.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info.children.length; i++) {
				let child = me._ht_info.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info = el;
		el.userData.ggId="ht_info";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_info']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_info']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_info_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_bg.material.opacity = v * me._ht_info_bg.userData.backgroundColorAlpha;
			if (me._ht_info_bg.userData.ggSubElement) {
				me._ht_info_bg.userData.ggSubElement.material.opacity = v
				me._ht_info_bg.userData.ggSubElement.visible = (v>0 && me._ht_info_bg.userData.visible);
			}
			me._ht_info_bg.visible = (v>0 && me._ht_info_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_bg.userData.backgroundColorAlpha = v;
			me._ht_info_bg.userData.setOpacity(me._ht_info_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_bg.visible
			let parentEl = me._ht_info_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_bg.userData.opacity = v;
			v = v * me._ht_info_bg.userData.parentOpacity;
			me._ht_info_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_bg.children.length; i++) {
				let child = me._ht_info_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_bg.userData.parentOpacity = v;
			v = v * me._ht_info_bg.userData.opacity
			me._ht_info_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_bg.children.length; i++) {
				let child = me._ht_info_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_bg = el;
		el.userData.ggId="ht_info_bg";
		me._ht_info_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_info_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_info_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_info_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_info_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.scale.set(transition_scale.startScale.x + (me._ht_info_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_bg.position.x = (me._ht_info_bg.position.x - me._ht_info_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_bg.position.y = (me._ht_info_bg.position.y - me._ht_info_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_info_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_info_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.scale.set(transition_scale.startScale.x + (me._ht_info_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_bg.position.x = (me._ht_info_bg.position.x - me._ht_info_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_bg.position.y = (me._ht_info_bg.position.y - me._ht_info_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_info_bg.logicBlock_scaling();
		me._ht_info_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_info_bg.ggCurrentLogicStateVisible == 0) {
			me._ht_info_bg.visible=((!me._ht_info_bg.material && Number(me._ht_info_bg.userData.opacity>0)) || Number(me._ht_info_bg.material.opacity)>0)?true:false;
			me._ht_info_bg.userData.visible=true;
				}
				else {
			me._ht_info_bg.visible=false;
			me._ht_info_bg.userData.visible=false;
				}
			}
		}
		me._ht_info_bg.logicBlock_visible();
		me._ht_info_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_image_hs') !== null) && (player.getVariableValue('open_image_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_info_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_info_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_bg.material ? me._ht_info_bg.material.opacity : me._ht_info_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_info_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_bg.material ? me._ht_info_bg.material.opacity : me._ht_info_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_info_bg.logicBlock_alpha();
		me._ht_info_bg.userData.onclick=function (e) {
			player.setVariableValue('open_info_hs', player.getVariableValue('open_info_hs') + "<"+me.hotspot.id+">");
		}
		me._ht_info_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_info_bg']=true;
			me._ht_info_title.logicBlock_alpha();
			me._ht_info_bg.logicBlock_scaling();
		}
		me._ht_info_bg.userData.ontouchend=function (e) {
			me._ht_info_bg.logicBlock_scaling();
		}
		me._ht_info_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_info_bg']=false;
			me._ht_info_title.logicBlock_alpha();
			me._ht_info_bg.logicBlock_scaling();
		}
		me._ht_info_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_info_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAH7klEQVR4nO2bf4xU1RXHP2dmdtlfgFBIq5utws7sQEFWEattwUhTSxVrkIpL/JG2MZpa08TapPaPtiGRNKQ1xpjU/rJp2th0l25V0BjxRxZDE9pqsItImPdmnaS4pUFAcdkf7Ox7p3+8N86AOPPum9mdwcwn2bx379xz79nve3fufe+cgTp16tSpU6fOJxSptgMfMjQ0l2x2PtHoPGA2qosROUUstodLLjmKiFsNt6oj0MBAjI6ONTjOOkQuQ7Ubkc8UsTgN7AdeR2QX8AKJxOmZcHVmBbLtq1H9DvB1YH4ZPb2HSD/wZ+LxPdN5d02/QKqCZd2KyPeBq8761AEOAP9G9U0ikaPASRznFCKdRCLzUW0EkkAXsBRoO6uPtxH5EfF4PyJaafenV6B0+g'+
	'oc5zFEvlhQmwV2IvI0jY3Pc/HF7wXu78CBRhoavgJsRmQDMLvg0z2I3E8isa8yzntMj0CDg600Nz8C3F0wxjHgVzQ0PM6iRf8re4xMpompqRtR3QIs82sVkd8zNnY/3d2jZY/BdAiUSi0mEnkG1Uv9mklUH0H1ZyxZMlLx8QYGYrS33wU8BCz0a/ehehPJ5HC53VdWIMu6DugD5vk1uxC5j0RiqKLjnAvbnoPqVuB7fs0RXPcmlix5vZxuKyeQba9D9VmgAe9W30I8vnXG9y+W9S3gt74fE4j0kEjsDNtdZQRKpdb4+5Nm4BSqPSSTz1ek73D+rEbkaWABMIHqNSSTr4XpqnyBbHsZqnvxVpRxRK4nkXi17H7LJZ2O47p78UQ6guqVYb6TImU5kck0odqLJ84kIhtqQhyAeDyN6s1424oLEdnJ4GCraTflCZTNbgOW'+
	'A6B6H4nEi2X1V2mSyb8D9/illbS0PDpzg6fTa7Es9f/+hmrtPPiejWU95vvpYtsrTUzD3UGqgurP/dIRHOee6djmVwyRHwPvAoLqoyYXM5xAlrUB1VUAqG5h6dLjofqZKRKJD4Cf+qU1pNO3BDU1F0g1gshWv/Q2IyN/MO6jGgwPPwEcBEB1G6qB/ndzgSzrS8Dn/NJDrFqVNe6jGqxdO4XIFr+0GNteHcTMXCCRO/yzUzQ39xnbV5OmpueA3PPg7UFMzASy7VnArQCIPEVHx7iRfbXp6BhHdYdf2sSBA42lTMwEUr0GuAAAkb+Y+lcTiPT6Z/OYNev6Us1Np9jV/tFldHSPoW1tMDn5EnAKANV1pZqbCuS9MhV5q1IvpGac5csnETnkl64o1dxUoM8DoBrqybhmULX8sxWllvvgAh0+3Ez+jV0qnGc1gkjO/yYymY'+
	'XFmgYXaGwsH6ZRPRHKsVrBdfMXeHKyo1jT4AK5bl4gkeCRiFpEJH+Bo9Gzw0hnEFygSGRuQekDY6dqCdd1CkpFH7JNBMqvWiLNxk7VEtFoYTytaKQluEBTU/lp5boXGDtVS7ju3ILz94s1DS6QyPGC82KJBucD+ZUrm62QQF7Q7x2AgqDg+YlILhJ7jGXLii44phvFQX+Ay0O4VTuIXOof95d6E2oq0Bv+cSmp1IIQrlWf4eGWD2eA6w6Wam76NL+rwO4GU99qgtHRLwOzABB5pVRzM4G6uvbivfzGTz85H1nvHydobR0o1dhMIBEH1Vyc+0YOHrzQ0Lnqksk0kXvhB6/Q3j5WyiRMVOM3/rGBWOzeEPbVI5vdSC71T+SPQUzMBfKSAHJL470MDMSM+6gGXizsQb90jNOndxRrniNs6HnSP0a59traDRgWkk7fDqwA'+
	'QOR3LF8+WdzAw1ygQ4dmk3svDc8g4hRrXhMMDc1F9WG/dATYFtQ0TNhnPbllUrXf2L4auO4vgE8DoPqAH2kNRBiBcmHbk2SzLxvbzzS2fReqd/ull+nqMorlmQnk5dd4G0SRHUHncdWwrKtQfdwvvUNDw52mSRZmArW03ICXZgdQ29PLS3N5DmgEJnDdm8OkH5sJ5Lq56TVCLPaS6WAzRiq1GtUBvPQ7RfXbYbNdgws0PNzif0EDPMuiRRNhBpx2bPsORF4E5gBZRHpIJntLmX0cwTd5o6NfA7wcv1pcvYaG5uI4v0Q1l5QwhshGEoldRe1KYDLFctNrlJaWF4xGUZUgiQKhUI2SSn0Tx9lPPmMjhcjqcsWBoGnAmUwT2ey7QBsifSQSm0vaeL/yWUUkshnVB/zaQURuI5E4GN5lH9uehepGvMyxJQWf/JrW1h8EeR'+
	'ANQrApNjX1VfI/Q/r46eWJsoJIpAfb7kFkMXrGqtqN6lukUgPAU0SjO4jHDwf2NpNpwnG+gOptqN5CfkcPnvgPVuKuKSTYHZRK/QmRO4FxxscXfiRxwbKWotqDSA9nXs0gpFF9A5FB4L/ASWAE1TYikXmozgc6Ub0SkW4+elHTqP6Erq7t0/Gzh9ICebfyUbxVoZ+urk1+fSeumxNlxTksX0O1j1jsr3R2/gfwst8d57uIfAP4bBl+jwD9uO6TJJOvTufzYGmBLGs93oYL4Id4+4rNiJwrdWQQ1T4ike1Ff+GjKth2N97bvZXAZcDiIl68D/wL1X8A/6StbXelvmNKUVqgVGo7IpuKtDiESC+u20cyeahIu+IMD7cwPv4ppqbmITIHGCEaPUFz83Euumi8WnnYxQVSjWLbI+QfL3IMIdKH4/SRTL5Z00nkZVJ8Fdu9'+
	'W2hvPwG0+zUPE4n00tm575Msihmp1AJs+/Kgidd16tSpU6dOnTrnCf8HwjucaYZrX1cAAAAASUVORK5CYII=');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_info_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_info_icon.material) me._ht_info_icon.material.opacity = v;
			me._ht_info_icon.visible = (v>0 && me._ht_info_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_info_icon.visible
			let parentEl = me._ht_info_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_icon.userData.opacity = v;
			v = v * me._ht_info_icon.userData.parentOpacity;
			me._ht_info_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_icon.children.length; i++) {
				let child = me._ht_info_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_icon.userData.parentOpacity = v;
			v = v * me._ht_info_icon.userData.opacity
			me._ht_info_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_icon.children.length; i++) {
				let child = me._ht_info_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_icon = el;
		el.userData.ggId="ht_info_icon";
		me._ht_info_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_bg.add(me._ht_info_icon);
		geometry = new THREE.PlaneGeometry(1, 0.2, 5, 5 );
		geometry.name = 'ht_info_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_title.material.opacity = v;
			if (me._ht_info_title.userData.hasScrollbar) {
				me._ht_info_title.userData.scrollbar.material.opacity = v;
				me._ht_info_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_info_title.userData.ggSubElement) {
				me._ht_info_title.userData.ggSubElement.material.opacity = v
				me._ht_info_title.userData.ggSubElement.visible = (v>0 && me._ht_info_title.userData.visible);
			}
			me._ht_info_title.visible = (v>0 && me._ht_info_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_title.userData.backgroundColorAlpha = v;
			me._ht_info_title.userData.setOpacity(me._ht_info_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.325);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_title';
		el.userData.x = 0;
		el.userData.y = -0.325;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_title.visible
			let parentEl = me._ht_info_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_title.userData.opacity = v;
			v = v * me._ht_info_title.userData.parentOpacity;
			me._ht_info_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_title.children.length; i++) {
				let child = me._ht_info_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_title.userData.parentOpacity = v;
			v = v * me._ht_info_title.userData.opacity
			me._ht_info_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_title.children.length; i++) {
				let child = me._ht_info_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0, 0.854902, 0.854902).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 40;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_info_title.userData.totalHeightCanv = 2 * (3);
			me._ht_info_title.userData.textLines = [];
			var ctx = me._ht_info_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_info_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_info_title.userData.textLines.push(line);
					line = '';
					me._ht_info_title.userData.totalHeightCanv += me._ht_info_title.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_info_title.userData.width - 0 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_info_title.userData.textLines.push(line);
					line = words[i];
					me._ht_info_title.userData.totalHeightCanv += me._ht_info_title.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_info_title.userData.textLines.push(line);
			me._ht_info_title.userData.totalHeightCanv += me._ht_info_title.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_info_title.userData.textCanvas;
			var ctx = me._ht_info_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_title.userData.textColor.r * 255 + ', ' + me._ht_info_title.userData.textColor.g * 255 + ', ' + me._ht_info_title.userData.textColor.b * 255 + ', ' + me._ht_info_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_info_title.userData.boxWidthCanv - (me._ht_info_title.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 3;
			for (var i = 0; i < me._ht_info_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_info_title.userData.textLines[i], x, y);
				y += me._ht_info_title.userData.lineHeightCanv;
			}
			geometry = new THREE.PlaneGeometry(me._ht_info_title.userData.boxWidthCanv / 200.0, me._ht_info_title.userData.boxHeightCanv / 200.0, 5, 5 );
			geometry.name = 'ht_info_title_geometry';
			me._ht_info_title.geometry.dispose();
			me._ht_info_title.geometry = geometry;
			var diffY = (me._ht_info_title.userData.boxHeightCanv / 2) - me._ht_info_title.userData.height;
			me._ht_info_title.position.y = me._ht_info_title.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_info_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_info_title.material.map) {
				me._ht_info_title.material.map.dispose();
			}
			me._ht_info_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_info_title.children.length; i++) {
				let child = me._ht_info_title.children[i];
				if (child.name.includes('scrollbar')) me._ht_info_title.remove(child);
			}
			var canv = me._ht_info_title.userData.textCanvas;
			var ctx = me._ht_info_title.userData.textCanvasContext;
			ctx.font = '36px Verdana';
			me._ht_info_title.userData.lineHeightCanv = 36 * 1.2;
			me._ht_info_title.userData.textLines = [];
			me._ht_info_title.userData.textLines.push(me._ht_info_title.userData.ggText);
			me._ht_info_title.userData.totalHeightCanv = 2 * (3);
			me._ht_info_title.userData.totalHeightCanv += me._ht_info_title.userData.lineHeightCanv;
			me._ht_info_title.userData.boxWidthCanv = ctx.measureText(me._ht_info_title.userData.ggText).width + (2 * 0);
			me._ht_info_title.userData.boxHeightCanv = me._ht_info_title.userData.totalHeightCanv;
			canv.width = me._ht_info_title.userData.boxWidthCanv;
			canv.height = me._ht_info_title.userData.boxHeightCanv;
			ctx.font = '36px Verdana';
			me._ht_info_title.userData.ggPaintCanvasText();
		}
		me._ht_info_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_info_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_info_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_info_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_info_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_info_title";
		me._ht_info_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_info_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_info_title.ggCurrentLogicStateAlpha == 0) {
					me._ht_info_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_info_title.userData.transitions.length; i++) {
						if (me._ht_info_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_title.userData.transitions[i].interval);
							me._ht_info_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_title.material ? me._ht_info_title.material.opacity : me._ht_info_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_title.userData.transitions.splice(me._ht_info_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_info_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_info_title.userData.transitions.length; i++) {
						if (me._ht_info_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_title.userData.transitions[i].interval);
							me._ht_info_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_title.material ? me._ht_info_title.material.opacity : me._ht_info_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_title.userData.transitions.splice(me._ht_info_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_info_title.logicBlock_alpha();
		me._ht_info_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_bg.add(me._ht_info_title);
		me._ht_info.add(me._ht_info_bg);
		width = 6.6;
		height = 4.8;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.3, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.3, (height / 2.0));
		roundedRectShape.arc(0, -0.3, 0.3, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.arc(-0.3, 0, 0.3, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.3, (-height / 2.0));
		roundedRectShape.arc(0, 0.3, 0.3, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.arc(0.3, 0, 0.3, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_info_popup_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_popup_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_popup_bg.material.opacity = v * me._ht_info_popup_bg.userData.backgroundColorAlpha;
			if (me._ht_info_popup_bg.userData.ggSubElement) {
				me._ht_info_popup_bg.userData.ggSubElement.material.opacity = v
				me._ht_info_popup_bg.userData.ggSubElement.visible = (v>0 && me._ht_info_popup_bg.userData.visible);
			}
			me._ht_info_popup_bg.visible = (v>0 && me._ht_info_popup_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_popup_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_popup_bg.userData.backgroundColorAlpha = v;
			me._ht_info_popup_bg.userData.setOpacity(me._ht_info_popup_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.10, 0.10, 1.0);
		el.userData.width = 660;
		el.userData.height = 480;
		el.userData.scale = {x: 0.10, y: 0.10, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_popup_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_popup_bg.visible
			let parentEl = me._ht_info_popup_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_popup_bg.userData.opacity = v;
			v = v * me._ht_info_popup_bg.userData.parentOpacity;
			me._ht_info_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup_bg.children.length; i++) {
				let child = me._ht_info_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_popup_bg.userData.parentOpacity = v;
			v = v * me._ht_info_popup_bg.userData.opacity
			me._ht_info_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup_bg.children.length; i++) {
				let child = me._ht_info_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_popup_bg = el;
		el.userData.ggId="ht_info_popup_bg";
		me._ht_info_popup_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('open_info_hs') !== null) && (player.getVariableValue('open_info_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_popup_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_popup_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_info_popup_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_info_popup_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_info_popup_bg.userData.transitions.length; i++) {
						if (me._ht_info_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_popup_bg.userData.transitions[i].interval);
							me._ht_info_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_info_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_info_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_popup_bg.position.x = (me._ht_info_popup_bg.position.x - me._ht_info_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_popup_bg.position.y = (me._ht_info_popup_bg.position.y - me._ht_info_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_popup_bg.userData.transitions.splice(me._ht_info_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_popup_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_info_popup_bg.userData.transitionValue_scale = {x: 0.1, y: 0.1, z: 1.0};
					for (var i = 0; i < me._ht_info_popup_bg.userData.transitions.length; i++) {
						if (me._ht_info_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_popup_bg.userData.transitions[i].interval);
							me._ht_info_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_info_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_info_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_popup_bg.position.x = (me._ht_info_popup_bg.position.x - me._ht_info_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_popup_bg.position.y = (me._ht_info_popup_bg.position.y - me._ht_info_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_popup_bg.userData.transitions.splice(me._ht_info_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_popup_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_info_popup_bg.logicBlock_scaling();
		me._ht_info_popup_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_info_hs') !== null) && (player.getVariableValue('open_info_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info_popup_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info_popup_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_info_popup_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_info_popup_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_info_popup_bg.userData.transitions.length; i++) {
						if (me._ht_info_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_popup_bg.userData.transitions[i].interval);
							me._ht_info_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_popup_bg.material ? me._ht_info_popup_bg.material.opacity : me._ht_info_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_popup_bg.userData.transitions.splice(me._ht_info_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_popup_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_info_popup_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_info_popup_bg.userData.transitions.length; i++) {
						if (me._ht_info_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_popup_bg.userData.transitions[i].interval);
							me._ht_info_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_popup_bg.material ? me._ht_info_popup_bg.material.opacity : me._ht_info_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_popup_bg.userData.transitions.splice(me._ht_info_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_popup_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_info_popup_bg.logicBlock_alpha();
		me._ht_info_popup_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(6, 4, 5, 5 );
		geometry.name = 'ht_info_popup_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_popup_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_popup.material.opacity = v;
			if (me._ht_info_popup.userData.hasScrollbar) {
				me._ht_info_popup.userData.scrollbar.material.opacity = v;
				me._ht_info_popup.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_info_popup.userData.ggSubElement) {
				me._ht_info_popup.userData.ggSubElement.material.opacity = v
				me._ht_info_popup.userData.ggSubElement.visible = (v>0 && me._ht_info_popup.userData.visible);
			}
			me._ht_info_popup.visible = (v>0 && me._ht_info_popup.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_popup.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_popup.userData.backgroundColorAlpha = v;
			me._ht_info_popup.userData.setOpacity(me._ht_info_popup.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.2);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 600;
		el.userData.height = 400;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_popup';
		el.userData.x = 0;
		el.userData.y = -0.2;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_popup.visible
			let parentEl = me._ht_info_popup.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_popup.userData.opacity = v;
			v = v * me._ht_info_popup.userData.parentOpacity;
			me._ht_info_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup.children.length; i++) {
				let child = me._ht_info_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_popup.userData.parentOpacity = v;
			v = v * me._ht_info_popup.userData.opacity
			me._ht_info_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup.children.length; i++) {
				let child = me._ht_info_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_popup = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0, 0, 0).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 1200;
		canvas.height = 800;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_info_popup.userData.totalHeightCanv = 2 * (33);
			me._ht_info_popup.userData.textLines = [];
			var ctx = me._ht_info_popup.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_info_popup.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_info_popup.userData.textLines.push(line);
					line = '';
					me._ht_info_popup.userData.totalHeightCanv += me._ht_info_popup.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_info_popup.userData.width - 30 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_info_popup.userData.textLines.push(line);
					line = words[i];
					me._ht_info_popup.userData.totalHeightCanv += me._ht_info_popup.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_info_popup.userData.textLines.push(line);
			me._ht_info_popup.userData.totalHeightCanv += me._ht_info_popup.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_info_popup.userData.textCanvas;
			var ctx = me._ht_info_popup.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_popup.userData.backgroundColor.r * 255 + ', ' + me._ht_info_popup.userData.backgroundColor.g * 255 + ', ' + me._ht_info_popup.userData.backgroundColor.b * 255 + ', ' + me._ht_info_popup.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_popup.userData.textColor.r * 255 + ', ' + me._ht_info_popup.userData.textColor.g * 255 + ', ' + me._ht_info_popup.userData.textColor.b * 255 + ', ' + me._ht_info_popup.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = 2 * 15;
			ctx.textAlign = 'left';
			var y = 2 * 18;
			y -= me._ht_info_popup.userData.scrollPosPercent * me._ht_info_popup.userData.totalHeightCanv;
			for (var i = 0; i < me._ht_info_popup.userData.textLines.length; i++) {
				ctx.fillText(me._ht_info_popup.userData.textLines[i], x, y);
				y += me._ht_info_popup.userData.lineHeightCanv;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_info_popup_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_info_popup.material.map) {
				me._ht_info_popup.material.map.dispose();
			}
			me._ht_info_popup.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_info_popup.children.length; i++) {
				let child = me._ht_info_popup.children[i];
				if (child.name.includes('scrollbar')) me._ht_info_popup.remove(child);
			}
			var canv = me._ht_info_popup.userData.textCanvas;
			var ctx = me._ht_info_popup.userData.textCanvasContext;
			ctx.font = '44px Verdana';
			me._ht_info_popup.userData.lineHeightCanv = 44 * 1.2;
			me._ht_info_popup.userData.ggWrapText(false);
			me._ht_info_popup.userData.boxWidthCanv = 2 * me._ht_info_popup.userData.width;
			me._ht_info_popup.userData.boxHeightCanv = 2 * me._ht_info_popup.userData.height;
			me._ht_info_popup.userData.scrollPosPercent = 0.0
			if (me._ht_info_popup.userData.totalHeightCanv > (2 * (me._ht_info_popup.userData.height))) {
				me._ht_info_popup.userData.ggWrapText(true);
				me._ht_info_popup.userData.pagePercent = (2 * (me._ht_info_popup.userData.height) - me._ht_info_popup.userData.lineHeightCanv) / me._ht_info_popup.userData.totalHeightCanv;
				me._ht_info_popup.userData.maxScrollPercent = (me._ht_info_popup.userData.totalHeightCanv - (2 * (me._ht_info_popup.userData.height))) / me._ht_info_popup.userData.totalHeightCanv;
				geometry = new THREE.PlaneGeometry(25 / 100.0, me._ht_info_popup.userData.height / 100.0, 5, 5 );
				geometry.name = 'ht_info_popup_scrollbarBgGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x7f7f7f, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_popup_scrollbarBgMaterial';
				me._ht_info_popup.userData.scrollbarBg = new THREE.Mesh( geometry, material );
				me._ht_info_popup.userData.scrollbarBg.name = 'ht_info_popup_scrollbarBg';
				me._ht_info_popup.add(me._ht_info_popup.userData.scrollbarBg);
				me._ht_info_popup.userData.scrollbarXPos = (me._ht_info_popup.userData.width - 25) / 200.0;
				me._ht_info_popup.userData.scrollbarBg.position.x = me._ht_info_popup.userData.scrollbarXPos;
				me._ht_info_popup.userData.scrollbarBg.position.z = me._ht_info_popup.position.z + 0.01;
				me._ht_info_popup.userData.scrollbarBg.userData.stopPropagation = true;
				me._ht_info_popup.userData.scrollbarHeight = ((2 * me._ht_info_popup.userData.height) / me._ht_info_popup.userData.totalHeightCanv) * me._ht_info_popup.userData.height;
				geometry = new THREE.PlaneGeometry(25 / 100.0, me._ht_info_popup.userData.scrollbarHeight / 100.0, 5, 5 );
				geometry.name = 'ht_info_popup_scrollbarGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0xbfbfbf, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_popup_scrollbarMaterial';
				me._ht_info_popup.userData.scrollbar = new THREE.Mesh( geometry, material );
				me._ht_info_popup.userData.scrollbar.name = 'ht_info_popup_scrollbar';
				me._ht_info_popup.add(me._ht_info_popup.userData.scrollbar);
				me._ht_info_popup.userData.scrollbar.position.x = me._ht_info_popup.userData.scrollbarXPos;
				me._ht_info_popup.userData.scrollbar.position.z = me._ht_info_popup.position.z + 0.02;
				me._ht_info_popup.userData.scrollbarYPosMin = (me._ht_info_popup.userData.height - me._ht_info_popup.userData.scrollbarHeight) / 200.0;
				me._ht_info_popup.userData.scrollbarYPosMax = me._ht_info_popup.userData.scrollbarYPosMin - (me._ht_info_popup.userData.height - me._ht_info_popup.userData.scrollbarHeight) / 100.0;
				me._ht_info_popup.userData.scrollbar.position.y = me._ht_info_popup.userData.scrollbarYPosMin;
				geometry = new THREE.PlaneGeometry(25 / 100.0, me._ht_info_popup.userData.height / 200.0, 5, 5 );
				geometry.name = 'ht_info_popup_scrollbarPageDownGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_popup_scrollbarPageDownMaterial';
				me._ht_info_popup.userData.scrollbarPageDown = new THREE.Mesh( geometry, material );
				me._ht_info_popup.userData.scrollbarPageDown.name = 'ht_info_popup_scrollbarPageDown';
				me._ht_info_popup.userData.scrollbarPageDown.userData.onclick = function() {
					me._ht_info_popup.userData.scrollPosPercent -= me._ht_info_popup.userData.pagePercent;
					me._ht_info_popup.userData.scrollPosPercent = Math.max(me._ht_info_popup.userData.scrollPosPercent, 0);
					me._ht_info_popup.userData.ggPaintCanvasText();
					me._ht_info_popup.userData.scrollbar.position.y += (me._ht_info_popup.userData.height * me._ht_info_popup.userData.pagePercent) / 100.0;
					me._ht_info_popup.userData.scrollbar.position.y = Math.min(me._ht_info_popup.userData.scrollbar.position.y, me._ht_info_popup.userData.scrollbarYPosMin);
				}
				me._ht_info_popup.userData.scrollbarPageDown.position.x = me._ht_info_popup.userData.scrollbarXPos;
				me._ht_info_popup.userData.scrollbarPageDown.position.y = me._ht_info_popup.userData.height / 400.0;
				me._ht_info_popup.userData.scrollbarPageDown.position.z = me._ht_info_popup.position.z + 0.05;
				me._ht_info_popup.userData.scrollbarPageDown.userData.stopPropagation = true;
				me._ht_info_popup.userData.scrollbarPageDown.userData.clickInvisible = true;
				me._ht_info_popup.userData.scrollbarPageDown.visible = false;
				me._ht_info_popup.add(me._ht_info_popup.userData.scrollbarPageDown);
				geometry = new THREE.PlaneGeometry(25 / 100.0, me._ht_info_popup.userData.height / 200.0, 5, 5 );
				geometry.name = 'ht_info_popup_scrollbarPageUpGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_popup_scrollbarPageUpMaterial';
				me._ht_info_popup.userData.scrollbarPageUp = new THREE.Mesh( geometry, material );
				me._ht_info_popup.userData.scrollbarPageUp.name = 'ht_info_popup_scrollbarPageUp';
				me._ht_info_popup.userData.scrollbarPageUp.userData.onclick = function() {
					me._ht_info_popup.userData.scrollPosPercent += me._ht_info_popup.userData.pagePercent;
					me._ht_info_popup.userData.scrollPosPercent = Math.min(me._ht_info_popup.userData.scrollPosPercent, me._ht_info_popup.userData.maxScrollPercent);
					me._ht_info_popup.userData.ggPaintCanvasText();
					me._ht_info_popup.userData.scrollbar.position.y -= (me._ht_info_popup.userData.height * me._ht_info_popup.userData.pagePercent) / 100.0;
					me._ht_info_popup.userData.scrollbar.position.y = Math.max(me._ht_info_popup.userData.scrollbar.position.y, me._ht_info_popup.userData.scrollbarYPosMax);
				}
				me._ht_info_popup.userData.scrollbarPageUp.position.x = me._ht_info_popup.userData.scrollbarXPos;
				me._ht_info_popup.userData.scrollbarPageUp.position.y = -me._ht_info_popup.userData.height / 400.0;
				me._ht_info_popup.userData.scrollbarPageUp.position.z = me._ht_info_popup.position.z + 0.05;
				me._ht_info_popup.userData.scrollbarPageUp.userData.stopPropagation = true;
				me._ht_info_popup.userData.scrollbarPageUp.userData.clickInvisible = true;
				me._ht_info_popup.userData.scrollbarPageUp.visible = false;
				me._ht_info_popup.add(me._ht_info_popup.userData.scrollbarPageUp);
				me._ht_info_popup.userData.hasScrollbar = true;
			} else {
				me._ht_info_popup.userData.hasScrollbar = false;
			}
			canv.width = me._ht_info_popup.userData.boxWidthCanv;
			canv.height = me._ht_info_popup.userData.boxHeightCanv;
			ctx.font = '44px Verdana';
			me._ht_info_popup.userData.ggPaintCanvasText();
		}
		me._ht_info_popup.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.description))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_info_popup.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_info_popup.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_popup.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_popup.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_info_popup.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_info_popup.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_info_popup";
		me._ht_info_popup.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_popup_bg.add(me._ht_info_popup);
		geometry = new THREE.PlaneGeometry(0.4, 0.4, 5, 5 );
		geometry.name = 'ht_info_popup_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABJElEQVR4nO3bSw6DMBAEUSs341icfrLJSJGFAeNfY9c7QU9JiJVDAAAAAAAAAADgdcxsM7Nt9I4U6X2/cW4fvSdmZvvfPr2IUUCpiFE8zYAhHA4dHlFx0ymlwUpbsigMV9hQZOQBr4/nRhwyTTzX86Dp4rkeh00bz7U8cPp4rsWhy8RzNQ9eLp6rcfiy8VxJgOXjuSchiBfJCUK8hDthiHfhLBDxbjoKRbxMB8GIlysRUTLeZ/QAVMYnXICfSIGzUES8cCcQERNywhAx8iQIEX9KQiwfsUaAZSPWPHy5iC0OXiZiy0Onj9jjwGkj9jxsuogjDpom4shDXh9R4QCFDY8oDVfacoviYMVNh4xnDmWMhzblTPkpVdDfBwAAAAAAAABA2hcaGfeSY++bsA'+
	'AAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_info_popup_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.85);
		el.translateY(2.05);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 40;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_popup_close';
		el.userData.x = 2.85;
		el.userData.y = 2.05;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_info_popup_close.material) me._ht_info_popup_close.material.opacity = v;
			me._ht_info_popup_close.visible = (v>0 && me._ht_info_popup_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_info_popup_close.visible
			let parentEl = me._ht_info_popup_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_popup_close.userData.opacity = v;
			v = v * me._ht_info_popup_close.userData.parentOpacity;
			me._ht_info_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup_close.children.length; i++) {
				let child = me._ht_info_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_popup_close.userData.parentOpacity = v;
			v = v * me._ht_info_popup_close.userData.opacity
			me._ht_info_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_popup_close.children.length; i++) {
				let child = me._ht_info_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_popup_close = el;
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABjUlEQVR4nO3bTW6DMBBA4SHqUZByDnIrcoD0Vsk5HPks0EVkmlLI39h4wO+TukgWaPyUqo0NIgAAAAAAAAAArI/3jXjf5B5jVoL5dtGu5H0jXXeWrjuLc22068biXDvMFzFivID3qupkKqJzrVTVKcWl4wWs64v0/XF4bSXiOF7fH6WuLxknesK5Vq7XfvjJGdHSLG+xMLiFGVRyLmD18YIcC9lMvGDJBW0uXrDEwjYbL0i5wM3HC1IstJh4QcwFFxcviLHwYuMFmgDFxws+CUG8kXeCEG/GK2GI98SjQIbjVbkH+GNq705E/r23338vPtsMWwFFHu8eG4snYjGgyHREg/FEUp2JFMTeJ5BfYYUV/hH5yj3AYCpeCOXcb8TbaZ9Yipgf/0gr8FVOgc'+
	'0EBbazFNhQVWBLX4FDJQWONRU4WFfg1g4Fbi5S4PY2BQsLsDDDRywNbmmWl1gcOPFM8TZUw3MigaWNz/Fe4253iHWnfpozEUvxRG6br/ePYJhV4KNeAAAAAAAAAAAs4wf6cWDrkP66yAAAAABJRU5ErkJggg==');
		textureOver.colorSpace = player.getVRTextureColorSpace();
		el.userData.materialOver = new THREE.MeshBasicMaterial( {map: textureOver, side: THREE.DoubleSide, transparent: true} );
		el.userData.materialOver.name = 'ht_info_popup_close_materialOver';
		el.userData.ggId="ht_info_popup_close";
		me._ht_info_popup_close.userData.onclick=function (e) {
			player.setVariableValue('open_info_hs', player.getVariableValue('open_info_hs').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_info_popup_close.userData.onmouseenter=function (e) {
			me._ht_info_popup_close.material = me._ht_info_popup_close.userData.materialOver;
			me.elementMouseOver['ht_info_popup_close']=true;
		}
		me._ht_info_popup_close.userData.onmouseleave=function (e) {
			me._ht_info_popup_close.material = me._ht_info_popup_close.userData.materialNormal;
			me.elementMouseOver['ht_info_popup_close']=false;
		}
		me._ht_info_popup_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_popup_bg.add(me._ht_info_popup_close);
		me._ht_info.add(me._ht_info_popup_bg);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_info_customimage.userData.ggSubElement) {
				me._ht_info_customimage.userData.ggSubElement.material.opacity = v
				me._ht_info_customimage.userData.ggSubElement.visible = (v>0 && me._ht_info_customimage.userData.visible);
			}
			me._ht_info_customimage.visible = (v>0 && me._ht_info_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_customimage.visible
			let parentEl = me._ht_info_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_customimage.userData.opacity = v;
			v = v * me._ht_info_customimage.userData.parentOpacity;
			me._ht_info_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_customimage.children.length; i++) {
				let child = me._ht_info_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_customimage.userData.parentOpacity = v;
			v = v * me._ht_info_customimage.userData.opacity
			me._ht_info_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_customimage.children.length; i++) {
				let child = me._ht_info_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_info_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_info_CustomImage_subElementMaterial';
				me._ht_info_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_info_customimage.userData.ggUpdatePosition();
				me._ht_info_customimage.userData.ggText = extUrl;
				me._ht_info_customimage.userData.setOpacity(me._ht_info_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_info_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_info_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_info_CustomImage";
		me._ht_info_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == "")) || 
				(((player.getVariableValue('open_info_hs') !== null) && (player.getVariableValue('open_info_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_info_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_info_customimage.visible=false;
			me._ht_info_customimage.userData.visible=false;
				}
				else {
			me._ht_info_customimage.visible=((!me._ht_info_customimage.material && Number(me._ht_info_customimage.userData.opacity>0)) || Number(me._ht_info_customimage.material.opacity)>0)?true:false;
			me._ht_info_customimage.userData.visible=true;
				}
			}
		}
		me._ht_info_customimage.logicBlock_visible();
		me._ht_info_customimage.userData.onclick=function (e) {
			player.setVariableValue('open_info_hs', player.getVariableValue('open_info_hs') + "<"+me.hotspot.id+">");
		}
		me._ht_info_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_info_customimage.userData.clientWidth;
			var parentHeight = me._ht_info_customimage.userData.clientHeight;
			var img = me._ht_info_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_info_CustomImage_imgGeometry';
			}
		}
		me._ht_info.add(me._ht_info_customimage);
		me._ht_info.userData.setOpacity(1.00);
		me.elementMouseOver['ht_info']=false;
		me._ht_info_bg.logicBlock_scaling();
		me._ht_info_bg.logicBlock_visible();
		me._ht_info_bg.logicBlock_alpha();
		me._ht_info_bg.userData.setOpacity(1.00);
		me.elementMouseOver['ht_info_bg']=false;
		me._ht_info_icon.userData.setOpacity(1.00);
		me._ht_info_title.logicBlock_alpha();
		me._ht_info_title.userData.setOpacity(0.00);
		me._ht_info_popup_bg.logicBlock_scaling();
		me._ht_info_popup_bg.logicBlock_alpha();
		me._ht_info_popup_bg.userData.setOpacity(0.00);
		me._ht_info_popup.userData.setOpacity(1.00);
		me._ht_info_popup_close.userData.setOpacity(1.00);
		me.elementMouseOver['ht_info_popup_close']=false;
		me._ht_info_customimage.logicBlock_visible();
		me._ht_info_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_info_bg.logicBlock_visible();
				me._ht_info_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_info_bg.logicBlock_visible();
				me._ht_info_bg.logicBlock_alpha();
					me._ht_info_title.userData.ggUpdateText();
				me._ht_info_popup_bg.logicBlock_scaling();
				me._ht_info_popup_bg.logicBlock_alpha();
					me._ht_info_popup.userData.ggUpdateText();
				me._ht_info_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_info_bg.logicBlock_visible();
				me._ht_info_bg.logicBlock_alpha();
				me._ht_info_popup_bg.logicBlock_scaling();
				me._ht_info_popup_bg.logicBlock_alpha();
				me._ht_info_customimage.logicBlock_visible();
			};
			me.ggEvent_varchanged_open_image_hs=function() {
				me._ht_info_bg.logicBlock_alpha();
			};
			me.ggEvent_varchanged_open_info_hs=function() {
				me._ht_info_popup_bg.logicBlock_scaling();
				me._ht_info_popup_bg.logicBlock_alpha();
				me._ht_info_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_info;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_image(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_image';
		el.userData.x = -1.17;
		el.userData.y = 2.1;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image.visible
			let parentEl = me._ht_image.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image.userData.opacity = v;
			v = v * me._ht_image.userData.parentOpacity;
			me._ht_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image.children.length; i++) {
				let child = me._ht_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image.userData.parentOpacity = v;
			v = v * me._ht_image.userData.opacity
			me._ht_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image.children.length; i++) {
				let child = me._ht_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image = el;
		el.userData.ggId="ht_image";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_image.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_image']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_image']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_image_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_image_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_image_bg.material.opacity = v * me._ht_image_bg.userData.backgroundColorAlpha;
			if (me._ht_image_bg.userData.ggSubElement) {
				me._ht_image_bg.userData.ggSubElement.material.opacity = v
				me._ht_image_bg.userData.ggSubElement.visible = (v>0 && me._ht_image_bg.userData.visible);
			}
			me._ht_image_bg.visible = (v>0 && me._ht_image_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_bg.userData.backgroundColorAlpha = v;
			me._ht_image_bg.userData.setOpacity(me._ht_image_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_bg.visible
			let parentEl = me._ht_image_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_bg.userData.opacity = v;
			v = v * me._ht_image_bg.userData.parentOpacity;
			me._ht_image_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_bg.children.length; i++) {
				let child = me._ht_image_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_bg.userData.parentOpacity = v;
			v = v * me._ht_image_bg.userData.opacity
			me._ht_image_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_bg.children.length; i++) {
				let child = me._ht_image_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_bg = el;
		el.userData.ggId="ht_image_bg";
		me._ht_image_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_image_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_image_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_image_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_image_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_image_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_image_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.scale.set(transition_scale.startScale.x + (me._ht_image_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_bg.position.x = (me._ht_image_bg.position.x - me._ht_image_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_bg.position.y = (me._ht_image_bg.position.y - me._ht_image_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_image_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_image_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.scale.set(transition_scale.startScale.x + (me._ht_image_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_bg.position.x = (me._ht_image_bg.position.x - me._ht_image_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_bg.position.y = (me._ht_image_bg.position.y - me._ht_image_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_image_bg.logicBlock_scaling();
		me._ht_image_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_image_bg.ggCurrentLogicStateVisible == 0) {
			me._ht_image_bg.visible=((!me._ht_image_bg.material && Number(me._ht_image_bg.userData.opacity>0)) || Number(me._ht_image_bg.material.opacity)>0)?true:false;
			me._ht_image_bg.userData.visible=true;
				}
				else {
			me._ht_image_bg.visible=false;
			me._ht_image_bg.userData.visible=false;
				}
			}
		}
		me._ht_image_bg.logicBlock_visible();
		me._ht_image_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_image_hs') !== null) && (player.getVariableValue('open_image_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_image_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_image_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_bg.material ? me._ht_image_bg.material.opacity : me._ht_image_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_image_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_bg.material ? me._ht_image_bg.material.opacity : me._ht_image_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_image_bg.logicBlock_alpha();
		me._ht_image_bg.userData.onclick=function (e) {
			player.setVariableValue('open_image_hs', player.getVariableValue('open_image_hs') + "<"+me.hotspot.id+">");
		}
		me._ht_image_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_image_bg']=true;
			me._ht_image_title.logicBlock_alpha();
			me._ht_image_bg.logicBlock_scaling();
		}
		me._ht_image_bg.userData.ontouchend=function (e) {
			me._ht_image_bg.logicBlock_scaling();
		}
		me._ht_image_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_image_bg']=false;
			me._ht_image_title.logicBlock_alpha();
			me._ht_image_bg.logicBlock_scaling();
		}
		me._ht_image_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_image_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAGE0lEQVR4nO2b3W8VRRiHn9lzKNy0V9qGEkmbdA/FIBcGpYFoxAoGNZqi92I1ond66Qea1AB/gh8JlHrjhaFEIyEi2ITED5RoAgSOOye2kLQGuCsmkvacfb2Y2XNOP0/bs7OFdp+b3dndeWf2tzuz77wzCykpKSkpKSkrFJVYSdeutZHNtsViq1S6TmfncCy2apCMQFo/isgvQENsNkX2sWnTydjszYF7ga5caWDt2ouIPBKz5TtMTDzAli0TMdudQtalcQAaGj6sEuc8Sn1clz2RL4GHgEbWrPkAqM9eDdy+QaZp/QZkgEtMTDxW9xOf+kYWUepxfP/POKo7G+4EcnkjLoSfA8+FUWBq0xI5HOtT9v0/gMM2tdU2NSe4eYOSeMIJNbX4BUqyj0jgQc'+
	'wvUKHQTLHok8msWbBFkT7gifL+pk1OvzIEQR9w0KYW95UslSbJZjUdHbfmumR2gbR+EZH3ge2LqOp0nHaeZeLxsy6g1GF8/9vpJ6YKdPHiGpqaPgdeq6MwgAmU6nL5+Z1CfJ56P+PjB9i2bTI6MFWgIDhGRZxR4Dgil/G8m4sqplgcYfPmkfrqukiWMtYLwxaUegTYD2ywR/vJ5XqjSyoCmWb1DQAiX+N5b+D74/XV+j5B6yZEjgKvAKDUS1Fzq/hBps8BGF1V4gD4/jhKvY5pNSDyXnTKCFQoNFPpkI+vKnEijEgDNtVlNbECFYt++UKRy4lX7l4hDC+V960mRqBqP2exHfJKovrerSbuwx0LQcRjZKSZUsl8STKZUdrabqFUuMw1W0aB8vlGPO9loAet9wDryufCELS+SxCcAU4Shifo7LyzHNV0N5qfi6GhLEFw'+
	'AM8rAP3Ai1SLU2GdPdeP52n++utNhoYSf6DJFlgoNFMqnQR2VB3VwClEruF5/wAQhutRajPwAtABtKDU57S2vkqh0DPf2ClukhNI64cJw9MotdEeOQt8SC53YZ5c7xIE24FDQDdK7SAMf0frvfj+Ved1Jqkm9vffLYicBjYCE0AvudzuGuIYcrkL5HLPAL0270ZETkd+imvcCzQ0lGVycpCKOLvJ5foXbcfk2U1FpMEk+iT3ArW29qJU1Oe8RS53fsm2crnzKPU2ACI7aW2tN+pQE7cC5fONKNVnU+eW9OZMx/ePodSPACj1Cfl8Y90258GtQMbPabGpOAPrka0WlNoXo90ZuG5iPXarF9QhL5SOjgtAYVoZTnAnkIgH7LGpU7HaVkqA7+z+s7YsJ7gTaGSkmchDFrnmoIS83a5jePhBB/YBlwJFA0+g7CHHiVJjs5'+
	'YVM8mPxe4z3AmUyYyW98Nwfez2RVpnLStm3AnU1nYLuAtgB55x02m3/9HeftuBfcClQCbYdcamno/VtojCjPRB5IzLwJrrPihaIufbUXk8FArbMWGQ6jKc4FagMDwBRHHeQzFajmzdZHLyRIx2Z+BWoM7OO4h8ZFPdBEH9g0utexF5GgCRg2zZ8m/dNufB/Wd+bOwYIj/b1GcEwZNLthUETyLyKQBK/cTYWP2D3xq4F2jXriKZTA9wA7O44Ae07q2RayYmzw9AAyLXUWofu3YV463sTJJxFDs6bqHUXiKRRI4SBGfRust+kWZHRKF1F1qfs3PnDcANPO+5pOLSycWkff8qhcJjiAwishPoRqQbrQsEwXdAvjx8ME7gZrR+nsrXyjQrpfatzKA9mDdpaOgpG2Xsw8SKOoB3ABCZK+dNRA4yOtqfRLOqJvmJQ3ODX5DP'+
	'f2WDXT0o9Swz58buIvI9cBKRweWaOFy+mVVzwwPAACIew8MPTpl6bm+/vbqnnqsxQtyk4lTeM6ThjhqkAtUgFagGRqBSqbzslTBsmeviFU/1vVtNjEDZrC6fMMtiVyeet7W8bzUxAhnPNJq32o/WTUnXbdkxS4FftalfI2+90gcpFf1etAGRo6tKpMo6aeOHKXUkOjX/SnulBgjDSyt2YWcYtuB5W+2bM+tK+6mO4vj4AZqawIi0AZH3UWq+MdL9zcx7M/9qVF8ya0bzW8J7QJe72t1T/IpSR2r/7TOdpfwvdj+xgP/FUlJSUlJSUlYs/wPo1FCsX/2AywAAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_image_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_icon.material) me._ht_image_icon.material.opacity = v;
			me._ht_image_icon.visible = (v>0 && me._ht_image_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_image_icon.visible
			let parentEl = me._ht_image_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_icon.userData.opacity = v;
			v = v * me._ht_image_icon.userData.parentOpacity;
			me._ht_image_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_icon.children.length; i++) {
				let child = me._ht_image_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_icon.userData.parentOpacity = v;
			v = v * me._ht_image_icon.userData.opacity
			me._ht_image_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_icon.children.length; i++) {
				let child = me._ht_image_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_icon = el;
		el.userData.ggId="ht_image_icon";
		me._ht_image_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image_bg.add(me._ht_image_icon);
		geometry = new THREE.PlaneGeometry(1, 0.2, 5, 5 );
		geometry.name = 'ht_image_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_image_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_image_title.material.opacity = v;
			if (me._ht_image_title.userData.hasScrollbar) {
				me._ht_image_title.userData.scrollbar.material.opacity = v;
				me._ht_image_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_image_title.userData.ggSubElement) {
				me._ht_image_title.userData.ggSubElement.material.opacity = v
				me._ht_image_title.userData.ggSubElement.visible = (v>0 && me._ht_image_title.userData.visible);
			}
			me._ht_image_title.visible = (v>0 && me._ht_image_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_title.userData.backgroundColorAlpha = v;
			me._ht_image_title.userData.setOpacity(me._ht_image_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.325);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_title';
		el.userData.x = 0;
		el.userData.y = -0.325;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_title.visible
			let parentEl = me._ht_image_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_title.userData.opacity = v;
			v = v * me._ht_image_title.userData.parentOpacity;
			me._ht_image_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_title.children.length; i++) {
				let child = me._ht_image_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_title.userData.parentOpacity = v;
			v = v * me._ht_image_title.userData.opacity
			me._ht_image_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_title.children.length; i++) {
				let child = me._ht_image_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0, 0.854902, 0.854902).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 40;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_image_title.userData.totalHeightCanv = 2 * (3);
			me._ht_image_title.userData.textLines = [];
			var ctx = me._ht_image_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_image_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_image_title.userData.textLines.push(line);
					line = '';
					me._ht_image_title.userData.totalHeightCanv += me._ht_image_title.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_image_title.userData.width - 0 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_image_title.userData.textLines.push(line);
					line = words[i];
					me._ht_image_title.userData.totalHeightCanv += me._ht_image_title.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_image_title.userData.textLines.push(line);
			me._ht_image_title.userData.totalHeightCanv += me._ht_image_title.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_image_title.userData.textCanvas;
			var ctx = me._ht_image_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_image_title.userData.textColor.r * 255 + ', ' + me._ht_image_title.userData.textColor.g * 255 + ', ' + me._ht_image_title.userData.textColor.b * 255 + ', ' + me._ht_image_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_image_title.userData.boxWidthCanv - (me._ht_image_title.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 3;
			for (var i = 0; i < me._ht_image_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_image_title.userData.textLines[i], x, y);
				y += me._ht_image_title.userData.lineHeightCanv;
			}
			geometry = new THREE.PlaneGeometry(me._ht_image_title.userData.boxWidthCanv / 200.0, me._ht_image_title.userData.boxHeightCanv / 200.0, 5, 5 );
			geometry.name = 'ht_image_title_geometry';
			me._ht_image_title.geometry.dispose();
			me._ht_image_title.geometry = geometry;
			var diffY = (me._ht_image_title.userData.boxHeightCanv / 2) - me._ht_image_title.userData.height;
			me._ht_image_title.position.y = me._ht_image_title.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_image_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_image_title.material.map) {
				me._ht_image_title.material.map.dispose();
			}
			me._ht_image_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_image_title.children.length; i++) {
				let child = me._ht_image_title.children[i];
				if (child.name.includes('scrollbar')) me._ht_image_title.remove(child);
			}
			var canv = me._ht_image_title.userData.textCanvas;
			var ctx = me._ht_image_title.userData.textCanvasContext;
			ctx.font = '36px Verdana';
			me._ht_image_title.userData.lineHeightCanv = 36 * 1.2;
			me._ht_image_title.userData.textLines = [];
			me._ht_image_title.userData.textLines.push(me._ht_image_title.userData.ggText);
			me._ht_image_title.userData.totalHeightCanv = 2 * (3);
			me._ht_image_title.userData.totalHeightCanv += me._ht_image_title.userData.lineHeightCanv;
			me._ht_image_title.userData.boxWidthCanv = ctx.measureText(me._ht_image_title.userData.ggText).width + (2 * 0);
			me._ht_image_title.userData.boxHeightCanv = me._ht_image_title.userData.totalHeightCanv;
			canv.width = me._ht_image_title.userData.boxWidthCanv;
			canv.height = me._ht_image_title.userData.boxHeightCanv;
			ctx.font = '36px Verdana';
			me._ht_image_title.userData.ggPaintCanvasText();
		}
		me._ht_image_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_image_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_image_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_image_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_image_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_image_title";
		me._ht_image_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_image_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_image_title.ggCurrentLogicStateAlpha == 0) {
					me._ht_image_title.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_image_title.userData.transitions.length; i++) {
						if (me._ht_image_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_title.userData.transitions[i].interval);
							me._ht_image_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_title.material ? me._ht_image_title.material.opacity : me._ht_image_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_title.userData.transitions.splice(me._ht_image_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_title.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_image_title.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_image_title.userData.transitions.length; i++) {
						if (me._ht_image_title.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_title.userData.transitions[i].interval);
							me._ht_image_title.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_title.material ? me._ht_image_title.material.opacity : me._ht_image_title.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_title.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_title.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_title.userData.transitions.splice(me._ht_image_title.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_title.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_image_title.logicBlock_alpha();
		me._ht_image_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image_bg.add(me._ht_image_title);
		me._ht_image.add(me._ht_image_bg);
		width = 6.6;
		height = 4.8;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.3, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.3, (height / 2.0));
		roundedRectShape.arc(0, -0.3, 0.3, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.3);
		roundedRectShape.arc(-0.3, 0, 0.3, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.3, (-height / 2.0));
		roundedRectShape.arc(0, 0.3, 0.3, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.3);
		roundedRectShape.arc(0.3, 0, 0.3, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_image_popup_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_image_popup_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_image_popup_bg.material.opacity = v * me._ht_image_popup_bg.userData.backgroundColorAlpha;
			if (me._ht_image_popup_bg.userData.ggSubElement) {
				me._ht_image_popup_bg.userData.ggSubElement.material.opacity = v
				me._ht_image_popup_bg.userData.ggSubElement.visible = (v>0 && me._ht_image_popup_bg.userData.visible);
			}
			me._ht_image_popup_bg.visible = (v>0 && me._ht_image_popup_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_popup_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_popup_bg.userData.backgroundColorAlpha = v;
			me._ht_image_popup_bg.userData.setOpacity(me._ht_image_popup_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.10, 0.10, 1.0);
		el.userData.width = 660;
		el.userData.height = 480;
		el.userData.scale = {x: 0.10, y: 0.10, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_popup_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_popup_bg.visible
			let parentEl = me._ht_image_popup_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_popup_bg.userData.opacity = v;
			v = v * me._ht_image_popup_bg.userData.parentOpacity;
			me._ht_image_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup_bg.children.length; i++) {
				let child = me._ht_image_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_popup_bg.userData.parentOpacity = v;
			v = v * me._ht_image_popup_bg.userData.opacity
			me._ht_image_popup_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup_bg.children.length; i++) {
				let child = me._ht_image_popup_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_popup_bg = el;
		el.userData.ggId="ht_image_popup_bg";
		me._ht_image_popup_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('open_image_hs') !== null) && (player.getVariableValue('open_image_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_image_popup_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_image_popup_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_image_popup_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_image_popup_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_image_popup_bg.userData.transitions.length; i++) {
						if (me._ht_image_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_popup_bg.userData.transitions[i].interval);
							me._ht_image_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_image_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_image_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_popup_bg.position.x = (me._ht_image_popup_bg.position.x - me._ht_image_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_popup_bg.position.y = (me._ht_image_popup_bg.position.y - me._ht_image_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_popup_bg.userData.transitions.splice(me._ht_image_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_popup_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_image_popup_bg.userData.transitionValue_scale = {x: 0.1, y: 0.1, z: 1.0};
					for (var i = 0; i < me._ht_image_popup_bg.userData.transitions.length; i++) {
						if (me._ht_image_popup_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_popup_bg.userData.transitions[i].interval);
							me._ht_image_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_image_popup_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_popup_bg.scale.set(transition_scale.startScale.x + (me._ht_image_popup_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_popup_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_popup_bg.position.x = (me._ht_image_popup_bg.position.x - me._ht_image_popup_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_popup_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_popup_bg.position.y = (me._ht_image_popup_bg.position.y - me._ht_image_popup_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_popup_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_popup_bg.userData.transitions.splice(me._ht_image_popup_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_popup_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_image_popup_bg.logicBlock_scaling();
		me._ht_image_popup_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('open_image_hs') !== null) && (player.getVariableValue('open_image_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image_popup_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image_popup_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_image_popup_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_image_popup_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_image_popup_bg.userData.transitions.length; i++) {
						if (me._ht_image_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_popup_bg.userData.transitions[i].interval);
							me._ht_image_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_popup_bg.material ? me._ht_image_popup_bg.material.opacity : me._ht_image_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_popup_bg.userData.transitions.splice(me._ht_image_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_popup_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_image_popup_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_image_popup_bg.userData.transitions.length; i++) {
						if (me._ht_image_popup_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_popup_bg.userData.transitions[i].interval);
							me._ht_image_popup_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_popup_bg.material ? me._ht_image_popup_bg.material.opacity : me._ht_image_popup_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_popup_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_popup_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_popup_bg.userData.transitions.splice(me._ht_image_popup_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_popup_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_image_popup_bg.logicBlock_alpha();
		me._ht_image_popup_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_popup.userData.ggSubElement) {
				me._ht_image_popup.userData.ggSubElement.material.opacity = v
				me._ht_image_popup.userData.ggSubElement.visible = (v>0 && me._ht_image_popup.userData.visible);
			}
			me._ht_image_popup.visible = (v>0 && me._ht_image_popup.userData.visible);
		}
		el.translateX(0);
		el.translateY(-0.2);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 600;
		el.userData.height = 400;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_popup';
		el.userData.x = 0;
		el.userData.y = -0.2;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_popup.visible
			let parentEl = me._ht_image_popup.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_popup.userData.opacity = v;
			v = v * me._ht_image_popup.userData.parentOpacity;
			me._ht_image_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup.children.length; i++) {
				let child = me._ht_image_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_popup.userData.parentOpacity = v;
			v = v * me._ht_image_popup.userData.opacity
			me._ht_image_popup.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup.children.length; i++) {
				let child = me._ht_image_popup.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_popup = el;
		currentWidth = 600;
		currentHeight = 400;
		var img = {};
		width = currentWidth / 100.0;
		height = currentHeight / 100.0;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
		roundedRectShape.arc(0, -0.2, 0.2, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.arc(-0.2, 0, 0.2, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.arc(0, 0.2, 0.2, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
		roundedRectShape.arc(0.2, 0, 0.2, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_image_popup_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		img.geometry = geometry;
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_image_popup_subElementMaterial';
				me._ht_image_popup.userData.ggSubElement.material = loadedMaterial;
				me._ht_image_popup.userData.ggUpdatePosition();
				me._ht_image_popup.userData.ggText = extUrl;
				me._ht_image_popup.userData.setOpacity(me._ht_image_popup.userData.opacity);
			});
		};
		player.addListener('changenode', function() {
		});
		var extUrl=basePath + ""+player._(me.hotspot.url)+"";
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_image_popup_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_image_popup_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 600;
		el.userData.clientHeight = 400;
		el.userData.ggId="ht_image_popup";
		me._ht_image_popup.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_image_popup.userData.clientWidth;
			var parentHeight = me._ht_image_popup.userData.clientHeight;
			var img = me._ht_image_popup.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if (aspectRatioDiv > aspectRatioImg) {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
			width = currentWidth / 100.0;
			height = currentHeight / 100.0;
			roundedRectShape = new THREE.Shape();
			roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
			roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
			roundedRectShape.arc(0, -0.2, 0.2, Math.PI / 2.0, 2.0 * Math.PI, true);
			roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
			roundedRectShape.arc(-0.2, 0, 0.2, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
			roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
			roundedRectShape.arc(0, 0.2, 0.2, 3.0 * Math.PI / 2.0, Math.PI, true);
			roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
			roundedRectShape.arc(0.2, 0, 0.2, Math.PI, Math.PI / 2.0, true);
			geometry = new THREE.ShapeGeometry(roundedRectShape);
			geometry.name = 'ht_image_popup_geometry';
			geometry.computeBoundingBox();
			var min = geometry.boundingBox.min;
			var max = geometry.boundingBox.max;
			var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
			var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
			var vertexPositions = geometry.getAttribute('position');
			var vertexUVs = geometry.getAttribute('uv');
			for (var i = 0; i < vertexPositions.count; i++) {
				var v1 = vertexPositions.getX(i);
				var	v2 = vertexPositions.getY(i);
				vertexUVs.setX(i, (v1 + offset.x) / range.x);
				vertexUVs.setY(i, (v2 + offset.y) / range.y);
			}
			geometry.uvsNeedUpdate = true;
			img.geometry = geometry;
			} else {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
			width = currentWidth / 100.0;
			height = currentHeight / 100.0;
			roundedRectShape = new THREE.Shape();
			roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
			roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
			roundedRectShape.arc(0, -0.2, 0.2, Math.PI / 2.0, 2.0 * Math.PI, true);
			roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
			roundedRectShape.arc(-0.2, 0, 0.2, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
			roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
			roundedRectShape.arc(0, 0.2, 0.2, 3.0 * Math.PI / 2.0, Math.PI, true);
			roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
			roundedRectShape.arc(0.2, 0, 0.2, Math.PI, Math.PI / 2.0, true);
			geometry = new THREE.ShapeGeometry(roundedRectShape);
			geometry.name = 'ht_image_popup_geometry';
			geometry.computeBoundingBox();
			var min = geometry.boundingBox.min;
			var max = geometry.boundingBox.max;
			var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
			var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
			var vertexPositions = geometry.getAttribute('position');
			var vertexUVs = geometry.getAttribute('uv');
			for (var i = 0; i < vertexPositions.count; i++) {
				var v1 = vertexPositions.getX(i);
				var	v2 = vertexPositions.getY(i);
				vertexUVs.setX(i, (v1 + offset.x) / range.x);
				vertexUVs.setY(i, (v2 + offset.y) / range.y);
			}
			geometry.uvsNeedUpdate = true;
			img.geometry = geometry;
			};
		}
		me._ht_image_popup_bg.add(me._ht_image_popup);
		geometry = new THREE.PlaneGeometry(0.4, 0.4, 5, 5 );
		geometry.name = 'ht_image_popup_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABJElEQVR4nO3bSw6DMBAEUSs341icfrLJSJGFAeNfY9c7QU9JiJVDAAAAAAAAAADgdcxsM7Nt9I4U6X2/cW4fvSdmZvvfPr2IUUCpiFE8zYAhHA4dHlFx0ymlwUpbsigMV9hQZOQBr4/nRhwyTTzX86Dp4rkeh00bz7U8cPp4rsWhy8RzNQ9eLp6rcfiy8VxJgOXjuSchiBfJCUK8hDthiHfhLBDxbjoKRbxMB8GIlysRUTLeZ/QAVMYnXICfSIGzUES8cCcQERNywhAx8iQIEX9KQiwfsUaAZSPWPHy5iC0OXiZiy0Onj9jjwGkj9jxsuogjDpom4shDXh9R4QCFDY8oDVfacoviYMVNh4xnDmWMhzblTPkpVdDfBwAAAAAAAABA2hcaGfeSY++bsA'+
	'AAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_image_popup_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.85);
		el.translateY(2.05);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 40;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_popup_close';
		el.userData.x = 2.85;
		el.userData.y = 2.05;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_popup_close.material) me._ht_image_popup_close.material.opacity = v;
			me._ht_image_popup_close.visible = (v>0 && me._ht_image_popup_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_image_popup_close.visible
			let parentEl = me._ht_image_popup_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_popup_close.userData.opacity = v;
			v = v * me._ht_image_popup_close.userData.parentOpacity;
			me._ht_image_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup_close.children.length; i++) {
				let child = me._ht_image_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_popup_close.userData.parentOpacity = v;
			v = v * me._ht_image_popup_close.userData.opacity
			me._ht_image_popup_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_popup_close.children.length; i++) {
				let child = me._ht_image_popup_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_popup_close = el;
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABjUlEQVR4nO3bTW6DMBBA4SHqUZByDnIrcoD0Vsk5HPks0EVkmlLI39h4wO+TukgWaPyUqo0NIgAAAAAAAAAArI/3jXjf5B5jVoL5dtGu5H0jXXeWrjuLc22068biXDvMFzFivID3qupkKqJzrVTVKcWl4wWs64v0/XF4bSXiOF7fH6WuLxknesK5Vq7XfvjJGdHSLG+xMLiFGVRyLmD18YIcC9lMvGDJBW0uXrDEwjYbL0i5wM3HC1IstJh4QcwFFxcviLHwYuMFmgDFxws+CUG8kXeCEG/GK2GI98SjQIbjVbkH+GNq705E/r23338vPtsMWwFFHu8eG4snYjGgyHREg/FEUp2JFMTeJ5BfYYUV/hH5yj3AYCpeCOXcb8TbaZ9Yipgf/0gr8FVOgc'+
	'0EBbazFNhQVWBLX4FDJQWONRU4WFfg1g4Fbi5S4PY2BQsLsDDDRywNbmmWl1gcOPFM8TZUw3MigaWNz/Fe4253iHWnfpozEUvxRG6br/ePYJhV4KNeAAAAAAAAAAAs4wf6cWDrkP66yAAAAABJRU5ErkJggg==');
		textureOver.colorSpace = player.getVRTextureColorSpace();
		el.userData.materialOver = new THREE.MeshBasicMaterial( {map: textureOver, side: THREE.DoubleSide, transparent: true} );
		el.userData.materialOver.name = 'ht_image_popup_close_materialOver';
		el.userData.ggId="ht_image_popup_close";
		me._ht_image_popup_close.userData.onclick=function (e) {
			player.setVariableValue('open_image_hs', player.getVariableValue('open_image_hs').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_image_popup_close.userData.onmouseenter=function (e) {
			me._ht_image_popup_close.material = me._ht_image_popup_close.userData.materialOver;
			me.elementMouseOver['ht_image_popup_close']=true;
		}
		me._ht_image_popup_close.userData.onmouseleave=function (e) {
			me._ht_image_popup_close.material = me._ht_image_popup_close.userData.materialNormal;
			me.elementMouseOver['ht_image_popup_close']=false;
		}
		me._ht_image_popup_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image_popup_bg.add(me._ht_image_popup_close);
		me._ht_image.add(me._ht_image_popup_bg);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_customimage.userData.ggSubElement) {
				me._ht_image_customimage.userData.ggSubElement.material.opacity = v
				me._ht_image_customimage.userData.ggSubElement.visible = (v>0 && me._ht_image_customimage.userData.visible);
			}
			me._ht_image_customimage.visible = (v>0 && me._ht_image_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_customimage.visible
			let parentEl = me._ht_image_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_customimage.userData.opacity = v;
			v = v * me._ht_image_customimage.userData.parentOpacity;
			me._ht_image_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_customimage.children.length; i++) {
				let child = me._ht_image_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_customimage.userData.parentOpacity = v;
			v = v * me._ht_image_customimage.userData.opacity
			me._ht_image_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_customimage.children.length; i++) {
				let child = me._ht_image_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_image_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_image_CustomImage_subElementMaterial';
				me._ht_image_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_image_customimage.userData.ggUpdatePosition();
				me._ht_image_customimage.userData.ggText = extUrl;
				me._ht_image_customimage.userData.setOpacity(me._ht_image_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_image_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_image_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_image_CustomImage";
		me._ht_image_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == "")) || 
				(((player.getVariableValue('open_image_hs') !== null) && (player.getVariableValue('open_image_hs')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_image_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_image_customimage.visible=false;
			me._ht_image_customimage.userData.visible=false;
				}
				else {
			me._ht_image_customimage.visible=((!me._ht_image_customimage.material && Number(me._ht_image_customimage.userData.opacity>0)) || Number(me._ht_image_customimage.material.opacity)>0)?true:false;
			me._ht_image_customimage.userData.visible=true;
				}
			}
		}
		me._ht_image_customimage.logicBlock_visible();
		me._ht_image_customimage.userData.onclick=function (e) {
			player.setVariableValue('open_image_hs', player.getVariableValue('open_image_hs') + "<"+me.hotspot.id+">");
		}
		me._ht_image_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_image_customimage.userData.clientWidth;
			var parentHeight = me._ht_image_customimage.userData.clientHeight;
			var img = me._ht_image_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_image_CustomImage_imgGeometry';
			}
		}
		me._ht_image.add(me._ht_image_customimage);
		me._ht_image.userData.setOpacity(1.00);
		me.elementMouseOver['ht_image']=false;
		me._ht_image_bg.logicBlock_scaling();
		me._ht_image_bg.logicBlock_visible();
		me._ht_image_bg.logicBlock_alpha();
		me._ht_image_bg.userData.setOpacity(1.00);
		me.elementMouseOver['ht_image_bg']=false;
		me._ht_image_icon.userData.setOpacity(1.00);
		me._ht_image_title.logicBlock_alpha();
		me._ht_image_title.userData.setOpacity(0.00);
		me._ht_image_popup_bg.logicBlock_scaling();
		me._ht_image_popup_bg.logicBlock_alpha();
		me._ht_image_popup_bg.userData.setOpacity(0.00);
		me._ht_image_popup.userData.setOpacity(1.00);
		me._ht_image_popup_close.userData.setOpacity(1.00);
		me.elementMouseOver['ht_image_popup_close']=false;
		me._ht_image_customimage.logicBlock_visible();
		me._ht_image_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_image_bg.logicBlock_visible();
				me._ht_image_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_image_bg.logicBlock_visible();
				me._ht_image_bg.logicBlock_alpha();
					me._ht_image_title.userData.ggUpdateText();
				me._ht_image_popup_bg.logicBlock_scaling();
				me._ht_image_popup_bg.logicBlock_alpha();
				me._ht_image_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_image_bg.logicBlock_visible();
				me._ht_image_bg.logicBlock_alpha();
				me._ht_image_popup_bg.logicBlock_scaling();
				me._ht_image_popup_bg.logicBlock_alpha();
				me._ht_image_customimage.logicBlock_visible();
			};
			me.ggEvent_varchanged_open_image_hs=function() {
				me._ht_image_bg.logicBlock_alpha();
				me._ht_image_popup_bg.logicBlock_scaling();
				me._ht_image_popup_bg.logicBlock_alpha();
				me._ht_image_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_image;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_node';
		el.userData.x = -3.06;
		el.userData.y = 2.11;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node.visible
			let parentEl = me._ht_node.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node.userData.opacity = v;
			v = v * me._ht_node.userData.parentOpacity;
			me._ht_node.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node.children.length; i++) {
				let child = me._ht_node.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node.userData.parentOpacity = v;
			v = v * me._ht_node.userData.opacity
			me._ht_node.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node.children.length; i++) {
				let child = me._ht_node.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node = el;
		el.userData.ggId="ht_node";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node.userData.onclick=function (e) {
			player.openNext(player._(me.hotspot.url),player._(me.hotspot.target));
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.45;
		height = 0.45;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.12, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.12, (height / 2.0));
		roundedRectShape.arc(0, -0.12, 0.12, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.12);
		roundedRectShape.arc(-0.12, 0, 0.12, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.12, (-height / 2.0));
		roundedRectShape.arc(0, 0.12, 0.12, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.12);
		roundedRectShape.arc(0.12, 0, 0.12, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_node_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.290196, 0.290196, 0.290196).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_node_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.588235;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_node_bg.material.opacity = v * me._ht_node_bg.userData.backgroundColorAlpha;
			if (me._ht_node_bg.userData.ggSubElement) {
				me._ht_node_bg.userData.ggSubElement.material.opacity = v
				me._ht_node_bg.userData.ggSubElement.visible = (v>0 && me._ht_node_bg.userData.visible);
			}
			me._ht_node_bg.visible = (v>0 && me._ht_node_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_node_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_node_bg.userData.backgroundColorAlpha = v;
			me._ht_node_bg.userData.setOpacity(me._ht_node_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node_bg.visible
			let parentEl = me._ht_node_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_bg.userData.opacity = v;
			v = v * me._ht_node_bg.userData.parentOpacity;
			me._ht_node_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_bg.children.length; i++) {
				let child = me._ht_node_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_bg.userData.parentOpacity = v;
			v = v * me._ht_node_bg.userData.opacity
			me._ht_node_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_bg.children.length; i++) {
				let child = me._ht_node_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_bg = el;
		el.userData.ggId="ht_node_bg";
		me._ht_node_bg.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_node_bg.ggCurrentLogicStateVisible == 0) {
			me._ht_node_bg.visible=((!me._ht_node_bg.material && Number(me._ht_node_bg.userData.opacity>0)) || Number(me._ht_node_bg.material.opacity)>0)?true:false;
			me._ht_node_bg.userData.visible=true;
				}
				else {
			me._ht_node_bg.visible=false;
			me._ht_node_bg.userData.visible=false;
				}
			}
		}
		me._ht_node_bg.logicBlock_visible();
		me._ht_node_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_node_bg']=true;
			me._ht_node_image.logicBlock_alpha();
			me._ht_node_image.logicBlock_scaling();
		}
		me._ht_node_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_node_bg']=false;
			me._ht_node_image.logicBlock_alpha();
			me._ht_node_image.logicBlock_scaling();
		}
		me._ht_node_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.36, 0.36, 5, 5 );
		geometry.name = 'ht_node_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAMZklEQVR4nO2ca5AcVRXHf6d7dhY2m+IVQkKggM12D4tTAkWwJFYkvgNVPjAa8APGBwgBKqIiVboahTL5wENELYKCIPjBMoIgVplFRRJTMRaBgrVGJvNwQ9RAgEi0drO4szN9/HBv72x2Z7Z7ZmeTaO3/y/TjnHvPPXNf53EbZjGLWcziyEGOtABkMp0kEicDc0kkOgEol4eAQcrl10mnh46keIdXQZlMJ21tyxB5N3AecDZwWgTXP4BdwAuo/p7R0W2HU2kzr6D+/jl0dHwU1U8Cy4HENEssA1sQeYjh4cc499yD05ZxCsycggqF01C9Gfg00Dnh7QjwPJBDNQe8jMggIqZnqHaiOhc4FZEUkALOB9onlDMEPIjIbXjeP2aiGa1X0MDAKZTL3wQ+Ay'+
	'SrNUke1U2IPEUi8SfOOus/DZW7e/cxlMtvR/U9wOWAN+5tCXiAROKbdHW9Ot0mjEfrFKTqks9fi8h64Dj7tITIQwTBffj+s4hoi+oS8vklOM7VqK6m+kf8G9VefP9eRCqtqKo1ChoYOINy+afARfZJCbgH1TtIpfa2pI56yOUWIXITcB1VRe0gkfgEXV17plv89BVUKHwQ1YeAEwBQ7SORWMvixYVpl90Islkf1/0u8AH75AAiq/G8X02n2OkpqFC4EdW77N0wqtfh+w+3bCg1CjP0PonIPUCHfXojvn93s0U2pyBVoVhcj+pX7JNdiKzE815sVpCWolA4B9VHMfssENlAd/fXmvnjmlNQobAe1a/ayreTTH6QM8440FRZM4U9e06gVPoVqu+wT9bj+19rtJjGFTR+WIls5phjVnL66W82XM7hwN69HQwPP4LqJfZJ'+
	'w8OtMQWZCfkJwynb6eh4P4sWDTdURi2oumSz80kmTwWgVHqZnp7XWrJUGyX9ZqwniXyokYk7voLMUv48ZrXaRXv70qaHVSbTSXv7JaheBrwTWAg4E6gC4BXgD4g8xsjI5qZtsD17TmBk5I+YOekArnseixf/LQ5rPAWpuhQK2zD7nGFELmxqQs5mfRKJW1H9CJPNhiiMIPI45fI6enryDddtJu6dmNVtB563LE4PjaegXO56RL4PgOqnSKUeaki4YnE+lco3ELkGcMeeq+5DpA8YsNev2OcLEVkAdKG6wl6HKCPyA+AWPO/1huTI5VYj8mMARK7H8+6JYolWkLGtcsBxqPbh+5c2tFzm8+8DNgHH2ydDwEZUH7HmRzAlv6pDPr8EkY8Ba6gavgdQXUUq9bvYsqgKhcJmzGbyXzhOiu7u16ZimTjuJ8MYnscBJRKJtb'+
	'GVoyrkcjcAmzHKKQF3I9KF799MKvVMpHIARAJSqWfw/ZtxnMXA3cAocAIifeRy18eSx5SlVCprLf/xBMEtkSxTvjUui79ibJzv4PtfiCWI2UjegeoX7ZMBHOfDdHdnYvFHoVhMEwS/BLoAELkTz7spNn8+fxdwI1BCtWsqe3HqHmT8OUmgRBDc3oAA140pR/VpKpW3tUw5AN3dGSqVtwFbbB1folC4Lja/6h2YHp1E5OapSOv3oP7+ORx77D6gE5H78LzPxarczDmbARfVpxkc/ABLlozGFr4RZDJJksknMZ7KCqorYs9JhcIPUb0aGOTNNxfW80zW70EdHR8lnBCD4L5YlRaL8zETsgsMEAQfnzHlAKTTJVQ/DuwGXEQ2USicHIs3CO63V3Pp6LisHll9BRkfsvEE+v6zsSpVXUc4ITvOh+np+WcsvukgldqP43yI'+
	'cOKGdbH4fH8nYFwyYVtroLaCMplOTLfFukmjV65s1kf1Gnu3saVzThRMXRsBUL2WbNaP5DFt2mTvltPfP6cWWW0FtbUtI4w+iDwVS8hE4lbLM2Tdro0hmz2JYnEpxeJSstmTGuZ3nPWYPVbCyhKHJ2xbG3PmLKtJUpPRxK0ARkgk/hRZ0a5dc635ALCxoR1usZgmn9+C6+4nCLYTBNtx3f3k81soFtOxyzEbvrAXfcSOgqnhujswERYIgvfUIqk3B51nf5+PFX1w3RWEtpXqI5H0hs4hn7+JIHgOuLgGxcUEwXPk8zehGr2hNXjU/rbT3r4iktq07QV7d24tknoVn21/c7HEMla5sa3iTuiFwheB2zH7rFcR2YDqFahegcgG4FX77nby+XgbVM/bafmqMkVBJGzj2bVeT1aQ6Zqn2UriKci4LECkL5b5YIZOOE/9ml'+
	'LpHDyvl1TqZ6RSP8PzeimVzgF+bcvdEGu4mbr77F2tXjkZQRC28fRaw3KygkwiQYiXIytQdTH+HICBmEJ9n7DnlEpXkk6/MYkmnX6DUulKwp5keKIhEsqwwMoWhaqZ4brzJr6sNcTmjqtsMLL4bHb+WDmq+2LQn0T474r8qKZyQqTTbyDygL27ONbqFgShDC4vvRS9aQzD3QZzJ76u1YOq3exQ5toI3aSG/pVI+ra21Nh1EPw5kj4I+sfJFr2/cZyqDJXKokj68W1sa4uhoFkcgskKMslLBqrRe4lSqTpPqS6cgtJgdLQ68TvOWyPpHae6/JbL0a7WIKjK4LrRYe/xbRwdnTSl1OpBVSKTgjI1enpewzjYmeAarUf/T2CrLf+zZDIn1qXNZk9C9TP2bmss285xQhkqnHlm9Ib10E4QQ0Hl8vhCT530fiKM4zsc912R'+
	'9ACOcwPGH3MKyeRPaiopkzkR130YOAXjsI/nOVQNZdgXM2xUnacqlf2TRJ1EbkIrJhnJJC/FwR+scCti7XqNcdlr7y4lmXyRQmEDudzl5HKXUyhsIJl8EbjUltuL5/0lslxTd7iD3hpLcscJ2/j3WmGleulwuzCbxXgKEnkM1U8gsoB8fgnwTCSP532bfF7trvkUVL+CWP+djjkPSqh+Fd+/q04ph6JQuBDT44xMcaAatnFXrdf1/u3QPjmf3buPiaxkZGQzodFnog/RMM74O3GcC6j9b2/FcS4glboz1u7cYGUoESMjfVNSArZtod3ZX4uktoJUf2+v2imX3x5ZUTo9hMjj9m5NbK8emOHm+8upVOYhshSRpVQq8/D95Q35lIw3cw0AIo/HisJWKhcRGtlV18chqD3ERke3kUyWgYTNCdwSWVm5vA7XXQl0otqLiR'+
	'rEh1mhdjTEMx5B0ItxEZdxnK/H5AldHKMcPLitFkntHmS0vwUAkVWoRgcYe3ryNuIJsKYhX850YeoKe8+9sbLbTJtW2bstjTvtRR62Bfl24o2DW4ADGOPyl015BhtFLjePIHgCaLN1x/Mm5vMXEmbKhm2tgfoKGh7+BcaFCY5zdaxKPe91VFcBFaAL132ETCYZxdY0MpkkIj8HzsKEfVbF9mY6zlX2apDh4borXn0FmS73IACqq8nlog0/gFTqd6h+3t4tp62tb0Z6Ui43b1xMDETWxo6J5XKLbPowwINTZetPvakTuY1qBDJ+aNf370Hk27aMd+G6O1s6JxWLaUSeoaqcO+NkaozBtMVEjFVvm5I0srB8fiNwLVDCddMNpfeatJm7MYHEUWAjjrM+KqOiLorF+Xa1WoOZcyqIrG1IOSZdOGP578X310xF3lj6CzyJ'+
	'513SUPpLLvdeRDYR5lGH6S/wKJ63M1b6i9khr6Q16S99wPuJmf5y+BKoVNfZwOL4vderQB8iAwTBvjFnVxAsxHEWWMNzBaH5YFBG5F7g1qMjgQr+X1Lw3mJT8I6l5Sl4MBNJnCtsaOZiYAHjU/MMKsA+YKtN4uxrOokzkzmRZHI7M5bEGWIm04BfeunkMR+y6+7lzDNfb1ka8NDQbxFZCsxgGnCIiYnkHR0fa4mSZgKHPZE8xP/CUYRM5kTa2584/EcRIMxB/NaYko72wyywHs/7ejOHWZoL+4gonteLSBgzPxvVneRyq2NZ/jMFk1m72q5WoXJuxPebOukDM3GgDp6kUlnb1FI8HZgd8vcwm0A4Kg7UhTg6jmRejzEfAHbgulfEXcqnQmsP9RaL16C6gcmHeu/H93e2+FDvhTjOVRMO9f4LkV66u39wdB3qHQ9jUN'+
	'7CxGPhJmFyE47zFK67o6lj4ZXKRdZNuopax8Id5xtNG8J1MNMfFvgyRlG1PizwAiI5m5+zF5EhDv2wQCewCMdJ2dDMeUw2TwYxHxa4/X/nwwITYT5NcRnVT1O0RXBEYZTw0xQdHY/N9Cb18C7J/f1zmDNnmR0m52KW4tMjuP6OCer14zhPcfDgtpn+Xsd4HB2fxzGZXXPH8nNMlsUglcr+I/15nFnMYhazOJL4L8aIFuAFAdZ2AAAAAElFTkSuQmCC');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_node_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 36;
		el.userData.height = 36;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_node_icon.material) me._ht_node_icon.material.opacity = v;
			me._ht_node_icon.visible = (v>0 && me._ht_node_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_node_icon.visible
			let parentEl = me._ht_node_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_icon.userData.opacity = v;
			v = v * me._ht_node_icon.userData.parentOpacity;
			me._ht_node_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_icon.children.length; i++) {
				let child = me._ht_node_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_icon.userData.parentOpacity = v;
			v = v * me._ht_node_icon.userData.opacity
			me._ht_node_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_icon.children.length; i++) {
				let child = me._ht_node_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_icon = el;
		el.userData.ggId="ht_node_icon";
		me._ht_node_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node_bg.add(me._ht_node_icon);
		width = 1.5;
		height = 1.5;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.2, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.2, (height / 2.0));
		roundedRectShape.arc(0, -0.2, 0.2, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.arc(-0.2, 0, 0.2, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.arc(0, 0.2, 0.2, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.2);
		roundedRectShape.arc(0.2, 0, 0.2, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_node_image_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		loader = new THREE.TextureLoader();
		el.userData.ggNodeId=nodeId;
		texture = loader.load(basePath + 'images_vr/ht_node_image_' + nodeId + '.webp');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_node_image_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(0);
		el.scale.set(0.30, 0.30, 1.0);
		el.userData.width = 150;
		el.userData.height = 150;
		el.userData.scale = {x: 0.30, y: 0.30, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_image';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_node_image.material) me._ht_node_image.material.opacity = v;
			me._ht_node_image.visible = (v>0 && me._ht_node_image.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_node_image.visible
			let parentEl = me._ht_node_image.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_image.userData.opacity = v;
			v = v * me._ht_node_image.userData.parentOpacity;
			me._ht_node_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_image.children.length; i++) {
				let child = me._ht_node_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_image.userData.parentOpacity = v;
			v = v * me._ht_node_image.userData.opacity
			me._ht_node_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_image.children.length; i++) {
				let child = me._ht_node_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_image = el;
		el.userData.ggId="ht_node_image";
		me._ht_node_image.userData.ggIsActive=function() {
			return player.getCurrentNode()==this.userData.ggElementNodeId();
		}
		el.userData.ggElementNodeId=function() {
			return this.userData.ggNodeId;
		}
		me._ht_node_image.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_node_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_node_image.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_node_image.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_node_image.ggCurrentLogicStateScaling == 0) {
					me._ht_node_image.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_node_image.userData.transitions.length; i++) {
						if (me._ht_node_image.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_node_image.userData.transitions[i].interval);
							me._ht_node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_node_image.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_image.scale.set(transition_scale.startScale.x + (me._ht_node_image.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_node_image.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_node_image.position.x = (me._ht_node_image.position.x - me._ht_node_image.userData.curScaleOffX) + scaleOffX;
						me._ht_node_image.userData.curScaleOffX = scaleOffX;
						me._ht_node_image.position.y = (me._ht_node_image.position.y - me._ht_node_image.userData.curScaleOffY) + scaleOffY;
						me._ht_node_image.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_node_image.userData.transitions.splice(me._ht_node_image.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_node_image.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_node_image.userData.transitionValue_scale = {x: 0.3, y: 0.3, z: 1.0};
					for (var i = 0; i < me._ht_node_image.userData.transitions.length; i++) {
						if (me._ht_node_image.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_node_image.userData.transitions[i].interval);
							me._ht_node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_node_image.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_image.scale.set(transition_scale.startScale.x + (me._ht_node_image.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_node_image.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_node_image.position.x = (me._ht_node_image.position.x - me._ht_node_image.userData.curScaleOffX) + scaleOffX;
						me._ht_node_image.userData.curScaleOffX = scaleOffX;
						me._ht_node_image.position.y = (me._ht_node_image.position.y - me._ht_node_image.userData.curScaleOffY) + scaleOffY;
						me._ht_node_image.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_node_image.userData.transitions.splice(me._ht_node_image.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_node_image.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_node_image.logicBlock_scaling();
		me._ht_node_image.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node_bg'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_node_image.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_node_image.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_node_image.ggCurrentLogicStateAlpha == 0) {
					me._ht_node_image.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_node_image.userData.transitions.length; i++) {
						if (me._ht_node_image.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_node_image.userData.transitions[i].interval);
							me._ht_node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_node_image.material ? me._ht_node_image.material.opacity : me._ht_node_image.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_image.userData.setOpacity(transition_alpha.startAlpha + (me._ht_node_image.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_node_image.userData.transitions.splice(me._ht_node_image.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_node_image.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_node_image.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_node_image.userData.transitions.length; i++) {
						if (me._ht_node_image.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_node_image.userData.transitions[i].interval);
							me._ht_node_image.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_node_image.material ? me._ht_node_image.material.opacity : me._ht_node_image.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 300;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_image.userData.setOpacity(transition_alpha.startAlpha + (me._ht_node_image.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_node_image.userData.transitions.splice(me._ht_node_image.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_node_image.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_node_image.logicBlock_alpha();
		me._ht_node_image.userData.onclick=function (e) {
			player.openNext(player._(me.hotspot.url),player._(me.hotspot.target));
		}
		me._ht_node_image.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 1.5;
		height = 0.51;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.2);
		roundedRectShape.arc(-0.2, 0, 0.2, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.2, (-height / 2.0));
		roundedRectShape.arc(0, 0.2, 0.2, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'ht_node_title_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_node_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_node_title.material.opacity = v;
			if (me._ht_node_title.userData.hasScrollbar) {
				me._ht_node_title.userData.scrollbar.material.opacity = v;
				me._ht_node_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_node_title.userData.ggSubElement) {
				me._ht_node_title.userData.ggSubElement.material.opacity = v
				me._ht_node_title.userData.ggSubElement.visible = (v>0 && me._ht_node_title.userData.visible);
			}
			me._ht_node_title.visible = (v>0 && me._ht_node_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_node_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_node_title.userData.backgroundColorAlpha = v;
			me._ht_node_title.userData.setOpacity(me._ht_node_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.495);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 150;
		el.userData.height = 51;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_title';
		el.userData.x = 0;
		el.userData.y = -0.495;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node_title.visible
			let parentEl = me._ht_node_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_title.userData.opacity = v;
			v = v * me._ht_node_title.userData.parentOpacity;
			me._ht_node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_title.children.length; i++) {
				let child = me._ht_node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_title.userData.parentOpacity = v;
			v = v * me._ht_node_title.userData.opacity
			me._ht_node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_title.children.length; i++) {
				let child = me._ht_node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0, 0, 0).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0, 0.854902, 0.854902).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 300;
		canvas.height = 102;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_node_title.userData.totalHeightCanv = 2 * (18);
			me._ht_node_title.userData.textLines = [];
			var ctx = me._ht_node_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_node_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_node_title.userData.textLines.push(line);
					line = '';
					me._ht_node_title.userData.totalHeightCanv += me._ht_node_title.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_node_title.userData.width - 10 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_node_title.userData.textLines.push(line);
					line = words[i];
					me._ht_node_title.userData.totalHeightCanv += me._ht_node_title.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_node_title.userData.textLines.push(line);
			me._ht_node_title.userData.totalHeightCanv += me._ht_node_title.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_node_title.userData.textCanvas;
			var ctx = me._ht_node_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_node_title.userData.backgroundColor.r * 255 + ', ' + me._ht_node_title.userData.backgroundColor.g * 255 + ', ' + me._ht_node_title.userData.backgroundColor.b * 255 + ', ' + me._ht_node_title.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_node_title.userData.textColor.r * 255 + ', ' + me._ht_node_title.userData.textColor.g * 255 + ', ' + me._ht_node_title.userData.textColor.b * 255 + ', ' + me._ht_node_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_node_title.userData.boxWidthCanv - (me._ht_node_title.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 13;
			y += (canv.height - me._ht_node_title.userData.totalHeightCanv - (2 * 5)) / 2;
			for (var i = 0; i < me._ht_node_title.userData.textLines.length; i++) {
				ctx.fillText(me._ht_node_title.userData.textLines[i], x, y);
				y += me._ht_node_title.userData.lineHeightCanv;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_node_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_node_title.material.map) {
				me._ht_node_title.material.map.dispose();
			}
			me._ht_node_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_node_title.children.length; i++) {
				let child = me._ht_node_title.children[i];
				if (child.name.includes('scrollbar')) me._ht_node_title.remove(child);
			}
			var canv = me._ht_node_title.userData.textCanvas;
			var ctx = me._ht_node_title.userData.textCanvasContext;
			ctx.font = '40px Verdana';
			me._ht_node_title.userData.lineHeightCanv = 40 * 1.2;
			me._ht_node_title.userData.ggWrapText(false);
			me._ht_node_title.userData.boxWidthCanv = 2 * me._ht_node_title.userData.width;
			me._ht_node_title.userData.boxHeightCanv = 2 * me._ht_node_title.userData.height;
			me._ht_node_title.userData.hasScrollbar = false;
			canv.width = me._ht_node_title.userData.boxWidthCanv;
			canv.height = me._ht_node_title.userData.boxHeightCanv;
			ctx.font = '40px Verdana';
			me._ht_node_title.userData.ggPaintCanvasText();
		}
		me._ht_node_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_node_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_node_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_node_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_node_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_node_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_node_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_node_title";
		me._ht_node_title.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player._(me.hotspot.title) == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_title.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_title.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_node_title.ggCurrentLogicStateVisible == 0) {
			me._ht_node_title.visible=false;
			me._ht_node_title.userData.visible=false;
				}
				else {
			me._ht_node_title.visible=((!me._ht_node_title.material && Number(me._ht_node_title.userData.opacity>0)) || Number(me._ht_node_title.material.opacity)>0)?true:false;
			me._ht_node_title.userData.visible=true;
				}
			}
		}
		me._ht_node_title.logicBlock_visible();
		me._ht_node_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node_image.add(me._ht_node_title);
		me._ht_node_bg.add(me._ht_node_image);
		me._ht_node.add(me._ht_node_bg);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_node_customimage.userData.ggSubElement) {
				me._ht_node_customimage.userData.ggSubElement.material.opacity = v
				me._ht_node_customimage.userData.ggSubElement.visible = (v>0 && me._ht_node_customimage.userData.visible);
			}
			me._ht_node_customimage.visible = (v>0 && me._ht_node_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node_customimage.visible
			let parentEl = me._ht_node_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_customimage.userData.opacity = v;
			v = v * me._ht_node_customimage.userData.parentOpacity;
			me._ht_node_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_customimage.children.length; i++) {
				let child = me._ht_node_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_customimage.userData.parentOpacity = v;
			v = v * me._ht_node_customimage.userData.opacity
			me._ht_node_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_customimage.children.length; i++) {
				let child = me._ht_node_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_node_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_node_CustomImage_subElementMaterial';
				me._ht_node_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_node_customimage.userData.ggUpdatePosition();
				me._ht_node_customimage.userData.ggText = extUrl;
				me._ht_node_customimage.userData.setOpacity(me._ht_node_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_node_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_node_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_node_CustomImage";
		me._ht_node_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_node_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_node_customimage.visible=false;
			me._ht_node_customimage.userData.visible=false;
				}
				else {
			me._ht_node_customimage.visible=((!me._ht_node_customimage.material && Number(me._ht_node_customimage.userData.opacity>0)) || Number(me._ht_node_customimage.material.opacity)>0)?true:false;
			me._ht_node_customimage.userData.visible=true;
				}
			}
		}
		me._ht_node_customimage.logicBlock_visible();
		me._ht_node_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_node_customimage.userData.clientWidth;
			var parentHeight = me._ht_node_customimage.userData.clientHeight;
			var img = me._ht_node_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_node_CustomImage_imgGeometry';
			}
		}
		me._ht_node.add(me._ht_node_customimage);
		me._ht_node.userData.setOpacity(1.00);
		me.elementMouseOver['ht_node']=false;
		me._ht_node_bg.logicBlock_visible();
		me._ht_node_bg.userData.setOpacity(1.00);
		me.elementMouseOver['ht_node_bg']=false;
		me._ht_node_icon.userData.setOpacity(1.00);
		me._ht_node_image.logicBlock_scaling();
		me._ht_node_image.logicBlock_alpha();
		me._ht_node_image.userData.setOpacity(0.00);
		me._ht_node_title.logicBlock_visible();
		me._ht_node_title.userData.setOpacity(1.00);
		me._ht_node_customimage.logicBlock_visible();
		me._ht_node_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_node_bg.logicBlock_visible();
				me._ht_node_title.logicBlock_visible();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_node_bg.logicBlock_visible();
					me._ht_node_title.userData.ggUpdateText();
				me._ht_node_title.logicBlock_visible();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_node_bg.logicBlock_visible();
				me._ht_node_title.logicBlock_visible();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_node;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='ht_node') {
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_image') {
			hotspot.skinid = 'ht_image';
			hsinst = new SkinHotspotClass_ht_image(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_info') {
			hotspot.skinid = 'ht_info';
			hsinst = new SkinHotspotClass_ht_info(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_video_file') {
			hotspot.skinid = 'ht_video_file';
			hsinst = new SkinHotspotClass_ht_video_file(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_video_url') {
			hotspot.skinid = 'ht_video_url';
			hsinst = new SkinHotspotClass_ht_video_url(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		}
		return (hsinst ? hsinst.__obj : null);
	}
	me.removeSkinHotspots=function() {
		hotspotTemplates = [];
	}
	me.skinTimerEvent=function() {
		if (!player.isInVR()) return;
		me.ggCurrentTime=new Date().getTime();
	};
	player.addListener('timer', me.skinTimerEvent);
	player.addListener('vrconfigloaded', function() { me.addSkin();if (me.eventconfigloadedCallback) me.eventconfigloadedCallback();if (me.eventchangenodeCallback) me.eventchangenodeCallback();});
	player.addListener('exitvr', function() { me.removeSkin(); });
	me.skinTimerEvent();
};