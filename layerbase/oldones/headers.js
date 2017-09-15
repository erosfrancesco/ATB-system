/*Now, this one is much simpler.*/function deepClone(o){
	var _out,v,_key;_out=Array.isArray(o)?[]:{};for(_key in o){v=o[_key];_out[_key]=(typeof v === "object")?deepClone(v):v;}
	return _out;}
/**/

/*Check if a key is up*/function IsUpTheKey(k){return InputObj.Arr[k];}
/**/

/*It doesn't need explanation, right?*/function LIFO(){	
	this.hello=[];
	this.Get=function(){return this.hello.shift();}
	this.Peek=function(){return this.hello[0];}
	this.Add=function(x){this.hello.push(x);}}
/*-----------------------------------*/

/*Some tough shit*/function DOMGameWrap(id){
	var i=document.createElement('div');
	i.className='_GameWrapper';
	i.id=id;
	i.style.top=_S.poy;
	i.style.left=_S.pox;
	i.style.fontSize=_S.hei*2/9+'%';
	i.style.width=_S.wid;
	i.style.height=_S.hei;
	document.body.appendChild(i);
	return i;}

	function AnimatorObj(){
		this.hello=[];
		this.Phase=function(name,point,bool){bool=bool||true;this.hello[name]={Pointer:point,activ:bool}}
		this.ExecCicle=function(){for(var i in this.hello){if(this.hello[i].activ){this.hello[i].Pointer();}}}
		this.Cancel=function(name){delete this.hello[name];}
		this.Pause=function(name){this.hello[name].activ=false;}
		this.Resume=function(name){this.hello[name].activ=true;}
		this.ModPhase=function(name,fun){this.hello[name].Pointer=fun;}
	}
/**/

/**/function WrapperObj(id){
	this.DOMRef=DOMGameWrap(id);this.idRef=id;WrapperRef.ArrayRef[id]=this;

	this.Animat=new AnimatorObj();

	this.Pool=[];
	this.Div=function(x,y,z,w,h,i,p){p=p||this.DOMRef.id;DOM.Div(x,y,z,h,w,i,p);}
	this.Img=function(s,x,y,z,w,h,i,p){
		p=p||this.DOMRef.id;
		this.Div(x,y,z,h,w,p+'-'+i,p);
		document.getElementById(p+'-'+i).style.backgroundImage='url("'+s+'")';
		document.getElementById(p+'-'+i).style.backgroundSize='100% 100%';}
	
	this.Load=function(s,x,y,z,w,h,i,p){p=p||this.DOMRef.id;if(!this.Pool[i]){this.Pool[i]={};

		this.Pool[i].ImgRef=new Image();this.Pool[i].ImgRef.loaded=false;
		this.Pool[i].ImgRef.onload=function(){this.loaded=true;this.oriWidth=this.width;this.oriHeight=this.height;}

		this.Pool[i].ImgRef.src=s;

		this.Pool[i].draw=function(){var j=document.getElementById(p+'-'+i);j.style.visibility='visible';
		j.trueArea=[this.ImgRef.oriWidth,this.ImgRef.oriHeight,s];}}

		this.Img(s,x,y,z,w,h,i,p);document.getElementById(p+'-'+i).style.visibility='hidden';}

	this.Text=function(i,text,p){p=p||this.DOMRef.id+'-'+i;var jDOM=document.createElement('p');jDOM.innerHTML=text;
		jDOM.style.color='#F0F0DF';jDOM.style.position='inherit';jDOM.style.fontSize='inherit';jDOM.style.left='17%';
		jDOM.style.fontFamily=_Fnt1;jDOM.id=this.DOMRef.id+'-'+'t-'+i;
		document.getElementById(p).appendChild(jDOM);return jDOM;}

	this.Remove=function(x){var jDOM=document.getElementById(x);jDOM.parentNode.removeChild(jDOM);}
	this.ResetDOM=function(){while(this.DOMRef.firstChild){this.DOMRef.removeChild(this.DOMRef.firstChild);}}
	this.ResetLoop=function(notToBeReset){
		notToBeReset=notToBeReset||'';
		this.Animat.DummyPause=[];for(var i in this.Animat.hello){
			if(!(i==notToBeReset)){WrapperRef.Cancel(i);}}}}

/*This one will be useful*/function AppendToWrapper(x){ReturnTheCurrentWrapper().appendChild(x);}
	function ReturnTheCurrentWrapper(){return document.getElementById(WrapperRef.IdRef);}
	

/*Random generator based on previous random. More entropy!!*/
	var _Random={Pool:[RetRandom(0,9),RetRandom(10,99),RetRandom(99,999)],Seed:(RetRandom(0,1000)),
		Between:function(min,max){
			var Nn=(_Random.Pool[0]+_Random.Pool[1]+_Random.Pool[2])/
				(_Random.Pool[2]+_Random.Pool[1]+_Random.Pool[0]+_Random.Seed);

			_Random.Pool[3]=Math.floor(Nn*1000);_Random.Pool.shift();_Random.Pool[0]%=10;_Random.Pool[1]%=100;

			_Random.Seed=RetRandom(0,_Random.Pool[2]);Nn=Math.floor(Nn*(max-min+1)+min);return Nn;	
		},};

console.log(_Random.Between(10,140));