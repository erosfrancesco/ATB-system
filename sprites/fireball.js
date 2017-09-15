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
		sprite.animationVelX= -75; // anyway, this will not be used in most cases. It will be set up afterward...
		//could use animationVelY too...

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


