function _LanceDamageGenerator(x,y){
	var a=returnAtkof(x);
	var d=returnDefof(y);
	var dam=a-d;
	if(dam < 0){dam=0;}
			
	return {		
		value:dam,
		type:'p',
		exec:x
	};

}


function _Pierce(x,y,weapn){
	console.log('Pierce');
	x.Clock.Add(()=>{
		FlickerAnimation(x);
		x.Clock.Add(()=>{
			
			_standardBanner(x,'ATTACK');
			
			VerticalSlashAnimation(y,(_S.hei/3),'white');//need to pass some other parameters here
			x.Clock.Add(()=>{

				var damage=_LanceDamageGenerator(x,y);
				InflictDamage(y,damage);//if you don't set this, the attack become non-counterable

			});
		});
	});
}


var LanceObject={
	type:'twoarms',
	classes:['weapon','lance'],
	bonusatk:10,
	weight:3,
	typeofatk:_Pierce
};