/**/var _Fantasy_Ground_W=150;var _Fantasy_Ground_H=200;



/**/var Knight=_default_player_polyfill();
	Knight.Name='[Knight]';
	Knight.SpriteSource=KnightSprite;
	Knight.Width=_Fantasy_Ground_W/8+'%';
	Knight.Height=_Fantasy_Ground_H/6+'%';
	Knight.Enemy=false; // this is redundant

	Knight.Commands=[C_FIGHT,C_ITEMS];
	Knight.Stats={mlif:11,lif:11,man:600,atk:5,def:14,mag:1,dfm:2,vel:2,hit:10,liv:7};
	Knight.Bonuses={lif:0,man:0,atk:0,def:0,mag:0,dfm:0,vel:0,hit:0,liv:0,};

	Knight.DeathAni=function(x){
		console.log(x.spriteRef);
		x.spriteRef.spritex++;
		x.spriteRef.calcBackgroundPosition();
		/*
			dummy.spritex=x||dummy.spritex;
			dummy.spritey=y||dummy.spritey;
			dummy.calcBackgroundPosition();
		*/
	};




/**/var Healer=_default_player_polyfill();
	Healer.Name='[Healer]';
	Healer.SpriteSource=HealerSprite;
	Healer.Width=_Fantasy_Ground_W/8+'%';
	Healer.Height=_Fantasy_Ground_H/6+'%';
	Healer.Classes=['Mage1'];
	Healer.Enemy=false;

	Healer.Commands=[C_FIGHT,C_ITEMS,C_RAISER];
	Healer.Stats={mlif:640,lif:640,man:650,atk:2,def:4,mag:17,dfm:2,vel:4,hit:10,liv:7};
	Healer.Bonuses={lif:0,man:0,atk:0,def:0,mag:0,dfm:0,vel:0,hit:0,liv:0,};
	
	


/**/var Monk=_default_player_polyfill();
	Monk.Name='[Monk]';
	Monk.SpriteSource=MonkSprite;
	Monk.Width=_Fantasy_Ground_W/8+'%';
	Monk.Height=_Fantasy_Ground_H/6+'%';
	Monk.Classes=['Monk'];
	Monk.Enemy=false;

	Monk.Commands=[C_FIGHT,C_ITEMS];
	Monk.Stats={mlif:1100,lif:1100,man:60,atk:16,def:8,mag:7,dfm:2,vel:4,hit:10,liv:7};
	Monk.Bonuses={lif:0,man:0,atk:0,def:0,mag:0,dfm:0,vel:0,hit:0,liv:0,};




/**/var Dragoon=_default_player_polyfill();
	Dragoon.Name='[Dragoon]';
	Dragoon.SpriteSource=DragoonSprite;
	Dragoon.Width=_Fantasy_Ground_W/8+'%';
	Dragoon.Height=_Fantasy_Ground_H/6+'%';
	Dragoon.Enemy=false;

	Dragoon.Commands=[C_FIGHT,C_ITEMS];
	Dragoon.Stats={mlif:120,lif:120,man:160,atk:17,def:4,mag:17,dfm:2,vel:5,hit:10,liv:7};
	Dragoon.Bonuses={lif:0,man:0,atk:0,def:0,mag:0,dfm:0,vel:0,hit:0,liv:0,};
	
	


/**/var Wizard=_default_player_polyfill();
	Wizard.Name='[Wizard]';
	Wizard.SpriteSource=WizardSprite;
	Wizard.Width=_Fantasy_Ground_W/8+'%';
	Wizard.Height=_Fantasy_Ground_H/6+'%';
	Wizard.Classes=['Wizard1'];
	Wizard.Enemy=false;

	Wizard.Commands=[C_FIGHT,C_MAGIC,C_ITEMS];
	Wizard.Stats={mlif:100,lif:100,man:160,atk:17,def:4,mag:23,dfm:8,vel:5,hit:10,liv:7};
	Wizard.Bonuses={lif:0,man:0,atk:0,def:0,mag:0,dfm:0,vel:0,hit:0,liv:0,};
	

