  var stage;
  var fisherman;
  var t_boatmove_left;
  var t_boatmove_right;
  var b_left = false;
  var b_right = false;
  var fisherman_harpoon; 
  var div ;
  var harpoon_list = new Array() ;
  var bubble_list =new Array();
  // class fish  extends Bitmap{
  //   constructor(type){
  //     this.type = type;
  //     switch (type){
  //       case 1: this.src = ""; 
  //         break;
  //       case 2: this.src = "";
  //         break;
  //     }
  //   }
  //   catch(){

  //   }
  // }
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
    harpoon.regY=harpoon.image.height/2
    harpoon.x = fisherman.x+fisherman.image.width*fisherman.scaleX/2-30//-harpoon.image.width*harpoon.scaleX/2;
    harpoon.y = fisherman.image.height*fisherman.scaleX/2+fisherman.y-15//-harpoon.image.height*harpoon.scaleX/2;
    stage.addChildAt(harpoon,2);
    harpoon.image.onload=()=>{
      stage.update();
    }
    return harpoon;
  }

  function Harpoonmove(x,y,c,v,harpoon, timer) {
    if( harpoon.y>150){
      v=(500/harpoon.y)*1.8;
      if( harpoon.y>400){
        v=(500/harpoon.y)*1.6;
      }
    }
    harpoon.x += x*v/c;
    harpoon.y += y*v/c;
    for(i=0;i<bubble_list.length;i++){
      var pt = bubble_list[i].localToLocal(0,0,harpoon); // 传递的是红色小球圆心位置
			if (harpoon.hitTest(pt.x, pt.y)) {
        stage.removeChild(bubble_list[i]);
        bubble_list = arrayRemove(bubble_list,bubble_list[i]);
        createjs.Tween.get(harpoon).to({y:150,rotation:(getrandom(2)==0?90:-90)},2000);
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
    fisherman.x -= 1;
    fisherman_harpoon.x-=1;
    mousemove();
  }

  function boatmove_right() {
    fisherman.x += 1;
    fisherman_harpoon.x+=1;
    mousemove();
  }
  function keyDown(event) {
    if (event.keyCode == 37 || event.keyCode == 65 ) {
      if (!b_left) {
        t_boatmove_left = setInterval(boatmove_left, 10);
        b_left = true;
      }
    }
    else if (event.keyCode == 39|| event.keyCode == 68) {
      if (!b_right) {
        t_boatmove_right = setInterval(boatmove_right, 10);
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
    bubble.scaleX=bubble.scaleY=0.01;
    bubble.y=500;
    bubble.x =now_x= getrandom(750)+25;
    stage.addChild(bubble);
    bubble.onload=()=>{
      stage.update();
    }
    var s=getrandom(3)/10.0+0.03;
    createjs.Tween.get(bubble).to({y:150,scaleX:s,scaleY:s},getrandom(1500)+3500).call(()=>{
      stage.removeChild(bubble);
      bubble_list = arrayRemove(bubble_list,bubble);
    });
       createjs.Tween.get(bubble).wait(getrandom(150)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(150)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(150)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(150)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(150)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(150)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(150)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(150)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(150)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(150)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x}).wait(getrandom(150)).to({x:now_x-getrandom(30)-15},getrandom(200)+300).call(()=>{now_x=bubble.x})
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
    harpoon_list = new Array();
    bubble_list = new Array();
    div = document.getElementById("game");
    stage = new createjs.Stage(document.getElementById("gameStage"));
    createjs.Ticker.framerate=30;
    createjs.Ticker.addEventListener("tick",stage);
    var backbround = new createjs.Bitmap("/images/coolgame/background.png");
    backbround.scaleX=backbround.scaleY=0.5;
    stage.addChild(backbround);
    fisherman = new createjs.Bitmap("/images/coolgame/finsherman.png");
    stage.addChild(fisherman);
    fisherman.scaleX = fisherman.scaleY=0.16;
    fisherman.y = 75;
    fisherman_harpoon = createharpoon();
    fisherman_harpoon.x = fisherman.x+fisherman.image.width*fisherman.scaleX/2-30//-harpoon.image.width*harpoon.scaleX/2;
    fisherman_harpoon.y = fisherman.image.height*fisherman.scaleX/2+fisherman.y-15//-harpoon.image.height*harpoon.scaleX/2;
    var sea = new createjs.Bitmap("/images/coolgame/sea.png");
    sea.scaleX=sea.scaleY=0.5;
    sea.alpha=0.4;
    stage.addChild(sea);
    stage.addEventListener("stagemousemove",mousemove);
    document.onmousedown = mousedown;
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
    openbubble();
    //stage.update();
  }