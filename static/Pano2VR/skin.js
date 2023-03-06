// Garden Gnome Software - Skin
// Pano2VR 6.1.9/17985
// Filename: zorge-360-planirovka.ggsk
// Generated 2020-10-01T12:33:51

function pano2vrSkin(player,base) {
	var me=this;
	var skin=this;
	var flag=false;
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
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
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
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
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
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
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me.__3_=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="3 \u043b\u0438\u0442\u0435\u0440";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 10px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__3_.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__3_.ggUpdatePosition=function (useTransition) {
		}
		el=me.__113=document.createElement('div');
		el.ggId="1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__113.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__113.onclick=function (e) {
			pano2vrProxy('click', 3, 1)
		}
		me.__113.onmouseover=function (e) {
			pano2vrProxy('mouseover', 3, 1)
		}
		me.__113.onmouseout=function (e) {
			pano2vrProxy('mouseout', 3, 1)
		}
		me.__113.ggUpdatePosition=function (useTransition) {
		}
		me.__3_.appendChild(me.__113);
		el=me.__25=document.createElement('div');
		el.ggId="2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__25.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__25.onclick=function (e) {
			pano2vrProxy('click', 3, 2)
		}
		me.__25.onmouseover=function (e) {
			pano2vrProxy('mouseover', 3, 2)
		}
		me.__25.onmouseout=function (e) {
			pano2vrProxy('mouseout', 3, 2)
		}
		me.__25.ggUpdatePosition=function (useTransition) {
		}
		me.__3_.appendChild(me.__25);
		el=me.__31=document.createElement('div');
		el.ggId="3";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__31.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__31.onclick=function (e) {
			pano2vrProxy('click', 3, 3)
		}
		me.__31.onmouseover=function (e) {
			pano2vrProxy('mouseover', 3, 3)
		}
		me.__31.onmouseout=function (e) {
			pano2vrProxy('mouseout', 3, 3)
		}
		me.__31.ggUpdatePosition=function (useTransition) {
		}
		me.__3_.appendChild(me.__31);
		el=me.__41=document.createElement('div');
		el.ggId="4";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__41.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__41.onclick=function (e) {
			pano2vrProxy('click', 3, 4)
		}
		me.__41.onmouseover=function (e) {
			pano2vrProxy('mouseover', 3, 4)
		}
		me.__41.onmouseout=function (e) {
			pano2vrProxy('mouseout', 3, 4)
		}
		me.__41.ggUpdatePosition=function (useTransition) {
		}
		me.__3_.appendChild(me.__41);
		el=me.__51=document.createElement('div');
		el.ggId="5";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__51.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__51.onclick=function (e) {
			pano2vrProxy('click', 3, 5)
		}
		me.__51.onmouseover=function (e) {
			pano2vrProxy('mouseover', 3, 5)
		}
		me.__51.onmouseout=function (e) {
			pano2vrProxy('mouseout', 3, 5)
		}
		me.__51.ggUpdatePosition=function (useTransition) {
		}
		me.__3_.appendChild(me.__51);
		el=me.__61=document.createElement('div');
		el.ggId="6";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__61.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__61.onclick=function (e) {
			pano2vrProxy('click', 3, 6)
		}
		me.__61.onmouseover=function (e) {
			pano2vrProxy('mouseover', 3, 6)
		}
		me.__61.onmouseout=function (e) {
			pano2vrProxy('mouseout', 3, 6)
		}
		me.__61.ggUpdatePosition=function (useTransition) {
		}
		me.__3_.appendChild(me.__61);
		el=me.__71=document.createElement('div');
		el.ggId="7";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__71.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__71.onclick=function (e) {
			pano2vrProxy('click', 3, 7)
		}
		me.__71.onmouseover=function (e) {
			pano2vrProxy('mouseover', 3, 7)
		}
		me.__71.onmouseout=function (e) {
			pano2vrProxy('mouseout', 3, 7)
		}
		me.__71.ggUpdatePosition=function (useTransition) {
		}
		me.__3_.appendChild(me.__71);
		el=me.__81=document.createElement('div');
		el.ggId="8";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__81.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__81.onclick=function (e) {
			pano2vrProxy('click', 3, 8)
		}
		me.__81.onmouseover=function (e) {
			pano2vrProxy('mouseover', 3, 8)
		}
		me.__81.onmouseout=function (e) {
			pano2vrProxy('mouseout', 3, 8)
		}
		me.__81.ggUpdatePosition=function (useTransition) {
		}
		me.__3_.appendChild(me.__81);
		el=me.__91=document.createElement('div');
		el.ggId="9";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__91.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__91.onclick=function (e) {
			pano2vrProxy('click', 3, 9)
		}
		me.__91.onmouseover=function (e) {
			pano2vrProxy('mouseover', 3, 9)
		}
		me.__91.onmouseout=function (e) {
			pano2vrProxy('mouseout', 3, 9)
		}
		me.__91.ggUpdatePosition=function (useTransition) {
		}
		me.__3_.appendChild(me.__91);
		el=me.__101=document.createElement('div');
		el.ggId="10";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__101.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__101.onclick=function (e) {
			pano2vrProxy('click', 3, 10)
		}
		me.__101.onmouseover=function (e) {
			pano2vrProxy('mouseover', 3, 10)
		}
		me.__101.onmouseout=function (e) {
			pano2vrProxy('mouseout', 3, 10)
		}
		me.__101.ggUpdatePosition=function (useTransition) {
		}
		me.__3_.appendChild(me.__101);
		el=me.__112=document.createElement('div');
		el.ggId="11";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__112.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__112.onclick=function (e) {
			pano2vrProxy('click', 3, 11)
		}
		me.__112.onmouseover=function (e) {
			pano2vrProxy('mouseover', 3, 11)
		}
		me.__112.onmouseout=function (e) {
			pano2vrProxy('mouseout', 3, 11)
		}
		me.__112.ggUpdatePosition=function (useTransition) {
		}
		me.__3_.appendChild(me.__112);
		el=me.__121=document.createElement('div');
		el.ggId="12";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__121.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__121.onclick=function (e) {
			pano2vrProxy('click', 3, 12)
		}
		me.__121.onmouseover=function (e) {
			pano2vrProxy('mouseover', 3, 12)
		}
		me.__121.onmouseout=function (e) {
			pano2vrProxy('mouseout', 3, 12)
		}
		me.__121.ggUpdatePosition=function (useTransition) {
		}
		me.__3_.appendChild(me.__121);
		el=me.__131=document.createElement('div');
		el.ggId="13";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__131.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__131.onclick=function (e) {
			pano2vrProxy('click', 3, 13)
		}
		me.__131.onmouseover=function (e) {
			pano2vrProxy('mouseover', 3, 13)
		}
		me.__131.onmouseout=function (e) {
			pano2vrProxy('mouseout', 3, 13)
		}
		me.__131.ggUpdatePosition=function (useTransition) {
		}
		me.__3_.appendChild(me.__131);
		me.divSkin.appendChild(me.__3_);
		el=me.__2_=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="2 \u043b\u0438\u0442\u0435\u0440";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 10px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__2_.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__2_.ggUpdatePosition=function (useTransition) {
		}
		el=me.__111=document.createElement('div');
		el.ggId="1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__111.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__111.onclick=function (e) {
			pano2vrProxy('click', 2, 1)
		}
		me.__111.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 1)
		}
		me.__111.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 1)
		}
		me.__111.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__111);
		el=me.__24=document.createElement('div');
		el.ggId="2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__24.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__24.onclick=function (e) {
			pano2vrProxy('click', 2, 2)
		}
		me.__24.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 2)
		}
		me.__24.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 2)
		}
		me.__24.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__24);
		el=me.__30=document.createElement('div');
		el.ggId="3";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__30.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__30.onclick=function (e) {
			pano2vrProxy('click', 2, 3)
		}
		me.__30.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 3)
		}
		me.__30.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 3)
		}
		me.__30.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__30);
		el=me.__40=document.createElement('div');
		el.ggId="4";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__40.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__40.onclick=function (e) {
			pano2vrProxy('click', 2, 4)
		}
		me.__40.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 4)
		}
		me.__40.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 4)
		}
		me.__40.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__40);
		el=me.__50=document.createElement('div');
		el.ggId="5";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__50.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__50.onclick=function (e) {
			pano2vrProxy('click', 2, 5)
		}
		me.__50.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 5)
		}
		me.__50.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 5)
		}
		me.__50.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__50);
		el=me.__60=document.createElement('div');
		el.ggId="6";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__60.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__60.onclick=function (e) {
			pano2vrProxy('click', 2, 6)
		}
		me.__60.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 6)
		}
		me.__60.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 6)
		}
		me.__60.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__60);
		el=me.__70=document.createElement('div');
		el.ggId="7";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__70.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__70.onclick=function (e) {
			pano2vrProxy('click', 2, 7)
		}
		me.__70.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 7)
		}
		me.__70.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 7)
		}
		me.__70.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__70);
		el=me.__80=document.createElement('div');
		el.ggId="8";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__80.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__80.onclick=function (e) {
			pano2vrProxy('click', 2, 8)
		}
		me.__80.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 8)
		}
		me.__80.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 8)
		}
		me.__80.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__80);
		el=me.__90=document.createElement('div');
		el.ggId="9";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__90.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__90.onclick=function (e) {
			pano2vrProxy('click', 2, 9)
		}
		me.__90.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 9)
		}
		me.__90.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 9)
		}
		me.__90.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__90);
		el=me.__100=document.createElement('div');
		el.ggId="10";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__100.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__100.onclick=function (e) {
			pano2vrProxy('click', 2, 10)
		}
		me.__100.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 10)
		}
		me.__100.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 10)
		}
		me.__100.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__100);
		el=me.__110=document.createElement('div');
		el.ggId="11";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__110.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__110.onclick=function (e) {
			pano2vrProxy('click', 2, 11)
		}
		me.__110.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 11)
		}
		me.__110.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 11)
		}
		me.__110.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__110);
		el=me.__120=document.createElement('div');
		el.ggId="12";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__120.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__120.onclick=function (e) {
			pano2vrProxy('click', 2, 12)
		}
		me.__120.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 12)
		}
		me.__120.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 12)
		}
		me.__120.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__120);
		el=me.__130=document.createElement('div');
		el.ggId="13";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__130.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__130.onclick=function (e) {
			pano2vrProxy('click', 2, 13)
		}
		me.__130.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 13)
		}
		me.__130.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 13)
		}
		me.__130.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__130);
		el=me.__14=document.createElement('div');
		el.ggId="14";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__14.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__14.onclick=function (e) {
			pano2vrProxy('click', 2, 14)
		}
		me.__14.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 14)
		}
		me.__14.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 14)
		}
		me.__14.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__14);
		el=me.__15=document.createElement('div');
		el.ggId="15";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__15.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__15.onclick=function (e) {
			pano2vrProxy('click', 2, 15)
		}
		me.__15.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 15)
		}
		me.__15.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 15)
		}
		me.__15.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__15);
		el=me.__16=document.createElement('div');
		el.ggId="16";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__16.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__16.onclick=function (e) {
			pano2vrProxy('click', 2, 16)
		}
		me.__16.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 16)
		}
		me.__16.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 16)
		}
		me.__16.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__16);
		el=me.__17=document.createElement('div');
		el.ggId="17";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__17.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__17.onclick=function (e) {
			pano2vrProxy('click', 2, 17)
		}
		me.__17.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 17)
		}
		me.__17.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 17)
		}
		me.__17.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__17);
		el=me.__18=document.createElement('div');
		el.ggId="18";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__18.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__18.onclick=function (e) {
			pano2vrProxy('click', 2, 18)
		}
		me.__18.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 18)
		}
		me.__18.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 18)
		}
		me.__18.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__18);
		el=me.__19=document.createElement('div');
		el.ggId="19";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__19.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__19.onclick=function (e) {
			pano2vrProxy('click', 2, 19)
		}
		me.__19.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 19)
		}
		me.__19.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 19)
		}
		me.__19.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__19);
		el=me.__20=document.createElement('div');
		el.ggId="20";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__20.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__20.onclick=function (e) {
			pano2vrProxy('click', 2, 20)
		}
		me.__20.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 20)
		}
		me.__20.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 20)
		}
		me.__20.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__20);
		el=me.__21=document.createElement('div');
		el.ggId="21";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__21.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__21.onclick=function (e) {
			pano2vrProxy('click', 2, 21)
		}
		me.__21.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 21)
		}
		me.__21.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 21)
		}
		me.__21.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__21);
		el=me.__22=document.createElement('div');
		el.ggId="22";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__22.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__22.onclick=function (e) {
			pano2vrProxy('click', 2, 22)
		}
		me.__22.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 22)
		}
		me.__22.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 22)
		}
		me.__22.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__22);
		el=me.__23=document.createElement('div');
		el.ggId="23";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__23.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__23.onclick=function (e) {
			pano2vrProxy('click', 2, 23)
		}
		me.__23.onmouseover=function (e) {
			pano2vrProxy('mouseover', 2, 23)
		}
		me.__23.onmouseout=function (e) {
			pano2vrProxy('mouseout', 2, 23)
		}
		me.__23.ggUpdatePosition=function (useTransition) {
		}
		me.__2_.appendChild(me.__23);
		me.divSkin.appendChild(me.__2_);
		el=me.__1_=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="1 \u043b\u0438\u0442\u0435\u0440";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 10px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__1_.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__1_.ggUpdatePosition=function (useTransition) {
		}
		el=me.__1=document.createElement('div');
		el.ggId="1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__1.onclick=function (e) {
			pano2vrProxy('click', 1, 1)
		}
		me.__1.onmouseover=function (e) {
			pano2vrProxy('mouseover', 1, 1)
		}
		me.__1.onmouseout=function (e) {
			pano2vrProxy('mouseout', 1, 1)
		}
		me.__1.ggUpdatePosition=function (useTransition) {
		}
		me.__1_.appendChild(me.__1);
		el=me.__2=document.createElement('div');
		el.ggId="2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__2.onclick=function (e) {
			pano2vrProxy('click', 1, 2)
		}
		me.__2.onmouseover=function (e) {
			pano2vrProxy('mouseover', 1, 2)
		}
		me.__2.onmouseout=function (e) {
			pano2vrProxy('mouseout', 1, 2)
		}
		me.__2.ggUpdatePosition=function (useTransition) {
		}
		me.__1_.appendChild(me.__2);
		el=me.__3=document.createElement('div');
		el.ggId="3";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__3.onclick=function (e) {
			pano2vrProxy('click', 1, 3)
		}
		me.__3.onmouseover=function (e) {
			pano2vrProxy('mouseover', 1, 3)
		}
		me.__3.onmouseout=function (e) {
			pano2vrProxy('mouseout', 1, 3)
		}
		me.__3.ggUpdatePosition=function (useTransition) {
		}
		me.__1_.appendChild(me.__3);
		el=me.__4=document.createElement('div');
		el.ggId="4";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__4.onclick=function (e) {
			pano2vrProxy('click', 1, 4)
		}
		me.__4.onmouseover=function (e) {
			pano2vrProxy('mouseover', 1, 4)
		}
		me.__4.onmouseout=function (e) {
			pano2vrProxy('mouseout', 1, 4)
		}
		me.__4.ggUpdatePosition=function (useTransition) {
		}
		me.__1_.appendChild(me.__4);
		el=me.__5=document.createElement('div');
		el.ggId="5";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__5.onclick=function (e) {
			pano2vrProxy('click', 1, 5)
		}
		me.__5.onmouseover=function (e) {
			pano2vrProxy('mouseover', 1, 5)
		}
		me.__5.onmouseout=function (e) {
			pano2vrProxy('mouseout', 1, 5)
		}
		me.__5.ggUpdatePosition=function (useTransition) {
		}
		me.__1_.appendChild(me.__5);
		el=me.__6=document.createElement('div');
		el.ggId="6";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__6.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__6.onclick=function (e) {
			pano2vrProxy('click', 1, 6)
		}
		me.__6.onmouseover=function (e) {
			pano2vrProxy('mouseover', 1, 6)
		}
		me.__6.onmouseout=function (e) {
			pano2vrProxy('mouseout', 1, 6)
		}
		me.__6.ggUpdatePosition=function (useTransition) {
		}
		me.__1_.appendChild(me.__6);
		el=me.__7=document.createElement('div');
		el.ggId="7";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__7.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__7.onclick=function (e) {
			pano2vrProxy('click', 1, 7)
		}
		me.__7.onmouseover=function (e) {
			pano2vrProxy('mouseover', 1, 7)
		}
		me.__7.onmouseout=function (e) {
			pano2vrProxy('mouseout', 1, 7)
		}
		me.__7.ggUpdatePosition=function (useTransition) {
		}
		me.__1_.appendChild(me.__7);
		el=me.__8=document.createElement('div');
		el.ggId="8";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__8.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__8.onclick=function (e) {
			pano2vrProxy('click', 1, 8)
		}
		me.__8.onmouseover=function (e) {
			pano2vrProxy('mouseover', 1, 8)
		}
		me.__8.onmouseout=function (e) {
			pano2vrProxy('mouseout', 1, 8)
		}
		me.__8.ggUpdatePosition=function (useTransition) {
		}
		me.__1_.appendChild(me.__8);
		el=me.__9=document.createElement('div');
		el.ggId="9";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__9.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__9.onclick=function (e) {
			pano2vrProxy('click', 1, 9)
		}
		me.__9.onmouseover=function (e) {
			pano2vrProxy('mouseover', 1, 9)
		}
		me.__9.onmouseout=function (e) {
			pano2vrProxy('mouseout', 1, 9)
		}
		me.__9.ggUpdatePosition=function (useTransition) {
		}
		me.__1_.appendChild(me.__9);
		el=me.__10=document.createElement('div');
		el.ggId="10";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__10.onclick=function (e) {
			pano2vrProxy('click', 1, 10)
		}
		me.__10.onmouseover=function (e) {
			pano2vrProxy('mouseover', 1, 10)
		}
		me.__10.onmouseout=function (e) {
			pano2vrProxy('mouseout', 1, 10)
		}
		me.__10.ggUpdatePosition=function (useTransition) {
		}
		me.__1_.appendChild(me.__10);
		el=me.__11=document.createElement('div');
		el.ggId="11";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__11.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__11.onclick=function (e) {
			pano2vrProxy('click', 1, 11)
		}
		me.__11.onmouseover=function (e) {
			pano2vrProxy('mouseover', 1, 11)
		}
		me.__11.onmouseout=function (e) {
			pano2vrProxy('mouseout', 1, 11)
		}
		me.__11.ggUpdatePosition=function (useTransition) {
		}
		me.__1_.appendChild(me.__11);
		el=me.__12=document.createElement('div');
		el.ggId="12";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__12.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__12.onclick=function (e) {
			pano2vrProxy('click', 1, 12)
		}
		me.__12.onmouseover=function (e) {
			pano2vrProxy('mouseover', 1, 12)
		}
		me.__12.onmouseout=function (e) {
			pano2vrProxy('mouseout', 1, 12)
		}
		me.__12.ggUpdatePosition=function (useTransition) {
		}
		me.__1_.appendChild(me.__12);
		el=me.__13=document.createElement('div');
		el.ggId="13";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 10px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me.__13.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__13.onclick=function (e) {
			pano2vrProxy('click', 1, 13)
		}
		me.__13.onmouseover=function (e) {
			pano2vrProxy('mouseover', 1, 13)
		}
		me.__13.onmouseout=function (e) {
			pano2vrProxy('mouseout', 1, 13)
		}
		me.__13.ggUpdatePosition=function (useTransition) {
		}
		me.__1_.appendChild(me.__13);
		me.divSkin.appendChild(me.__1_);
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
	};
	this.hotspotProxyClick=function(id, url) {
		if (id=='house3_storey1') {
			me.__113.onclick();
		}
		if (id=='house3_storey2') {
			me.__25.onclick();
		}
		if (id=='house3_storey3') {
			me.__31.onclick();
		}
		if (id=='house3_storey4') {
			me.__41.onclick();
		}
		if (id=='house3_storey5') {
			me.__51.onclick();
		}
		if (id=='house3_storey6') {
			me.__61.onclick();
		}
		if (id=='house3_storey7') {
			me.__71.onclick();
		}
		if (id=='house3_storey8') {
			me.__81.onclick();
		}
		if (id=='house3_storey9') {
			me.__91.onclick();
		}
		if (id=='house3_storey10') {
			me.__101.onclick();
		}
		if (id=='house3_storey11') {
			me.__112.onclick();
		}
		if (id=='house3_storey12') {
			me.__121.onclick();
		}
		if (id=='house3_storey13') {
			me.__131.onclick();
		}
		if (id=='house2_storey1') {
			me.__111.onclick();
		}
		if (id=='house2_storey2') {
			me.__24.onclick();
		}
		if (id=='house2_storey3') {
			me.__30.onclick();
		}
		if (id=='house2_storey4') {
			me.__40.onclick();
		}
		if (id=='house2_storey5') {
			me.__50.onclick();
		}
		if (id=='house2_storey6') {
			me.__60.onclick();
		}
		if (id=='house2_storey7') {
			me.__70.onclick();
		}
		if (id=='house2_storey8') {
			me.__80.onclick();
		}
		if (id=='house2_storey9') {
			me.__90.onclick();
		}
		if (id=='house2_storey10') {
			me.__100.onclick();
		}
		if (id=='house2_storey11') {
			me.__110.onclick();
		}
		if (id=='house2_storey12') {
			me.__120.onclick();
		}
		if (id=='house2_storey13') {
			me.__130.onclick();
		}
		if (id=='house2_storey14') {
			me.__14.onclick();
		}
		if (id=='house2_storey15') {
			me.__15.onclick();
		}
		if (id=='house2_storey16') {
			me.__16.onclick();
		}
		if (id=='house2_storey17') {
			me.__17.onclick();
		}
		if (id=='house2_storey18') {
			me.__18.onclick();
		}
		if (id=='house2_storey19') {
			me.__19.onclick();
		}
		if (id=='house2_storey20') {
			me.__20.onclick();
		}
		if (id=='house2_storey21') {
			me.__21.onclick();
		}
		if (id=='house2_storey22') {
			me.__22.onclick();
		}
		if (id=='house2_storey23') {
			me.__23.onclick();
		}
		if (id=='house1_storey1') {
			me.__1.onclick();
		}
		if (id=='house1_storey2') {
			me.__2.onclick();
		}
		if (id=='house1_storey3') {
			me.__3.onclick();
		}
		if (id=='house1_storey4') {
			me.__4.onclick();
		}
		if (id=='house1_storey5') {
			me.__5.onclick();
		}
		if (id=='house1_storey6') {
			me.__6.onclick();
		}
		if (id=='house1_storey7') {
			me.__7.onclick();
		}
		if (id=='house1_storey8') {
			me.__8.onclick();
		}
		if (id=='house1_storey9') {
			me.__9.onclick();
		}
		if (id=='house1_storey10') {
			me.__10.onclick();
		}
		if (id=='house1_storey11') {
			me.__11.onclick();
		}
		if (id=='house1_storey12') {
			me.__12.onclick();
		}
		if (id=='house1_storey13') {
			me.__13.onclick();
		}
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
		if (id=='house3_storey1') {
			me.__113.onmouseover();
		}
		if (id=='house3_storey2') {
			me.__25.onmouseover();
		}
		if (id=='house3_storey3') {
			me.__31.onmouseover();
		}
		if (id=='house3_storey4') {
			me.__41.onmouseover();
		}
		if (id=='house3_storey5') {
			me.__51.onmouseover();
		}
		if (id=='house3_storey6') {
			me.__61.onmouseover();
		}
		if (id=='house3_storey7') {
			me.__71.onmouseover();
		}
		if (id=='house3_storey8') {
			me.__81.onmouseover();
		}
		if (id=='house3_storey9') {
			me.__91.onmouseover();
		}
		if (id=='house3_storey10') {
			me.__101.onmouseover();
		}
		if (id=='house3_storey11') {
			me.__112.onmouseover();
		}
		if (id=='house3_storey12') {
			me.__121.onmouseover();
		}
		if (id=='house3_storey13') {
			me.__131.onmouseover();
		}
		if (id=='house2_storey1') {
			me.__111.onmouseover();
		}
		if (id=='house2_storey2') {
			me.__24.onmouseover();
		}
		if (id=='house2_storey3') {
			me.__30.onmouseover();
		}
		if (id=='house2_storey4') {
			me.__40.onmouseover();
		}
		if (id=='house2_storey5') {
			me.__50.onmouseover();
		}
		if (id=='house2_storey6') {
			me.__60.onmouseover();
		}
		if (id=='house2_storey7') {
			me.__70.onmouseover();
		}
		if (id=='house2_storey8') {
			me.__80.onmouseover();
		}
		if (id=='house2_storey9') {
			me.__90.onmouseover();
		}
		if (id=='house2_storey10') {
			me.__100.onmouseover();
		}
		if (id=='house2_storey11') {
			me.__110.onmouseover();
		}
		if (id=='house2_storey12') {
			me.__120.onmouseover();
		}
		if (id=='house2_storey13') {
			me.__130.onmouseover();
		}
		if (id=='house2_storey14') {
			me.__14.onmouseover();
		}
		if (id=='house2_storey15') {
			me.__15.onmouseover();
		}
		if (id=='house2_storey16') {
			me.__16.onmouseover();
		}
		if (id=='house2_storey17') {
			me.__17.onmouseover();
		}
		if (id=='house2_storey18') {
			me.__18.onmouseover();
		}
		if (id=='house2_storey19') {
			me.__19.onmouseover();
		}
		if (id=='house2_storey20') {
			me.__20.onmouseover();
		}
		if (id=='house2_storey21') {
			me.__21.onmouseover();
		}
		if (id=='house2_storey22') {
			me.__22.onmouseover();
		}
		if (id=='house2_storey23') {
			me.__23.onmouseover();
		}
		if (id=='house1_storey1') {
			me.__1.onmouseover();
		}
		if (id=='house1_storey2') {
			me.__2.onmouseover();
		}
		if (id=='house1_storey3') {
			me.__3.onmouseover();
		}
		if (id=='house1_storey4') {
			me.__4.onmouseover();
		}
		if (id=='house1_storey5') {
			me.__5.onmouseover();
		}
		if (id=='house1_storey6') {
			me.__6.onmouseover();
		}
		if (id=='house1_storey7') {
			me.__7.onmouseover();
		}
		if (id=='house1_storey8') {
			me.__8.onmouseover();
		}
		if (id=='house1_storey9') {
			me.__9.onmouseover();
		}
		if (id=='house1_storey10') {
			me.__10.onmouseover();
		}
		if (id=='house1_storey11') {
			me.__11.onmouseover();
		}
		if (id=='house1_storey12') {
			me.__12.onmouseover();
		}
		if (id=='house1_storey13') {
			me.__13.onmouseover();
		}
	}
	me.hotspotProxyOut=function(id, url) {
		if (id=='house3_storey1') {
			me.__113.onmouseout();
		}
		if (id=='house3_storey2') {
			me.__25.onmouseout();
		}
		if (id=='house3_storey3') {
			me.__31.onmouseout();
		}
		if (id=='house3_storey4') {
			me.__41.onmouseout();
		}
		if (id=='house3_storey5') {
			me.__51.onmouseout();
		}
		if (id=='house3_storey6') {
			me.__61.onmouseout();
		}
		if (id=='house3_storey7') {
			me.__71.onmouseout();
		}
		if (id=='house3_storey8') {
			me.__81.onmouseout();
		}
		if (id=='house3_storey9') {
			me.__91.onmouseout();
		}
		if (id=='house3_storey10') {
			me.__101.onmouseout();
		}
		if (id=='house3_storey11') {
			me.__112.onmouseout();
		}
		if (id=='house3_storey12') {
			me.__121.onmouseout();
		}
		if (id=='house3_storey13') {
			me.__131.onmouseout();
		}
		if (id=='house2_storey1') {
			me.__111.onmouseout();
		}
		if (id=='house2_storey2') {
			me.__24.onmouseout();
		}
		if (id=='house2_storey3') {
			me.__30.onmouseout();
		}
		if (id=='house2_storey4') {
			me.__40.onmouseout();
		}
		if (id=='house2_storey5') {
			me.__50.onmouseout();
		}
		if (id=='house2_storey6') {
			me.__60.onmouseout();
		}
		if (id=='house2_storey7') {
			me.__70.onmouseout();
		}
		if (id=='house2_storey8') {
			me.__80.onmouseout();
		}
		if (id=='house2_storey9') {
			me.__90.onmouseout();
		}
		if (id=='house2_storey10') {
			me.__100.onmouseout();
		}
		if (id=='house2_storey11') {
			me.__110.onmouseout();
		}
		if (id=='house2_storey12') {
			me.__120.onmouseout();
		}
		if (id=='house2_storey13') {
			me.__130.onmouseout();
		}
		if (id=='house2_storey14') {
			me.__14.onmouseout();
		}
		if (id=='house2_storey15') {
			me.__15.onmouseout();
		}
		if (id=='house2_storey16') {
			me.__16.onmouseout();
		}
		if (id=='house2_storey17') {
			me.__17.onmouseout();
		}
		if (id=='house2_storey18') {
			me.__18.onmouseout();
		}
		if (id=='house2_storey19') {
			me.__19.onmouseout();
		}
		if (id=='house2_storey20') {
			me.__20.onmouseout();
		}
		if (id=='house2_storey21') {
			me.__21.onmouseout();
		}
		if (id=='house2_storey22') {
			me.__22.onmouseout();
		}
		if (id=='house2_storey23') {
			me.__23.onmouseout();
		}
		if (id=='house1_storey1') {
			me.__1.onmouseout();
		}
		if (id=='house1_storey2') {
			me.__2.onmouseout();
		}
		if (id=='house1_storey3') {
			me.__3.onmouseout();
		}
		if (id=='house1_storey4') {
			me.__4.onmouseout();
		}
		if (id=='house1_storey5') {
			me.__5.onmouseout();
		}
		if (id=='house1_storey6') {
			me.__6.onmouseout();
		}
		if (id=='house1_storey7') {
			me.__7.onmouseout();
		}
		if (id=='house1_storey8') {
			me.__8.onmouseout();
		}
		if (id=='house1_storey9') {
			me.__9.onmouseout();
		}
		if (id=='house1_storey10') {
			me.__10.onmouseout();
		}
		if (id=='house1_storey11') {
			me.__11.onmouseout();
		}
		if (id=='house1_storey12') {
			me.__12.onmouseout();
		}
		if (id=='house1_storey13') {
			me.__13.onmouseout();
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
	};
	player.addListener('timer', me.skinTimerEvent);
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	me.skinTimerEvent();
};