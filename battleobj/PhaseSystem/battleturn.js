/**/function TurnPhaseInit(player){//set up the battle menu.
	player=player||ReturnCurrentPlayer();

	player.Command=[];
	player.Target='';
	_SetupBattleMenuWith(player.Commands);
	AddMenuToStack(_Battle_Menu);
	}

	function _CheckIfThereAreMoreActionsFor(P){

		while(MenuStack.length>2){RemoveMenuFromStack();}//reset the menus in any case...
		if(P.IsGoingTo.length>=P.ActionForTurn){// if there aren't any actions to be done...
		
			P.ATBobj.Name.style.color='#D2D2D2';
			ActionStack.push(P);
			_RemovePlayerFromStack();
		
		}//end menu phase of player
	}
/**/


/*This is the loop for menu, selection etc*/function MenuCheckLoop(player){
	if((player)&&(player.BattleStatus=='Ready')){
		player.BattleStatus='Performing';
		player.Statuses.Defend=false;
		player.ATBobj.Name.style.color='yellow';
		TurnPhaseInit();
	}
}
