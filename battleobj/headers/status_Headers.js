/*Approxymately every real-time second, a function is called on every Counters of every actors*/
/*That is, if the actor hasn't stop status. That one is checked in the turn loop*/

	function _CounterStatus(seconds,callback){

		this.Clock=new Buttler();
		this._pTimer=0;
		this.Count=0;
		this.Seconds=seconds;
		this.SecondCounter=0;
		this.Callback=callback;

	}

	_countersValidator=function(actor){

		for(var status in actor.Counters){

			if(actor.Statuses[status]){ // if the status is active in this player
				_timerLoopCounters(actor,status,actor.Counters[status].Callback);
			}

		}

	}

	_timerLoopCounters=function(actor,status,callback){

		if(actor.Counters[status].SecondCounter>16){
			actor.Counters[status].SecondCounter=0;
			_every16Loops(actor,status,callback);
		}else{
			actor.Counters[status].SecondCounter++;
		}
	}

	_every16Loops=function(actor,status,callback){

		console.log();
		if(actor.Counters[status].Count>255){actor.Counters[status].Count-=256;callback(actor);}else{
			
			var _value;
			if(actor.Statuses.Haste){
				_value=84;
			}else{
				if(actor.Statuses.Slow){
					_value=32;
				}else{
					_value=64;
				}
			}

			actor.Counters[status].Count+=_value;
		}
	}
/*-----------------------------------------------------------------------------------------------*/

/**/function _giveAlteredStatus(actor,status,callback){
	//if( (!actor.ImmuneTo[status]) && (!actor.Statuses[status]))//Binary logic
		if( !( actor.ImmuneTo[status] || actor.Statuses[status]) ){
			actor.Statuses[status]=true;callback(actor);
		}
	}

	function _removeAlteredStatus(actor,status,callback){
		if(actor.Statuses[status]){//maybe some other control here, but for now is enough...
			actor.Statuses[status]=false;
			callback(actor);
		}
	}

/**/function _giveStopStatus(actor){_giveAlteredStatus(actor,'Stop',()=>{actor.Counters.Stop._pTimer=0;});}
	function _removeStopStatus(actor){_removeAlteredStatus(actor,'Stop',()=>{actor.Counters.Stop._pTimer=0;});}
	function _callbackStopStatus(actor){
		actor.Counters.Stop._pTimer++;
		console.log('Still stopped');
		if(actor.Counters.Stop._pTimer>actor.Counters.Stop.Seconds){_removeStopStatus(actor);}
	}


/**/function _giveRegenStatus(actor){_giveAlteredStatus(actor,'Regen',()=>{actor.Counters.Regen._pTimer=0;});}
	function _removeRegenStatus(actor){_removeAlteredStatus(actor,'Regen',()=>{actor.Counters.Regen._pTimer=0;});}
	function _callbackRegenStatus(actor){

		//2 / 8 chance
		if(CasualProb(25)){
			var regen={		
					value: -(Math.floor(actor.Stats.mlif/32)+1),
					type:'c',			
			};
			InflictDamage(actor,regen);
		}

		actor.Counters.Regen._pTimer++;
		if(actor.Counters.Regen._pTimer>actor.Counters.Regen.Seconds){_removeRegenStatus(actor);}

	}


/**/function _givePoisonStatus(actor){_giveAlteredStatus(actor,'Poison',()=>{actor.Counters.Poison._pTimer=0;});}
	function _removePoisonStatus(actor){_removeAlteredStatus(actor,'Poison',()=>{actor.Counters.Poison._pTimer=0;});}
	function _callbackPoisonStatus(actor){

		//1 / 8 chance, approx
		if(CasualProb(13)){
			var poison={		
					value: Math.floor(actor.Stats.mlif/32)+1,
					type:'p',
					attr:'P'
			};
			InflictDamage(actor,poison);
		}

		actor.Counters.Poison._pTimer++;
		if(actor.Counters.Poison._pTimer>actor.Counters.Poison.Seconds){_removePoisonStatus(actor);}
	}


/**/function _giveReflexStatus(actor){_giveAlteredStatus(actor,'Reflex',()=>{actor.Counters.Reflex._pTimer=0;});}
	function _removeReflexStatus(actor){_removeAlteredStatus(actor,'Reflex',()=>{actor.Counters.Reflex._pTimer=0;});}
	function _callbackReflexStatus(actor){
		actor.Counters.Reflex._pTimer++;
		if(actor.Counters.Reflex._pTimer>actor.Counters.Reflex.Seconds){_removeReflexStatus(actor);}
	}


/**/function _giveDoomStatus(actor){_giveAlteredStatus(actor,'Doom',()=>{_appendDoomCounterTo(actor,15);});}
	function _removeDoomStatus(actor){_removeAlteredStatus(actor,'Doom',()=>{RemoveDOM(actor.DOM.DoomCounter);});}
	function _callbackDoomStatus(actor){

		if(actor.DOM.DoomCounter.innerHTML > 0){
			actor.DOM.DoomCounter.innerHTML--;
		}else{
			console.log('Doom!');
			//-----------------------------++++++++++++++++++++++++++++++++++++++++++++++++----------------------------
			_removeDoomStatus(actor);
		}
		
	}

	function _appendDoomCounterTo(actor,num){
		var s=document.createElement('div');
		s.className='menulist1';
		
		//---------------------------------------------------------
		s.style.width='2em';
		s.style.height='2em';
		s.style.top='-1em'
		s.style.left='0.5em'

		s.innerHTML=num;
		actor.DOM.Ref.appendChild(s);
		actor.DOM.DoomCounter=s;
	}


/**/function _giveSleepStatus(actor){_giveAlteredStatus(actor,'Sleep',()=>{actor.Counters.Sleep._pTimer=0;});}
	function _removeSleepStatus(actor){_removeAlteredStatus(actor,'Sleep',()=>{actor.Counters.Sleep._pTimer=0;});}
	function _callbackSleepStatus(actor){

		actor.Counters.Sleep._pTimer++;
		console.log('Sleeping');
		if(actor.Counters.Sleep._pTimer>actor.Counters.Sleep.Seconds){_removeSleepStatus(actor);}
		
	}
