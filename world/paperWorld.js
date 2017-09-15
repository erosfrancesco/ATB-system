/**/var back_paper=PaperWall('0%','0%','100%','100%');

	back_paper.appendTo();
	back_paper.DOM.Ref.style.background='#111111';/**/

	var wrapper_perspective=_SetBaseOfWalls('20%','10%','75%','75%');
	wrapper_perspective.appendTo();



	var floor1=PaperWall('0%','0%','100%','100%');
	floor1.appendTo(wrapper_perspective.attach());

	floor1.DOM.Ref.style.backgroundImage='url("FloorTile.png")';
		


	var floor1_obj1=PaperWall(239,350,12,10);
	floor1_obj1.appendTo(wrapper_perspective.attach());
	floor1_obj1.DOM.Ref.style.backgroundImage='url("object_floor1.png")';

	//floor1_obj1.DOM.Ref.style.backgroundPosition='0% 1%';


	var wid_1=12/(800/50);
	var hei_1=10/(600/75);

	var floor1_obj2=PaperWall(299,350,12,10);
	floor1_obj2.appendTo(wrapper_perspective.attach());
	floor1_obj2.DOM.Ref.style.backgroundImage='url("object_floor1.png")';


	var wall_paper=PaperWall('0%','0%','100%','40%');
	wall_paper.appendTo(wrapper_perspective.attach());
	wall_paper.DOM.Ref.style.background='#4f4229';/**/


	var wrappertop_paper=PaperWall('0%','-4%','100%','4%');
	wrappertop_paper.appendTo(wrapper_perspective.attach());
	wrappertop_paper.DOM.Ref.style.background='#2c1f12';/**/

	var wrapperleft_paper=PaperWall('-2%','-4%','2%','104%');
	wrapperleft_paper.appendTo(wrapper_perspective.attach());
	wrapperleft_paper.DOM.Ref.style.background='#2c1f12';/**/


