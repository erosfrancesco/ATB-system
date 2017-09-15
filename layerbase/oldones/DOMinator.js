/*Some setup and variables*/var jDOM;
	_S.hei=_S.hei||600;
	_S.wid=_S.wid||800;
	_S.poy=_S.poy||10;
	_S.pox=_S.pox||10;//these one are default for 800x600 ratio
	
	function SetGameWrapper(){
		jDOM=document.createElement('div');
		jDOM.style.position='absolute';
		jDOM.style.overflow='hidden';
		jDOM.id=GmId;
		document.body.appendChild(jDOM);
		//jDOM=document.createElement('style');
		//jDOM.id='stl-'+GmId;
		//document.body.appendChild(jDOM);
		//jDOM.sheet.addRule("@font-face","font-family:"+_Fnt1+";src:url("+_Ass.font+");",0);
	}

	function SetGameWrpVars(){
		GmWRef=document.getElementById(GmId);
		//GmWStl=document.getElementById('stl-'+GmId);
		GmWRef.style.top=_S.poy;
		GmWRef.style.left=_S.pox;
		GmWRef.style.width=_S.wid;
		GmWRef.style.height=_S.hei;
		//GmWRef.style.fontSize=_S.hei*2/9+'%';
	}

	function CreateNewWrapper(id){
		jDOM=document.createElement('div');
		jDOM.style.position='absolute';
		jDOM.style.overflow='hidden';
		jDOM.id=id;
		jDOM.style.top=_S.poy;
		jDOM.style.left=_S.pox;
		jDOM.style.width=_S.wid;
		jDOM.style.height=_S.hei;
		jDOM.style.fontSize=_S.hei*2/9+'%';
		document.body.appendChild(jDOM);
		return jDOM;
	}
	

/*Animation tweaks*/window.requestAnimFrame=(function(){
	return window.requestAnimationFrame||window.webkitRequestAnimationFrame||
		window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,100/6);};})();
/*usage: (function animloop(){requestAnimFrame(animloop);render();})();*/

/*TLIFO:time-index stack*/function TLIFO(){this._C=0;this.stack=[];this.addr=function(obj,t){
	t=t||0;if(this.stack[this._C]){if(this.stack[this._C][1]<=t){this._C++;this.addr(obj,t);
	}else{this.stack.splice(this._C,0,[obj,t]);}}else{this.stack[this._C]=[obj,t];}};
	
	this.add=function(obj,t){this._C=0;this.addr(obj,t);};
	this.get=function(){this._C=this.stack[0];this.stack.splice(0,1);return this._C;};
	this.peek=function(i){return this.stack[i];}}
/*it could also be used as a normal FIFO*/

/*Cicle Managment Object*/var CicleObj=[];function ChPointr(x,y){CicleObj[x].Point=y;}
	function AddCicle(x,y){CicleObj[x]={};CicleObj[x].Point=function(){};CicleObj[x].Cicle='';
		
		CicleObj[x].Start=function(){ChPointr(x,y);
			(CicleObj[x].Cicle=function(){requestAnimFrame(CicleObj[x].Cicle);CicleObj[x].Point();})();}}
/*----------------------*/

/*Input Managment Object*/var InputObj={SENS:10,CountIn:0,Key:0,J:0,Arr:[],};

	document.onkeydown= function(event) {InputObj.Key= (event || window.event).keyCode;
		if(!(InputObj.Arr[InputObj.Key])){InputObj.Arr[InputObj.Key]=true;}};
	document.onkeyup= function(event) {InputObj.CountIn=0;InputObj.Key= (event || window.event).keyCode;
		if(InputObj.Arr[InputObj.Key]){InputObj.Arr[InputObj.Key]=false;}};

	function InputFrom(arr,sens){for(InputObj.J in arr){if(InputObj.Arr[InputObj.J]){if(InputObj.CountIn==0){
				InputObj.CountIn=sens;arr[InputObj.J]();}else{InputObj.CountIn--;}}}}
/*----------------------*/

/*DOM. images, divs managment and stuff. Also the image pool*/var DOM={Cntr:0,
	Div:function(x,y,z,h,w,i,p){CreateDiv(x,y,z,w,h,i,p);},
	Img:function(s,x,y,z,h,w,i,p){DOM.Div(x,y,z,h,w,i,p);AttachDomImg(x,y,i,s);},
	Remove:function(x){jDOM=document.getElementById(x);jDOM.parentNode.removeChild(jDOM);},
	Text:function(i,text,p){p=p||i;jDOM=document.createElement('p');jDOM.innerHTML=text;jDOM.style.color='#F0F0DF';
		jDOM.style.position='inherit';jDOM.style.fontSize='inherit';jDOM.style.height='inherit';
		jDOM.style.left='17%';jDOM.style.width=document.getElementById(p).offsetWidth*83/100;
		jDOM.style.fontFamily=_Fnt1;jDOM.id='t-'+i;document.getElementById(p).appendChild(jDOM);},

	Pool:[],Load:function(s,x,y,z,w,h,i,p){p=p||GmId;DOM.Pool[i]={loaded:false};
		
		DOM.Pool[i].draw=function(){document.getElementById(i).style.visibility='visible';};DOM.Img(s,x,y,z,w,h,i,p);
		document.getElementById(i).style.visibility='hidden';DOM.Cntr++;
		document.getElementById('img-'+i).onload=function(){DOM.Cntr--;DOM.Pool[i].loaded=true;};
	},
	ChkPool:function(){if(DOM.Cntr>0){return false;}else{return true;}}
};
/*----------------------------------------------------------*/

/*Some functions for DOM*/function CreateDiv(x,y,z,h,w,i,p){

	jDOM=document.createElement('div');jDOM.style.position='inherit';jDOM.style.top=y;jDOM.style.left=x;
	jDOM.style.zIndex=z;jDOM.style.width=w;jDOM.style.height=h;jDOM.id=i;//jDOM.style.border='solid 1px';
	document.getElementById(p).appendChild(jDOM);}
	
	function AttachDomImg(x,y,i,img){
		jDOM=new Image();jDOM.id='img-'+i;jDOM.style.position='inherit';jDOM.src=img;
		jDOM.style.width='inherit';jDOM.style.height='inherit';document.getElementById(i).appendChild(jDOM);}

	function RemoveDOM(x){if(x.parentNode){x.parentNode.removeChild(x);}}
/*----------------------*/

/*Some functions for randomness*/function RetRandom(x,y){return Math.floor(Math.random()*(y-x+1)+x);}
	function CasualProb(x){if(x > RetRandom(1,101)){return true;}else{return false;}}
/*-----------------------------*/