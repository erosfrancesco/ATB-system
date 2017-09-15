/*Magic Command*/
	var C_MAGIC={
		cmd:function(actor){
			_Check_Available_Magic_For(actor);
			AddMenuToStack(_Magic_Menu);
		},
		txt:'MAGIC',
		sel:true,
	};
/*-------------*/

/**/function _Mana_Cost_Of(mObj){return mObj.mana;}

/**/function _Check_Available_Magic_For(actor){

	var MagicList=[];

	if(actor.hasClass('Mage1')){MagicList.push(C_WHITE_CURE);}
	if(actor.hasClass('Wizard1')){
		MagicList.push(C_WHITE_CURE);
		MagicList.push(C_BLACK_FIRE1);
		MagicList.push(C_BLACK_THUNDER1);
	}

	

	var s=[];
	MagicList.forEach((magicCommand)=>{
		var l=_Check_Cost_Of(deepClone(magicCommand),actor);//Check-------------------------+++++++++++++++++++++++++++++
		s.push(l);
	});

	_Magic_Menu.Objects=s;
	
}

/**/function _Check_Cost_Of(magicObj,actor){

	if(returnManof(actor)<_Mana_Cost_Of(magicObj)){magicObj.sel=false;}
	return magicObj;
}

function _Standard_Magic_Damage_Generator(actor,a,pow,x1){
	var d=returnMagof(actor);
	d*=pow;
	d+=x1;
					
	return {		
		value:d,
		type:'m',
		attr:a,
		exec:actor
	};
}