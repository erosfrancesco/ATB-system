/**/function LoadATBDOM(){
	var atb=document.createElement('div');
	atb.className='ATBbar absol';	
	var nam=document.createElement('div');
	atb.appendChild(nam);		
	var lif=document.createElement('div');
	atb.appendChild(lif);
	var bar=document.createElement('div');		
	atb.appendChild(bar);

	var barel1=document.createElement('div');
	bar.appendChild(barel1);

	var barel2=document.createElement('div');
	bar.appendChild(barel2);

	var barel3=document.createElement('div');
	barel2.appendChild(barel3);

	return {
		DOMPar : atb,
		Name : nam,
		Stats : lif,
		Slide : barel2,
		Value : 0
	};
	}

/**/function SetATBof(actor,t){
	t=t||0;
	actor.ATBobj=LoadATBDOM();
	actor.ATBobj.DOMPar.style.top='calc('+t+'% + 5px)';
	actor.ATBobj.Name.innerHTML=actor.Name;
	RefreshATBOf(actor);

	_Init_Menu.DOM.Ref.appendChild(actor.ATBobj.DOMPar);
	}

	function RefreshATBOf(player){player.ATBobj.Stats.innerHTML=player.Stats.lif+'/'+player.Stats.man;}
/**/

/**/function ATBToggleFull(ATBobj){
	ATBobj.Slide.style.background='green';
	}

	function ATBToggleEmpty(ATBobj){
		ATBobj.Value=0;
	}

	function PlayerATBDOMEmpty(ATBobj){
		ATBobj.Slide.style.background='transparent';
		ATBUpdateDOM(ATBobj);
	}

	function ATBUpdateDOM(ATBobj){
		ATBobj.Slide.style.width=(ATBobj.Value*100/_ATBMAX)+'%';
	}
	
	function returnATBvalueOf(P){
		return P.ATBobj.Value;
	}
/**/