function SetMenuBackground(menuobj,par){
	var parent;
	if(par){parent=par.DOM.Ref}else{parent=ReturnCurrentWrapper();}//set up a proper parent for the menu
	var s=DrawBackMenu(menuobj.DOM.x,menuobj.DOM.y,menuobj.width,menuobj.height);//and draw the background
	menuobj.DOM.Ref=s;
	parent.appendChild(s);
}

function DrawMenuFromObj(menuobj,par){
	menuobj.ScrollingMax=menuobj.ScrollingMax||4;
	SetMenuBackground(menuobj,par);
	SetScrollingWrapperOf(menuobj);//set up a scrolling wrapper for, well, scrolling
	menuobj.Placer=menuobj.Placer||SetElementOfGenericMenu;//this part is for setting up and display the objects of the menu
	menuobj.Objects.forEach(function(obj,indx){menuobj.Placer(indx);});
}


function ScrollingDown(menu){_General_Scrolling(menu,menu.ScrollingMax-menu.CursorPosition-1);}

function ScrollingDownDouble(menu){_General_Scrolling(menu,menu.ScrollingMax-1-Math.floor(menu.CursorPosition/2));}

function ScrollingLateralDouble(menu){
	//console.log(menu.CursorPosition,menu.ScrollingMax);
	//if(menu.CursorPosition==0){console.log('Hllo ther');}
	_General_Scrolling(menu,menu.ScrollingMax-2-Math.floor((menu.CursorPosition)/2));
}


function SetProperMenuObj(menuobj){
	MenuStack.push(menuobj);
	DrawMenuFromObj(menuobj);
	menuobj.DOM.Ref.id='Menu-'+MenuStack.length+1;
	menuobj.DOM.Ref.style.zIndex=MenuStack.length+9;
}

function AddMenuToStack(menuobj){
	SetProperMenuObj(menuobj);
	menuobj.CursorPosition=menuobj.CursorPosition||0;
	MoveCursorTo(ReturnTopMenu());
}

function RemoveMenuFromStack(){
	RemoveDOM(ReturnTopMenu().DOM.Ref);
	ReturnTopMenu().DOM.Objects=[];
	MenuStack.pop();
	if(MenuStack.length>1){
		//Let's see here
		//console.log(ReturnTopMenu());
		MoveCursorTo(ReturnTopMenu());
	}
}

function LoadInitialMenus(){
	DrawMenuFromObj(_Init_Menu);
	LoadCursorMenu();
	SetProperMenuObj(_Enemy_Menu);	
}

function EndTurnMenuReset(){
	//
	while(MenuStack.length>1){RemoveMenuFromStack();}
}