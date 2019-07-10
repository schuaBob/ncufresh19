  


  
    //------------game---------------------------------
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
      this.t_move=setInterval(()=> {
        if(this.x>(canvas_width+100)||(this.x<-100)){
          clearInterval(this.t_move);
          animal_list = arrayRemove(animal_list,this);
          stage.removeChild(this);
        }
        else{
          if(getrandom(1000)<5){
            this.dic *=-1;
            this.scaleX*=-1;
          };
          if(this.dic ==1)this.x += this.speed;
          else this.x-=this.speed;
        }
      }, 20);
      stage.addChild(this);
    }
    catch(){
      clearInterval(this.t_move);
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
          animal_list = arrayRemove(animal_list,animal_list[i]);  
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
      //this.y =200;
        this.width = animalsource[type].spritesheet.getFrame(animalsource[type].spritesheet.getAnimation(special==true?"special":"normal").frames[0]).rect.width;
        this.height = animalsource[type].spritesheet.getFrame(animalsource[type].spritesheet.getAnimation(special==true?"special":"normal").frames[0]).rect.height;
        this.y=getrandom(500-(200+this.height*this.scale)*2)+200+this.height*this.scale;
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
      }
      else{ 
        this.x=90;
        this.dic =-1;
        this.scaleX *=-1;
      }
      this.y=getrandom(50)+50;
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
  function createbubble(){
    var bubble = new createjs.Bitmap("/images/coolgame/bubble"+(getrandom(6)+1)+".png");
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
  function openbubble(){
    createjs.Ticker.addEventListener("tick",function(event){
      if(!event.paused){
        if(getrandom(100)<3){
          createbubble();
        }
      }
    })
  }
  function update(){
    harpoon_move();
    harpoon_check();
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
          return;
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
  }
  function openfish(){
    generate_fish = setInterval(()=>{
      rnd =getrandom(120);
      if(rnd<24){
        console.log("fish");
        if(rnd<2)
        animal_list.push(new fish(0,true));
        else
        animal_list.push(new fish(0,false));
      }
   },200);
  }
  function openbird(){
    generate_bird = setInterval(()=>{
      if(getrandom(2500)<2){
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
      {src: "/images/coolgame/bird.png", id: "bird"},
      {src: "/images/coolgame/harpoon.png", id: "harpoon"}
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
  function init(){
    var data ={
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
        frames:[5],speed:0.1
      },
      normal_die:{
        frames:[2],speed:0.01
      }
    }
      };
    fish1_spriteSheet = new createjs.SpriteSheet(data);
    stage = new createjs.Stage(document.getElementById("gameStage"));
    animalsource.push({type:0,spritesheet:fish1_spriteSheet});
    backbround = new createjs.Bitmap(loader.getResult("game_background"));
    fisherman = new createjs.Bitmap(loader.getResult("fisherman"));
    sea = new createjs.Bitmap(loader.getResult("sea"));
    createjs.Ticker.framerate=30;
    createjs.Ticker.addEventListener("tick",stage); 
    stage.addChild(backbround);
    stage.addChild(fisherman);
    stage.addChild(sea);
    game_init();
  }
  function game_init() {
    backbround.scaleX=backbround.scaleY=0.5;
    fisherman.scaleX = fisherman.scaleY=0.16;
    fisherman.scaleX*=-1;
    fisherman.x += 75;
    fisherman.y = canvas_seaheight-25;
    fisherman.regX = fisherman.image.width/2;
    fisherman.regY = fisherman.image.height/2;
    fisherman_harpoon = new harpoon();
    sea.scaleX=sea.scaleY=0.5;
    sea.alpha=0.4;
    stage.addEventListener("stagemousemove",mousemove);
    document.onmousedown = mousedown;
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
    openbubble();
    openfish();
    //openbird();
    setInterval(() => {
      update();
    }, 20);
  }
  function create_labbybutton(){

  }
  function labby_init(){
    backbround.scaleX=backbround.scaleY=0.5;
    fisherman.scaleX = fisherman.scaleY=0.16;
    fisherman.scaleX*=-1;
    fisherman.x += 75;
    fisherman.y = canvas_seaheight-25;
    fisherman.regX = fisherman.image.width/2;
    fisherman.regY = fisherman.image.height/2;
    fisherman_harpoon = new harpoon();
    sea.scaleX=sea.scaleY=0.5;
    sea.alpha=0.4;
    stage.removeEventListener("stagemousemove",mousemove);
    document.onmousedown = null;
    document.onkeydown = null;
    document.onkeyup = null;
  }
