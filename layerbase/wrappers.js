/*The parent of all*/var _Gm_Parent=SetGameWrapper();
	_Gm_Parent.style.width= (_S.wid||800)+'px';
	_Gm_Parent.style.height= (_S.hei||600)+'px';

	_Gm_Parent.style.left= (_S.pox||10)+'px';
	_Gm_Parent.style.top= (_S.poy||10)+'px';
	
	document.body.appendChild(_Gm_Parent);

	function CreateWrapperDOM(id){
		var j=CreateNewWrapper('WrapperTest');
		_Gm_Parent.appendChild(j);
		return j;
	}

	function AppendToWrapper(x){CurrentWrapper().appendChild(x);}

/*-----------------------*/

/*Random generator based on previous random. More entropy!!*/
	var _Random={
		Pool:[RetRandom(0,9),
		RetRandom(10,99),
		RetRandom(99,999)],
		Seed:(RetRandom(0,1000)),
		Between:function(min,max){
			var Nn=(_Random.Pool[0]+_Random.Pool[1]+_Random.Pool[2])/
				(_Random.Pool[2]+_Random.Pool[1]+_Random.Pool[0]+_Random.Seed);

			_Random.Pool[3]=Math.floor(Nn*1000);
			_Random.Pool.shift();
			_Random.Pool[0]%=10;
			_Random.Pool[1]%=100;

			_Random.Seed=RetRandom(0,_Random.Pool[2]);
			Nn=Math.floor(Nn*(max-min+1)+min);

			return Nn;	
		},
	};
/*---------------------------------------------------------*/


/*This object is an important one!*/
	var WrapperRef={
		LoadedAll:false,
		_P:true,
		ArrayRef:[],

		ParentFunction:function(){},
	
		Set:function(x){
			WrapperRef.IdRef=x;
			FocusPatch();
			(WrapperRef.CicleRef=function(){
				requestAnimFrame(WrapperRef.CicleRef);
				InputFrom(PrePauseIn);
				//console.log(CurrentWrapper());
				CurrentWrapper().Animat.ExecCicle();
			})();
		},
		
		Swap:function(x){

			CurrentWrapper().DOMRef.style.zIndex=0;
			CurrentWrapper().DOMRef.style.visibility='hidden';
		
			WrapperRef.IdRef=x;
			CurrentWrapper().DOMRef.style.zIndex=2;
			CurrentWrapper().DOMRef.style.visibility='visible';
			FocusPatch();
		
			ResumePhasesOf(CurrentWrapper());
		},

		Phase:function(name,fun){CurrentWrapper().Animat.Phase(name,fun);},
		Pause:function(name){CurrentWrapper().Animat.Pause(name);},
		Cancel:function(name){CurrentWrapper().Animat.Cancel(name);},
		Resume:function(name){CurrentWrapper().Animat.Resume(name);},
		ModPhase:function(name,fun){CurrentWrapper().Animat.ModPhase(name,fun);},
		CheckPhase:function(name){return CurrentWrapper().Animat.CheckIfExist(name);}
	};

	function CurrentWrapper(){return WrapperRef.ArrayRef[WrapperRef.IdRef];}
	function ReturnCurrentWrapper(){return CurrentWrapper().DOMRef;}
/*--------------------------------*/


/**/
	function WrapperObj(id){
		this.DOMRef=CreateWrapperDOM(id);
		this.idRef=id;
		WrapperRef.ArrayRef[id]=this;

		this.Animat=new AnimatorObj();

		this.ResetLoop=function(notToBeReset){
			notToBeReset=notToBeReset||'';
			this.Animat.DummyPause=[];
			console.log(this.Animat);
			this.Animat.hello.forEach((phase)=>{
				if(!(phase==notToBeReset)){this.Animat.Cancel(i);}
			});
		},

		this.CancelAllDOM=function(){
			while(this.DOMRef.firstChild){this.DOMRef.removeChild(this.DOMRef.firstChild);}
		}
	}
/**/

/**/function SwitchToWrapper(x){
	BlockAllPhaseOf(CurrentWrapper());
	WrapperRef.LoadedAll=false;
	WrapperRef._P=false;
	WrapperRef.Swap(x);
	WrapperRef._P=true;
	}

	function FocusPatch(){
		var wrap=CurrentWrapper();
		wrap.DOMRef.setAttribute('tabindex',0);

		if(!wrap.DOMRef.onblur){
			wrap.DOMRef.onblur=function(){
				if(WrapperRef._P){PrePauseIn[_KeyDef.pause]();}
			}
		}
	
		wrap.DOMRef.focus();
		/**/
	}

/**/
	function BlockAllPhaseOf(x){
		x.Animat.DummyPause=[];
		for(var i in x.Animat.hello){
			if(x.Animat.hello[i].activ){x.Animat.DummyPause.push(i);}
			WrapperRef.Pause(i);
		}
	}

	function ResumePhasesOf(x){

		for(var i in x.Animat.hello){
			if(x.Animat.hello[i].activ){x.Animat.DummyPause.push(i);}
			WrapperRef.Pause(i);
		}

		for(var i in x.Animat.DummyPause){
			WrapperRef.Resume(x.Animat.DummyPause[i]);
		}

	
	}

	function PhaseLoop(id,fun){WrapperRef.Phase(id,fun);}
	function RemovePhaseLoop(id){WrapperRef.Cancel(id);}
	function check_if_phase_exist(name){return WrapperRef.CheckPhase(name);}
/**/

SetPauseWrp();
var BattleWrp=new WrapperObj('Default_Wrapper_Game');
//var WorldWrp=new WrapperObj('Hello_New_World');
WrapperRef.Set('Default_Wrapper_Game');