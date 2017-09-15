/**/function _AddXOscillation(player,amp,freq){
		_AddGenericAdditiveOscillation(player,
			'oscillationX',
			amp,
			freq,
			(val)=>{
				//console.log(val);
				//MoveInDirection(player.DOM.Ref,val,0);
				player.DOM.Ref.style.left=player.DOM.Ref.offsetLeft+= val;
			});
	}

	function _AddYOscillation(player,amp,freq){
		_AddGenericAdditiveOscillation(player,
			'oscillationY',
			amp,
			freq,
			(val)=>{
				//console.log(val);
				//MoveInDirection(player.DOM.Ref,0,val);
				player.DOM.Ref.style.top=player.DOM.Ref.offsetTop+= val;
			});
	}

	function _AddGenericAdditiveOscillation(player,ref,amp,freq,callback){
		_CheckOscillationObject(player,ref,callback);	
		player[ref].list.push(_Oscillator(amp,freq));
	}

	function _CheckOscillationObject(player,ref,callback){

		if(!player[ref]){
			player[ref]=_OscillationPlayerRef(callback);
			_RenderOscillationsOf(player,[ref]);
		}
	}

	function _RemoveOscillationRef(player,ref){delete player[ref];RemovePhaseLoop(player.DOM.Ref.id+'-Tremble-'+ref);}

	function _RemoveLastOscillator(player,ref){player[ref].list.pop();}


/**/function _RenderOscillationsOf(player,ref){PhaseLoop(player.DOM.Ref.id+'-Tremble-'+ref,player[ref].render);}
	
	function _OscillationPlayerRef(callback){

		var dummy={list:[],callback:callback,val:0};
		dummy.render=function(){
			for(var oscillObj in dummy.list){dummy.val+=(dummy.list[oscillObj].returnValue());}
			dummy.callback(dummy.val);
			dummy.val=0;
		};
		return dummy;	
	}
/**/


/**/function _Oscillator(amp,freq){
	var dummy={
		counter:Math.floor(freq/2),//0,
		limit:freq,
		delta:amp,
		returnValue:function(){
			this.counter++;
			if(this.counter>this.limit){
				this.delta= -this.delta;
				this.counter=0;
			}
			return this.delta;
		}
	};
	return dummy;
	}

