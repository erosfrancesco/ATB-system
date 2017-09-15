/*Commands for magic*/
	var C_WHITE_CURE={
		cmd:function(actor){

			SetActionOf(actor,CureCommandVerifier);

			/*var targets=[];
			for(var i in PlayerPool.thegood){
				if(!PlayerPool.thegood[i].Statuses.Dead){
					targets.push(PlayerPool.thegood[i]);
				}
			}

			if(!(targets[0])){targets.push(actor);} // this shouldn't happen
			/**/
			var targets=PlayerPool.return_players();

			//console.log(targets);
			_SetupTargetMenuWith(targets);

		},
		mana:4,
		txt:'CURE',
		sel:true
	};


function CureCommandVerifier(x,arrtrg){
	for(var i in arrtrg){_CureMagic(x,arrtrg[i]);}
}

function _CureMagic(x,target){

	_standardBanner(x,'CURE');
	FlickerAnimation(x);

	x.Clock.Add(()=>{
		target.Clock.Add(()=>{
			
			GlitterAnimation(target,13*_S.hei/100,'yellow');
			target.Clock.Add(()=>{

				var cureObj=_Standard_Magic_Damage_Generator(x,'cure',2,20);
				InflictDamage(target,cureObj);

			});
		});
	});
}