//沒抓到魚會有bug
//增加魚叉碰撞點
  //兩層海
  //緩衝
  //選項高度跟著問題亦啟動
  //什麼都沒抓到會有BUG
    //------------game---------------------------------
  var leave_container;
  var now=0;
  var sound_shape;
  var game_time_image;
  var sound;
  var stop=false;
  var soundbutton;
  var labbybutton_container;
  var leavebutton_source = new Array();
  var question_container;
  var back_container;
  var question_num=[0,0,0];
  var generate_bird;
  var option =new Array();
  var question_index_list=new Array();
  var question;
  var question_text;
  var generate_fish;
  var generate_bubble;
  var stage;
  var questionboard;
  var background;
  var board_index;
  var sea ;
  var bucket;
  var score_board;
  var game_time=15;
  var catch_animal_container;
  var harpoon_text;
  var question_list = new Array();
  var catch_animal_text;
  var score_catch_animal_container;
  var score_catch_animal_text;
  var catch_animal_num = [0,0,0,0,0];
  var score_catch_animal_num = [0,0,0,0,0];
  var player_control=false;
  var start_time_text;
  var countdown_time;
  var countdown_text;
  var countdown_timer;
  var fisherman;
  var t_boatmove_left;
  var t_boatmove_right;
  var b_left = false;
  var b_right = false;
  var fisherman_harpoon; 
  var times=0;
  var catch_fish= new Array();
  var font_family ="微軟正黑體";
  var harpoon_list = new Array() ;
  var animal_list = new Array() ;
  var bubble_list =new Array();
  var loader ;
  var background_source={};
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
    class Question{
      constructor(t,q,a,o){
        this.question=q;
        this.answer=a;
        this.option=o;
        this.type =t;
      }
    }
    class Option extends createjs.Container{
      constructor(){
        super();
        console.log(this);
        this.x=210;
        this.y=250;
        this.background = new createjs.Shape();
        this.havermask = new createjs.Shape();
        this.text = new createjs.Text("","Bold 17px "+font_family,"#000000");
        this.addChild(this.background);
        this.addChild(this.text);
        this.addChild(this.havermask);
        this.text.y=8;
        this.text.x=12.5;
        this.background.visible = false;
        this.background.alpha=0.4;
        this.done =false;
        this.havermask.alpha=0.01;
        this.ans =false;
        this.havermask.addEventListener("click",function(event){  
          if(!event.target.parent.done){
          if(event.target.parent.ans){
            event.target.parent.correct();
          }
          else event.target.parent.wrong();
          }
 
        });
        this.havermask.addEventListener("mouseover",function(event){
          event.target.parent.havermask.cursor = "pointer";
          if(!event.target.parent.done)
          event.target.parent.background.visible =true;

        });
        this.havermask.addEventListener("mouseout",function(event){
          if(!event.target.parent.done)
          event.target.parent.background.visible =false;
        });
      }
      correct(){
        this.background.visible =true;
        this.done=true;
        this.background.graphics.clear().beginFill("green").drawRoundRect(0,0,9*18,33,10);
        ans_num--;
        if(ans_num ==0){
          questionboard.gotoAndStop("correct");
          createjs.Tween.get(questionboard).wait(1000).call(()=>{
            questionboard.gotoAndStop("normal");
            next_question();
          })
        }
      }
      wrong(){
        this.background.visible = true;
        this.done=true;
        this.background.graphics.clear().beginFill("red").drawRoundRect(0,0,9*18,33,10);
        show_correct();
      }
      setText(t,ans){
        this.text.text = t;
        this.done=false;
        this.visible=true;
        this.background.visible=false;
        this.background.graphics.clear();
        this.havermask.graphics.clear();
        this.havermask.graphics.beginFill("#696969").drawRoundRect(0,0,9*18,33,10);
        this.background.graphics.beginFill("#696969").drawRoundRect(0,0,9*18,33,10);
        this.ans =ans;
      }
    }
    
  class Animal  extends createjs.Sprite{
    constructor(type,special){
      if(special)
        super(animalsource[type].spritesheet,"special");
      else
        super(animalsource[type].spritesheet,"normal");
      this.special=special;
      this.animaltype = type;
      //stage.addChildAt(this,stage.numChildren-2);
      stage.addChildAt(this,3);
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
      catch_fish.push(this);
      animal_list = arrayRemove(animal_list,this);  
      this.gotoAndStop(this.special == true?"special_die":"normal_die");
      console.log(this.animaltype);
      catch_animal_num[this.animaltype]+=1;
      catech_animal_update();
    }
  }
  function show_correct(){
    for(i=0;i<5;i++){
      if(option[i].ans &&  !option[i].done){
        option[i].background.visible =true;
        option[i].done=true;
        option[i].background.graphics.clear().beginFill("green").drawRoundRect(0,0,9*18,33,10);
      }
    }
    createjs.Tween.get(questionboard).wait(1000).call(()=>{
      next_question();
    })
  }
  class harpoon extends createjs.Bitmap{
    constructor(){
      super(loader.getResult("harpoon"));
      this.moveable=false;
      this.regX = this.getwidth()/2;
      this.regY = this.getheight()/2;
      this.scale=0.16;
      this.revise_position();
      stage.addChildAt(this,2);
    }
    revise_position(){
      this.x = fisherman.x+25*(fisherman.scaleX<0?1:-1);
      this.y = fisherman.y-5;
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
        if (gamestart && animal_list[i].hitTest(pt.x, pt.y)) {
          this.moveable=false;
          harpoon_list= arrayRemove(harpoon_list,this);
          harpoon_update();
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
      this.alpha=1;
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
    if(harpoon_list.length>=10)return;
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
    harpoon_update();
  }
  function harpoon_update(){
    harpoon_text.text = "Harpoon:"+(10-harpoon_list.length)+"";
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
    if(player_control)
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
    if(event.keyCode == 32){
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
    stage.addChildAt(bubble,stage.numChildren-2);
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
      if(!stop)
      if(getrandom(100)<3){
        create_bubble();
      }
    },30);
  }
  function update(){
    if(!stop){
      harpoon_move();
      harpoon_check();
      fish_move();
    }
    stage.update();
  }
  function fish_move(){
    i=0
    for(i=0;i<animal_list.length;i++){
      if(animal_list[i].x>(canvas_width+100)||(animal_list[i].x<-100)){
        stage.removeChild(animal_list[i]);
        if(gamestart)
        if(animal_list[i].animaltype!=0){
          if(animal_list[i].animaltype>2){
            question_num[2]++;
          }
          else{
            question_num[animal_list[i].animaltype-1]++;
          }
        }
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
          harpoon_update();
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
      if(!stop)
      if(question_num[0] +question_num[1]+question_num[2]>0 ){
        rnd =getrandom(120);
        if(rnd<24){
           var fishtype ;     
           do{
            fishtype =getrandom(3);
           }while(question_num[fishtype]<=0);
           if(gamestart)
           question_num[fishtype]--;
          if(rnd<2)
          animal_list.push(new fish(fishtype ==2?((fishtype+1)+getrandom(2)):((fishtype)+1),true));
          else
          animal_list.push(new fish(fishtype ==2?((fishtype+1)+getrandom(2)):((fishtype)+1),false));
        }
      }
      else{
        if(catch_animal_num[1]+catch_animal_num[2]+catch_animal_num[3]+catch_animal_num[4] == question_list[0].length+question_list[1].length+question_list[2].length)
        game_end();
      }
   },200);
  }
  function open_bird(){
    generate_bird = setInterval(()=>{
      if(!stop)
      if(getrandom(100)<20){
        animal_list.push(new bird(0,false));
      }
   },1000);
  }  
  function keyUp(event) {
    if(player_control)
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
      {src: "/images/coolgame/score_background.png", id: "score_background"},
      {src: "/images/coolgame/rank_background.png", id: "rank_background"},
      {src: "/images/coolgame/sea.png", id: "score_sea"},
      {src: "/images/coolgame/haver.png", id: "haver"},
      {src: "/images/coolgame/questionboard1.png", id: "questionboard1"},
      {src: "/images/coolgame/questionboard2.png", id: "questionboard2"},
      {src: "/images/coolgame/questionboard3.png", id: "questionboard3"},
      {src: "/images/coolgame/questionboard4.png", id: "questionboard4"},
      {src: "/images/coolgame/time.png", id: "time"},
      {src: "/images/coolgame/sound_open.png", id: "sound_open"},
      {src: "/images/coolgame/sound_close.png", id: "sound_close"},
      {src: "/images/coolgame/back.png", id: "back"},
      {src: "/images/coolgame/back_haver.png", id: "back_haver"},
      {src: "/images/coolgame/rank_single.png", id: "rank_single"},
      {src: "/images/coolgame/rank_total.png", id: "rank_total"},
      {src: "/images/coolgame/leave.png", id: "leave"},
      {src: "/images/coolgame/bucket.png", id: "bucket"},
      {src: "/images/coolgame/score_board.png", id: "score_board"},
    ];
    loader = new createjs.LoadQueue(true);
    loader.on("fileload", handleFileLoad);
    loader.on("complete", handleComplete);
    loader.on("error", handleError);
    loader.loadManifest(manifest);
    loading_question();
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
  function source_init(){
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
      animalsource.push({type:0,scroe:200,spritesheet:new createjs.SpriteSheet(bird1)});
      animalsource.push({type:1,score:150,spritesheet:new createjs.SpriteSheet(fish1)});
      animalsource.push({type:2,score:100,spritesheet:new createjs.SpriteSheet(fish2)});
      animalsource.push({type:3,score:100,spritesheet:new createjs.SpriteSheet(fish3)});
      animalsource.push({type:4,score:100,spritesheet:new createjs.SpriteSheet(fish4)});
      animalsource.push({type:5,spritesheet:new createjs.SpriteSheet(fish_ad_data)});  
  }
  function create_back_container(){
    back_container = new createjs.Container();
    var backbutton = new createjs.Bitmap(loader.getResult("back"));
    var back_shape = new createjs.Shape();
    backbutton.scale=0.4;
    backbutton.y=12;
    backbutton.x=7;
    back_container.visible =false;
    back_shape.graphics.beginFill("#FFFFFF").drawRect(7,12,backbutton.getwidth(),backbutton.getheight());
    back_shape.alpha=0.01;
    back_shape.addEventListener("mouseover",function(){
      backbutton.image = loader.getResult("back_haver");
      back_shape.cursor = "pointer";
    });
    back_shape.addEventListener("mouseout",function(){
      backbutton.image = loader.getResult("back");
    });
    back_shape.addEventListener("mousedown",function(){
      close_game_event();
      leave_container.visible=true;
      stop = true;
    });
    back_container.addChild(backbutton);
    back_container.addChild(back_shape);
    stage.addChild(back_container);
  }
  function create_leave_container(){
    leave_container = new createjs.Container();
    var leave_background = new createjs.Bitmap(loader.getResult("leave"));
    var leave_title = new createjs.Text("確定要離開遊戲嗎？","bold 24px "+font_family,"#000000");
    leave_container.visible =false;
    leave_background.scale = 0.7;
    var leave_background_mask = new createjs.Shape();
    leave_background_mask.graphics.beginFill("#000000").drawRect(0,0,800,500);
    leave_background_mask.alpha = 0.3;
    leave_background.x = canvas_width/2-leave_background.getwidth()/2;
    leave_background.y= canvas_height/2-leave_background.getheight()/2;
    leave_title.y=leave_background.y+40;
    leave_title.x=leave_background.x+108;

    var Yes_shape =  new createjs.Shape();
    Yes_shape.alpha=0.01;
    var Yes = new createjs.Text("含淚離開", "Bold 20px 微軟正黑體", "#000000");
    Yes.x = leave_title.x+50;
    Yes.y= leave_title.y+50;
    Yes_shape.graphics.beginFill("#FFFFFF").drawRect( Yes.x, Yes.y,80,30);
    var w = Yes.getMeasuredWidth();
    var Yes_underline = new createjs.Shape();
    Yes_underline.graphics.s("#000000").mt(Yes.x, Yes.y+25).lt(Yes.x+w, Yes.y+25);
    var Yes_haver =new createjs.Bitmap(loader.getResult("haver"));
    Yes_haver.x=leave_title.x;
    Yes_haver.y=Yes.y;
    Yes_haver.scale=0.48;

    var No_shape =  new createjs.Shape();
    No_shape.alpha=0.01;
    var No = new createjs.Text("回心轉意", "Bold 20px 微軟正黑體", "#000000");
    No.x = leave_title.x+50;
    No.y= leave_title.y+100;
    No_shape.graphics.beginFill("#FFFFFF").drawRect( No.x, No.y,80,30);
    var w = No.getMeasuredWidth();
    var No_underline = new createjs.Shape();
    No_underline.graphics.s("#000000").mt(No.x, No.y+25).lt(No.x+w, No.y+25);
    var No_haver =new createjs.Bitmap(loader.getResult("haver"));
    No_haver.x=leave_title.x;
    No_haver.y=No.y;
    No_haver.scale=0.48;


    leavebutton_source.push({text:Yes,underline:Yes_underline,haver:Yes_haver});
    leavebutton_source.push({text:No,underline:No_underline,haver:No_haver});
    for(i=0 ;i< leavebutton_source.length;i++){
      leavebutton_source[i].haver.visible=false;
      leavebutton_source[i].underline.visible=false;
    }
    Yes_shape.addEventListener("click",function(){  
      leave_container.visible=false;
      stage.removeChild(question_container);
      stage.removeChild(score_catch_animal_container);
      close_movement();
      clear_game_stage();
      for(var j=0;j<catch_fish.length;j++){
        catch_fish[j].visible=false;
      }
      labby_init();
    });
    Yes_shape.addEventListener("mouseover",function(){
      Yes_shape.cursor = "pointer";
      leavebutton_source[0].haver.visible=true;
      leavebutton_source[0].underline.visible=true;
    });
    Yes_shape.addEventListener("mouseout",function(){
      leavebutton_source[0].haver.visible=false;
      leavebutton_source[0].underline.visible=false;
    });

  
    No_shape.addEventListener("click",function(){  
      leave_container.visible=false;
      if(now==1)
      game_event();
      stop =false;
    });
    No_shape.addEventListener("mouseover",function(){
      No_shape.cursor = "pointer";
      leavebutton_source[1].haver.visible=true;
      leavebutton_source[1].underline.visible=true;
    });
    No_shape.addEventListener("mouseout",function(){
      leavebutton_source[1].haver.visible=false;
      leavebutton_source[1].underline.visible=false;
    });
    leave_container.addChild(leave_background_mask);
    leave_container.addChild(leave_background);
    leave_container.addChild(leave_title);
    leave_container.addChild(Yes);
    leave_container.addChild(Yes_shape);
    leave_container.addChild(Yes_underline);
    leave_container.addChild(Yes_haver);
    leave_container.addChild(No);
    leave_container.addChild(No_shape);
    leave_container.addChild(No_underline);
    leave_container.addChild(No_haver);
    stage.addChild(leave_container);
  }
  function create_stage_element(){
    catch_animal_text = new createjs.Text(" X  0\n\n X  0\n\n X  0\n\n X  0","12px Arial","#000000");
    stage = new createjs.Stage(document.getElementById("gameStage"));
    background = new createjs.Bitmap(loader.getResult("game_background"));
    fisherman = new createjs.Bitmap(loader.getResult("fisherman"));
    sea = new createjs.Bitmap(loader.getResult("sea"));
    score_board = new createjs.Bitmap(loader.getResult("score_board"));
    bucket = new createjs.Bitmap(loader.getResult("bucket"));
    harpoon_text = new createjs.Text("Harpoon:10","18px Arial","#000000");
    fish_ad = new createjs.Sprite(animalsource[5].spritesheet,"normal");
    game_time_image = new createjs.Bitmap(loader.getResult("time"));
    createjs.Ticker.framerate=50;
    createjs.Ticker.addEventListener("tick",update); 
    leavebutton_source = new Array();
    sound_shape = new createjs.Shape();
    soundbutton = new createjs.Bitmap(loader.getResult("sound_open"));
    soundbutton.scale=0.4;
    soundbutton.x = canvas_width-soundbutton.getwidth();
    soundbutton.y = canvas_height - soundbutton.getheight();
    sound=true;
    bucket.scale = 0.6;
    bucket.scaleX = 0.67;
    bucket.y=235;
    bucket.x=-6;
    score_board.scale =0.5;
    score_board.scaleY =0.6;
    score_board.y=110;
    bucket.visible=false;
    score_board.visible =false;
    sound_shape.graphics.beginFill("#FFFFFF").drawRect(canvas_width-soundbutton.getwidth(),canvas_height - soundbutton.getheight(),soundbutton.getwidth(),soundbutton.getheight());
    sound_shape.alpha=0.01;
    sound_shape.addEventListener("mousedown",function(event){
      if(sound){
        soundbutton.image = loader.getResult("sound_close");
      }
      else{
        soundbutton.image = loader.getResult("sound_open");
      }
      sound=sound == true?false:true;
    })
    sound_shape.addEventListener("mouseover",()=>{
      sound_shape.cursor = "pointer";
    });
    stage.addChild(background);
    stage.addChild(fisherman);
    stage.addChild(sea);
    stage.addChild(soundbutton);
    stage.addChild(sound_shape);
    stage.addChild(fish_ad);
    stage.addChild(score_board);
    stage.addChild(bucket);
    create_back_container();
    create_leave_container();
    create_labbybutton();
    fisherman_harpoon = new harpoon();
  }
  function init(){
    source_init();
    create_stage_element();
    labby_init();
  }
  function game_event(){
    stage.addEventListener("stagemousemove",mousemove);
    stage.addEventListener("mousedown",mousedown);
    //stage.addEventListener("pressmove",keyDown);
    //stage.onmousedown = mousedown;
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
  }
  function clear_animal(){
    for(i=0;i<animal_list.length;i++){
      if(animal_list[i].dic > 0){
        createjs.Tween.get(animal_list[i]).to({x:canvas_width+110},1000);
      }
      else{
        createjs.Tween.get(animal_list[i]).to({x:-110},1000);
      }
    }
    if(fish_ad.visible)
    createjs.Tween.get(fish_ad).to({x:-450},1000).call(()=>{
      close_fish_ad();
    });
  }
  function fish_jump(){
    // stage.setChildIndex(fisherman,stage.numChildren-1);
    // stage.setChildIndex(fisherman_harpoon,stage.numChildren-1);
    // stage.setChildIndex(sea,stage.numChildren-1);
    for(i=0;i<catch_fish.length-1;i++){
      createjs.Tween.get(catch_fish[i]).wait(2000).to({y:(fisherman.y-getrandom(50)+20),x:(fisherman.x+50-getrandom(50))},600)
    }
    createjs.Tween.get(catch_fish[catch_fish.length-1]).wait(2000).to({y:(fisherman.y-getrandom(50)+20),x:(fisherman.x+35-getrandom(50))},600).call(()=>{
      for(i=0;i<catch_fish.length;i++){
        stage.setChildIndex(catch_fish[i],2);
        createjs.Tween.get(catch_fish[i]).wait(500).to({x:-Math.abs(fisherman.getwidth())+30-getrandom(50)},4000);
      }
    });
  }
  function create_questionboard(){
    board_index =0;
    if(catch_animal_num[1]>0)board_index=1;
    else  if(catch_animal_num[2]>0)board_index=2;
    else  if(catch_animal_num[3]>0)board_index=3;
    else  if(catch_animal_num[4]>0)board_index=4;
    else {
      stage.removeChild(question_container);
      stage.removeChild(score_catch_animal_container);
      labby_init();
      console.log("game over");
      return;
    }
    question_index_list = new Array();
    for(i=0;i<question_list[board_index >=3?2:(board_index-1)].length;i++){
      question_index_list.push(i);
    }
    for(i=0;i<5;i++){
      option[i].visible=false;
    }
    question_text.visible=false;
    var questionboard_sheet=new createjs.SpriteSheet({
      images: [loader.getResult("questionboard"+board_index+"")],
      frames: {width:1600,height:1000,regX:0,regY:0},
      animations: {
      normal:{
        frames:[0],speed:0
      },
      correct: {
        frames:[1],speed:0
      }
    }
    });
    question_container.removeChild(questionboard);
    questionboard = new createjs.Sprite(questionboard_sheet,"normal");
    questionboard.scale=0;
    console.log(score_catch_animal_container.children[board_index].x);
    questionboard.x = score_catch_animal_container.children[board_index].x+score_catch_animal_container.x;
    questionboard.y = 130;
    question_container.addChildAt(questionboard,1);
    createjs.Tween.get(questionboard).to({scale:0.5,x:0,y:0},1000).call(()=>{
      for(i=0;i<5;i++){
        option[i].visible=true;
      }
      question_text.visible=true;
      next_question();
    });
  }
  function question_show(){
    var a = new Array();
    var q = question.question.split("");
    question_text.text="Q：";
    for(i=0;i<q.length;i++){
      if((i+1) % 18 == 0 ){
        question_text.text+=q[i-1]+"\n       ";
      }
      else{
        question_text.text+=q[i];
      }
    }
    question_text.text += board_index==1?"(多選題)":"(單選題)"
    for(i=0;i<question.answer.length+question.option.length;i++){
      a.push(i);
    }
    for(i=4;i>a.length-1;i--){
      option[i].visible = false;
      option[i].ans =false;
    }
    for(i=0;i<question.answer.length;i++){
      var index =getrandom(a.length);
      option[a[index]].setText(String.fromCharCode(65+a[index])+" "+question.answer[i],true);
      a = arrayRemove(a,a[index]);
    }
    for(i=0;i<question.option.length;i++){
      var index =getrandom(a.length);
      option[a[index]].setText(String.fromCharCode(65+a[index])+" "+question.option[i],false);
      a = arrayRemove(a,a[index]);
    }
  }
  function next_question(){
    if(catch_animal_num[board_index] == 0){
      for(var j=0;j<5;j++){
        option[j].visible=false;
      }
      question_text.visible=false;
      console.log(score_catch_animal_container.children[board_index].x);
      createjs.Tween.get(questionboard).to({scale:0,x:score_catch_animal_container.children[board_index].x+score_catch_animal_container.x,y:130},1000).call(()=>{
        create_questionboard();
      });
    }
    else{
      catch_animal_num[board_index]--;
      var rnd = getrandom(question_index_list.length);
      question = question_list[board_index >=3?2:(board_index-1)][rnd];
      question_index_list = arrayRemove(question_index_list,question_index_list[rnd]);
      ans_num=question.answer.length;
      question_show();
    }
  }

  function loading_question(){
    question_list.push(new Array());
    question_list.push(new Array());
    question_list.push(new Array());
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[2].push(new Question(2,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[2].push(new Question(2,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[2].push(new Question(2,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的","~~sf.dm"]))
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[2].push(new Question(2,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[2].push(new Question(2,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[2].push(new Question(2,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的","~~sf.dm"]))
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[2].push(new Question(2,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[2].push(new Question(2,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[2].push(new Question(2,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的","~~sf.dm"]))
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[2].push(new Question(2,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[2].push(new Question(2,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[2].push(new Question(2,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[0].push(new Question(0,"請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎請問這遊戲機掰嗎",["超機掰超機","超級"],["小機掰機掰掰","中機掰超機","大"]));
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的","~~sf.dm"]))
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_list[1].push(new Question(1,"第二題",["還可以"],["小事","蝦還要喔甄試的"]))
    question_num=[0,0,0];
    question_index_list=new Array();
    for(var j =0;j<3;j++){
      question_num[j] = question_list[j].length;
    }
  }

  function question_init(){
    question_container= new createjs.Container();
    var question_background = new createjs.Shape();
    question_text = new createjs.Text("","Bold 20px "+font_family,"#000000");
    question_text.x = 190;
    question_text.y=140;
    question_background.graphics.beginFill("#000000").drawRect(0,0,800,500);
    question_background.alpha = 0.4;
    question_container.addChild(question_background);
    question_container.addChild(question_text);
    option = new Array();
    question_num=[0,0,0];
    question_index_list=new Array();
    for(var j =0;j<3;j++){
      for(i=0;i<question_list[j].length;i++){
        question_index_list.push(i);
      }
      question_num[j] = question_list[j].length;
    }

    for(i=0;i<5;i++){
      option.push(new Option());
      question_container.addChild(option[i]);
    }
    option[1].x = option[0].x + 185;
    option[2].y = option[0].y +40;
    option[3].x =  option[0].x+185;
    option[3].y =  option[0].y+40;
    option[4].y = option[0].y+80;
    create_questionboard();
    stage.addChild(question_container);
    stage.setChildIndex(back_container,stage.numChildren-1);
    stage.setChildIndex(leave_container,stage.numChildren-1);
    back_container.visible=true;
  }
  function clear_game_stage(){
    stage.removeChild(start_time_text);
    stage.removeChild(harpoon_text);
    stage.removeChild(countdown_text);
    stage.removeChild(catch_animal_container);
    stage.removeChild(game_time_image);
    clear_harpoon();
  }
  function close_movement(){
    clearInterval(countdown_timer);
    gamestart=false;
    clese_bird();
    clese_fish();
    clese_bubble();
    clear_animal();
    close_game_event();
    close_fishmanwalk();
    
  }
  function game_end(){
    close_movement();
    if(catch_fish.length!=0)
    fish_jump();
    back_container.visible=false;
    start_time_text.text = "Time's up！";
    start_time_text.x -= 40;
    stage.addChild(start_time_text);
    fisherman_harpoon.scaleX *= fisherman_harpoon.scaleX<0?-1:1;
    fisherman_harpoon.rotation=35;
    fisherman.scaleX *= fisherman.scaleX<0?-1:1;
    fisherman_harpoon.revise_position();
    createjs.Tween.get(fisherman_harpoon).wait(3100).to({x:-Math.abs(fisherman.getwidth())+25*(fisherman.scaleX<0?1:-1)},4000);
    createjs.Tween.get(fisherman).wait(3100).to({x:-Math.abs(fisherman.getwidth())},4000).call(()=>{
      clear_game_stage();
      clear_harpoon();
      score_init();
    });
  }
  function countdown(){
    if(!stop){
      countdown_time--;
      countdown_text.text = ""+countdown_time;
      if(countdown_time == 0){
        game_end();
      }
    }
  }
  function clear_harpoon(){
    for(i = 0;i<harpoon_list.length;i++){
      stage.removeChild(harpoon_list[i]);
    }
  }
  var num_score_fish=0;
  function score_init(){
    now = 2;
    background.image = loader.getResult("score_background");
    num_score_fish=0;
    sea.y = 270;
    sea.alpha=0.45
    fisherman.y=380
    score_catch_animal_num = [0,0,0,0,0]
    fisherman.scale=fisherman_harpoon.scale=0.2496;
    fisherman.x=canvas_width+fisherman.getwidth();
    fisherman_harpoon.rotation = 35;
    fisherman_harpoon.revise_position();
    stage.setChildIndex(fisherman,1);
    stage.setChildIndex(fisherman_harpoon,2);
    stage.setChildIndex(bucket,1);
    stage.setChildIndex(score_board,1);
    bucket.visible = true;
    score_board.visible =true;

    for(i=0;i<catch_fish.length;i++){
      catch_fish[i].scale *= 1.56;
      catch_fish[i].alpha=1;
      stage.setChildIndex(catch_fish[i],3);
      catch_fish[i].y = (fisherman.y-(getrandom(50))*1.56+20*1.56);
      catch_fish[i].x = (fisherman.x+(35-getrandom(50))*1.56)
      createjs.Tween.get(catch_fish[i]).to({x:255+(50-getrandom(50))*1.56},5000);
    }
    var brid_num=0;
    createjs.Tween.get(fisherman).to({x:255},5000);
    createjs.Tween.get(fisherman_harpoon).to({x:255+40*(fisherman.scaleX<0?1:-1)},5000).call(()=>{
      create_score_catch_animal_container();
      createjs.Tween.get(fisherman).wait(1000).call(()=>{
        for(i=0;i<catch_fish.length;i++){
          if(catch_fish[i].animaltype  ==0){
            brid_num++;
            createjs.Tween.get(catch_fish[i]).wait(brid_num*200).to({y:220,x:380},600).wait(600).to({y:bucket.y+10,x:bucket.x+bucket.getwidth()/2},600).to({visible:false});
          }
        }
        if(catch_fish.length!=0)
        for(i=0;i<catch_fish.length;i++){
          if(catch_fish[i].animaltype == 0){
            catch_fish = arrayRemove(catch_fish,catch_fish[i]);
            i--;
            continue;
          }
          createjs.Tween.get(catch_fish[i]).wait(200*i+brid_num*200+(brid_num==0?0:2600)).to({visible:false,x:score_catch_animal_container.children[catch_fish[i].animaltype].x+score_catch_animal_container.x,y:score_catch_animal_container.children[catch_fish[i].animaltype].y+score_catch_animal_container.y},599).call(()=>{
            score_catch_animal_num[catch_fish[num_score_fish++].animaltype]++;
            score_catch_animal_text_update();
          })
        }
      });
    });
  }
  function create_game_timer(){
    countdown_time=game_time;
    countdown_text = new createjs.Text(game_time+"","30px Arial","#000000");
    countdown_text.x = canvas_width/2-10;
    countdown_text.y=20;
    countdown_timer=setInterval(countdown,1000)
    stage.addChild(countdown_text);
  }
  function catech_animal_update(){
    catch_animal_text.text = " X  "+catch_animal_num[1]+"\n\n X  "+catch_animal_num[2]+"\n\n X  "+catch_animal_num[3]+"\n\n X  "+catch_animal_num[4];
  }
  function create_catch_animal_container(){
    catch_animal_text.text = " X  0\n\n X  0\n\n X  0\n\n X  0";
    catch_animal_text.x  = 25;
    catch_animal_text.y  = -5;
    catch_animal_num = [0,0,0,0,0];
    catch_animal_container = new createjs.Container();
    var die_fish1 = new createjs.Sprite(animalsource[1].spritesheet,"normal_die");
    var die_fish2 = new createjs.Sprite(animalsource[2].spritesheet,"normal_die");
    var die_fish3 = new createjs.Sprite(animalsource[3].spritesheet,"normal_die");
    var die_fish4 = new createjs.Sprite(animalsource[4].spritesheet,"normal_die");
    die_fish1.scale = 0.08;
    die_fish2.scale=0.08;
    die_fish3.scale= 0.08;
    die_fish4.scale = 0.08;
    catch_animal_container.addChild(die_fish1);
    catch_animal_container.addChild(die_fish2);
    catch_animal_container.addChild(die_fish3);
    catch_animal_container.addChild(die_fish4);
    catch_animal_container.addChild(catch_animal_text);
    stage.addChildAt(catch_animal_container,1);
    die_fish2.y=die_fish1.y+23;
    die_fish3.y=die_fish2.y+23;
    die_fish4.y=die_fish3.y+23;
    catch_animal_container.x =canvas_width-70;
    catch_animal_container.y=50;
  }
  function score_catch_animal_text_update(){
    score_catch_animal_text.text =("  X  "+(score_catch_animal_num[1]>=10?(score_catch_animal_num[1]+""):(score_catch_animal_num[1]+"  "))+"                       X  "+(score_catch_animal_num[2]>=10?(score_catch_animal_num[2]+""):(score_catch_animal_num[2]+"  "))+"                           X  "+(score_catch_animal_num[3]>=10?(score_catch_animal_num[3]+""):(score_catch_animal_num[3]+"  "))+"                        X  "+score_catch_animal_num[4]+"");
    if(num_score_fish == catch_fish.length){
      question_init();
    }
  }
  function create_score_catch_animal_container(){
    score_catch_animal_text = new createjs.Text("  X  0                         X  0                             X  0                          X  0","18px Arial","#000000");
    score_catch_animal_text.x  = 25;
    score_catch_animal_text.y  = -5;
    score_catch_animal_container = new createjs.Container();
    var die_fish1 = new createjs.Sprite(animalsource[1].spritesheet,"normal_die");
    var die_fish2 = new createjs.Sprite(animalsource[2].spritesheet,"normal_die");
    var die_fish3 = new createjs.Sprite(animalsource[3].spritesheet,"normal_die");
    var die_fish4 = new createjs.Sprite(animalsource[4].spritesheet,"normal_die");
    die_fish1.scale =0.1872;
    die_fish2.scale = 0.1872;
    die_fish3.scale =0.1872;
    die_fish4.scale  =0.1872;
    score_catch_animal_container.addChild(score_catch_animal_text);
    score_catch_animal_container.addChild(die_fish1);
    score_catch_animal_container.addChild(die_fish2);
    score_catch_animal_container.addChild(die_fish3);
    score_catch_animal_container.addChild(die_fish4);
    stage.addChild(score_catch_animal_container);
    die_fish2.x=die_fish1.x+150;
    die_fish3.x=die_fish2.x+170;
    die_fish4.x=die_fish3.x+165;
    score_catch_animal_container.x =140;
    score_catch_animal_container.y=130;
  }
  function create_harpoon_text(){
    harpoon_text.x  =canvas_width-110;
    harpoon_text.y = 20;
    stage.addChild(harpoon_text);
  }
  function create_game_time_image(){
    game_time_image.x=canvas_width/2-48;
    game_time_image.y=12.5;
    game_time_image.scale=0.345;
    stage.addChild(game_time_image);
  }
  // function create_(){
  //   game_time_image.x=canvas_width/2-48;
  //   game_time_image.y=12.5;
  //   game_time_image.scale=0.345;
  //   stage.addChild(game_time_image);
  // }
  function game_start(){
    gamestart=true;
    back_container.visible=true;
    harpoon_update();
    create_game_time_image();
    create_harpoon_text();
    create_catch_animal_container();
    create_game_timer();
    game_event();
    open_bubble();
    open_fish();  
    open_bird();
  }
  function game_init() {
    now=1;
    clese_bird();
    clese_fish();
    clear_animal();
    clese_bubble();
    show_catch_animal_num = [0,0,0,0,0];
    catch_animal_num=[0,0,0,0,0];
    harpoon_list=new Array();
    animal_list =new Array();
    catch_fish = new Array();
    start_time_text = new createjs.Text("5","40px Arial","#000000");
    start_time_text.x=canvas_width/2-10;
    start_time_text.y = 200;
    start_time_text.alpha =0;
    stage.addChild(start_time_text);
    createjs.Tween.get(start_time_text).wait(1000).to({alpha:1},1000).to({text:"4"}).to({alpha:0}).to({alpha:1},1000).to({text:"3"}).to({alpha:0}).to({alpha:1},1000).to({text:"2"}).to({alpha:0}).to({alpha:1},1000).to({text:"1"}).to({alpha:0}).to({alpha:1},1000).to({x:360,text:"Start!"}).wait(1000).call(()=>{
      stage.removeChild(start_time_text);
      game_start();
     //score_init();
    });
  }
  function close_fishmanwalk(){
    clearInterval(fishman_walk);
  }
  function open_fishmanwalk(){
    fishman_walk=setInterval(()=>{
      if(!stop){
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
      }
    },20);
  }
  function close_game_event(){
    stage.removeEventListener("stagemousemove",mousemove);
    stage.removeEventListener("mousedown",mousedown);
    document.onmousedown = null;
    document.onkeydown = null;
    document.onkeyup = null;
  }
  function open_fish_ad(){
    //stage.addChild(fish_ad);
    fish_ad.visible=true;
    stage.setChildIndex(fish_ad,stage.numChildren-2);
    fish_ad.y=400;
    fish_ad.x=canvas_width+300;
    fish_ad.scale = 0.5;
    //stage.addChild(fish_ad);
    generate_fish_ad = setInterval(function(){
      fish_ad.x -= 2;
      if(fish_ad.x<= -300)fish_ad.x = canvas_width+250;
    },20);
  }
  function close_fish_ad(){
    //stage.removeChild(fish_ad);
    fish_ad.visible=false;
    clearInterval(generate_fish_ad);
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
  }
  function labbybutton_mouseout(index){
    labbybutton_source[index].haver.visible=false;
    labbybutton_source[index].underline.visible=false;
  }
  var labbybutton_source = new Array();
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
    start_shape.addEventListener("click",function(){  
      labbybutton_container.visible=false;
      game_init();
    });
    ranking_shape.addEventListener("click",function(){  
      labbybutton_container.visible=false;
      ranking_init();
    });
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
  function ranking_init(){
    background.image = loader.getResult("rank_background");
    back_container.visible=true;
    fisherman.visible=false;
    fisherman_harpoon.visible=false;
    close_fishmanwalk();
    close_fish_ad();
    sea.visible=false;
    now=3;
    clese_bird();
    clese_fish();
    for(var j=0;j<animal_list.length;j++)animal_list[j].visible=false;
    clear_animal();
    clese_bubble();
    //close_movement();
  }
  function labby_init(){
    now = 0;
    gamestart=false;
    close_game_event();
    clese_bird();
    clese_fish();
    clese_bubble();
    fisherman.visible=true;
    fisherman_harpoon.visible=true;
    sea.visible=true;
    stop =false;
    back_container.visible=false;
    harpoon_list = new Array() ;
    animal_list = new Array() ;
    bubble_list =new Array();
    background.image=loader.getResult("game_background");
    background.scale=0.5;
    fisherman.scale =0.16;
    fisherman_harpoon.scale=0.16;
    fisherman.x = 75;
    fisherman.y = canvas_seaheight-25;
    fisherman.regX = fisherman.image.width/2;
    fisherman.regY = fisherman.image.height/2;
    fisherman_harpoon.rotation= 35;
    fisherman_harpoon.x = fisherman.x+25*(fisherman.scaleX<0?1:-1);
    fisherman_harpoon.y = fisherman.y-5;
    sea.scale=0.5;
    sea.alpha=0.3;
    sea.x=0;
    sea.y=0;
    labbybutton_container.visible=true;
    open_fishmanwalk();
    open_fish_ad();
    open_fish();
    open_bubble();
    open_bird();
    console.log(fish_ad.visible)
  }