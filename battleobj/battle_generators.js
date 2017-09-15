/**/var standard_Party=[
	{gen:Knight,y:100,x:450},

	{gen:Wizard,y:130,x:500},
	{gen:Monk,y:160,x:550},
	{gen:Dragoon,y:190,x:600}
	];

/**/var _BattleObject1={
	BackgroundSprite:ForestBattle,
	AudioLoopObject:'Mememe',

	Players:standard_Party,
	Enemys:[
		{gen:E0,x:210,y:50,mods:{Statuses:{Row:'middle'}}},
		{gen:E0,x:260,y:130,mods:{Statuses:{Row:'middle'}}},
		{gen:E0,x:230,y:210,mods:{Statuses:{Row:'middle'}}},
		{gen:E0,x:80,y:50,mods:{Statuses:{Row:'back'}}},
		{gen:E0,x:40,y:130,mods:{Statuses:{Row:'back'}}},
		{gen:E0,x:100,y:210,mods:{Statuses:{Row:'back'}}}
		],
	};

	
/**/var _BattleObject2={
		BackgroundSprite:GoldenSkySprite,
		AudioLoopObject:'Mememe',

		Players:standard_Party,
		Enemys:[
			{gen:E2,x:40,y:5,mods:{
				//Statuses:{Row:'middle'},
				TypeMods:{thunder:-1},
			}
		}],
	};

	
/**/var _BattleObject3={
		BackgroundSprite:GoldenSkySprite,
		AudioLoopObject:'Mememe',

		Players:standard_Party,
		Enemys:[{gen:Bard,x:40,y:5}],
	};


/**/var _BattleObject4={
		BackgroundSprite:BackgroundNullSprite,
		AudioLoopObject:'Mememe',

		Players:standard_Party,
		Enemys:[{gen:ExBard,x:(-520*800/_S.wid),y:(20*600/_S.hei),entrance:(player)=>{

			
			function MoveForward(){
				
				player.Clock.Add(()=>{

					if(player.DOM.Ref.offsetLeft > -40){

						_RemoveLastOscillator(player,'oscillationY');
						_RemoveLastOscillator(player,'oscillationX');
						//_AddXOscillation(player,1,36); // only on X oscillation. strange...
						_AddYOscillation(player,0.3,60);
						_speechBanner(player,"And this...");
						_speechBanner(player,"isn't even my final form!");

						_Time_Flow_Is_Active=true;
					}else{MoveForward();}

					MoveInDirection(player.DOM.Ref,2,0);

				});
			}

			_Time_Flow_Is_Active=false;
			player.Clock.Add(()=>{

				_AddXOscillation(player,1,30);
				_AddXOscillation(player,1,14);
				_AddYOscillation(player,0.6,30); // everything <= 0.5 shouldn't be used. bug. 
				_AddYOscillation(player,1,2);
				MoveForward();
			});/**/

		}},],
	};
/**/













