var _Default_Slash_Name_Ref='slash';

/*Variants*/function VerticalSlashAnimation(player,height,color){
	DefaultSlashAnimation(player,height,color);

	player.AnimationRef[_Default_Slash_Name_Ref].style.transformOrigin='center center';
	Rotate(player.AnimationRef[_Default_Slash_Name_Ref].style,90);
	MoveInDirection(player.AnimationRef[_Default_Slash_Name_Ref],height/2,height);
	}

	function DiagonalSlashAnimation(player,height,color){
		DefaultSlashAnimation(player,height,color);
		player.AnimationRef[_Default_Slash_Name_Ref].style.transformOrigin='center center';
		Rotate(player.AnimationRef[_Default_Slash_Name_Ref].style,45);
		MoveInDirection(player.AnimationRef[_Default_Slash_Name_Ref],height,height*3/4);
	}
/*--------*/


/*Default*/function DefaultSlashAnimation(player,height,color){
	color=color||'brown';

	// object costructor
	player.AnimationRef[_Default_Slash_Name_Ref]=DefaultSlashConstructor(
		height,
		(-(height/20)+player.DOM.Ref.offsetWidth)/2,
		(height+player.DOM.Ref.offsetHeight)*1/9,
		10,color);

	// object animation
	_ObjectAnimationPlayerFactory(player, _Default_Slash_Name_Ref, DefaultSlashAnimationFunction);
	}
/*-------*/


/*Object costructor and associated default animation*/function DefaultSlashConstructor(hei,x,y,z,color){
	
	var parwrap=CreateCssAnimationWrapper(hei,hei,x,y,z);
	
	var colorwrap=ParticleCssDiv('20%','100%',0,0,1,color);
	parwrap.appendChild(colorwrap);

	var gradColor1='rgba(255,255,255,0.5)';
	var gradColor2='rgba(255,255,255,0)';
	var grad='radial-gradient(ellipse at center, '+gradColor1+' 0%,'+gradColor2+' 100%)';

	var wrapp1=ParticleCssDiv('30%','90%','5%','10%',0,grad);
	colorwrap.appendChild(wrapp1);

	parwrap.style.opacity='0.8';
	
	return parwrap;
	}


	function DefaultSlashAnimationFunction(buttler,animationObject){
		var l=10;
		var counter=l;
		var height=animationObject.offsetHeight;
		//first part

		CompressBy(animationObject,0,-((height)));
		while(counter){
			buttler.Add(()=>{
				CompressBy(animationObject,0,((height)/l));
			});
			counter--;
		}
		buttler.PauseFor(10);
		//second part
		var counter=l;
		while(counter){
			buttler.Add(()=>{
				CompressBy(animationObject,0,-((height)/l)/4);
				MoveBackgroundOf(animationObject,0,((height)/l)/2);
			});
			counter--;
		}
	}
/*--------------------------------------------------*/