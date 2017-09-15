var AudioPool={};AudioPool.hello=[];

AudioPool.Add=function(id,x){this.hello[id]=x;this.hello[id].DOMRef=new Audio(x.src);}

AudioPool.Play=function(id,loop){this.hello[id].DOMRef.play();this.hello[id].isplaying=true;this.hello[id].INTRef=1;
	if(loop){(AudioPool.hello[id].INTRef=function(){
			requestAnimFrame(AudioPool.hello[id].INTRef);//sometime this one gets an error.
			//If a music is interrupted sometimes it does. Must check this one out, but for now, no prob bro
		
			CheckLoopForAudioObj(AudioPool.hello[id]);})();}}

AudioPool.Pause=function(id){this.hello[id].DOMRef.pause();this.hello[id].isplaying=false;}

AudioPool.Resume=function(id){this.hello[id].DOMRef.play();this.hello[id].isplaying=true;}

function CheckLoopForAudioObj(x){if(!(x.DOMRef.currentTime < x.dloop)){x.DOMRef.currentTime=x.dinit;}}

function PauseAllAudio(){AudioPool.dummyforPause=[];
	for(var i in AudioPool.hello){if(AudioPool.hello[i].isplaying){AudioPool.dummyforPause.push(i);};AudioPool.Pause(i);}}

function ResumeAllAudio(){for(var i in AudioPool.dummyforPause){AudioPool.Resume(AudioPool.dummyforPause[i]);}}
