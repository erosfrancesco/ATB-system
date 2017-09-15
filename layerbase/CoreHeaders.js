/*DOM thingamajigs. Will be set up in wrappers*/
	function SetGameWrapper(){
		var jDOM=document.createElement('div');
		jDOM.className='_GameWrapper expandsize absol';
		return jDOM;
	}/**/

	function CreateNewWrapper(id){
		var jDOM=SetGameWrapper();
		jDOM.id=id;
		return jDOM;
	}/**/
/*--------------------------------------------*/

/**/function RemoveDOM(x){if(x.parentNode){x.parentNode.removeChild(x);}}
	function RemoveAllChildsOf(x){while(x.firstChild){RemoveDOM(x.firstChild);}}


/*Animation tweaks*/window.requestAnimFrame=(function(){
	return window.requestAnimationFrame||window.webkitRequestAnimationFrame||
		window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,100/6);};})();
/*usage: (function animloop(){requestAnimFrame(animloop);render();})();*/


/*Input Managment Object*/var InputObj={SENS:10,CountIn:0,Key:0,J:0,Arr:[],};

	document.onkeydown=function(event){
		InputObj.Key= (event || window.event).keyCode;
		if(!(InputObj.Arr[InputObj.Key])){InputObj.Arr[InputObj.Key]=true;}
	};
	document.onkeyup=function(event){
		InputObj.CountIn=0;InputObj.Key= (event || window.event).keyCode;
		if(InputObj.Arr[InputObj.Key]){InputObj.Arr[InputObj.Key]=false;}
	};

	function InputFrom(arr,sens){
		for(InputObj.J in arr){
			if(InputObj.Arr[InputObj.J]){
				if(InputObj.CountIn==0){
					InputObj.CountIn=sens;
					arr[InputObj.J]();
				}else{
					InputObj.CountIn--;}
			}
		}
	}

	/*Check if a key is up*/function IsUpTheKey(k){return InputObj.Arr[k];}

/*----------------------*/

/**/function AnimatorObj(){
		this.hello=[];
		this.Phase=function(name,point,bool){bool=bool||true;this.hello[name]={Pointer:point,activ:bool}}
		this.ExecCicle=function(){for(var i in this.hello){if(this.hello[i].activ){this.hello[i].Pointer();}}}
		this.Cancel=function(name){delete this.hello[name];}
		this.Pause=function(name){this.hello[name].activ=false;}
		this.Resume=function(name){this.hello[name].activ=true;}
		this.ModPhase=function(name,fun){this.hello[name].Pointer=fun;}
		this.CheckIfExist=function(name){if(this.hello[name]){return true;}else{return false;}}
		}

	function Buttler(){
		this.Pool=[];
		this.bool=true;
		var d=this;
		
		this.Run=function(){
			this.Pool[0]();
			this.Pool.shift();
		};
		this.Cicle=function(){
			if(d.Pool[0]&&d.bool){d.Run();}
		};

		this.Add=function(f){if(typeof(f)=='function'){d.Pool.push(f);}};
		this.PauseFor=function(n){
			n=n||33; //1 second pause, more or less
			d.CicleFor(n,()=>{}); // can't use this inside a CicleFor
		};

		this.CicleFor=function(n,callback,end){ // can't pass n as a parameter. Also can't use PauseFor inside this;
			while(n){
				n--;
				d.Add(callback);
			}
		};
	}
/**/


/*Some functions for randomness*/function RetRandom(x,y){return Math.floor(Math.random()*(y-x+1)+x);}
	function CasualProb(x){if(x > RetRandom(1,101)){return true;}else{return false;}}
	//CasualProb(25) has 25% of probability to return true. Return false on 75% of cases
/*-----------------------------*/


/*Copying an object in javascript is not easy! See deep cloning for more info.
  This function simply return a copy of an object.*/function deepClone(o){
	var _out,v,_key;
	if(Array.isArray(o)){_out=[];}else{_out={};}

	for(_key in o){
		v=o[_key];
		if(typeof v === "object"){_out[_key]=deepClone(v);}else{_out[_key]=v;}
	}
	
	return _out;
	}
/*---------------------------------------------------------------------------*/


/*Some function for graphical computations*/function ReturnGraphicsOf(DOM){
	return {
		top: DOM.offsetTop,
		left: DOM.offsetLeft,
		width: DOM.offsetWidth,
		height: DOM.offsetHeight,
	}
}


