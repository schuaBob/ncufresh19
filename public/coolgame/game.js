  


  
    //------------game---------------------------------
  var labbybutton_container;
  var generate_bird;
  var generate_fish;
  var generate_bubble;
  var stage;
  var backbround;
  var sea ;
  var fisherman;
  var t_boatmove_left;
  var t_boatmove_right;
  var b_left = false;
  var b_right = false;
  var fisherman_harpoon; 
  var times=0;
  var harpoon_list = new Array() ;
  var animal_list = new Array() ;
  var bubble_list =new Array();
  var loader ;
  var animalsource = new Array();
  var canvas_width = 800;
  var canvas_height=500;
  var canvas_seaheight=150;
  var gamestart =false;
  var fishman_walk;
  var generate_fish_ad;
  var fish_ad;
  createjs.Bitmap.prototype.getwidth = function(){
    return this.image.width * this.scaleX; 
  }
  createjs.Bitmap.prototype.getheight = function(){
    return this.image.height * this.scaleY; 
  }
  function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
 
 }
 
//Labby



    //------------game---------------------------------
    
  class Animal  extends createjs.Sprite{
    constructor(type,special){
      if(special)
        super(animalsource[type].spritesheet,"special");
      else
        super(animalsource[type].spritesheet,"normal");
      this.special=special;
      this.animaltype = type;
      stage.addChildAt(this,4);
    }
    move(){
      if(getrandom(1000)<5){
        this.dic *=-1;
        this.scaleX*=-1;
      };
      if(this.dic ==1)this.x += this.speed;
      else this.x-=this.speed;
    }
    catch(){
      clearInterval(this.t_move);
      animal_list = arrayRemove(animal_list,this);  
      this.gotoAndStop(this.special == true?"special_die":"normal_die");
    }
  }
  class harpoon extends createjs.Bitmap{
    constructor(){
      super(loader.getResult("harpoon"));
      this.moveable=false;
      this.regX = this.getwidth()/2;
      this.regY = this.getheight()/2;
      this.scaleX = this.scaleY =0.16;
      this.x = fisherman.x+25*(fisherman.scaleX<0?1:-1);
      this.y = fisherman.y-5;
      stage.addChildAt(this,2);
    }
    move(x,y,c,v){
      this.moveable =true;
      this.mx =x;
      this.my=y;
      this.mc=c;
      this.mv=v;
    }
    checkboom(){
      var i=0;
      for(i=0;i<bubble_list.length;i++){
        var pt =bubble_list[i].localToLocal(bubble_list[i].image.width/2,bubble_list[i].image.height/2,this); // 传递的是红色小球圆心位置
        if (this.hitTest(pt.x, pt.y)) {
          stage.removeChild(bubble_list[i]);
          this.moveable=false;
          bubble_list = arrayRemove(bubble_list,bubble_list[i]);  
          createjs.Tween.get(this).to({y:canvas_seaheight,rotation:(getrandom(2)==0?90:-90)},2000);
          return true;
        }
      }
      for(i=0;i<animal_list.length;i++){
        var pt =this.localToLocal(this.image.width/2,this.image.height,animal_list[i]); // 传递的是红色小球圆心位置
        if (animal_list[i].hitTest(pt.x, pt.y)) {
          // harpoon.regX = harpoon.image.width/2;
          // harpoon.reg = harpoon.image.height;
          this.moveable=false;
          harpoon_list= arrayRemove(harpoon_list,this);
          stage.removeChild(this);
          var diefish =   animal_list[i];
          //createjs.Tween.get(harpoon).to({y:canvas_seaheight,rotation:(getrandom(2)==0?90:-90)},animal_list[i].animaltype == 0?500:2000);
          createjs.Tween.get(diefish).to({y:canvas_seaheight,rotation:diefish.dic==1?180:-180},diefish.animaltype == 0?500:2000);
          animal_list[i].catch();
          return true;
        }
      }
      return false;
    }
  }
  class fish extends Animal{
    constructor(type,special){
      super(type,special);
      this.scale=0.12;
      this.speed=2;
      this.alpha=0.8;
      this.dic =1;
      if(getrandom(2) == 1){
        this.x = -100;
        this.dic =1;
      }
      else{ 
        this.x =canvas_width+100;
        this.dic =-1;
        this.scaleX *=-1;
      }
        this.width = animalsource[type].spritesheet.getFrame(animalsource[type].spritesheet.getAnimation(special==true?"special":"normal").frames[0]).rect.width;
        this.height = animalsource[type].spritesheet.getFrame(animalsource[type].spritesheet.getAnimation(special==true?"special":"normal").frames[0]).rect.height;
       // this.y=getrandom(300-(this.height*this.scale*2))+200+this.height*this.scale;
       //this.y=150-(this.height*this.scale*2)+200+this.height*this.scale;
      //  console.log(this.y);
      this.y=getrandom(275)+canvas_seaheight+50;
    }
  }
  class bird extends Animal{
    constructor(type,special){
      super(type,special);
      this.scale=0.16;
      this.speed=4;
      this.alpha=0.85;
      if(getrandom(2) == 1){
        this.x=-90;
        this.dic =1;
        this.scaleX *=-1;
      }
      else{ 
        this.x=canvas_width+ 90;
        this.dic =-1;
      }
      this.y=getrandom(50)+25;
    }
  }
  function mousemove(event) {
    var x = stage.mouseX- (fisherman_harpoon.x );
    var y = stage.mouseY - (fisherman_harpoon.y );
    var r_x=-1;
    var r_y=0;
    if(x<0)r_x=1;
    var c = Math.pow(x*x+y*y,0.5);
    var r = Math.acos(y/c);
    fisherman_harpoon.rotation = r_x*(r*180/Math.PI);
    stage.update();
  }
  function mousedown(event) {
    if(harpoon_list.length>10)return;
    var shoot_harpoon = new harpoon();
    var x = stage.mouseX- (shoot_harpoon.x );
    var y = stage.mouseY - (shoot_harpoon.y );
    var r_x=-1;
    if(x<0)r_x=1;
    var c = Math.pow(x*x+y*y,0.5);
    var r = Math.acos(y/c);
    shoot_harpoon.rotation = r_x*(r*180/Math.PI);
    shoot_harpoon.move(x,y,c,10);
    harpoon_list.push(shoot_harpoon);
  }
  function boatmove_left() {
    if(fisherman.x-fisherman.getwidth()/2<0)return;
    fisherman.x  -=2;
    fisherman_harpoon.x = fisherman.x-25;
    fisherman.scaleX*=fisherman.scaleX<0?-1:1;
    mousemove();
  }

  function boatmove_right(event) {
    if(fisherman.x-fisherman.getwidth()/2>canvas_width)return;
    clearInterval(event);
    fisherman.x  +=2;
    fisherman_harpoon.x = fisherman.x+25;
    fisherman.scaleX*=fisherman.scaleX<0?1:-1; 
    mousemove();
  }
  function keyDown(event) {
    if (event.keyCode == 37 || event.keyCode == 65 ) {
      if (!b_left) {
        t_boatmove_left = setInterval(boatmove_left, 20);
        b_left = true;
      }
    }
    else if (event.keyCode == 39|| event.keyCode == 68) {
      if (!b_right) {
        t_boatmove_right = setInterval(boatmove_right, 20);
        b_right = true;
      }
    }
    else if(event.keyCode == 32){
      mousedown();
    }
  }
  function getrandom(x){
    return Math.floor(Math.random()*x); 
  }
  function create_bubble(){
    //var bubble = new createjs.Bitmap(loader.getResult("bubble"+(getrandom(100)<=5?7:((getrandom(6)+1)))));
    var bubble = new createjs.Bitmap(loader.getResult("bubble"+(getrandom(6)+1)));
    bubble_list.push(bubble);
    bubble.regX=bubble.image.width/2 ;
    bubble.regY=bubble.image.height/2
    bubble.scaleX=bubble.scaleY=0.1;
    bubble.y=500;
    bubble.x =now_x= getrandom(750)+25;
    stage.addChild(bubble);
    bubble.onload=()=>{
      stage.update();
    }
    var s=getrandom(3)/10.0+0.13;
    createjs.Tween.get(bubble).to({y:canvas_seaheight,scaleX:s,scaleY:s},getrandom(1500)+3500).call(()=>{
      stage.removeChild(bubble);
      bubble_list = arrayRemove(bubble_list,bubble);
    });
       createjs.Tween.get(bubble).wait(getrandom(canvas_seaheight)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(canvas_seaheight)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(canvas_seaheight)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(canvas_seaheight)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(canvas_seaheight)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(canvas_seaheight)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(canvas_seaheight)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(canvas_seaheight)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(canvas_seaheight)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(canvas_seaheight)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(canvas_seaheight)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x})
      }
  function open_bubble(){
    generate_bubble = setInterval(()=>{
      if(getrandom(100)<3){
        create_bubble();
      }
    },30);
  }
  function update(){
    harpoon_move();
    harpoon_check();
    fish_move();
  }
  function fish_move(){
    i=0
    for(i=0;i<animal_list.length;i++){
      if(animal_list[i].x>(canvas_width+100)||(animal_list[i].x<-100)){
        stage.removeChild(animal_list[i]);
        animal_list = arrayRemove(animal_list,animal_list[i]);
        return;
      }
      else{
        animal_list[i].move();
      }
    }
  }
  function harpoon_check(){
    times++;
    i=0;
    for(i=0;i<harpoon_list.length;i++){
      if( harpoon_list[i].moveable){
        if(times %3 == 0  && harpoon_list[i].x+harpoon_list[i].getheight()/2<canvas_width &&  harpoon_list[i].x+harpoon_list[i].getheight()/2>0){
          if(harpoon_list[i].checkboom()){
            return;
          }
          if( harpoon_list[i].y>canvas_seaheight){
            harpoon_list[i].mv=(500/harpoon_list[i].y)*1.8;
            if( harpoon_list[i].y>400){
              harpoon_list[i].mv=(500/harpoon_list[i].y)*1.4;
            }
          }
        }
        if (harpoon_list[i].y-harpoon_list[i].image.height*harpoon_list[i].scaleY/2 >= canvas_height || harpoon_list[i].y+harpoon_list[i].image.height*harpoon_list[i].scaleY/2 <= 0 || harpoon_list[i].x-harpoon_list[i].image.height*harpoon_list[i].scaleX/2 >= canvas_width||harpoon_list[i].x+harpoon_list[i].image.height*harpoon_list[i].scaleX/2 <= 0) {
          this.moveable=false;
          stage.removeChild(harpoon_list[i]);
          harpoon_list=arrayRemove(harpoon_list,harpoon_list[i]);
          i--;
        }
      }
    }
  }
  function harpoon_move (){
    for(i=0;i<harpoon_list.length;i++){
      if( harpoon_list[i].moveable){
        harpoon_list[i].x += harpoon_list[i].mx*harpoon_list[i].mv/harpoon_list[i].mc;
        harpoon_list[i].y += harpoon_list[i].my*harpoon_list[i].mv/harpoon_list[i].mc;
      }
    }
    stage.update();
  }
  function open_fish(){
    generate_fish = setInterval(()=>{
      rnd =getrandom(120);
      if(rnd<24){
        console.log("fish");
        if(rnd<2)
        animal_list.push(new fish(getrandom(4)+1,true));
        else
        animal_list.push(new fish(getrandom(4)+1,false));
      }
   },200);
  }
  function open_bird(){
    generate_bird = setInterval(()=>{
      if(getrandom(100)<20){
        animal_list.push(new bird(0,false));
      }
   },1000);
  }  
  function keyUp(event) {
    if (event.keyCode == 37|| event.keyCode == 65) {
      b_left = false;
      clearInterval(t_boatmove_left);
    }
    else if (event.keyCode == 39|| event.keyCode == 68) {
      b_right = false;
      clearInterval(t_boatmove_right);
    }
  }
  function load_source(){
    manifest = [
      {src: "/images/coolgame/sea.png", id: "sea"},
      {src: "/images/coolgame/fisherman.png", id: "fisherman"},
      {src: "/images/coolgame/background.png", id: "game_background"},
      {src: "/images/coolgame/fish1.png", id: "fish1"},
      {src: "/images/coolgame/fish2.png", id: "fish2"},
      {src: "/images/coolgame/fish3.png", id: "fish3"},
      {src: "/images/coolgame/fish4.png", id: "fish4"},
      {src: "/images/coolgame/bubble1.png", id: "bubble1"},
      {src: "/images/coolgame/bubble2.png", id: "bubble2"},
      {src: "/images/coolgame/bubble3.png", id: "bubble3"},
      {src: "/images/coolgame/bubble4.png", id: "bubble4"},
      {src: "/images/coolgame/bubble5.png", id: "bubble5"},
      {src: "/images/coolgame/bubble6.png", id: "bubble6"},
      {src: "/images/coolgame/bubble7.png", id: "bubble7"},
      {src: "/images/coolgame/bird1.png", id: "bird1"},
      {src: "/images/coolgame/fish_ad.png", id: "fish_ad"},
      {src: "/images/coolgame/harpoon.png", id: "harpoon"},
      {src: "/images/coolgame/haver.png", id: "haver"},
    ];
    loader = new createjs.LoadQueue(true);
    loader.on("fileload", handleFileLoad);
    loader.on("complete", handleComplete);
    loader.on("error", handleError);
    loader.loadManifest(manifest);
  
  }
  function handleFileLoad(e){
    console.log("complete1");
  }
  function handleComplete(){
    console.log("done");
    init();
  }
  function handleError(){
    console.log("erreo");
  }
  var fish1_spriteSheet ;
  var fishh;
  function animalsource_init(){
    var fish1 ={
      images: [loader.getResult("fish1")],
      frames: {width:461,height:368,regX:230,regY:189},
      animations: {
      normal:{
        frames:[0,1],speed:0.1
      },
      special: {
        frames:[3,4],speed:0.1
      },
      special_die:{
        frames:[5],speed:0
      },
      normal_die:{
        frames:[2],speed:0
      }
    }
      };
      var fish2 ={
        images: [loader.getResult("fish2")],
        frames: {width:500,height:433,regX:250,regY:216},
        animations: {
        normal:{
          frames:[0,1],speed:0.1
        },
        special: {
          frames:[3,4],speed:0.1
        },
        special_die:{
          frames:[5],speed:0
        },
        normal_die:{
          frames:[2],speed:0
        }
      }
      };
      var fish3 ={
        images: [loader.getResult("fish3")],
        frames: {width:547,height:357,regX:273,regY:178},
        animations: {
        normal:{
          frames:[0,1],speed:0.1
        },
        special: {
          frames:[3,4],speed:0.1
        },
        special_die:{
          frames:[5],speed:0
        },
        normal_die:{
          frames:[2],speed:0
        }
      }
      };
      var fish4 ={
        images: [loader.getResult("fish4")],
        frames: {width:550,height:400,regX:275,regY:200},
        animations: {
        normal:{
          frames:[0,1],speed:0.1
        },
        special: {
          frames:[3,4],speed:0.1
        },
        special_die:{
          frames:[5],speed:0
        },
        normal_die:{
          frames:[2],speed:0
        }
      }
      };
      var bird1 ={
        images: [loader.getResult("bird1")],
        frames: {width:318,height:273,regX:159,regY:136},
        animations: {
        normal:{
          frames:[0,1],speed:0.1
        },
        normal_die:{
          frames:[2],speed:0
        }
      }
      };
      var fish_ad_data ={
        images: [loader.getResult("fish_ad")],
        frames: {width:798,height:190,regX:399,regY:95},
        animations: {
        normal:{
          frames:[0,1],speed:0.1
        }
        }
      };
      animalsource.push({type:0,spritesheet:new createjs.SpriteSheet(bird1)});
      animalsource.push({type:1,spritesheet:new createjs.SpriteSheet(fish1)});
      animalsource.push({type:2,spritesheet:new createjs.SpriteSheet(fish2)});
      animalsource.push({type:3,spritesheet:new createjs.SpriteSheet(fish3)});
      animalsource.push({type:4,spritesheet:new createjs.SpriteSheet(fish4)});
      animalsource.push({type:5,spritesheet:new createjs.SpriteSheet(fish_ad_data)});  

  }
  function create_stage_element(){
    stage = new createjs.Stage(document.getElementById("gameStage"));
    backbround = new createjs.Bitmap(loader.getResult("game_background"));
    fisherman = new createjs.Bitmap(loader.getResult("fisherman"));
    sea = new createjs.Bitmap(loader.getResult("sea"));
    fish_ad = new createjs.Sprite(animalsource[5].spritesheet,"normal");
    createjs.Ticker.framerate=30;
    createjs.Ticker.addEventListener("tick",stage); 
    stage.addChild(backbround);
    stage.addChild(fisherman);
    stage.addChild(sea);
    stage.addChild(fish_ad);
  }
  function init(){
    animalsource_init();
    create_stage_element();
    labby_init();
    //game_init();
  }
  function game_event(){
    stage.addEventListener("stagemousemove",mousemove);
    document.onmousedown = mousedown;
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
  }
  function game_init() {
    backbround.scaleX=backbround.scaleY=0.5;
    fisherman.scaleX = fisherman.scaleY=0.16;
    fisherman.scaleX*=-1;
    fisherman.x += 75;
    fisherman.y = canvas_seaheight-25;
    fisherman.regX = fisherman.image.width/2;
    fisherman.regY = fisherman.image.height/2;
    sea.scaleX=sea.scaleY=0.5;
    sea.alpha=0.4;
    gamestart=true;
    clearInterval(fishman_walk);
    game_event();
    open_bubble();
    open_fish();
    open_bird();
    setInterval(() => {
      update();
    }, 20);
  }
  function create_labbybutton(){

  }
  function close_fishmanwalk(){
    clearInterval(fishman_walk);
  }
  function open_fishmanwalk(){
    fishman_walk=setInterval(()=>{
      if( fisherman.scaleX<0){
        fisherman.x  +=0.5;
        fisherman_harpoon.x = fisherman.x+25;
      }
      else{
        fisherman.x  -=0.5;
        fisherman_harpoon.x = fisherman.x-25;
      }
      if(fisherman.x+75>= canvas_width ||fisherman.x<75 ){
        fisherman.scaleX*=-1; 
        fisherman_harpoon.rotation*=-1;
      } 
    },20);
  }
  function close_game_event(){
    stage.removeEventListener("stagemousemove",mousemove);
    document.onmousedown = null;
    document.onkeydown = null;
    document.onkeyup = null;
  }
  function open_fish_ad(){
    fish_ad.y=400;
    fish_ad.x=canvas_width+500;
    fish_ad.scale = 0.5;
    generate_fish_ad = setInterval(function(){
      fish_ad.x -= 2;
      if(fish_ad.x<= -500)fish_ad.x = canvas_width+250;
    },20);
  }
  function clese_bubble(){
    clearInterval(generate_bubble);
  }
  function clese_fish(){
    clearInterval(generate_fish);
  }
  function clese_bird(){
    clearInterval(generate_bird);
  }
  function labbybutton_mouseover(index){
    labbybutton_source[index].haver.visible=true;
    labbybutton_source[index].underline.visible=true;
    console.log("over");
  }
  function labbybutton_mouseout(index){
    labbybutton_source[index].haver.visible=false;
    labbybutton_source[index].underline.visible=false;
    console.log("out");
  }
  var labbybutton_source = new Array();;
  function create_labbybutton(){
    labbybutton_container = new createjs.Container();//34AEC7
    var start_shape =  new createjs.Shape();
    start_shape.graphics.beginFill("#34AEC7").drawRect(50,0,80,30);
    start_shape.alpha=0.01;
    var start = new createjs.Text("開始遊戲", "Bold 20px 微軟正黑體", "#000000");
    start.x = 50;
    start.y= 0;
    var w = start.getMeasuredWidth();
    var start_underline = new createjs.Shape();
    start_underline.graphics.s("#000000").mt(start.x, start.y+25).lt(start.x+w, start.y+25);
    var start_haver =new createjs.Bitmap(loader.getResult("haver"));
    start_haver.x=-5;
    start_haver.y=-2;
    start_haver.scale=0.48;

    var rule = new createjs.Text("規則說明", "Bold 20px 微軟正黑體", "#000000");
    rule.x = start.x;
    rule.y = start.y+50;
    var rule_shape =  new createjs.Shape();
    rule_shape.graphics.beginFill("#34AEC7").drawRect(50,rule.y,80,30);
    rule_shape.alpha=0.01;
    w = rule.getMeasuredWidth();
    var rule_underline = new createjs.Shape();
    rule_underline.graphics.s("#000000").mt(rule.x, rule.y+25).lt(rule.x+w, rule.y+25);
    var rule_haver =new createjs.Bitmap(loader.getResult("haver"));
    rule_haver.x=-5;
    rule_haver.y=-2+rule.y;
    rule_haver.scale=0.48;

    var ranking = new createjs.Text("排行榜", "Bold 20px 微軟正黑體", "#000000");
    ranking.x = start.x+10;
    ranking.y = rule.y+50;
    var ranking_shape =  new createjs.Shape();
    ranking_shape.graphics.beginFill("#34AEC7").drawRect(60,ranking.y,60,30);
    ranking_shape.alpha=0.01;
    w = ranking.getMeasuredWidth();
    var ranking_underline = new createjs.Shape();
    ranking_underline.graphics.s("#000000").mt(ranking.x, ranking.y+25).lt(ranking.x+w, ranking.y+25);
    var ranking_haver =new createjs.Bitmap(loader.getResult("haver"));
    ranking_haver.x=-5;
    ranking_haver.y=-2+ranking.y;
    ranking_haver.scale=0.48;
    labbybutton_source.push({text:start,underline:start_underline,haver:start_haver});
    labbybutton_source.push({text:rule,underline:rule_underline,haver:rule_haver});
    labbybutton_source.push({text:ranking,underline:ranking_underline,haver:ranking_haver});
    for(i=0 ;i< labbybutton_source.length;i++){
      labbybutton_source[i].haver.visible=false;
      labbybutton_source[i].underline.visible=false;
    }
    start_shape.addEventListener("mouseover",function(){
      start_shape.cursor = "pointer";
      labbybutton_source[0].haver.visible=true;
      labbybutton_source[0].underline.visible=true;
    });
    start_shape.addEventListener("mouseout",function(){
      labbybutton_source[0].haver.visible=false;
      labbybutton_source[0].underline.visible=false;
    });
    rule_shape.addEventListener("mouseover",function(){
      rule_shape.cursor = "pointer";
      labbybutton_source[1].haver.visible=true;
      labbybutton_source[1].underline.visible=true;
    });
    rule_shape.addEventListener("mouseout",function(){
      labbybutton_source[1].haver.visible=false;
      labbybutton_source[1].underline.visible=false;
    });
    ranking_shape.addEventListener("mouseover",function(){
      ranking_shape.cursor = "pointer";
      labbybutton_source[2].haver.visible=true;
      labbybutton_source[2].underline.visible=true;
    });
    ranking_shape.addEventListener("mouseout",function(){
      labbybutton_source[2].haver.visible=false;
      labbybutton_source[2].underline.visible=false;
    });

    stage.enableMouseOver(100); 
    labbybutton_container.addChild(start);
    labbybutton_container.addChild(start_shape);
    labbybutton_container.addChild(start_underline);
    labbybutton_container.addChild(start_haver);
    labbybutton_container.addChild(rule);
    labbybutton_container.addChild(rule_shape);
    labbybutton_container.addChild(rule_underline);
    labbybutton_container.addChild(rule_haver);
    labbybutton_container.addChild(ranking);
    labbybutton_container.addChild(ranking_shape);
    labbybutton_container.addChild(ranking_underline);
    labbybutton_container.addChild(ranking_haver);
    labbybutton_container.x=325;
    labbybutton_container.y=200;
    stage.addChild(labbybutton_container);
  }
  function labby_init(){
    gamestart=false;
    close_game_event();
    clese_bird();
    clese_fish();
    clese_bubble();
    backbround.scaleX=backbround.scaleY=0.5;
    fisherman.scaleX = fisherman.scaleY=0.16;
    fisherman.scaleX*=-1;
    fisherman.x += 75;
    fisherman.y = canvas_seaheight-25;
    fisherman.regX = fisherman.image.width/2;
    fisherman.regY = fisherman.image.height/2;
    fisherman_harpoon = new harpoon();
    fisherman_harpoon.rotation= -35;
    sea.scaleX=sea.scaleY=0.5;
    fisherman.scaleX*=1; 
    sea.alpha=0.4;
    create_labbybutton();
    open_fishmanwalk();
    open_fish_ad();
    open_fish();
    open_bubble();
    open_bird();
    setInterval(() => {
      update();
    }, 20);
  }
