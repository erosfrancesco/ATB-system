function CreateEclipse(width,height,backcolor){
	
	var wrapp=document.createElement('div');
	wrapp.style.width=width;
	wrapp.style.height=height;
	/*wrapp.style.background='radial-gradient(ellipse at center, rgba(255,255,255,1) 0%,'+
		'rgba(122,22,122,1) 50%,'+
		'rgba(0,0,0,0) 65%)';/**/

	var down=CreateHalfEclipse(backcolor);
	var up=CreateHalfEclipse(backcolor);
	down.style.float='top';
	Rotate(up.style,180);

	wrapp.appendChild(down);
	wrapp.appendChild(up);/**/

	return wrapp;
}

function CreateHalfEclipse(backcolor){
	backcolor=backcolor||'grey';
	var d=document.createElement('div');
	d.style.width='100%';
	d.style.height='50%';
	d.style.background=backcolor;
	d.style.borderRadius='50% 50% 0 0/ 100% 100% 0% 0%';
	d.style.margin='-1px';
	return d;
}