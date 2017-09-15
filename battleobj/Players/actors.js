/**/var E0=_default_player_polyfill();
	E0.Name='FlareMncer';

	E0.SpriteSource=FlaremancerSprite;
	E0.Width=150/8+'%';
	E0.Height=150/6+'%';
	
	E0.Enemy=true;
	E0.Pattern=function(){DefendPattern(this);/**/};
	E0.Counter=function(doer,dmg){InflictDamage(dmg.exec,StandardEnemyDamageGenerator(dmg.exec,doer));/**/};
	
	E0.Commands=[C_FIGHT,C_ITEMS];
	E0.Stats={mlif:100,lif:100,man:100,atk:10,def:0,mag:12,dfm:8,vel:4,hit:10,liv:20,};
	E0.Bonuses={lif:0,man:0,atk:0,def:0,mag:0,dfm:0,vel:0,hit:0,liv:0,};



/**/var E1=_default_player_polyfill();
	E1.Name='Bill';
	E1.SpriteSource=BillSprite;
	E1.Width=150/8+'%';
	E1.Height=150/6+'%';
	E1.Pattern=function(){BillPattern(this);};
	E1.Enemy=true;

	E1.Commands=[C_FIGHT,C_ITEMS];
	E1.Stats={mlif:100,lif:100,man:100,atk:10,def:0,mag:12,dfm:8,vel:4,hit:10,liv:20,};
	E1.Bonuses={lif:0,man:0,atk:0,def:0,mag:0,dfm:0,vel:0,hit:0,liv:0,};
	


/**/var E2=_default_player_polyfill();
	E2.Name='Kefka';
	E2.SpriteSource=KefkaSprite;
	E2.Width=390/8+'%';
	E2.Height=390/6+'%';
	E2.Pattern=function(){ForsakenPattern(this);};
	E2.Enemy=true;

	E2.Commands=[C_FIGHT,C_ITEMS];
	E2.Stats={mlif:100,lif:100,man:640,atk:10,def:0,mag:12,dfm:8,vel:4,hit:10,liv:20,};
	E2.Bonuses={lif:0,man:0,atk:0,def:0,mag:0,dfm:0,vel:0,hit:0,liv:0,};
	E2.Counter=function(doer,dmg){InflictDamage(dmg.exec,StandardEnemyDamageGenerator(dmg.exec,doer));};
	


/**/var ExBard=_default_player_polyfill();
	ExBard.Name='Ex-Bard';
	ExBard.SpriteSource=ExBardSprite;
	ExBard.Width=(425/8)*(1.2)+'%';
	ExBard.Height=(275/6)*(1.2)+'%';

	ExBard.Pattern=function(){};
	ExBard.Enemy=true;

	ExBard.Commands=[C_FIGHT,C_ITEMS];
	ExBard.Stats={mlif:100,lif:100,man:640,atk:10,def:0,mag:12,dfm:8,vel:4,hit:10,liv:20,};
	ExBard.Bonuses={lif:0,man:0,atk:0,def:0,mag:0,dfm:0,vel:0,hit:0,liv:0,};
	ExBard.Counter=function(doer,dmg){InflictDamage(dmg.exec,StandardEnemyDamageGenerator(dmg.exec,doer));};



/**/var Bard=_default_player_polyfill();

	Bard.Name='Bard';
	Bard.SpriteSource=BardSprite;
	Bard.Width=390/8+'%';
	Bard.Height=390/6+'%';

	Bard.Pattern=function(){};
	Bard.Enemy=true;

	Bard.Commands=[C_FIGHT,C_ITEMS];
	Bard.Stats={mlif:640,lif:640,man:600,atk:15,def:4,mag:17,dfm:2,vel:3,hit:10,liv:7};
	Bard.Bonuses={lif:0,man:0,atk:0,def:0,mag:0,dfm:0,vel:0,hit:0,liv:0,};


