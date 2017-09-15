function UpCursorMenu(x){//Now, for scrolling
	x=x||ReturnTopMenu();
	x.CursorPosition++;
	x.CursorPosition%=x.Objects.length;
	ScrollingDown(x);
}

function DownCursorMenu(x){
	x=x||ReturnTopMenu();
	x.CursorPosition--;
	if(x.CursorPosition<0){x.CursorPosition=x.Objects.length-1;}
	ScrollingDown(x);
}


function UpCursorDouble(x){
	x=x||ReturnTopMenu();
	x.CursorPosition+=2;

	if(x.CursorPosition%2){
		if(x.Objects.length-1<=x.CursorPosition){x.CursorPosition=0;}
	}else{
		if(x.Objects.length<=x.CursorPosition){x.CursorPosition=1;}
	}
	ScrollingDownDouble(x);
}

function DownCursorDouble(x){ // this one gives some problems... Not anymore.
	x=x||ReturnTopMenu();
	x.CursorPosition-=2;

	if(x.CursorPosition%2){
		if(x.CursorPosition<1){x.CursorPosition=x.Objects.length-1;}
	}else{
		if(x.CursorPosition<0){x.CursorPosition=x.Objects.length-1;}
	}
	ScrollingDownDouble(x);
}
/**/

function RightCursorDouble(x){
	x=x||ReturnTopMenu();
	x.CursorPosition++;
	if(x.CursorPosition%2){
		if(x.Objects.length-1<=x.CursorPosition){x.CursorPosition=0;}
	}else{
		if(x.Objects.length<=x.CursorPosition){x.CursorPosition=1;}
	}
	ScrollingLateralDouble(x);
}

function LeftCursorDouble(x){ // this one give some problems. Not anymore
	x=x||ReturnTopMenu();
	x.CursorPosition--;

	if(x.CursorPosition%2){
		if(x.CursorPosition<1){x.CursorPosition=x.Objects.length-1;} // There you go... Patched.
	}else{
		if(x.CursorPosition<0){x.CursorPosition=x.Objects.length-1;}
	}

	ScrollingLateralDouble(x);
}

function Target_Selection_Menu(){
	SetTargetOf(ReturnCurrentPlayer(),ReturnTopMenu().Objects[ReturnTopMenu().CursorPosition]);
	SetCommandOf(ReturnCurrentPlayer());
	_CheckIfThereAreMoreActionsFor(ReturnCurrentPlayer());
}

function EndTurnWith(actor,trg){
	SetTargetOf(actor,trg);
	SetCommandOf(actor);
	_CheckIfThereAreMoreActionsFor(actor);
}