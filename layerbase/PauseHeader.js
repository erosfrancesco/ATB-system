var PauseWrp;
//=new WrapperObj('PauseWrpid');

function SetPauseWrp(){
	PauseWrp=new WrapperObj('PauseWrpid');

	PauseWrp.DOMRef.className='_PauseWrapper expandsize absol';

	var wrp=document.createElement('div');
	wrp.className='menu absol';
	
	var div=document.createElement('div');
	div.style.width='100%';
	div.style.height='100%';
	wrp.appendChild(div);

	var dec=document.createElement('div');
	wrp.appendChild(dec);

	var txt=document.createElement('div');
	txt.className='menulist1';
	txt.innerHTML='PAUSE';
	txt.style.color=_Menu_Options.textColor;
	txt.style.top='16%';
	div.appendChild(txt);

	PauseWrp.DOMRef.appendChild(wrp);


	PauseWrp.Pause=function(){
		PauseWrp.DOMRef.focus();
		PauseWrp.DOMRef.style.visibility='visible';
		CurrentWrapper().DOMRef.style.zIndex=0;
		this.DOMRef.style.zIndex=2;
	};

	PauseWrp.Resume=function(){
		CurrentWrapper().DOMRef.style.zIndex=1;
		PauseWrp.DOMRef.style.visibility='hidden';
		this.DOMRef.style.zIndex=0;
		CurrentWrapper().DOMRef.focus();};
	}

//SetPauseWrp();


var PrePauseIn=[];
PrePauseIn[_KeyDef.pause]=function(){
	WrapperRef._P=(!WrapperRef._P);
	if(WrapperRef._P){
		ResumePhasesOf(CurrentWrapper());
		PauseWrp.Resume();
		//ResumeAllAudio()
	}else{
		BlockAllPhaseOf(CurrentWrapper());
		//PauseAllAudio();
		PauseWrp.Pause();
	}
};
