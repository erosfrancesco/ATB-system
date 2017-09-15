/*ATB increment:

-For characters:

	Normal:(96 * (Speed + 20)) / 16

	Hasted:(126 * (Speed + 20)) / 16

	Slowed:(48 * (Speed + 20)) / 16



-For monsters: // nope, not anymore

	Normal speed:((96 * (Speed + 20)) * (255 - ((Battle Speed - 1) * 24))) / 16

	Hasted:((126 * (Speed + 20)) * (255 - ((Battle Speed - 1) * 24))) / 16

	Slowed:((48 * (Speed + 20)) * (255 - ((Battle Speed - 1) * 24))) / 16

//patched:
-For monsters:
	(same steps for characters) + Battle_Speed


*/

var Battle_Speed=10; // this should be set at the beginning of the battle, based on the most fastest good and slowest bad


/**/function ActiveTimeFlowLoop(){PlayerPool.execute_for_every_alive(ABTBasicLoopFor);}

	function ABTBasicLoopFor(actor){
		if(actor.Statuses.Stop){//status stop checks
			_timerLoopCounters(actor,'Stop',_callbackStopStatus);
		}else{
			UpdateATBOf(actor);
			_countersValidator(actor);
		}
	}
/**/

/**/function UpdateATBOf(actor){//BattleStatus=['Charging','Ready','Performing','Waiting',]

	if(actor&&actor.BattleStatus=='Charging'){
		
		actor.ATBobj.Value+=IncrementATBOf(actor);

		if(actor.ATBobj.Value>(_ATBMAX-1)){
			actor.ATBobj.Value=_ATBMAX;

			/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
			if(_Time_Flow_Is_Active){
				if(actor.Enemy){
					EnemyStack.push(actor);
				}else{
					ATBToggleFull(actor.ATBobj);
					TurnStack.push(actor);
				}
				actor.BattleStatus='Ready';
			}
			/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
			
		}

		if(!actor.Enemy){ATBUpdateDOM(actor.ATBobj);}
		
	}
	}

	function IncrementATBOf(actor){
		var s=returnVelof(actor)+20;
		
		if(actor.Statuses.Slow){
			s*=3;
		}else{
			if(actor.Statuses.Haste){
				s*=8;
			}else{
				s+=6;
			}
		}

		if(actor.Enemy){s+=(Battle_Speed-1);}

		return s;

	}
/**/