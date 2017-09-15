function FocusPatch(){WrapperRef.ArrayRef[WrapperRef.IdRef].DOMRef.setAttribute('tabindex',0);
	if(!WrapperRef.ArrayRef[WrapperRef.IdRef].DOMRef.onblur){
	WrapperRef.ArrayRef[WrapperRef.IdRef].DOMRef.onblur=function(){if(WrapperRef._P){PrePauseIn[_KeyDef.pause]();}}}
	WrapperRef.ArrayRef[WrapperRef.IdRef].DOMRef.focus();}

var WrapperRef={
	LoadedAll:false,_P:true,ArrayRef:[],
	
	Set:function(x){WrapperRef.IdRef=x;FocusPatch();(WrapperRef.CicleRef=function(){requestAnimFrame(WrapperRef.CicleRef);
		InputFrom(PrePauseIn);WrapperRef.ArrayRef[WrapperRef.IdRef].Animat.ExecCicle();})();},
		
	Swap:function(x){
		WrapperRef.ArrayRef[WrapperRef.IdRef].DOMRef.style.zIndex=0;
		WrapperRef.ArrayRef[WrapperRef.IdRef].DOMRef.style.visibility='hidden';
		
		WrapperRef.IdRef=x;
		WrapperRef.ArrayRef[WrapperRef.IdRef].DOMRef.style.zIndex=2;
		WrapperRef.ArrayRef[WrapperRef.IdRef].DOMRef.style.visibility='visible';
		FocusPatch();
		
		ResumePhasesOf(WrapperRef.ArrayRef[WrapperRef.IdRef]);

	},

	Phase:function(name,fun){WrapperRef.ArrayRef[WrapperRef.IdRef].Animat.Phase(name,fun);},
	Pause:function(name){WrapperRef.ArrayRef[WrapperRef.IdRef].Animat.Pause(name);},
	Cancel:function(name){WrapperRef.ArrayRef[WrapperRef.IdRef].Animat.Cancel(name);},
	Resume:function(name){WrapperRef.ArrayRef[WrapperRef.IdRef].Animat.Resume(name);},
	ModPhase:function(name,fun){WrapperRef.ArrayRef[WrapperRef.IdRef].Animat.ModPhase(name,fun);},
	CheckLoad:function(){if(document.readyState === "complete"){return true;}else{return false;}},
};

function BlockAllPhaseOf(x){x.Animat.DummyPause=[];for(var i in x.Animat.hello){
	if(x.Animat.hello[i].activ){x.Animat.DummyPause.push(i);}WrapperRef.Pause(i);}}

function ResumePhasesOf(x){for(var i in x.Animat.DummyPause){WrapperRef.Resume(x.Animat.DummyPause[i]);}}


function CancelAllDOMOf(x){while(x.DOMRef.firstChild){x.DOMRef.removeChild(x.DOMRef.firstChild);}}

function SwitchWrapperObj(x){
	BlockAllPhaseOf(WrapperRef.ArrayRef[WrapperRef.IdRef]);WrapperRef.LoadedAll=false;
	WrapperRef._P=false;WrapperRef.Swap(x);WrapperRef._P=true;
}

function ReturnCurrentWrapper(){return document.getElementById(WrapperRef.IdRef);}

function PhaseLoop(id,fun){WrapperRef.Phase(id,fun);}

var PauseWrp=new WrapperObj('PauseWrpid');

function SetPauseWrp(){

	PauseWrp.DOMRef.className='_PauseWrapper';

	var wrp=document.createElement('div');
	wrp.className='menu';
	
	var div=document.createElement('div');
	div.style.width='100%';
	div.style.height='100%';
	wrp.appendChild(div);

	var dec=document.createElement('div');
	wrp.appendChild(dec);

	var txt=document.createElement('div');
	txt.className='menulist1';
	txt.innerHTML='PAUSE';
	txt.style.top='16%';
	div.appendChild(txt);

	PauseWrp.DOMRef.appendChild(wrp);


	PauseWrp.Pause=function(){
		PauseWrp.DOMRef.focus();
		PauseWrp.DOMRef.style.visibility='visible';
		WrapperRef.ArrayRef[WrapperRef.IdRef].DOMRef.style.zIndex=0;
		this.DOMRef.style.zIndex=2;
	};

	PauseWrp.Resume=function(){
		WrapperRef.ArrayRef[WrapperRef.IdRef].DOMRef.style.zIndex=1;
		PauseWrp.DOMRef.style.visibility='hidden';
		this.DOMRef.style.zIndex=0;
		WrapperRef.ArrayRef[WrapperRef.IdRef].DOMRef.focus();};
	}

SetPauseWrp();


var PrePauseIn=[];PrePauseIn[_KeyDef.pause]=function(){WrapperRef._P=(!WrapperRef._P);
	if(WrapperRef._P){ResumePhasesOf(WrapperRef.ArrayRef[WrapperRef.IdRef]);PauseWrp.Resume();ResumeAllAudio()
	}else{BlockAllPhaseOf(WrapperRef.ArrayRef[WrapperRef.IdRef]);PauseAllAudio();PauseWrp.Pause(50);}};
