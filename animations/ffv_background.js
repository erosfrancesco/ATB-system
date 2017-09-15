/*This is the root*/function SetFFVChaosPlanetarium(){

	var _Back_Ref=PlayerPool.Background;
	var starC1='rgba(255,255,255,0.8)';
	var starC2='rgba(152,152,202,0.5)';
	var repeatC2='rgba(0,0,0,1)';
	var repeatC1='rgba(215,215,215,1)';

	var eclipseGradient='radial-gradient(ellipse at center, '+starC1+' 0%,'+starC2+' 35%,'+'rgba(0,0,0,0) 75%)';
	var repeatingGradient='repeating-linear-gradient(180deg,'+repeatC2+','+repeatC1+' 8%, '+repeatC2+' 16%)';

	setHueFilterBackground(_Back_Ref.DOM.Filter);
	setVelocityWrapper(_Back_Ref,3,10,repeatingGradient);
	setStarsBackground(_Back_Ref,eclipseGradient);		

	var proportions=5;
	startChangingVelocityLoop(_Back_Ref,proportions*200);
	startChangingColorLoop(_Back_Ref,proportions*400);
	
	}
/*----------------*/

/*This part cover the hue filter*/function setHueFilterBackground(_Filter){
	_Filter.aValue=0.8;
			
	_Filter.updateR=function(delta,l1,l2){
		if(delta > 0 && this.rValue < l1){this.rValue+=delta;}
		if(delta < 0 && this.rValue > l2){this.rValue+=delta;}
	}

	_Filter.updateG=function(delta,l1,l2){
		if(delta > 0 && this.gValue > l1){this.gValue-=delta;}
		if(delta < 0 && this.gValue < l2){this.gValue-=delta;}
	}

	_Filter.updateB=function(delta,l1,l2){
		if(delta > 0 && this.bValue > l1){this.bValue-=delta;}
		if(delta < 0 && this.bValue < l2){this.bValue-=delta;}
	}
	
	//this function make sure the ambient is not too bright
	_Filter.checkLuminosity=function(limitL,limitC,delta){
		if( (this.rValue + this.gValue + this.bValue > limitL) 
			&& (this.rValue + this.gValue > limitC) 
			&& (this.gValue + this.bValue > limitC)
			&& (this.rValue + this.bValue > limitC) ){

			this.rValue-=delta;
			this.gValue-=delta;
			this.bValue-=delta;
		}
	}
	}

	function startChangingColorLoop(_Back_Ref,freq){

		_AddGenericAdditiveOscillation(_Back_Ref,'ColorChange',20,freq,(val)=>{
			_Back_Ref.DeltaHue=val;
			UpdatePlanetariumColor(_Back_Ref.DOM.Filter,_Back_Ref.DeltaHue);			
			_Back_Ref.DOM.Filter.compute();

		});
	}

	function UpdatePlanetariumColor(_Filter,delta){

		switch (RetRandom(1,105)){
			case 1:
				_Filter.updateR(delta,144,164);
			break;;
			case 2:
				_Filter.updateG(delta,74,74);
			break;;
			case 3:
				_Filter.updateB(delta,164,164);
			break;;

			case 4:
				_Filter.updateG(-delta,delta,74);
				_Filter.updateB(-delta,delta,164);
			break;;

			case 5:
				_Filter.updateG(-delta,delta,74);
				_Filter.updateR(-delta,delta,144);
				_Filter.updateB(delta,164,delta);
			break;;
			default:
			break;;
		}
		
		_Filter.checkLuminosity(155,70,20);
	}
/*------------------------------*/

/*This part cover planetarium stars*/function setStarsBackground(_Back_Ref,eclipseGradient){
	_Back_Ref.DOM.Stars=[];
	_Back_Ref.StarBoolCheck=true;

	StarCluster(_Back_Ref,-50,-50,eclipseGradient);
	StarCluster(_Back_Ref,450,110,eclipseGradient);
	StarCluster(_Back_Ref,750,420,eclipseGradient);
	PhaseLoop('StarPosUpdate',()=>{
		UpdatePlanetariumStars(_Back_Ref,_Back_Ref.DOM.Ref.offsetWidth,_Back_Ref.DOM.Ref.offsetHeight,10,100);
	});
	}

	function StarCluster(_Back_Ref,x,y,starGradient){
		StarsIntoArea1(_Back_Ref,100+x,20+y,starGradient);
		StarsIntoArea1(_Back_Ref,220+x,120+y,starGradient);
		StarsIntoArea1(_Back_Ref,280+x,280+y,starGradient);
	}

	function StarsIntoArea1(_Back_Ref,x,y,starGradient){
		AttachStandardStar(_Back_Ref,'3%','25%',0+x,40+y,starGradient);
		AttachStandardStar(_Back_Ref,'3%','25%',-50+x,100+y,starGradient);
		AttachStandardStar(_Back_Ref,'3%','25%',100+x,0+y,starGradient);
	}

	function AttachStandardStar(_Back_Ref,height,width,dx,dy,starGradient){

		var star=document.createElement('div');
		star.style.position='absolute';
		star.style.width=width;
		star.style.height=height;
		star.style.background=starGradient;

		_Back_Ref.DOM.Ref.appendChild(star);
		_Back_Ref.DOM.Stars.push(star);
		MoveInDirection(star,dx,dy);

		star.updatePosition=function(vx,vy,limitW,limitH){
				
			MoveInDirection(star,vx,vy);

			if(star.offsetTop > limitH){
				MoveInDirection(star,0,-limitH-star.offsetHeight);
			}else{if(star.offsetTop < -star.offsetHeight){
				MoveInDirection(star,0,limitH+star.offsetHeight);
			}}

			if(star.offsetLeft > limitW+star.offsetWidth){
				MoveInDirection(star,-limitW-(star.offsetWidth*2),0);
			}else{if(star.offsetLeft < -star.offsetWidth){
				MoveInDirection(star,limitW+star.offsetWidth,0);
			}}
		}
	}

	function UpdatePlanetariumStars(_Back_Ref,limitx,limity,limitO,prob){
		
		if(_Back_Ref.StarBoolCheck){
			_Back_Ref.VelStarY=_Back_Ref.Vel*2/3;
			if(RetRandom(1,prob) < 2){
				_Back_Ref.StarBoolCheck=false;
			}
		}else{
			if( (_Back_Ref.VelStarY < -limitO) || (_Back_Ref.VelStarY > limitO) ){
				_Back_Ref.StarBoolCheck=true;
			}
			// here let's make _Back_Ref.VelStarY oscillate
			_Back_Ref.VelStarY-=(_Back_Ref.Vel*2/3)/50;
		}
		
		_Back_Ref.VelStarX=_Back_Ref.Vel*3;
		_Back_Ref.DOM.Stars.forEach((star,indx)=>{
			star.updatePosition(_Back_Ref.VelStarX,_Back_Ref.VelStarY,limitx,limity);
		});
	}
/*---------------------------------*/

/*This part cover background*/function setVelocityWrapper(_Back_Ref,initV,limitV,repeatG){
	_Back_Ref.Vel=initV;
	_Back_Ref.limitVel=limitV;
	var d=document.createElement('div');
	_Back_Ref.DOM.Ref.appendChild(d);
	_Back_Ref.DOM.VelWrap=d;
	
	d.style.width='100%';
	d.style.height='200%';
	d.style.position='absolute';
	d.style.top='5%';
	d.style.zIndex= -1;
	d.style.backgroundImage=repeatG;
	}

	function startChangingVelocityLoop(_Back_Ref,freq){

		_AddGenericAdditiveOscillation(_Back_Ref,'VelocityChange',0.04,freq,(val)=>{
			_Back_Ref.DeltaVel=(val*val*val)*100*100;
			UpdatePlanetariumVelocity(_Back_Ref,_Back_Ref.DeltaVel,_Back_Ref.limitVel),
			CalcBackgroundPosition(_Back_Ref,32,_Back_Ref.DOM.Ref.offsetHeight);
		});
	}

	function UpdatePlanetariumVelocity(_Back_Ref,delta,limitV){

		if(delta>0){
			if(_Back_Ref.Vel <= limitV){_Back_Ref.Vel+=(delta);}
		}else{
			if(_Back_Ref.Vel >= -limitV){_Back_Ref.Vel+=(delta);}
		}
	}


	function CalcBackgroundPosition(_Back_Ref,height,limitH){

		var div=_Back_Ref.DOM.VelWrap;
		div.style.top=div.offsetTop+_Back_Ref.Vel;

		if(_Back_Ref.Vel>0){if( div.offsetTop >= (-height*100/limitH) ){div.style.top= -limitH+1;}
		}else{if( div.offsetTop <= -limitH ){div.style.top= -1;}}
	}
/*--------------------------*/	