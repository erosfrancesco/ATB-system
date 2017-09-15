/*Some SVG definitions and headers*/
	var _Default_Glitter_Color1='white';
	var _Default_Glitter_Color2='gold';
	var _Default_Glitter_id1='url(#starGrad1)';
	var _Default_Glitter_id2='url(#starGrad2)';

	var _Default_Glitter_dx=20;
	var _Default_Glitter_dy=20;
	var _Default_Glitter_nCount=5;

	(function(){
		var outStarGradient=CreateNS('radialGradient');
		outStarGradient.setAttributeNS(null,'id','starGrad');
		LoadSVGObject(outStarGradient);
		
		var color1=CreateNS('stop');
		outStarGradient.appendChild(color1);
		color1.setAttributeNS(null,'stop-color',_Default_Glitter_Color2);

		var color2=CreateNS('stop');
		outStarGradient.appendChild(color2);
		color2.setAttributeNS(null,'stop-color','transparent');
		color2.setAttributeNS(null,'offset','200%');


		var internalStarGrad=CreateNS('radialGradient');
		internalStarGrad.setAttributeNS(null,'id','starGrad2');
		LoadSVGObject(internalStarGrad);
		
		var color1=CreateNS('stop');
		internalStarGrad.appendChild(color1);
		color1.setAttributeNS(null,'stop-color',_Default_Glitter_Color1);

		var color2=CreateNS('stop');
		internalStarGrad.appendChild(color2);
		color2.setAttributeNS(null,'stop-color',_Default_Glitter_Color2);
		color2.setAttributeNS(null,'offset','25%');
	}());


	function BiezerStarPath(width,height,fill){
		width=width||5;
		height=height||5;
		fill=fill||'yellow';

		var s=ReturnViewBoxSVG(width,height);
		var p=CreateNS('path');
		s.firstChild.appendChild(p);


		var string='M '+(0)+' '+(50);
		var p1='C '+(50)+' '+(50)+', '+(50)+' '+(50)+', '+(50)+' '+(0)+' ';string+=p1;
		var p2='C '+(50)+' '+(50)+', '+(50)+' '+(50)+', '+(100)+' '+(50)+' ';string+=p2;
		var p3='C '+(50)+' '+(50)+', '+(50)+' '+(50)+', '+(50)+' '+(100)+' ';string+=p3;
		var p4='C '+(50)+' '+(50)+', '+(50)+' '+(50)+', '+(0)+' '+(50)+' ';string+=p4;

		p.setAttributeNS(null,'d',string+'');

		p.style.fill=fill;
		return s;
	}


/*--------------------------------*/


/**/function CreateRandomGlitter(height,player,pdx,pdy){
	var s=CreateDefaultGlitter(height);
	s.style.zIndex=10;
	MoveInDirection(s,(player.DOM.Ref.offsetWidth-height)*pdx/100,(player.DOM.Ref.offsetHeight-height)*pdy/100);
	return s;
	}

	function CreateDefaultGlitter(height){
		var s=BiezerStarPath(height,height,_Default_Glitter_id1);
		s.style.position='absolute';

		var j=BiezerStarPath(
			(100-(2*_Default_Glitter_dx))+'%',
			(100-(2*_Default_Glitter_dy))+'%',
			_Default_Glitter_id2);

		j.style.position='absolute';
		j.style.top=_Default_Glitter_dy+'%';
		j.style.left=_Default_Glitter_dx+'%';
		s.appendChild(j);
		return s;
	}
/**/


/**/function GlitterAnimation(player,height,color){
	color=color||_Default_Glitter_color;
	height=height||player.DOM.Ref.offsetHeight/5; // 20%

	player.Clock.Add(()=>{ // some setup

		player.AnimationRef.par=document.createElement('div');
		player.AnimationRef.par.className='expandsize';
		player.DOM.Ref.appendChild(player.AnimationRef.par);
		player.AnimationRef.par.arrayHolder=[];	
	
		// And a repeated animation
		//GlitterAnimationRepeat(player,height,_Default_Glitter_nCount,()=>{
			
			GlitterAnimationRepeat(player,height,_Default_Glitter_nCount,()=>{

				GlitterAnimationRepeat(player,height,_Default_Glitter_nCount,()=>{
					GlitterAnimationRepeat(player,height,_Default_Glitter_nCount,()=>{
						RemoveDOM(player.AnimationRef.par);
					});
				});
			});
		});
	//});
	}

	function GlitterAnimationRepeat(player,height,n,callback){
		player.Clock.Add(()=>{

				//Create n random glitter
				while(n){player.AnimationRef.par.arrayHolder[n]=CreateRandomGlitter(
						height,
						player,RetRandom(0,100),
						RetRandom(0,100));

					player.AnimationRef.par.appendChild(player.AnimationRef.par.arrayHolder[n]);
					n--;
				}
				
				//Animate all glitters
				player.Clock.PauseFor(8);
				player.Clock.Add(()=>{player.AnimationRef.par.arrayHolder.forEach((glitter)=>{
					// animate every glitter here...
					Rotate(glitter.style,45);
				});});
				player.Clock.PauseFor(8);

				//Remove them and call the callback function
				player.Clock.Add(()=>{RemoveAllChildsOf(player.AnimationRef.par);});
				player.Clock.Add(()=>{callback();});
			});	
	}
/**/