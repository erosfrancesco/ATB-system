/**/function SetActionOf(player,action){player.Command=action;}

	function SetTargetOf(player,targets){//multiselection???
		if(Array.isArray(targets)){player.Target=targets;}else{player.Target=[targets];}
	}

	function SetCommandOf(player){
		console.log('set command for '+player.Name);
		player.IsGoingTo.push({Cmd:player.Command,Trg:player.Target});//there you go for multiple actions.
		player.Command='';player.Target='';
		//console.log(player.Name,player.IsGoingTo);
	}

	function RefactorTargets(targetsobj){
		var newtargs=[];
		targetsobj.forEach((target)=>{

			newtargs.push(target);//only if it's alive, but for reiz etc??
		});
		return newtargs;
	}
/**/
