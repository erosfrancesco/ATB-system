/*Some SVG definitions and headers*/

	var _Default_Punch_Color1='red';

	var _Default_Punch_dx=20;
	var _Default_Punch_dy=20;


	function HalfPunchPath(width,height,fill){
		width=width||5;
		height=height||5;
		fill=fill||'red';

		var s=ReturnViewBoxSVG(width,height);
		var p=CreateNS('path');
		s.firstChild.appendChild(p);

		//this is set for 64x64 grid. Crud
		var string='M0 32 \
		L18 32 \
		C18 14 46 14 46 32 \
		L64 32 \
		C38 30 48 16 58 6 \
		C46 18 34 20 32 0 \
		C28 16 24 22 6 6 \
		C26 26 16 32 0 32';


		p.setAttributeNS(null,'d',string+'');

		p.style.fill=fill;
		return s;
	}

/*--------------------------------*/


/**/function CreateDefaultPunch(height){
	
	var s=HalfPunchPath(height,height);
	s.style.position='absolute';

	var j=HalfPunchPath('100%','100%');
	j.style.position='absolute';
	j.style.top='0%';
	j.style.left='0%';
	j.style.transformOrigin='center top';
	s.appendChild(j);

	Rotate(j.style,180);
	return s;
	}




/**/