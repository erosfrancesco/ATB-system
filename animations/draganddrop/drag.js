/**/
	var dragging_Obj;
	var point_Ref=[];
/**/

/**/function create_draggable_point_dot(){
	var s=document.createElement('div');
	s.className='dotPosition';
	return s;
	}

/**/function set_drag_drop(obj,callback){

	callback=callback || function(x,y){};
	obj.ady=obj.offsetTop+6;
	obj.adx=obj.offsetLeft+102;

	obj.onmouseup=function(e){obj.isDown=false;}

	obj.onmousedown=function(e){
		var rect=obj.getBoundingClientRect();
		obj.dx=rect.left-e.clientX;
		obj.dy=rect.top-e.clientY;
		obj.isDown=true;
		dragging_Obj=this;
	}

	document.onmousemove=function(e){
		if(dragging_Obj && dragging_Obj.isDown){
			var positions=calc_position_of_dragging(dragging_Obj,e.pageX,e.pageY);
			dragging_Obj.style.left=positions[0];
			dragging_Obj.style.top=positions[1];
			callback(dragging_Obj);
		}
	}
	}

function calc_position_of_dragging(obj,x,y){return [ x-obj.adx+obj.dx, y-obj.ady+obj.dy ];}
/**/