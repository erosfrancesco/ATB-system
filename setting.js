/*Source and font paths. A nasty bi...*/var AbsPath='./';

var _Ass={};
	_Ass.path=AbsPath+'assets/';
	_Ass.font=_Ass.path+'sixTekBlack.ttf';
	_Ass.curs=_Ass.path+'FFcurs.png';
	_Ass.bckg=_Ass.path+'Backgrounds/';

/*Those set the width, height and position of GameWrapper*/var _S={};
	_S.hei=600;
	_S.wid=800;
	_S.pox=10;
	_S.poy=10;

/*Up, Down, Left, Right etc*/var _KeyDef={};
	_KeyDef.up=38; // up arrow
	_KeyDef.down=40; // down arrow
	_KeyDef.left=37; // left arrow
	_KeyDef.right=39; // right arrow
	_KeyDef.pause=32; // space bar
	_KeyDef.A=90; // z
	_KeyDef.B=88; // x
	_KeyDef.C=67; // c

/*Menu DOM options*/var _Menu_Options={
	backgroundColor:'rgba(73,73,203,1)',//'grey',
	textColor:'#D2D2D2',//'blue', //#D2D2D2
	inactiveColor:'#252525'//'yellow', //#252525
};