/**/var MenuStack=[];

	var _Cursor_Menu={
		DOM:{x:0,y:0,Ref:''},
		spritesource:Cursor_Sprite
	};

	function RemoveCursor(){RemoveDOM(_Cursor_Menu.DOM.Ref);}

	function ReturnTopMenu(){return MenuStack[MenuStack.length-1]}
/**/

/**/function DrawBackMenu(x,y,wid,hei){
	x=x||0;y=y||0;wid=wid||0;hei=hei||0;
	var div=document.createElement('div');
	div.className='menu absol';
	div.style.width=wid;
	div.style.height=hei;
	div.style.top=y;
	div.style.left=x;
	/*optional graph here for the background-color*/
	div.style.backgroundColor=_Menu_Options.backgroundColor;
	/*--------------------------------------------*/
	var di2=document.createElement('div');
	di2.style.width='100%';
	di2.style.height='100%';
	/*optional graph here for the gradient*/
	//need to learn about linearGradient
	//di2.style.background='linear-gradient(to bottom, rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.85) 100%);';
	/*------------------------------------*/
	div.appendChild(di2);
	console.log(di2.style.background);
	var di3=document.createElement('div');
	div.appendChild(di3);
	div.style.zIndex=9;

	return div;
	}

	function SetScrollingWrapperOf(menuobj){
		menuobj.ScrollWrapp=document.createElement('div');
		menuobj.ScrollWrapp.style.position='absolute';

		menuobj.DOM.Ref.appendChild(menuobj.ScrollWrapp);//A div wrapper for scrolling
		menuobj.ScrollWrapp.style.width='100%';
		if((menuobj.Input==_InputHandlr_Double)){
			menuobj.ScrollWrapp.style.height=(100*((Math.floor(menuobj.Objects.length)/2)+2)/(menuobj.ScrollingMax+1))+'%';
		}else{
			menuobj.ScrollWrapp.style.height=(100*(menuobj.Objects.length+1)/(menuobj.ScrollingMax+1))+'%';
		}
	}

	function SetElementOfGenericMenu(menuobj,indx){	

		var div=document.createElement('div');
		div.className='menulist1';

		div.style.color=_Menu_Options.textColor;
		
		div.style.height=(100/menuobj.Objects.length)+'%';
		div.innerHTML=menuobj.Objects[indx].txt;	
		
		menuobj.DOM.Objects.push(div);//set a reference for cursor
		menuobj.ScrollWrapp.appendChild(div);
		if(!menuobj.Objects[indx].sel){div.style.color=_Menu_Options.inactiveColor;}//if a command is inactive
	}

	function SetElementOfDoubleMenu(menuobj,indx){

		var div=document.createElement('div');
		div.className='menulist2';

		div.style.height=(100/(Math.floor(menuobj.Objects.length+1)/2))+'%';
		div.innerHTML=menuobj.Objects[indx].txt;

		menuobj.DOM.Objects.push(div);//set a reference for cursor
		menuobj.ScrollWrapp.appendChild(div);
		if(!menuobj.Objects[indx].sel){div.style.color=_Menu_Options.inactiveColor;}//if a command is inactive
	}

	function SetElementOfMagicMenu(menuobj,indx){

		var div=document.createElement('div');
		div.className='menulist2';

		div.style.height=(100/(Math.floor(menuobj.Objects.length+1)/2))+'%';
		div.innerHTML=menuobj.Objects[indx].txt+' '+menuobj.Objects[indx].mana+'MP';

		menuobj.DOM.Objects.push(div);//set a reference for cursor
		menuobj.ScrollWrapp.appendChild(div);
		if(!menuobj.Objects[indx].sel){div.style.color=_Menu_Options.inactiveColor;}//if a command is inactive
	}


	function SetElementOfTargetMenu(indx){_Target_Menu.DOM.Objects.push(indx.DOM.Ref);}
/**/


/**/function _General_Scrolling(menu, top){
	menu=menu||ReturnTopMenu();
	if(top>0){top=0;}
	menu.ScrollWrapp.style.top=top*menu.DOM.Objects[0].offsetHeight;
	}

/**/function LoadCursorMenu(){
	_Cursor_Menu.DOM.Ref=document.createElement('div');
	_Cursor_Menu.DOM.Ref.className='Cursor absol';
	_Cursor_Menu.DOM.Ref.style.backgroundImage="url('"+_Ass.path+_Cursor_Menu.spritesource.src+"')";
	}

	function MoveCursorTo(x){
		x=x||ReturnTopMenu();
		x.DOM.Objects[x.CursorPosition].appendChild(_Cursor_Menu.DOM.Ref);
		_Cursor_Menu.DOM.Ref.style.zIndex=x.DOM.Ref.style.zIndex
	}

	function SelectCursorMenu(x){
		if(ReturnTopMenu().Objects[ReturnTopMenu().CursorPosition].sel){
			ReturnTopMenu().Objects[ReturnTopMenu().CursorPosition].cmd(x);
		}
	}
