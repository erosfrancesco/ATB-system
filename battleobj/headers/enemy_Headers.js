/*Enemy turn, basically*/
function ReturnFirstEnemy(){return EnemyStack[0];}

function ExecuteEnemyTurn(firstenemy){

	firstenemy.Pattern();
	ActionStack.push(firstenemy);//this does it all!
}

function CheckFirstEnemy(){//somenthing wrond here!!
	var s=ReturnFirstEnemy();
	if((s)&&(s.BattleStatus=='Ready')){
		s.BattleStatus='Performing';
		//here for the defense status remove
		s.Statuses.Defend=false;
		ExecuteEnemyTurn(s);
	}
}


function InitEnemysLoop(){
	PhaseLoop('EnemyTurns',function(){
		CheckFirstEnemy();
	});
}

function SetEnemysNames(){//every time an enemy is killed this should be called
	var EnemyNames={};
	MenuStack[0].DOM.Ref.firstChild.firstChild.innerHTML='';
	
	for(var enemy in PlayerPool._aliveB){
		//var j=ReturnAliveEnemy(enemy);
		var j=PlayerPool.indx_enemy(enemy);
		if(EnemyNames[''+j.Name]>0){EnemyNames[''+j.Name]++;}else{EnemyNames[''+j.Name]=1;}
	}
	for(var name in EnemyNames){
		if(EnemyNames[name]==1){
			MenuStack[0].DOM.Ref.firstChild.firstChild.innerHTML+=name+'</br>';
		}else{
			MenuStack[0].DOM.Ref.firstChild.firstChild.innerHTML+=name+' x '+EnemyNames[name]+'</br>';
		}
	}
	//console.log(ActionStack);
	//if(ReturnFirstEnemy()){console.log(ReturnFirstEnemy().BattleStatus);}

}


function StandardEnemyDamageGenerator(doer,targ){
	var a=returnAtkof(doer);
	var d=returnDefof(targ);
	var dam=a-d;
	if(dam < 0){dam=0;}

	return {
		value:dam,
		type:'p',
		exec:doer
	};


}
//all working, up until now