/*Background for battle*/function BackgroundBattle(sprite){
	var backDiv=_CreateResizableSprite(sprite,0,0,_Ass.BackPath);
	backDiv.id='ThisBackground';
	backDiv.style.width='100%';
	backDiv.style.height='67%';

	var filter=document.createElement('div');
	filter.className='absol expandsize';
	filter.zIndex=1;

	filter.rValue=0;
	filter.gValue=0;
	filter.bValue=0;
	filter.aValue=0;

	filter.compute=function(){

		filter.style.backgroundColor='rgb('+
			filter.rValue.toString(16)+', '+
			filter.gValue.toString(16)+', '+
			filter.bValue.toString(16)+')';

		filter.style.opacity=filter.aValue;
	}

	filter.reset=function(){
		filter.rValue=0;
		filter.gValue=0;
		filter.bValue=0;
		filter.aValue=0;
		filter.compute();
	}

	backDiv.appendChild(filter);/**/


	ReturnCurrentWrapper().appendChild(backDiv);
	PlayerPool.Background={DOM:{Ref:backDiv,Filter:filter}};
	if(sprite.initBackground){sprite.initBackground();}
}


/**/var BackgroundNullSprite={
	src:'',
	framn:[1,1],
	width:'100%',
	height:'67%',
	initBackground:function(){SetFFVChaosPlanetarium();}
	
};