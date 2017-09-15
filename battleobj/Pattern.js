function SummonMeEnemy(P){

	var dx=_EStartingX-(Math.floor(PlayerPool.thebads.length/3))*_EWidDistance;
	var dy=_EStartingY-P.Height+(PlayerPool.thebads.length%3)*_EHeiDistance;
	dx+=(10*(PlayerPool.thebads.length%3));

	var obj=_CreateDivFromSprite(P.SpriteSource,dx,dy);
	obj.id='TheBads-'+PlayerPool.thebads.length;
	obj.style.zIndex=9-PlayerPool.thebads.length+(PlayerPool.thebads.length%3);
	obj.style.width=P.Width;
	obj.style.height=P.Height;

	ReturnCurrentWrapper().appendChild(obj);
	var DeepObj=deepClone(P);
	DeepObj.DOM={x:dx,y:dy,Ref:obj,sx:0,sy:0};

	PolyfillPlayer(DeepObj);

	PlayerPool.thebads.push(DeepObj);
	PlayerPool._aliveB.push(PlayerPool.thebads.indexOf(DeepObj));



	_RepositionEnemy();

	if(ReturnTopMenu()==_Target_Menu){
		RemoveMenuFromStack();
	}
}

function BillCreepyDouble(enemy){
	enemy.Clock.Add(()=>{
		SummonMeEnemy(E1);
		SummonMeEnemy(E1);
		SummonMeEnemy(E1);
		SummonMeEnemy(E1);
		SummonMeEnemy(E1);
		enemy.Clock.Add(()=>{
			FlipOver(ReturnAliveEnemy(1).DOM.Ref.style);
			FlipOver(ReturnAliveEnemy(3).DOM.Ref.style);
			FlipOver(ReturnAliveEnemy(4).DOM.Ref.style);
		});			
		enemy.Clock.PauseFor(16);
		enemy.Clock.Add(()=>{
			FlipOver(ReturnAliveEnemy(0).DOM.Ref.style);
			FlipOver(ReturnAliveEnemy(2).DOM.Ref.style);
			ClearTrasform(ReturnAliveEnemy(3).DOM.Ref.style);
			ClearTrasform(ReturnAliveEnemy(4).DOM.Ref.style);
		});
		enemy.Clock.PauseFor(16);
		enemy.Clock.Add(()=>{
			ClearTrasform(ReturnAliveEnemy(0).DOM.Ref.style);
			ClearTrasform(ReturnAliveEnemy(1).DOM.Ref.style);
			ClearTrasform(ReturnAliveEnemy(2).DOM.Ref.style);
		});
	});
}


function ReturnRandomPlayer(){
	var s=RetRandom(0,PlayerPool._aliveG.length-1);
	return PlayerPool.thegood[PlayerPool._aliveG[s]];
}


function DefaultPattern(enemy){//attack a casual character
	enemy.IsGoingTo.push({
		Cmd:Fight,
		Trg:[ReturnRandomPlayer()]
	});
}


function BillPattern(enemy){
	
	DefaultPattern(enemy);

	if(PlayerPool.thebads.length<2){
		if(enemy.Stats.lif>75){
			DefaultPattern(enemy);
		}else{
			enemy.IsGoingTo.push({
				Cmd:BillCreepyDouble,
				Trg:[enemy]
			});
		}
	}

}

function DefendPattern(enemy){
	if(enemy.Turn%2){
		DefaultPattern(enemy);
	}else{

		enemy.IsGoingTo.push({
			Cmd:Defend,
			Trg:[enemy]
		});

	}
	enemy.Turn++;
}


function ForsakenPattern(enemy){
	enemy.Clock.Add(()=>{
	if(enemy.Statuses.ForsakenCharge){
		enemy.Statuses.ForsakenCharge=false;
		_RemoveOscillationRef(PlayerPool.Background,'oscillationY');
		_RemoveOscillationRef(PlayerPool.Background,'oscillationX');


		/**/PlayerPool.Background.DOM.Filter.aValue=0.8;
			PlayerPool.Background.DOM.Filter.compute();

			enemy.Clock.CicleFor(33,()=>{
				PlayerPool.Background.DOM.Filter.gValue+=1;
				PlayerPool.Background.DOM.Filter.compute();
			});

			enemy.Clock.CicleFor(50,()=>{
				PlayerPool.Background.DOM.Filter.bValue+=3;
				PlayerPool.Background.DOM.Filter.compute();
			});

			enemy.Clock.CicleFor(33,()=>{
				PlayerPool.Background.DOM.Filter.rValue+=1;
				PlayerPool.Background.DOM.Filter.gValue-=1;
				PlayerPool.Background.DOM.Filter.bValue-=3;
				PlayerPool.Background.DOM.Filter.compute();
			});

			enemy.Clock.CicleFor(50-33,()=>{
				PlayerPool.Background.DOM.Filter.bValue-=3;
				PlayerPool.Background.DOM.Filter.rValue+=2;
				PlayerPool.Background.DOM.Filter.compute();
			});

		
		//another animation here
		enemy.Clock.Add(()=>{PlayerPool.Background.DOM.Filter.reset();});

		
	}else{

		enemy.Statuses.ForsakenCharge=true;

		enemy.Clock.CicleFor(25,()=>{
			PlayerPool.Background.DOM.Filter.aValue+=0.02;
			PlayerPool.Background.DOM.Filter.compute();
		});

		//_speechBanner(enemy,'The end comes...');
		//_speechBanner(enemy,'beyond chaos!');

		enemy.Clock.Add(()=>{
			_AddXOscillation(PlayerPool.Background,2,4);
			_AddYOscillation(PlayerPool.Background,1,4);
		});
		enemy.Clock.PauseFor(4);
		enemy.Clock.Add(()=>{_AddXOscillation(PlayerPool.Background,1,10);});/**/
		
	}
	enemy.Turn++;
	});
}

