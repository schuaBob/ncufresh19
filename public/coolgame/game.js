  var stage;
  var fisherman;
  var t_boatmove_left;
  var t_boatmove_right;
  var b_left = false;
  var b_right = false;
  var fisherman_harpoon; 
  var div ;

  function mousemove(event) {
    var x = stage.mouseX- (fisherman_harpoon.x );
    var y = stage.mouseY - (fisherman_harpoon.y );
    var r_x=-1;
    var r_y=0;
    if(x<0)r_x=1;
    var c = Math.pow(x*x+y*y,0.5);
    var r = Math.acos(y/c);
    fisherman_harpoon.rotation = r_x*(r*180/Math.PI);
    console.log("AAA");
    stage.update();
  }

  function mousedown(event) {
    var t_Harpoonmove;
    var shoot_harpoon = createharpoon();
    shoot_harpoon.x = fisherman.x+fisherman.image.width*fisherman.scaleX/2//-harpoon.image.width*harpoon.scaleX/2;
    shoot_harpoon.y = fisherman.image.height*fisherman.scaleX/2+fisherman.y//-harpoon.image.height*harpoon.scaleX/2;
    var x = stage.mouseX- (shoot_harpoon.x );
    var y = stage.mouseY - (shoot_harpoon.y );
    var r_x=-1;
    var r_y=0;
    if(x<0)r_x=1;
    var c = Math.pow(x*x+y*y,0.5);
    var r = Math.acos(y/c);
    shoot_harpoon.rotation = r_x*(r*180/Math.PI);
    shoot_harpoon.image.onload=function(){
      stage.addChild(shoot_harpoon);
      stage.update();
      t_Harpoonmove = setInterval(function () { Harpoonmove(x*5/c,y*5/c,shoot_harpoon,t_Harpoonmove); }, 10);
    }
  }

  function createharpoon() {
    var harpoon = new createjs.Bitmap("/images/coolgame/harpoon.png");
    harpoon.scaleX = harpoon.scaleY =0.2;
    harpoon.regX=harpoon.image.width/2 ;// harpoon.image.width*harpoon.scaleX/2;
    harpoon.regY=harpoon.image.height/2
    return harpoon;
  }

  function Harpoonmove(x, y, harpoon, timer) {
    harpoon.x += x;
    harpoon.y += y;
    if (harpoon.y-harpoon.image.height*harpoon.scaleY/2 >= stage.canvas.height || harpoon.y+harpoon.image.height*harpoon.scaleY/2 <= 0 || harpoon.x-harpoon.image.height*harpoon.scaleX/2 >= stage.canvas.width||harpoon.x+harpoon.image.height*harpoon.scaleX/2 <= 0) {
      clearInterval(timer);
      stage.removeChild(harpoon);
    }
    stage.update();
  }

  function boatmove_left() {
    fisherman.x -= 5;
    fisherman_harpoon.x-=5;
    mousemove();
  }

  function boatmove_right() {
    fisherman.x += 5;
    fisherman_harpoon.x+=5;
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
    div = document.getElementById("game");
    stage = new createjs.Stage(document.getElementById("gameStage"));
    var sea = new createjs.Shape();
    sea.graphics.beginFill("rgba(58,206,230,0.6)").drawRect(0, 150, 800, 350);
    fisherman = new createjs.Bitmap("/images/coolgame/finsherman.png");
    stage.addChild(fisherman);
    fisherman.image.onload = function () {
     stage.update();
    }
    fisherman.scaleX = fisherman.scaleY=0.2;
    fisherman.y = 55;
    fisherman_harpoon = createharpoon();
    fisherman_harpoon.x = fisherman.x+fisherman.image.width*fisherman.scaleX/2//-harpoon.image.width*harpoon.scaleX/2;
    fisherman_harpoon.y = fisherman.image.height*fisherman.scaleX/2+fisherman.y//-harpoon.image.height*harpoon.scaleX/2;
    stage.addChild(sea);
    stage.addChild(fisherman_harpoon);
    fisherman_harpoon.image.onload=function(){
      stage.update();
    }
    stage.addEventListener("stagemousemove",mousemove);
    document.onmousedown = mousedown;
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
    //stage.update();
  }