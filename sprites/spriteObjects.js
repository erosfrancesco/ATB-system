/**/var SmokeSprite={
		src:'spritesmoke.png',
		framn:[1,6],
		width:408/(8*6)+'%',
		height:68/(6*1)+'%'
	};


	function SteamObject(){
		var sprite=General_Class_Sprite(SmokeSprite);
		AddClockAnimatorTo(sprite);

		sprite.animate=function(iniqueName){
			iniqueName=iniqueName || 'iniqueName';
			AnimationFactory(sprite,
				iniqueName,
				()=>{
					sprite.updateTimer('spriteUpdate',6,sprite.updateX);
					sprite.updateTimer('moveUpdate',2,()=>{sprite.move(0,-1);
					});
				},
				(6*sprite.framny));
		}

		sprite.greenFilter=function(){
			ColorFilterOver(sprite.DOM.Ref.style,
				230,//swap,
				100,//saturation,
				20,//contrast,
				-10//brightness
			);/**/
		}

		return sprite;
	}


/**/function General_Class_Sprite(spriteObj,optionalpath){
	var sprite=SpriteAnimator(spriteObj,optionalpath,'0%','0%',0,spriteObj.width,spriteObj.height);
	
	sprite.draw=function(){sprite.attachTo(ReturnCurrentWrapper());}

	sprite.move=function(dx,dy,dz){ // with 800 x 600 ratio just do: dx = pixel * 6, dy = pixel * 8
		dx=dx||0;dy=dy||0;dz=dz||0;
		sprite.posit(sprite.DOM.Ref.offsetLeft+(dx*_S.wid/100),sprite.DOM.Ref.offsetTop+(dy*_S.hei/100),dz);
	}

	sprite.posit=function(x,y,z){
		x=x||0;y=y||0;z=z||0;
		sprite.DOM.Ref.style.top=y;
		sprite.DOM.Ref.style.left=x;
		sprite.DOM.Ref.zIndex=(z+sprite.DOM.Ref.offsetTop);
		sprite.DOM.x=x;
		sprite.DOM.y=y;
		sprite.DOM.z=z;
	}

	sprite.resizeHeightAt=function(height){
		var resizeFactor=height/sprite.DOM.Ref.offsetHeight;
		sprite.resize(resizeFactor);
	}

	sprite.resizeWidthAt=function(width){
		var resizeFactor=width/sprite.DOM.Ref.offsetWidth;
		sprite.resize(resizeFactor);
	}

	sprite.resize=function(r){
		var d=sprite.returnSpriteDOM();
		sprite.DOM.Ref.style.height=d.h*r;
		sprite.DOM.Ref.style.width=d.w*r;
		sprite.DOM.wid=d.w*r;
		sprite.DOM.hei=d.h*r;
	}

	sprite.synchWith=function(targetClock){_clock_synch_autoreferential(targetClock,sprite);};

	return sprite;
	}


/*When playing an animation, the timing could be desycronized
 because the Clocks could be empty while the animation is still running. This part stall for time,
 refulling the targetClock every cicle until the animation is finished, in order to prevent desynchs... */
	function _clock_synch_autoreferential(targetClock,animationObject){
		if(!animationObject.isReady){targetClock.Add(()=>{_clock_synch_autoreferential(targetClock,animationObject)});}
		//else{target.Clock.Add(()=>{console.log('Hello there');});}
	}
/*------------------------------------------------------------------------------------------------------------------*/