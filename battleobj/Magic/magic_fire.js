/**/var C_BLACK_FIRE1={
		cmd:function(actor){
			SetActionOf(actor,FireCommandVerifier);
			var targets=PlayerPool.return_all();
			
			/*var targets=[];

			/*for(var i in PlayerPool.thebads){
				if(!PlayerPool.thebads[i].Statuses.Dead){
					targets.push(PlayerPool.thebads[i]);
				}
			}

			for(var i in PlayerPool.thegood){
				if(!PlayerPool.thegood[i].Statuses.Dead){
					targets.push(PlayerPool.thegood[i]);
				}
			}/**/

			_SetupTargetMenuWith(targets);
		},
		mana:4,
		txt:'FIRE',
		sel:true,
	}


function FireCommandVerifier(x,arrtrg){
	for(var i in arrtrg){_Fire1Magic(x,arrtrg[i]);}
}


function _Fire1Magic(x,target){

	_standardBanner(x,'FIRE');
	FlickerAnimation(x);
	
	x.Clock.Add(()=>{
		target.Clock.Add(()=>{
			
			var fireObj=Fire1Object();
			var parent=target.DOM.Ref;
			var fireWidth=parent.offsetWidth/3;
			var fireDOMRef=fireObj.DOM.Ref;

			fireObj.attachTo(parent);
			fireObj.resizeWidthAt(fireWidth);
			//fireObj.animationFreqUpdate=100; //test purpose
			
			fireDOMRef.style.top= parent.offsetHeight-fireDOMRef.offsetHeight;
			fireObj.animationVelX= ((fireWidth)/fireObj.animationFreqUpdate)*100/_S.wid;

			//position and animation should change if the target is an ally or an enemy
			if(target.Enemy){
				fireDOMRef.style.left=parent.offsetWidth-fireWidth;
				fireObj.animationVelX= -fireObj.animationVelX;
			}

			fireObj.synchWith(target.Clock); // synch
			fireObj.animate('Fire1'+target.DOM.Ref.id,()=>{
				//at the end of the animation do the damage thingamajigs...
				var fireDmg=_Standard_Magic_Damage_Generator(x,'fire',2,20);
				InflictDamage(target,fireDmg);
			});
			
			console.log(fireDOMRef);

		});
	});
}

/**/var FireSprite={
	src:'spritefireffvi.png',
	framn:[1,3],
	width:100/(8*3)+'%',
	height:52/(6*1)+'%'
	};

	function Fire1Object(){
		var sprite=General_Class_Sprite(FireSprite);
		AddClockAnimatorTo(sprite);

		sprite.animationFreqUpdate=8;
		sprite.animationVelX= -34;

		sprite.animate=function(iniqueName,callback){
			AnimationFactory(sprite,
				iniqueName,
				()=>{
					sprite.updateTimer('spriteUpdate',sprite.animationFreqUpdate,sprite.updateX);
					sprite.updateTimer('moveUpdate',2,()=>{sprite.move(sprite.animationVelX,0);});
				},
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