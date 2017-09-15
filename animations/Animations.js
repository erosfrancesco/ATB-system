function ClearEfx(img){img.webkitFilter="";}
function ClearTrasform(img){img.webkitTransform="";}

function Mirror(img){img.webkitTransform="scaleX(-1)";}
function FlipOver(img){img.webkitTransform="scaleY(-1)";}
function Rotate(img,x){img.webkitTransform="rotate("+x+"deg)";}

function AlphaEfx(img,per){img.webkitFilter+='opacity('+(100-per)+'%)';}
function Brighten(img,per){img.webkitFilter+='brightness('+(100+per)+'%)';}
function Saturate(img,val){img.webkitFilter+='saturate('+(1+(val/100))+')';}
function SwapPltt(img,deg){img.webkitFilter+='hue-rotate('+deg+'deg)';}
function SepiaEfx(img,per){img.webkitFilter+='sepia('+per+'%)';}
function Contrast(img,per){img.webkitFilter+='contrast('+(100+per)+'%)';}

function Colorize(img,deg){SepiaEfx(img,100);SwapPltt(img,deg);Saturate(img,100);}
function IterateEfx(f,n,x){var s=0;while(s<n){x.push(function(){});x.push(f);s++}}

function ColorFilterOver(imgcss,swap,saturation,contrast,brightness){
	SwapPltt(imgcss,swap||0);
	Saturate(imgcss,saturation||0);
	Contrast(imgcss,contrast||0);
	Brighten(imgcss,brightness||0);
}

function PurpleOver(img){Colorize(img,280);}
function GreenOver(img){Colorize(img,-318);}
function RedOver(img){Colorize(img,318);Saturate(img,150);Contrast(img,15);}
function YellowOver(img){Colorize(img,13);Brighten(img,30);Saturate(img,50);}
function BlueOver(img){Colorize(img,200);Saturate(img,50);}


function LightningEfx(img,x){x.push(function(){YellowOver(img);});
	IterateEfx(function(){Contrast(img,10);Brighten(img,7);},4,x);
	IterateEfx(function(){Brighten(img,-2);},4,x);
	x.push(function(){ClearEfx(img)});}

function DeathFadeEfx(imgcss,butler){
	butler.Add(()=>{PurpleOver(imgcss);});
	butler.PauseFor(4);
	var s=30;
	while(s){
		butler.Add(()=>{AlphaEfx(imgcss,20)})
		s--;
	}
	butler.Add(()=>{imgcss.visibility='hidden';ClearEfx(imgcss);});
}

function _ObjectAnimationPlayerFactory(player, refName, animatorFun){

	player.Clock.Add(()=>{
		player.DOM.Ref.appendChild(player.AnimationRef[refName]);
		animatorFun(player.Clock,player.AnimationRef[refName]);
		player.Clock.Add(()=>{RemoveDOM(player.AnimationRef[refName]);delete player.AnimationRef[refName];});
	});

}

function PlayerDeathFadeEfx(sprite){}

