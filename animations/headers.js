/**/function CreateNS(obj){return document.createElementNS('http://www.w3.org/2000/svg',obj);}

	function ReturnViewBoxSVG(width,height){
		var parwrapper=document.createElement('div');
		parwrapper.style.width=width;
		parwrapper.style.height=height;
		parwrapper.className='absol';

		var SVGWrapper=CreateNS('svg');
		parwrapper.appendChild(SVGWrapper);
		SVGWrapper.style.backgroundColor='transparent';
		SVGWrapper.className='absol expandsize'; // this one doesn't work

		SVGWrapper.style.width='100%'; // the expandsize class doesn't work
		SVGWrapper.style.height='100%';/**/

		SVGWrapper.setAttributeNS(null,'viewBox','0 0 100 100');
		SVGWrapper.setAttributeNS(null,'preserveAspectRatio','none');

		return parwrapper;
	}

	function SetSVGDefsContainer(){
		var SVG=CreateNS('svg');
		SVG.id='SVGDefs-Container';
		var def=CreateNS('defs');
		SVG.appendChild(def);
		document.body.appendChild(SVG); // Don't think that the wrapper here is crucial...
										// but whatever, body works well for now
	}

	function LoadSVGObject(x){document.getElementById('SVGDefs-Container').appendChild(x);}


/*Some functions*/function MoveInDirection(obj,x,y){ //this smell of bug. Check when number is decimal...
	//x=x||0;
	//y=y||0;
	//console.log(x);
	obj.style.top=obj.offsetTop+y;
	obj.style.left=obj.offsetLeft+x;
	}

	function MoveBackgroundOf(obj,x,y){
		x=x||0;
		y=y||0;
		obj.childNodes[0].style.top=obj.childNodes[0].offsetTop+y;
		obj.childNodes[0].style.left=obj.childNodes[0].offsetLeft+x;
	}

	function CompressBy(obj,x,y){
		x=x||0;
		y=y||0;
		obj.childNodes[0].style.height=obj.childNodes[0].offsetHeight+y;
		obj.childNodes[0].style.width=obj.childNodes[0].offsetWidth+x;
	}


/*Parent wrapper of animation*/function SetAnimationParentWrapper(player,parent){

	player.AnimationRef=document.createElement('div');
	player.AnimationRef.className='BackgroundWrapper expandsize';
	parent.appendChild(player.AnimationRef);
	}

/*Wrapper of animation object.*/function CreateCssAnimationWrapper(wid,hei,x,y,z){
	wid=wid||100;
	hei=hei||100;
	x=x||0;
	y=y||0;
	z=z||0;
	var s=document.createElement('div');
	s.className='AnimationWrapper absol';
	s.style.top=y;
	s.style.left=x;
	s.style.width=wid;
	s.style.height=hei;
	s.style.zIndex=z;
	return s;
	}

/*Particle object*/function SimpleParticleCss(wid,hei,x,y,color){
	x=x||0;
	y=y||0;
	wid=wid||100;
	hei=hei||100;
	color=color||'black';	
	var s=document.createElement('div');
	s.className='Particle';
	s.style.top=y;
	s.style.left=x;
	s.style.width=wid;
	s.style.height=hei;
	s.style.background=color;
	return s;
	}

	function ParticleCssDiv(wid,hei,x,y,z,color){
		wid=wid||100;
		hei=hei||100;
		x=x||0;
		y=y||0;
		z=z||0;
		color=color||'black';
		var wrapp=CreateCssAnimationWrapper(wid,hei,x,y,z);
		var s=SimpleParticleCss(wid,hei,0,0,color);
		wrapp.appendChild(s);
		return wrapp;
	}
/**/

/**/SetSVGDefsContainer();