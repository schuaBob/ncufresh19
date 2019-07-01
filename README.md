# 統整大禮包
## 指令篇
### git
#### 當天結束前於master下
```shell=
$ git pull                      //將目前更新與遠端repo整合
$ git checkout -b 名子           //建立分支
$ git push後出現的那行upstream設定 //設定完後
$ git push
```
#### 早上開工前
```shell=
$ git checkout master //切換回master
$ git branch -D 名子   //刪除之前所建立之branch
$ git pull            //更新本地repo
```
### start server
```shell=
$ npm i
$ DEBUG=ncufresh19*: npm start
```
## 進度篇
第一週 : 熟悉架構，確定排版定型，想好哪些部分要寫死哪些要用ejs排
第二週 : 後端基本功能要會動，基礎排版架構弄好
第三、四週 : 網頁版差不多該完成！，弄好後台給企劃上資料，寫手機版
衝刺期 : DeeeeeBug，優化，彩蛋(?
> 程式碼記得寫的優美一點（縮排縮好、迴圈盡量不要太多層）
> 不然下屆學弟妹和組長會看得很辛苦
> [color=red]
>>區塊間要寫一點註解
>>不然回去看的時候會很痛苦
>>[color=#ff6f61]

### 呂晨瑀 : 新生必讀 (documents)
* 架構不要太亂，類似的分頁風格要統一
### 陳皇宇 : 小遊戲 (coolgame)
* 找[game engine](https://html5gameengine.com/)
* 要做好post以及其他Vulnerable的防犯
### 邱馨倫 : 影音專區 (vedio)
* iframe，youtube api
### 陳威捷 : Q&A、關於我們 (qna, about)
* 排序方法
* 搜尋模式
* 怎麼審核(跟企劃確認)
* load不能太慢
### 歐陽銓 : 校園地圖 (campus)
* 手機板，排版，各種操作(放大、滑動)
* 互動效能
* 2D轉3D，3D轉2D
### 林禹彤 : 中大生活 (life)
* lazy load
* 小小地圖
### 黃予珩 : 系所社團 (groups)
* lazy load
### 楊文彣 : 個人專區、登入頁面、常用連結、倒數頁面 (personal, login, link, comingsoon)
* 第一週先做到數頁面(comingsoon)，盡量在一週內做完
* login只需要做到login路由即可
* register的post要寫
## 常用工具篇
### Ckeditor 5
**script**
```javascript=
<script src="https://cdn.ckeditor.com/ckeditor5/12.2.0/classic/ckeditor.js"></script>
```
**掛上ckeditor與應用**
```javascript=
ClassicEditor
    .create(document.querySelector('#editor'))
    .then( neweditor => {
        console.log(neweditor)
    })
    .catch( error => {
        console.error(error);
    });
//拿資料
neweditor.getData()
//設定資料
neweditor.setData('<p>abcd</p>')
//當內文有變化時
neweditor.model.document.on('change:data',()=>{
    console.log('data changed.');
})
```


### Ajax
加個promise可能會比較順，或好看
#### Get method
* 前端
```javascript=
$.ajax({
    url:`/documents/require_data/?id=${id}`,
    method:'GET',
    dataType:'JSON',
    error: function(err){
        //失敗要做的事
    },
    success: function(data){
        //成功要做的事
    }
});
```
* [後端拿資料](https://expressjs.com/zh-tw/4x/api.html#req.query)
```javascript=
req.query.id
```
#### POST method
* 前端
```javascript=
$.ajax({
    url:    "/documents/require_data",
    method:'POST',
    data: {id : id},
    error: function(err){
        //失敗要做的事
    },
    success: function(data){
        //成功要做的事
    }
});
```
* 後端拿資料
```javascript=
req.body.id
```
### [EJS](https://ejs.co/#docs)
* 標籤 
    > 普通輸出用```<%= %>```
    > 只有在輸出html用```<%- %>```
    > 不是輸出用```<% %>```
    > [color=yellow]
* 註解方式
    > ```<% /* 我是不會顯示的註解。 */ %>```
    > 這樣註解才不會顯示在網頁原始碼裡面
    > ```<!-- 我是會顯示的註解。 -->```
    > 這種會顯示在網頁原始碼裡面：
    > [color=yellow]

### [Velocity.js](https://github.com/julianshapiro/velocity/wiki)
**include**
```htmlmixed=
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/2.0.5/velocity.min.js" integrity="sha384-OAa+lnzjUAtY24vqAEB8CYxD/8pX99G3ieMIN16c7UyXUDfFrAEMK+5VDIBDkc55" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/2.0.5/velocity.ui.min.js" integrity="sha384-B81jJfvCuCC7708e/RFAhEDAXxDl+6utSMjMUPKbjXNAxc4p4swDRGU9EAqBsQiY" crossorigin="anonymous"></script>
```
**usage**
> Velocity takes a map of CSS properties and values as its > > first argument. An options object can optionally be passed > in as a second argument:
> [color=yellow]
```javascript=
$("aaa").velocity({color: "red"},{duration:500});
//or
Velocity($("aaa"),{color: "red"},{duration:500});
```



### upload image
**前端**
```htmlmixed=
//name需要為img
<form action="uplaodimg" method="post" enctype="multipart/form-data">
    <input type="file" name="img">
    <button type="submit">submit</button>
</form>
```
**後端**
```javascript=
//上傳單一圖片
var size_in_mb = req.file.size*Math.pow(10,-6);//檔案不可超過4mb
if(size_in_mb<4) {
    fs.readFile(req.file.path,{encoding:"base64"},(err,bufferData)=>{//encoding file to buffer
    if(err) {return next(err);}
    /**便buffer後要做的事，以下存在為存在mongodb，範例僅供參考**/
    new docImg({
        img : {
            data : bufferData,
            contentType : req.file.mimetype
        }
    }).save((err)=>{
        if(err){return next(err);}
        /*******刪去暫存的圖片********/
        fs.unlink(req.file.path, (err)=>{
            if(err){return next(err)};
        })
        res.redirect('/')
      })
    })
} else {
    /*******刪去暫存的圖片********/
    fs.unlink(req.file.path, (err)=>{
        if(err){return next(err)};
    })
}
```
**Display in Front End**
```htmlmixed=
<img src="data:contentType;base64,Bufferdata">
```
## 其他提醒
### 合作建議
1. 重點是溝通
2. 不要一開始就打槍企劃組
    * ＸＸＸ為什麼做不到
    * ＸＸＸ比較好
    * 不然ＸＸＸ怎麼樣
3. 圖片如果不好排的話可以跟美工組溝通一下
    * ＸＸ圖可以幫我做成X比Y的嗎？
    * ＸＸ圖可以幫我去背嗎？
4. 要消失記得告訴組長和你的隊友，不要讓隊友以為你神隱了
### 語法建議
1. absolute route👎 v.s. relative route👍
2. css inline-style👎 v.s. embedded style👌 v.s. external styles👍
### 效能建議
1. 做動畫的效能：css > velocity.js > jquery animation
2. 如果只是想用jquery的選擇器的話：``document.querySelector()``
3. 資料庫query可以用Promise寫(想學可以問組長ＸＤ)
4. 資料表的各種操作: [populate](http://mongoosejs.com/docs/populate.html) [aggrgrate](https://docs.mongodb.com/manual/aggregation/)
### 其他工具
1. url跳到網頁特定區段 -> ``http://網址...../#class名稱``
2. 在前端解析get url
    ```javascript
    var url = new URL(window.location.href);
    console.log(url.searchParams.get('想get的值'));
    ```
3. 下載檔案 -> [``res.download();``](http://expressjs.com/zh-tw/4x/api.html#res.download)

![image alt](https://theharmonyclinic.com/wp-content/uploads/2016/08/child_girl_cartoon_poor_good_posture40829013_M.jpg)