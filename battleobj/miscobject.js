/*Command for menus*/
	var C_FIGHT={
		cmd:function(actor){
			SetActionOf(actor,Fight);
			var targets=PlayerPool.return_all();
			_SetupTargetMenuWith(targets);
		},
		txt:'FIGHT',
		sel:true,
	};

	var C_ITEMS={
		cmd:function(){AddMenuToStack(_Item_Menu);},
		txt:'ITEMS',
		sel:true,
	};

	var C_TRASFORM={
		cmd:function(){console.log('For gilgamesh, it is morphing time!')},
		txt:'MORPH',
		sel:false,
	};

	var C_NULL={
		cmd:function(){},
		txt:'',
		sel:false,
	};

	var C_DEFEND={
		cmd:function(actor){
			SetActionOf(actor,Defend);
		},
		txt:'DEFEND',
		sel:true,
	};

	var C_RWCHNG={
		cmd:function(actor){
			SetActionOf(actor,(actor)=>{_RowChange(actor);});
		},
		txt:'ROW',
		sel:true,
	};

	var C_RAISER={
		cmd:function(actor){

			SetActionOf(actor,RaiseCommandVerifier);
			var targets=[];
			for(var i in PlayerPool.thegood){
				if(PlayerPool.thegood[i].Statuses.Dead){
					targets.push(PlayerPool.thegood[i]);
				}
			}

			if(!(targets[0])){targets.push(actor);}
			_SetupTargetMenuWith(targets);
		},
		txt:'RAISE',
		sel:true,
	}
/**/