/**/function _standardBanner(player,txt){ // this is executed when a magic or special ability is performed.

	player.Clock.Add(()=>{_DrawBanner(txt);});
	player.Clock.PauseFor(24);
	player.Clock.Add(()=>{_RemoveBanner();});
	}
/**/


/**/function _speechBanner(player,speech,callback){ // this is used for talk.

	callback=callback || _default_banner_remove_callback;

	player.keepTheSmoothTalk={speech:speech,letters:speech[0]};
	_DrawBanner('');

	_battle_talkative_parser(player.Clock,speech.length-1,player.keepTheSmoothTalk);
	callback(player,speech);
	}

	function _battle_talkative_parser(clock,iter,anchor){

		while(iter){
			iter--;
			clock.PauseFor(4);
			clock.Add(()=>{
				var letter=anchor.speech[anchor.letters.length];
				
				if( letter == '#'){letter='';} // could set up a lot here. Maybe not...

				anchor.letters+=letter;
				_Banner_Menu.DOM.Ref.TXT.innerHTML=anchor.letters;
			});
		}
	}

	function _default_banner_remove_callback(player){

		player.Clock.PauseFor(30);
		player.Clock.Add(()=>{
			_RemoveBanner();
			delete player.keepTheSmoothTalk;
		});
	}
/**/


/**/function _DrawBanner(text){ // DOM
	SetMenuBackground(_Banner_Menu);

	var div=document.createElement('div');
	div.style.width='100%';
	div.style.height='100%';
	_Banner_Menu.DOM.Ref.appendChild(div);

	var dec=document.createElement('div');
	_Banner_Menu.DOM.Ref.appendChild(dec);

	var txt=document.createElement('div');
	txt.className='menulist1';
	_Banner_Menu.DOM.Ref.TXT=txt;
	txt.innerHTML=text;
	txt.style.top='15%';
	div.appendChild(txt);
	}

	function _RemoveBanner(){RemoveDOM(_Banner_Menu.DOM.Ref);}
/**/