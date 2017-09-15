console.log('Hu');
/**/var PlayerPool={

	thegood:[],
	thebads:[],
	_aliveG:[],
	_aliveB:[],

	add:function(actor){

		if(actor.Enemy){
			this.thebads.push(actor);
			this._aliveB.push(this.thebads.indexOf(actor));
		}else{
			this.thegood.push(actor);
			this._aliveG.push(this.thegood.indexOf(actor));
		}
	},

	execute_for_every_alive:function(fun){
		for(var player in this._aliveG){fun(this.indx_player(player));}
		for(var enemy in this._aliveB){fun(this.indx_enemy(enemy));}
	},

	return_all:function(){
		var targets=this.return_enemy();
		targets=this.return_players(targets);
		return targets;
	},

	return_enemy:function(targets){
		targets=targets || [];
		for(var enemy in PlayerPool._aliveB){
			var P=this.indx_enemy(enemy);
			if(!P.notSelectable){targets.push(P);}
		}
		return targets;
	},

	return_players:function(targets){
		targets=targets || [];
		for(var player in PlayerPool._aliveG){//targets.push(this.indx_player(player));
			var P=this.indx_enemy(player);
			if(!P.notSelectable){targets.push(P);}
		}
		return targets;
	},

	indx_enemy:function(indx){return this.thebads[PlayerPool._aliveB[indx]];},
	indx_player:function(indx){return this.thegood[PlayerPool._aliveG[indx]];}
};
