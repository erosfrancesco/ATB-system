/**/function _LoadBattleFromObject(battleObj){

	BackgroundBattle(battleObj.BackgroundSprite);
		
	for(var obj in battleObj.Players){

		var player=_LoadActorObject(battleObj.Players[obj]);
		_DrawAPlayer(player);
		player.spriteRef.posit(battleObj.Players[obj].x,battleObj.Players[obj].y);

		if(battleObj.Players[obj].entrance){battleObj.Players[obj].entrance(player);}

	}


	for(var obj in battleObj.Enemys){

		var enemy=_LoadActorObject(battleObj.Enemys[obj]);
		_DrawAnEnemy(enemy);
		enemy.spriteRef.posit(battleObj.Enemys[obj].x,battleObj.Enemys[obj].y);

		if(battleObj.Enemys[obj].entrance){battleObj.Enemys[obj].entrance(enemy);}
		
	}

	_SetPreBattle();
	InitEnemysLoop();
	
	}


	function _LoadActorObject(obj){
		
		var actor=deepClone(obj.gen);
		if(obj.mods){_MergeOptionalMods(actor,obj.mods);}
		actor.BattleStatus='Charging';
		return actor;
	}


	function _MergeOptionalMods(actor,mods){

		for(var mod in mods){
			if( (typeof (mods[mod])) === 'object'){
				_MergeOptionalMods(actor[mod],mods[mod]);
			}else{
				actor[mod]=mods[mod];
			}
		}
	}


/**/function _SetPreBattle(){
	LoadInitialMenus();

	PlayerPool.thegood.forEach(function(p,indx){SetATBof(p,(indx*100/PlayerPool.thegood.length));});

	var s=document.createElement('div');
	s.className='EnemyShowName';
	s.innerHTML=0;
	MenuStack[0].DOM.Ref.firstChild.appendChild(s);

	SetEnemysNames();

	PhaseLoop('MenuInput',function(){InputFrom(ReturnTopMenu().Input,6);});
	
	//this phase should be checked with a bool
	PhaseLoop('TurnCheckLoop',function(){
		ActiveTimeFlowLoop();
		ActionCheckLoop();
		MenuCheckLoop(ReturnCurrentPlayer());
	});
}
