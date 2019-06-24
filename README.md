# ncufresh19

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
$  DEBUG=ncufresh19*: npm start
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
### 陳皇宇 : 小遊戲 (smallgame)
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
### Mongodb、Mongoose
### Ckeditor 5
### Ajax
### EJS
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
### upload、load圖片、download file
### css
## 其他提醒
