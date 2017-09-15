function _StaffDamageGenerator(x,y){
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


function _CureAtk(x,y,weapn){
	x.Clock.Add(()=>{
		FlickerAnimation(x);
		x.Clock.Add(()=>{
			
			GlitterAnimation(y,13*_S.hei/100,'yellow');
			x.Clock.Add(()=>{

				var damage=_StaffDamageGenerator(x,y);
				InflictDamage(y,damage);

			});
		});
	});
}


var StaffObject={
	type:'twoarms',
	classes:['weapon','staff'],
	bonusatk:10,
	weight:3,
	typeofatk:_CureAtk
};