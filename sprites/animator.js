/**/function AnimationFactory(animationObj,iniqueName,functionLoop,numberOfCicles,callback){
	callback=callback || function(){}
	iniqueName=iniqueName || 'IniquePingoPallo';
	PhaseLoop(iniqueName,function(){
		functionLoop();
		animationObj.updateTimer('deleteFactory',numberOfCicles,()=>{
			callback();
			animationObj.isReady=true;
			animationObj.delete();
			WrapperRef.Cancel(iniqueName);
		});
	});

	}

	function AddClockAnimatorTo(spriteobj){

		spriteobj.Clock=new Buttler();
		spriteobj.counters={};
		
		spriteobj.updateY=function(){
			spriteobj.spritex++;
			spriteobj.spritex%=sprite.framnx;
			spriteobj.refresh();
		}
		
		spriteobj.updateX=function(){
			spriteobj.spritey++;
			spriteobj.spritey%=spriteobj.framny;
			spriteobj.refresh();
		}

		spriteobj.updateTimer=function(id,time,callback){

			if(spriteobj.counters[id] === undefined){spriteobj.counters[id]=0;} // tricky here... 0 is false too if checked

			spriteobj.counters[id]++;
			if(spriteobj.counters[id]>=time){callback();}
			spriteobj.counters[id]%=time;
		}

		spriteobj.delete=function(){
			RemoveDOM(spriteobj.DOM.Ref);
			spriteobj.counters={};
		}
	
	}

