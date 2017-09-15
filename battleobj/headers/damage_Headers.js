/*
	DamageObject={
		type:'p' / 'm'
		attr:'fire' / 'water' / 'hearth' / 'ice' / 'cure' ... 'perf' / 'blunt' / 'slash'
		notCounterable:true / false
		notReflectable:true / false
		ignoreDef:true / false
	};

*/


/**/function InflictDamage(actor, dmg){
	actor.damages.push(dmg);
	}

	function CheckDmgForPlayer(player){//Let's check the damage before applying it.

		var damage=player.damages[0];
		var _damage_value=AttributeDamageCheck(player,damage);

		if(damage.type=='p'){
			if(player.Statuses.Sleep){console.log('Wake up!');_removeSleepStatus(player);}
			
			if(player.Statuses.Row=='back'){_damage_value=Math.floor(_damage_value/2);}
			if(player.Statuses.Defend){_damage_value=Math.floor(_damage_value/2);}
		}

		if(damage.type=='m'){
			console.log('Magical Dmg');
		}

		
		_ModifyLifeOf(player,_damage_value);

		CounterCheck(player,damage);//Counter check-------------------------------------------------------------------------

	}


/**/function AttributeDamageCheck(actor,damage){
		var s=damage.value;
		if(s<0){console.log('Check it out!');s=0;}else{s*=actor.Modifier(damage.attr);}
		
		return s;
	}


	function _ModifyLifeOf(actor,val){

		AnimateDisplayNumberOf(actor,val);//and display the damage/cure number animation
		actor.Stats.lif-=val;//subtract life to player.

		var maxl=actor.statRet('mlif');
		if(actor.Stats.lif<0){actor.Stats.lif=0;}//life rounding
		if(actor.Stats.lif>maxl){actor.Stats.lif=maxl;}
	}


	function CounterCheck(actor,dmg){
		//----Check for counters
		if(actor.Stats.lif>0 && (!dmg.notCounterable) && (!dmg.exec.Statuses.Dead)){

			if(actor.Counter){
				actor.Clock.Add(()=>{actor.Counter(actor,dmg);});
			}
			
		}
	}




