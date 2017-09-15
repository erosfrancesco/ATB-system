/**/function SpriteAnimator(sprite,optionalpath,x,y,z,w,h){

	if(!sprite.framn){sprite.framn=[1,1];} // simple polyfill

	y=y||sprite.top;
	x=x||sprite.left;
	w=w||(sprite.width / sprite.framn[1]);
	h=h||(sprite.height / sprite.framn[0]); // should check percentage

	var div=_CreateResizableSprite(sprite,x,y,optionalpath);
	div.style.width=w;
	div.style.height=h;

	var dummy=SpriteClassDummy(div);
	dummy.framnx=sprite.framn[0];
	dummy.framny=sprite.framn[1];
	return dummy;
	}

/**/function SpriteClassDummy(div){
	var DOMObj=Header_returnSpriteDOM(div);
	var dummy={
		
		DOM:{x:DOMObj.x,y:DOMObj.y,wid:DOMObj.w,hei:DOMObj.h,Ref:div},
		spritex:0,
		spritey:0,

		returnSpriteDOM:function(){return Header_returnSpriteDOM(div);}, // useless
			
		calcBackgroundPosition:function(){
			Header_calcBackgroundPosition(dummy);
		},/**/
			
		refresh:function(x,y){
			dummy.spritex=x||dummy.spritex;
			dummy.spritey=y||dummy.spritey;
			Header_calcBackgroundPosition(dummy);/**/
		},

		attachTo:function(parent){parent.appendChild(div);}
	};
	return dummy;
	}

/**/function Header_calcBackgroundPosition(dummy){
	var s=dummy.returnSpriteDOM();
	var sx=(100*dummy.spritex)/dummy.framny;
	var sy=(100*dummy.spritey)/dummy.framnx;

	s.DOM.style.backgroundPosition='-'+sy+'% -'+sx+'%';
	}

	function Header_returnSpriteDOM(div){
		var d=div.firstChild;
		return {
			DOM:d,
			y:d.offsetTop,
			x:d.offsetLeft,
			w:d.offsetWidth,
			h:d.offsetHeight
		};
	}
/**/

/**/function _CreateResizableSprite(sprite,x,y,optionalpath){

	var sourcepath=(optionalpath||_Ass.SprtPath)+'/'+sprite.src;

	var div=document.createElement('div');
	div.className='absol';
		
	div.style.top=y||0;
	div.style.left=x||0;

	var child=document.createElement('div');
	child.className='sprite expandsize';
		
	child.style.backgroundImage="url('"+sourcepath+"')";
	child.style.backgroundSize=""+(100*sprite.framn[1])+"% "+(100*sprite.framn[0])+"%";
	div.appendChild(child);

	return div;
	}
/**/