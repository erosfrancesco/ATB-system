/*Action loading and endPhase*/
	var IsGraphicReady=true;
	var _Time_Flow_Is_Active=true;// _Time_Flow_Is_Active could stop the battle time and execute only animation when needed

/*This is the main loop for actions*/function ActionCheckLoop(){
	// If all player have the Clock empty, IsGraphicReady is set to true, else it will be set to false.
	// When the IsGraphicReady is true, check if a command should be loaded; if is set to false execute the animations
	IsGraphicReady=true;
	PlayerPool.execute_for_every_alive(ExecuteCodeOf);

	// if _Time_Flow_Is_Active is false : update time only. Players can't execute actions or load commands
	if( (IsGraphicReady) && (ActionStack[0])  && _Time_Flow_Is_Active){
		LoadFirstCommand();
		IsGraphicReady=false;
	}
	}

	function ExecuteCodeOf(player){

		if(player.Clock.Pool.length==0){
			IsGraphicReady=IsGraphicReady && true;
		}else{
			player.Clock.Run();
			IsGraphicReady=false;
		}
	}

	function LoadFirstCommand(){
		if(ActionStack[0].Clock.Pool.length==0){
			ResolveActionTurnOf(ActionStack[0]); // a turn is executed. At the end of the turn the conditions are evaluated
		}
	}
/**/


/*This function execute the Clocks.*/function ResolveActionTurnOf(actor){
	
	if(actor.IsGoingTo.length>0){
			ExecuteThisAction(actor.IsGoingTo[0]);
			actor.IsGoingTo.shift();
	}else{
			actor.Clock.Add(()=>{
				_EndPhaseOf(actor); // this is defined in battle_Headers
			});
	}
		//Here must go the damage calculations etc...
		//should check reflect too
		AfterCommandPhase();
	}

	function ExecuteThisAction(actionobj){
		ActionStack[0].Clock.Add(()=>{
			//---------------------------------------------- maybe this is where the action miss rate will be calculated------
			actionobj.Cmd(ActionStack[0],RefactorTargets(actionobj.Trg));
		});
	}

	function AfterCommandPhase(){PlayerPool.execute_for_every_alive(ResolveEffectsOf);}

	//++++++++++++++++++++++++++++++++++++++++++This function is very crucial++++++++++++++++++++++++++++++++++++++++++++++++
	function ResolveEffectsOf(player){/*Or. in layman's terms, this is where the damages are calculated, folks.*/
		if(player){

			while(player.damages[0]){ // Evaluate damages
				CheckDmgForPlayer(player); // this is defined in damage headers
				player.damages.shift();
			}

			if(!player.Enemy){RefreshATBOf(player);} //+++++++++++++++++++++++++++++++++++++++++++++++++++++Check ATB Refresh
			if(player.Stats.lif<=0){_KillActor(player);} //+++++++++++++++++++++++++++++++++++++Check Actors Death and stuffs
			
			_Game_Condition_Check();//+++++++++++++++++++++++++++++++++++++++++++++++++++++Check game over and win conditions
		}
	}

	function _Game_Condition_Check(){
		if(PlayerPool._aliveG.length>0){
			if(PlayerPool._aliveB.length<=0){console.log('You win!');}
		}else{console.log('Game over, man.');}
	}
/**/
