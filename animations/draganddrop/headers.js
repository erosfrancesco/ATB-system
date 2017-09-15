/*Some SVG definitions and headers*/
	var _Default_Punch_Color1='red';
	var _Default_Path_String='';
	var _Default_Width_Wrapper=400;
	var _Default_Height_Wrapper=400;
/*--------------------------------*/

/**/function CreateWrapper(){
	var s=document.createElement('div');
	s.style.width=_Default_Width_Wrapper+'px';
	s.style.height=_Default_Height_Wrapper+'px';
	s.className='Wrapp';
	s.id='Wrapper';
	document.body.appendChild(s);
	}

	CreateWrapper();


/**/function CreateDefaultSVGPath(height,string){
	var s=ReturnViewBoxSVG(100,100);
	var p=CreateNS('path');
	s.style.position='absolute';
	s.style.right='0%';
	s.firstChild.appendChild(p);
	p.setAttributeNS(null,'d',string);
	p.style.fill=_Default_Punch_Color1;
	p.id='DefaultSVGPath';
	return s;
	}
/**/

/**/function ReturnViewBoxSVG(width,height){
	var parwrapper=document.createElement('div');
	parwrapper.style.width=width;
	parwrapper.style.height=height;

	parwrapper.className='Tumbrl';

	var SVGWrapper=CreateNS('svg');
	parwrapper.appendChild(SVGWrapper);
	SVGWrapper.style.backgroundColor='transparent';
	SVGWrapper.className='asbol expandsize';

	SVGWrapper.setAttributeNS(null,'viewBox','0 0 100 100');
	SVGWrapper.setAttributeNS(null,'preserveAspectRatio','none');
	return parwrapper;
	}

	function CreateNS(obj){return document.createElementNS('http://www.w3.org/2000/svg',obj);}
/**/

/**/function refreshSVGPath(string){document.getElementById('DefaultSVGPath').setAttributeNS(null,'d',string);}

	function create_Position_Point(type){
		var s=create_draggable_point_dot();
		var n=point_Ref.length;
		s.id=n;
		document.getElementById('Wrapper').appendChild(s);
		
		point_Ref[n]={DOM:s,type:type,x:s.offsetLeft,y:s.offsetTop};
		s.innerHTML=type;

		set_drag_drop(s,(s)=>{
			point_Ref[s.id].x= (s.offsetLeft * 100 / _Default_Width_Wrapper);
			point_Ref[s.id].y= (s.offsetTop * 100 /_Default_Height_Wrapper);
			_Refresh_Path_Template();
		});
	}
/**/

/**/function ReturnIndexOf(s){
	var d;
	point_Ref.forEach((point, indx)=>{
		if(point.DOM==s){d=indx;}
	});
	return d;
	}



/**/function setPathString(){
	_Default_Path_String='';
	point_Ref.forEach( (point)=>{set_string_with_point(point);} );
	}

	function set_string_with_point(point){
		//var p=point.x+' '+point.y+' ';
		if( (point.type == 'M') || (point.type == 'C') || (point.type == 'L') ){_Default_Path_String+=point.type;}
		
		_Default_Path_String+=Math.floor(point.x)+' ';
		_Default_Path_String+=Math.floor(point.y)+' ';

	}


/**/function _Refresh_Path_Template(){
	setPathString();
	refreshSVGPath(_Default_Path_String);
	document.getElementById('displaySVG').innerHTML=_Default_Path_String;
	}



