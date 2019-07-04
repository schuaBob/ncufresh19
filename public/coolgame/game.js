  var stage;
  var fisherman;
  var t_boatmove_left;
  var t_boatmove_right;
  var b_left = false;
  var b_right = false;
  var fisherman_harpoon; 
  var div;
  var harpoon_list = new Array() ;
  var animal_list = new Array() ;
  var bubble_list =new Array();
  var animalsource=[{type:0,image:["bird_1_1.png","bird_1_2.png"]},{type:1,image:["fish_1_1.png","fish_1_2.png"]},{type:2,image:["fish_2_1.png","fish_2_2.png"]}
  ,{type:3,image:["fish_3_1.png","fish_3_2.png"]},{type:4,image:["fish_4_1.png","fish_4_2.png"]},{type:5,image:["fish_5_1.png","fish_5_2.png"]},{type:6,image:["special_1_1.png","special_1_2.png"]}];
  var canvas_width = 800;
  var canvas_height=500;
  var canvas_seaheight=150;
  createjs.Bitmap.prototype.getwidth = function(){
    return this.image.width * this.scaleX; 
  }
  createjs.Bitmap.prototype.getheight = function(){
    return this.image.height * this.scaleY; 
  }
  class Animal  extends createjs.Bitmap{
    constructor(type){
      super("/images/coolgame/"+animalsource[type].image[0]);
      this.onload = function(){
        this.regX = this.image.width/2;
        this.regY = this.image.height/2;
      };
      this.animaltype = type;
      this.im_index =0;
      this.t_change = setInterval(()=>{
        if(this.im_index == animalsource[this.animaltype].image.length-1)
          this.im_index=0;
        else this.im_index++;
        this.image.src = "/images/coolgame/"+animalsource[this.animaltype].image[this.im_index];
        if(getrandom(100)<3){
          this.dic *=-1;
          this.scaleX*=-1;
        };
      },200);
      this.t_move=setInterval(()=> {
        if((this.x>canvas_width+100)||(this.x<-100)){
          clearInterval(this.t_move);
          clearInterval(this.t_changeimage);
          stage.removeChild(this);
          
        }
        else{
          if(this.dic ==1)this.x += this.speed;
          else this.x-=this.speed;
      
        }
      }, 20);
      stage.addChild(this);
    }
    catch(){
      animal_list=arrayRemove(animal_list,this);
      //clearInterval(this.t_change);
      clearInterval(this.t_move);
    }
    //  static change(){
    //   if(this.im_index == animalsource[this.animaltype].image.length-1)
    //     this.im_index=0;
    //   else this.im_index++;
    //   this.image.src = "/images/coolgame/"+animalsource[this.animaltype].image[this.im_index];
    //   if(getrandom(100)<3){
    //     this.dic *=-1;
    //     this.scaleX*=-1;
    //   };
    // }
    // static  move() {
    //   console.log("in");
    //   if((this.x>canvas_width+100)||(this.x<-100)){
    //     clearInterval(this.t_move);
    //     clearInterval(this.t_changeimage);
    //     stage.removeChild(this);
        
    //   }
    //   else{
    //     if(this.dic ==1)this.x += 2;
    //     else this.x-=2;
    
    //   }
    // }
  }
  class fish extends Animal{
    constructor(type){
      super(type);
      this.scale=0.12;
      this.speed=2;
      this.alpha=0.8;
      if(getrandom(2) == 1){
        this.x=-this.getwidth()/2;
        this.dic =1;
      }
      else{ 
        this.x=this.getwidth()/2+canvas_width;
        this.dic =-1;
        this.scaleX *=-1;
      }
      this.y=getrandom(300-this.getheight()/2)+200;
      this.regX = this.image.width/2;
      this.regY = this.image.height/2;
    }
  }
  class bird extends Animal{
    constructor(type){
      super(type);
      this.scale=0.16;
      this.regX = this.image.width/2;
      this.regY = this.image.height/2;
      this.speed=4;
      this.alpha=0.85;
      if(getrandom(2) == 1){
        this.x=-this.getwidth()/2;
        this.dic =1;
      }
      else{ 
        this.x=this.getwidth()/2+canvas_width;
        this.dic =-1;
        this.scaleX *=-1;
      }
      this.y=getrandom(50)+50;
      this.regX = this.image.width/2;
      this.regY = this.image.height/2;
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
    var t_Harpoonmove;
    if(harpoon_list.length>10)return;
    var shoot_harpoon = createharpoon();
    var x = stage.mouseX- (shoot_harpoon.x );
    var y = stage.mouseY - (shoot_harpoon.y );
    var r_x=-1;
    if(x<0)r_x=1;
    var c = Math.pow(x*x+y*y,0.5);
    var r = Math.acos(y/c);
    shoot_harpoon.rotation = r_x*(r*180/Math.PI);
    t_Harpoonmove = setInterval( ()=> { Harpoonmove(x,y,c,10,shoot_harpoon,t_Harpoonmove); }, 10);
  }

  function createharpoon() {
    var harpoon = new createjs.Bitmap("/images/coolgame/harpoon.png");
    harpoon_list.push(harpoon);
    harpoon.scaleX = harpoon.scaleY =0.16;
    harpoon.regX=harpoon.image.width/2 ;// harpoon.image.width*harpoon.scaleX/2;
    harpoon.regY=harpoon.image.height/2;
    harpoon.x = fisherman.x+25;//-harpoon.image.width*harpoon.scaleX/2;
    harpoon.y = fisherman.y;//-harpoon.image.height*harpoon.scaleX/2;
    stage.addChildAt(harpoon,2);
    harpoon.image.onload=()=>{
      stage.update();
    }
    return harpoon;
  }

  function Harpoonmove(x,y,c,v,harpoon, timer) {
    if( harpoon.y>canvas_seaheight){
      v=(500/harpoon.y)*1.8;
      if( harpoon.y>400){
        v=(500/harpoon.y)*1.4;
      }
    }
    harpoon.x += x*v/c;
    harpoon.y += y*v/c;
    for(i=0;i<bubble_list.length;i++){
      var pt =harpoon.localToLocal(harpoon.image.width/2,harpoon.image.height,bubble_list[i]); // 传递的是红色小球圆心位置
			if (bubble_list[i].hitTest(pt.x, pt.y)) {
        bubble_list = arrayRemove(bubble_list,bubble_list[i]);
        createjs.Tween.get(harpoon).to({y:canvas_seaheight,rotation:(getrandom(2)==0?90:-90)},2000);
        clearInterval(timer);
        return;
      }
    }
    for(i=0;i<animal_list.length;i++){
      var pt =harpoon.localToLocal(harpoon.image.width/2,harpoon.image.height,animal_list[i]); // 传递的是红色小球圆心位置
			if (animal_list[i].hitTest(pt.x, pt.y)) {
        createjs.Tween.get(harpoon).to({y:canvas_seaheight,rotation:(getrandom(2)==0?90:-90)},animal_list[i].animaltype == 0?500:2000);
        createjs.Tween.get(animal_list[i]).to({y:canvas_seaheight,rotation:180},animal_list[i].animaltype == 0?500:2000);
        animal_list[i].catch();
        clearInterval(timer);
        return;
      }
    }
    if (harpoon.y-harpoon.image.height*harpoon.scaleY/2 >= stage.canvas.height || harpoon.y+harpoon.image.height*harpoon.scaleY/2 <= 0 || harpoon.x-harpoon.image.height*harpoon.scaleX/2 >= stage.canvas.width||harpoon.x+harpoon.image.height*harpoon.scaleX/2 <= 0) {
      clearInterval(timer);
      stage.removeChild(harpoon);
      harpoon_list=arrayRemove(harpoon_list,harpoon);
    }
    stage.update();
  }
  function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return !(ele === value);
    });
 
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
  function openfish(){
    createjs.Ticker.addEventListener("tick",function(event){
      if(!event.paused){
        if(getrandom(1000)<50){
          animal_list.push(new fish(getrandom(6)+1));
        }
      }
    })
  }
  function openbird(){
    createjs.Ticker.addEventListener("tick",function(event){
      if(!event.paused){
        if(getrandom(10000)<50){
          animal_list.push(new bird(0));
        }
      }
    })
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

  function init() {
    var backbround = new createjs.Bitmap("/images/coolgame/background.png");
    fisherman = new createjs.Bitmap("/images/coolgame/fisherman.png");
    var sea = new createjs.Bitmap("/images/coolgame/sea.png");
    div = document.getElementById("game");
    stage = new createjs.Stage(document.getElementById("gameStage"));
    createjs.Ticker.framerate=30;
    createjs.Ticker.addEventListener("tick",stage); 
    backbround.scaleX=backbround.scaleY=0.5;
    stage.addChild(backbround);
    stage.addChild(fisherman);
    fisherman.scaleX = fisherman.scaleY=0.16;
    fisherman.scaleX*=-1;
    fisherman.x += 75;
    fisherman.y = canvas_seaheight-25;
    fisherman.regX = fisherman.image.width/2;
    fisherman.regY = fisherman.image.height/2;
    fisherman_harpoon = createharpoon();
    sea.scaleX=sea.scaleY=0.5;
    sea.alpha=0.4;
    stage.addChild(sea);
    stage.addEventListener("stagemousemove",mousemove);
    document.onmousedown = mousedown;
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
    openbubble();
    openfish();
    openbird();
    //new fish(1);
    //stage.update();
  }