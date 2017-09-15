/*Input handlers for menus*/
	var Cursor_Sprite={
		src:'FFcurs.png',
		framn:[1,1],
		width:16,
		height:16
	};

	var _InputHandlr_Defend=[];// This array is used when the cursor is on the DEFEND command.
		_InputHandlr_Defend[_KeyDef.right]=function(){RemoveMenuFromStack();}
		_InputHandlr_Defend[_KeyDef.A]=function(){
			SelectCursorMenu(ReturnCurrentPlayer());
			EndTurnWith(ReturnCurrentPlayer(),[ReturnCurrentPlayer()]);
		}

	var _InputHandlr_RwChng=[];// This array is used when the cursor is on the ROWCHANGE command.
		_InputHandlr_RwChng[_KeyDef.left]=function(){RemoveMenuFromStack();}
		_InputHandlr_RwChng[_KeyDef.A]=function(){
			SelectCursorMenu(ReturnCurrentPlayer());
			EndTurnWith(ReturnCurrentPlayer(),[ReturnCurrentPlayer()]);
		}


	var _InputHandlr_Battle=[];// This type of array is used in the first menu, the one where you have FIGHT, ITEM etc.
		_InputHandlr_Battle[_KeyDef.up]=function(){DownCursorMenu();MoveCursorTo();}
		_InputHandlr_Battle[_KeyDef.down]=function(){UpCursorMenu();MoveCursorTo();}
		_InputHandlr_Battle[_KeyDef.left]=function(){AddMenuToStack(_Defend_Menu);} 
		_InputHandlr_Battle[_KeyDef.right]=function(){AddMenuToStack(_RwChng_Menu);}
		_InputHandlr_Battle[_KeyDef.A]=function(){SelectCursorMenu(ReturnCurrentPlayer());}

	var _InputHandlr_Double=[];// This type of array is used in the magic menu, item menu etc...

		// some problem here...
		_InputHandlr_Double[_KeyDef.up]=function(){DownCursorDouble();MoveCursorTo();}
		// some problem here...
		
		_InputHandlr_Double[_KeyDef.down]=function(){UpCursorDouble();MoveCursorTo();}/**/
		_InputHandlr_Double[_KeyDef.left]=function(){LeftCursorDouble();MoveCursorTo();}
		_InputHandlr_Double[_KeyDef.right]=function(){RightCursorDouble();MoveCursorTo();}
		
		_InputHandlr_Double[_KeyDef.A]=function(){SelectCursorMenu(ReturnCurrentPlayer());}
		_InputHandlr_Double[_KeyDef.B]=function(){RemoveMenuFromStack();}

	var _InputHandlr_Target=[];// This array is used when a pg must be selected as a target for an action.
		_InputHandlr_Target[_KeyDef.up]=function(){DownCursorMenu();MoveCursorTo();}
		_InputHandlr_Target[_KeyDef.down]=function(){UpCursorMenu();MoveCursorTo();}
		_InputHandlr_Target[_KeyDef.left]=function(){DownCursorMenu();MoveCursorTo();}
		_InputHandlr_Target[_KeyDef.right]=function(){UpCursorMenu();MoveCursorTo();}
		_InputHandlr_Target[_KeyDef.A]=function(){Target_Selection_Menu();}
		_InputHandlr_Target[_KeyDef.B]=function(){
			RemoveMenuFromStack();
		}
/*------------------------*/