/**/function FallenStar(target,offX,offY,vel,callback){
	vel=vel||150;
	callback=callback||function(){};

	target.Clock.Add(()=>{

		SetAnimationParentWrapper(target,ReturnBackground());
		target.GraphicalVarHolder={};
		target.GraphicalVarHolder.Target=ReturnGraphicsOf(target.DOM.Ref);

		target.GraphicalVarHolder.Star=CreateDefaultGlitter('20%');
		console.log(target.GraphicalVarHolder.Star);
		target.AnimationRef.appendChild(target.GraphicalVarHolder.Star);
		target.GraphicalVarHolder.Star.style.width=target.GraphicalVarHolder.Star.offsetHeight;
		MoveInDirection(target.GraphicalVarHolder.Star,
			-(offX-target.GraphicalVarHolder.Target.left+(target.GraphicalVarHolder.Target.width/2)),
			-(offY-(target.GraphicalVarHolder.Target.top*3/2))
		);


		target.GraphicalVarHolder.Counter=0;
		target.GraphicalVarHolder.FunCounter=vel;

		target.GraphicalVarHolder.array=[
			((_S.wid*3/4)/target.GraphicalVarHolder.FunCounter),
			((_S.hei/2)/target.GraphicalVarHolder.FunCounter)];

		while(target.GraphicalVarHolder.FunCounter){

			if(target.GraphicalVarHolder.FunCounter<0){
				target.GraphicalVarHolder.FunCounter= -target.GraphicalVarHolder.FunCounter;
			}
			
			target.GraphicalVarHolder.FunCounter--;

			target.Clock.Add(()=>{

				MoveInDirection(target.AnimationRef.firstChild,
					target.GraphicalVarHolder.array[0],
					target.GraphicalVarHolder.array[1]);

				if(!(ReturnGraphicsOf(target.AnimationRef.firstChild).left%5)){
					target.GraphicalVarHolder.Counter++;
					target.GraphicalVarHolder.Counter%=2;
					Rotate(target.AnimationRef.firstChild.style,45*target.GraphicalVarHolder.Counter);

					//target.AnimationRef.style.width=(100-(target.GraphicalVarHolder.Counter*10))+'%';
					//target.AnimationRef.style.height=(100-(target.GraphicalVarHolder.Counter*20))+'%';
					//target.AnimationRef.style.height=target.AnimationRef.offsetWidth;/**/

					//target.AnimationRef.firstChild.style.height=100+(target.GraphicalVarHolder.Counter*10);
				}
			});
		}

		target.Clock.Add(()=>{
			RemoveDOM(target.AnimationRef.firstChild.firstChild);
			ClearTrasform(target.AnimationRef.firstChild.style);

			target.GraphicalVarHolder.Angel=SpriteAnimator(AngelSprite,AngelSprite.path,'0%','0%',0,'100%','70%');
			target.GraphicalVarHolder.Angel.attachTo(target.AnimationRef.firstChild);
			console.log(target.GraphicalVarHolder.Angel);

		});

		var i=10;
		while(i){
			target.Clock.Add(()=>{MoveInDirection(target.AnimationRef.firstChild,0,-_S.hei/300);});
			i--;
		}

		target.Clock.PauseFor(15);

		target.Clock.Add(()=>{
			RemoveDOM(target.AnimationRef);
			delete target.GraphicalVarHolder;
		});

		target.Clock.Add(callback);

	});/**/
}

/**/function FallenAngelAnimation(player){

	var s=5;
	var leftY=PlayerPool.thegood[0].DOM.Ref.offsetLeft;
	var topX=PlayerPool.thegood[0].DOM.Ref.offsetTop+(PlayerPool.thegood[0].DOM.Ref.offsetHeight*2/3);

	player.Clock.Add(()=>{
		FallenStar(PlayerPool.thegood[0],leftY,topX);
		//player.Stats.lif=1;
	});
	player.Clock.PauseFor(s);

	player.Clock.Add(()=>{FallenStar(PlayerPool.thegood[1],leftY,topX);
		//player.Stats.lif=1;
	});
	player.Clock.PauseFor(s);

	player.Clock.Add(()=>{FallenStar(PlayerPool.thegood[2],leftY,topX);
		//player.Stats.lif=1;
	});
	player.Clock.PauseFor(s);

	player.Clock.Add(()=>{FallenStar(PlayerPool.thegood[3],leftY,topX);
		//player.Stats.lif=1;
	});


}
