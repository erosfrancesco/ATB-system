/*Menu objects*/
	var _Init_Menu={
		Name:'Init',
		Objects:[],
		width:'100%',
		height:'34%',
		DOM:{x:'0%',y:'66%',Ref:'',Objects:[]},
	};

	var _Banner_Menu={
		Name:'Banner',
		Objects:[],
		width:'60%',
		height:'10%',
		DOM:{x:'20%',y:'0%',Ref:'',Objects:[]},
	};

	var _Enemy_Menu={
		Name:'Enemy',
		Objects:[],
		width:'34%',
		height:'34%',
		DOM:{x:'0%',y:'66%',Ref:'',Objects:[]},
	};
/**/
/*Menu objects*/
	var _Defend_Menu={
		Name:'Defend',
		Objects:[C_DEFEND],
		Input:_InputHandlr_Defend,
		ScrollingMax:1,
		Placer:function(indx){SetElementOfGenericMenu(this,indx);},
		width:'27%',
		height:'9%',
		DOM:{x:'1%',y:'70%',Ref:'',Objects:[]},
	};

	var _RwChng_Menu={
		Name:'RowChangin',
		Objects:[C_RWCHNG],
		Input:_InputHandlr_RwChng,
		ScrollingMax:1,
		Placer:function(indx){SetElementOfGenericMenu(this,indx);},
		width:'27%',
		height:'9%',
		DOM:{x:'24%',y:'70%',Ref:'',Objects:[]},
	};

	var _Battle_Menu={
		Name:'Battle',
		Objects:[C_FIGHT,C_TRASFORM,C_NULL,C_ITEMS],
		Input:_InputHandlr_Battle,
		Placer:function(indx){SetElementOfGenericMenu(this,indx);},
		width:'25%',
		height:'34%',
		DOM:{x:'13%',y:'65%',Ref:'',Objects:[]},
	};
	
	var _Item_Menu={
		Name:'Item',
		Objects:[C_FIGHT,C_NULL,C_NULL,C_NULL,C_NULL,C_FIGHT,C_NULL,C_FIGHT,C_NULL,C_FIGHT,C_FIGHT],
		Input:_InputHandlr_Double,
		Placer:function(indx){SetElementOfDoubleMenu(this,indx);},
		ScrollingMax:3,
		width:'50%',
		height:'34%',
		DOM:{x:'25%',y:'65%',Ref:'',Objects:[]},
	};

	var _Target_Menu={
		Name:'Players',
		Objects:[],
		Input:_InputHandlr_Target,
		Placer:function(indx){SetElementOfTargetMenu(this.Objects[indx]);},
		ScrollingMax:5,
		width:'0%',
		height:'0%',
		DOM:{x:0,y:0,Ref:'',Objects:[]},
	};

	var _Magic_Menu={
		Name:'Magic',
		Objects:[C_FIGHT],
		Input:_InputHandlr_Double,
		Placer:function(indx){SetElementOfMagicMenu(this,indx);},
		ScrollingMax:4,
		width:'50%',
		height:'34%',
		DOM:{x:'25%',y:'65%',Ref:'',Objects:[]},
	};
/**/
