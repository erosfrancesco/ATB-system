/* This file has some headers */

/**/function _SetBaseOfWalls(x, y, wid, hei){

	var wrp=_CreateDivWithClass(x,y,wid,hei,'paperWrapp');
	var div=_CreateDivWithClass('0%','0%','100%','100%','paperBase')//document.createElement('div');
	//div.className='paperBase';
	wrp.appendChild(div);

	var dummy=_DOMReferenceObject(wrp);
	dummy.attach=function(){return div;}
	//dummy.transform=function(t){div.style.transform=t;}
	dummy.camera=function(t){
		console.log(div);
		div.style.transform=t;
	}

	return dummy;
	}


	function PaperWall(x, y, wid, hei, transform){
	
		var side=new _DOMReferenceObject(_CreateDivWithClass(x,y,wid,hei,'paperWall'));
		side.DOM.Ref.style.transform=transform;
		side.setBackgroundColor=function(color){side.DOM.Ref.style.background=color;};
		side.setBackgroundTile=function(spriteObj){};//--------------------------------------------------------------------
	
		return side;
	}
/**/

/**/function _CreateDivWithClass(x, y, wid, hei, classN){
	var D=document.createElement('div');
	D.className=classN;
	D.style.top=y;
	D.style.left=x;
	D.style.width=wid;
	D.style.height=hei;
	return D;
	}

	function _DOMReferenceObject(div){
		var dummy={};
		dummy.DOM={Ref:div};

		dummy.appendTo=function(parent){parent=parent||ReturnCurrentWrapper();parent.appendChild(div);};

		dummy.returnTop=function(){return div.offsetTop;};
		dummy.returnLeft=function(){return div.offsetLeft;};
		dummy.returnWidth=function(){return div.offsetWidth;};
		dummy.returnHeight=function(){return div.offsetHeight;};

		return dummy;

	}
/**/


