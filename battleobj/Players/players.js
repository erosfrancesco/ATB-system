/**/var _ATBMAX=6400;


/**/function _default_player_polyfill(){
	var foo={
		ActionForTurn:1,
		AnimationRef:{},
		ATBobj:{Value:0},
		BattleStatus:'Charging',
		Classes:[],
		//Clock:new Buttler(),
		damages:[],
		DOM:{Ref:''},
		Enemy:false,
		ImmuneTo:[],//should this be an object?
		IsGoingTo:[],
		Statuses:{Row:'middle'},
		TypeMods:{cure:-1},
		Turn:0,

		DeathAni:function(x){DeathFadeEfx(x.DOM.Ref.firstChild.style,x.Clock);},

		Counters:{
			Doom:new _CounterStatus(100,_callbackDoomStatus),
			Regen:new _CounterStatus(100,_callbackRegenStatus),
			Poison:new _CounterStatus(100,_callbackPoisonStatus),
			Reflect:new _CounterStatus(100,_callbackReflexStatus),
			Sleep:new _CounterStatus(10,_callbackSleepStatus),
			Stop:new _CounterStatus(18,_callbackStopStatus),
		},

		hasClass:function(className){if(foo.Classes.indexOf(className)<0){return false;}else{return true;}},
		isImmune:function(status){if(foo.ImmuneTo.indexOf(status)<0){return false;}else{return true;}},
		Modifier:function(type){return foo.TypeMods[type] || 1;},
		statRet:function(stat){return foo.Stats[stat];},
	};
	return foo;
	}


/**/function _DrawAPlayer(P){
	P.spriteRef=_LoadSpriteOfActor(P);
	P.DOM.Ref=P.spriteRef.DOM.Ref;
	P.DOM.Ref.id='TheGood-'+PlayerPool.thegood.length;
	_LoadActorIntoBattle(P);
	}

	function _DrawAnEnemy(P){
		P.spriteRef=_LoadSpriteOfActor(P);
		P.DOM.Ref=P.spriteRef.DOM.Ref;
		P.DOM.Ref.id='TheBads-'+PlayerPool.thebads.length;
		_LoadActorIntoBattle(P);
	}


/**/function _LoadSpriteOfActor(actor){

	var spriteObj=General_Class_Sprite(actor.SpriteSource,actor.SpriteSource.path);
	//SpriteAnimator(actor.SpriteSource,actor.SpriteSource.path,0,0,actor.Width,actor.Height);

	spriteObj.DOM.Ref.style.width=actor.Width;
	spriteObj.DOM.Ref.style.height=actor.Height;
	spriteObj.DOM.Ref.style.overflow='visible';
	return spriteObj;
	}

	function _LoadActorIntoBattle(actor){
		
		PolyfillPlayer(actor);

		var foo=actor.spriteRef.posit;
		actor.spriteRef.posit=function(x,y,z){foo(x,y,z);PositNumberDisplayOf(actor);} // this must be set up

		actor.spriteRef.draw();
		PlayerPool.add(actor);
	}

	function PolyfillPlayer(P){

		P.Clock=new Buttler();
		LoadNumberDisplayOf(P);
		Polyfillweapons(P);
	}
/**/

/**/function IsStillAlive(player){return (!player.Statuses.Dead);}
/**/function RemovePlayerFromArray(player,array){if(array.indexOf(player)>=0){array.splice(array.indexOf(player),1);};}

