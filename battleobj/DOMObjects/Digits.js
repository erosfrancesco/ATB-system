/*These two functions should be placed in some headers*/
	function getDigit(number, n) {return Math.floor((number / (10** (n - 1))) % 10);}
	function MoveObjectOf(obj, dx, dy){obj.style.top=obj.offsetTop+dy;obj.style.left=obj.offsetLeft+dx;}
/*----------------------------------------------------*/

/**/function LoadNumberDisplayOf(player){
	var i=0;
	var area=_S.hei/(800/25);

	player.DOM.Numdisplay=document.createElement('div');
	player.DOM.Numdisplay.className='numberdisplay'; /* absol class can't be used there */
	player.DOM.Numdisplay.style.zIndex=9;
	ReturnCurrentWrapper().appendChild(player.DOM.Numdisplay);

	while(i<4){
		var s=document.createElement('div');
		s.style.position='absolute';
		s.style.left= i*area+'px';
		s.style.width=area+'px';
		s.style.height=area+'px';
		player.DOM.Numdisplay.appendChild(s);
		i++;
	}
	
	SetVisibilityDisplayOf(player,'hidden');
	PositNumberDisplayOf(player);
	}

	function PositNumberDisplayOf(player){//should be executed when a player change its position
	
		var leftPos=player.DOM.Ref.offsetLeft;
		var topPos=player.DOM.Ref.offsetTop;
		leftPos+=(player.DOM.Ref.offsetWidth/2);
		topPos+=(player.DOM.Ref.offsetHeight/2);

		leftPos-= _S.wid/20;
		/*
		if(player.Enemy){
		}else{
		}
		/**/
		player.DOM.Numdisplay.style.left=leftPos;
		player.DOM.Numdisplay.style.top=topPos;
	}
/**/

/*This function should be placed somewhere else*/function AnimateDisplayNumberOf(actor,num){

		actor.Clock.Add(function(){SetDisplayOfWithNumber(actor,num);});
		var i=8;
		while(i){		
			actor.Clock.Add(function(){			
				actor.DOM.Numdisplay.childNodes.forEach((digit, indx)=>{
					if(digit.offsetTop<8){MoveObjectOf(digit, 0, 4);}
				});
			});
			i--;
		}

		actor.Clock.PauseFor();
		actor.Clock.Add(function(){SetVisibilityDisplayOf(actor,'hidden');});
	}
/**/

/**/function SetDisplayOfWithNumber(actor,num){
	SetVisibilityDisplayOf(actor);
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	if(num<0){actor.DOM.Numdisplay.style.color='green';num= -num;}else{actor.DOM.Numdisplay.style.color='#D2D2D2';}
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	SetDisplayWithNumber(actor.DOM.Numdisplay,num);
	actor.DOM.Numdisplay.childNodes.forEach((digit, indx)=>{MoveObjectOf(digit, 0, -20+(4*indx));});
	}

	function SetVisibilityDisplayOf(actor,value){value=value||'visible';actor.DOM.Numdisplay.style.visibility=value;}

	function SetDisplayWithNumber(display,val){
		if(val){//if val is not zero
			display.childNodes.forEach((digit, indx)=>{
				digit.innerHTML='';
				if( (val/(10**(display.childNodes.length-indx-1))) >= 1){
					digit.innerHTML=getDigit(val,(display.childNodes.length-indx));
				}
			});
		}else{display.lastChild.innerHTML='0';}
	}
/**/