/**/var TurnStack=[];//players stack
	var EnemyStack=[];//enemys stack
	var ActionStack=[];//actions stack

	function ReturnCurrentPlayer(){return TurnStack[0];}
	function ReturnBackground(){return document.getElementById('ThisBackground');}
/**/

/**/function returnVelof(P){

	var velocity=P.Stats.vel+P.Bonuses.vel;
	var weight=0;
	P.armz.forEach((hand)=>{
		if(hand.item&&hand.item.weight){weight+=hand.item.weight;}
	});
	//do that to head, armor and etc...
	velocity-=Math.floor((weight/8));
	return velocity;
	
	}

	function returnAtkof(P){

		var attack=(P.Stats.atk+P.Bonuses.atk);
		P.armz.forEach((hand)=>{
			if(hand.item&&hand.item.bonusatk){attack+=hand.item.bonusatk;}
		});

		return attack;
	}

	function returnDefof(P){

		var defense=(P.Stats.def+P.Bonuses.def);
		P.armz.forEach((hand)=>{
			if(hand.item&&hand.item.bonusdef){defense+=hand.item.bonusdef;}
		});
		//do that for armor, heads and stuffs...
		return defense;
	}

	function returnMagof(P){
		return P.Stats.mag;
	}

	function returnManof(P){
		return P.Stats.man;
	}
/**/


/**/function _SetupBattleMenuWith(P_Com){//for estetic purpose, the battle menu should always have 4 slots.
	_Battle_Menu.Objects=[];
	var indx=0;

	P_Com.forEach((command) => {
		_Battle_Menu.Objects.push(command);
		if(command.txt==C_ITEMS.txt){indx=_Battle_Menu.Objects.indexOf(command);}
	});
	
	while(_Battle_Menu.Objects.length<4){_Battle_Menu.Objects.push(C_NULL);}

	//if items is not the last command, move it to the last slot. If its index is 0 then it's the only one, so no big deal.
	if(indx>0){_Battle_Menu.Objects.splice(3, 0, _Battle_Menu.Objects.splice(indx, 1)[0]);}
	
	}
/**/

/**/function _RemovePlayerFromStack(){
	ReturnCurrentPlayer().BattleStatus='Waiting';
	TurnStack.shift();
	RemoveCursor();
	MenuStack.forEach((menu)=>{
		menu.CursorPosition=0;
		RemoveMenuFromStack();
	});
}


/**/function _SetupTargetMenuWith(P_Arr){
	_Target_Menu.Objects=[];
	P_Arr.forEach(function(actor){_Target_Menu.Objects.push(actor);})
	AddMenuToStack(_Target_Menu);
	}
/**/


/**/function _EndPhaseOf(actor){
	//console.log(actor.BattleStatus,actor.Name);
	//console.log(actor.Name+' Has done its deeds');
	ActionStack.shift();
	ATBToggleEmpty(actor.ATBobj);
	if(!actor.Enemy){
		_Target_Menu.CursorPosition='';
		PlayerATBDOMEmpty(actor.ATBobj);
	}else{
		EnemyStack.shift();
	}
	actor.BattleStatus='Charging';
	}
/**/