/**/function Defend(x,y){x.Clock.Add(function(){_standardBanner(x,'DEFEND');x.Statuses.Defend=true;});}

	function _RowChange(x){

		if(x.Statuses.Row=='middle'){
			x.Clock.CicleFor(15,()=>{x.spriteRef.move(0.5,0);});
			x.Clock.Add(function(){x.Statuses.Row='back';});
		}else{
			x.Clock.CicleFor(15,()=>{x.spriteRef.move(-0.5,0);});
			x.Clock.Add(function(){x.Statuses.Row='middle';});
		}
	}

	function Fight(x,y){//y must be an array, so multiselection won't be a bitch.
		for(var target in y){
			/*+++++++++++++ Check it! ++++++++++++++*/
			if(y[target]){AttackTarget(x,y[target]);}
		}
	}
/**/


/**/function FlickerAnimation(actor){

		actor.Clock.CicleFor(2,()=>{
			actor.Clock.Add(()=>{actor.DOM.Ref.style.visibility='hidden';});
			actor.Clock.PauseFor(4);
			actor.Clock.Add(()=>{actor.DOM.Ref.style.visibility='visible';});
			actor.Clock.PauseFor(4);
		});
	}
/**/


/**/function _KillActor(x){

	//----------------------------------------------------------------------------------------------------------------------+
	x.DeathAni(x);

	x.Clock.Add(()=>{
		RemovePlayerFromArray(x,ActionStack);
		x.Statuses.Dead=true;
		x.BattleStatus='Charging';
		if(ReturnTopMenu()==_Target_Menu){RemoveMenuFromStack();}

		if(!x.Enemy){
			RemovePlayerFromArray(PlayerPool.thegood.indexOf(x),PlayerPool._aliveG);
			PlayerATBDOMEmpty(x.ATBobj);
			
			if(ReturnCurrentPlayer()==x){_RemovePlayerFromStack();}else{RemovePlayerFromArray(x,TurnStack);}

			
		}else{
			RemovePlayerFromArray(x,EnemyStack);
			RemovePlayerFromArray(PlayerPool.thebads.indexOf(x),PlayerPool._aliveB);
			SetEnemysNames();
		}
	});
	}


	function RaiseCommandVerifier(x,arrtrg){for(var i in arrtrg){_RaiseActor(x,arrtrg[i]);}}

	function _RaiseActor(x,target){

		var leftY=PlayerPool.thegood[0].DOM.Ref.offsetLeft;
		var topX=PlayerPool.thegood[0].DOM.Ref.offsetTop+(PlayerPool.thegood[0].DOM.Ref.offsetHeight*2/3);

		PlayerPool._aliveG.push(PlayerPool.thegood.indexOf(target));
		
		target.Clock.Add(()=>{
			FallenStar(target,leftY,topX,'',()=>{
				target.Stats.lif=1;
				target.Statuses.Dead=false;
				target.DOM.Ref.firstChild.style.visibility='visible';
			});
		});
	}
/**/
