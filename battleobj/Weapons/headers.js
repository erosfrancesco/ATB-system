/**/function AttackTarget(x,y){//y must not be an array
	/*++++ check if hand have object ++++*/
	/*++++ check if object is weapon ++++*/
	/*++++ for each weapon attack ++++*/
	
		x.armz.forEach((hand)=>{
			
				if((!hand.active)&&(hand.item.classes)){
					if((hand.item.classes[0]=='weapon')){
						x.Clock.Add(()=>{hand.item.typeofatk(x,y,hand.item);});
					}
				}

				if(hand.item.classes){
					if(hand.item.classes[1]=='fist'){
						x.Clock.Add(()=>{hand.item.typeofatk(x,y,hand.item);});
					}
				}
			
		});
	}

	function _Fist(x,y){//target must not be an array!
		//console.log(y.Name);
		
		x.Clock.Add(function(){
			FlickerAnimation(x);
			x.Clock.Add(()=>{
				/*+++Sprite executor+++*/
				//console.log('Fisting');

				/*+++Create the damage object+++*/
				var damage=_StandardDamageGenerator(x,y);
				if(x.hasClass('Monk')){damage.value*=2;}
				InflictDamage(y,damage);

			});
		});
	}


	function _StandardDamageGenerator(x,y){
	
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


	var FistObject={
		type:'onearm',
		classes:['weapon','fist'],
		bonusatk:0,
		weight:0,
		typeofatk:_Fist
	};
/**/


/**/function Polyfillweapons(player){
	player.armz=player.armz||[];
	
	var s=2;
	if(player.Enemy){s=1;}
	player.numberofarms=player.numberofarms||s;

	s=player.numberofarms;
	while(s){
		s--;
		if(!player.armz[s]){
			player.armz[s]={
				item:deepClone(FistObject),
				active:true
			};
			//console.log(player.armz[s]);
		}
	}
	}
/**/

/**/function ReturnTypeOfWeapon(playerarm){return playerarm.item.classes[1];}

/**/function ReturnFirstActiveArm(player){
	var s=[];
	var j=0;

	while(j<player.armz.length){
		if(player.armz[j].active){s=[player.armz[j],j];j=player.armz.length;}
		j++;
	}

	return s;
	}


	function EquipWeaponTo(hand,weaponitem){
		if(hand){
			hand.item={};
			hand.item=deepClone(weaponitem);
			hand.active=false;
		}
	}

	function EquipWeapon(player,weapon){
		if(weapon.type=='onearm'){
			EquipWeaponTo(ReturnFirstActiveArm(player)[0],weapon);
		}else{//twoarm. firsthand[0] is the first hand, secondhand is the other hand. firsthand[1] is the first hand's index
			var firsthand=ReturnFirstActiveArm(player)
			if(firsthand[0]){
				firsthand[0].active=false;
				var secondhand=player.armz[firsthand[1]+1];
				if(secondhand.active){
					EquipWeaponTo(firsthand[0],weapon);
					secondhand.item={};
					secondhand.active=false;
				}else{
					firsthand[0].active=true;
				}	
			}
		}
		
	}
/**/
