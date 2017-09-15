function paperTile(wid,hei,x,y){
	var div=document.createElement('div');
	div.className='paperTile';

	div.style.top=y;
	div.style.left=x;
	div.style.width=wid;
	div.style.height=hei;

	this.DOM={x:x,y:y,wid:wid,hei:hei,Ref:div};
	this.append=function(){ReturnCurrentWrapper().appendChild(div);};

}

ReturnCurrentWrapper().style.perspective='300px';


var paper=new paperTile('50%','50%','25%','25%');
paper.append();

var wall1=new paperTile('50%','50%','-25%','-25%');
wall1.append();



paper.DOM.Ref.style.transform='rotateX(10deg)';
