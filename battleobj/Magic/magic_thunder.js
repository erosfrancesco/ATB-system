/**/var C_BLACK_THUNDER1={
		cmd:function(actor){
			SetActionOf(actor,ThunderCommandVerifier);
			/*var targets=[];

			for(var i in PlayerPool.thebads){
				if(!PlayerPool.thebads[i].Statuses.Dead){
					targets.push(PlayerPool.thebads[i]);
				}
			}

			for(var i in PlayerPool.thegood){
				if(!PlayerPool.thegood[i].Statuses.Dead){
					targets.push(PlayerPool.thegood[i]);
				}
			}/**/
			var targets=PlayerPool.return_all();

			_SetupTargetMenuWith(targets);
		},
		mana:4,
		txt:'BOLT',
		sel:true,
	}


function ThunderCommandVerifier(x,arrtrg){
	for(var i in arrtrg){_Thunder1Magic(x,arrtrg[i]);}
}


function _Thunder1Magic(x,target){

	_standardBanner(x,'BOLT');
	FlickerAnimation(x);
	
	x.Clock.Add(()=>{

		target.Clock.Add(()=>{

			var spriteObj=Thunder1Object();
			var parent=target.DOM.Ref;
			var SpriteDOM=spriteObj.DOM.Ref;

			spriteObj.attachTo(parent);
				
			spriteObj.resizeHeightAt(parent.offsetHeight+parent.offsetTop);
			SpriteDOM.style.top=(parent.offsetHeight-SpriteDOM.offsetHeight);
			SpriteDOM.style.left=(parent.offsetWidth-SpriteDOM.offsetWidth)/2;

			//filters here...

			spriteObj.synchWith(target.Clock);
			spriteObj.animate('Thunder1'+target.DOM.Ref.id,()=>{
				var objectDmg=_Standard_Magic_Damage_Generator(x,'thunder',2,20);
				InflictDamage(target,objectDmg);
			});

		});
	});
}

/**/var ThunderSprite={
	src:'spritethunderffvi.png',
	framn:[1,18],
	width:146/(18*3)+'%',
	height:98/(6*1)+'%'
	};

	function Thunder1Object(){
		var sprite=General_Class_Sprite(ThunderSprite);
		AddClockAnimatorTo(sprite);

		sprite.animationFreqUpdate=2;

		sprite.animate=function(iniqueName,callback){
			AnimationFactory(sprite,
				iniqueName,
				()=>{sprite.updateTimer('spriteUpdate',sprite.animationFreqUpdate,sprite.updateX);},
				(sprite.animationFreqUpdate*sprite.framny),
				callback);
		}

		sprite.purpleFilter=function(){
			ColorFilterOver(sprite.DOM.Ref.style,
				230,//swap,
				10,//saturation,
				20,//contrast,
				0//brightness
			);/**/
		}

		sprite.greenFilter=function(){
			ColorFilterOver(sprite.DOM.Ref.style,
				70,//swap,
				-10,//saturation,
				0,//contrast,
				0//brightness
			);/**/
		}

		return sprite;
	}