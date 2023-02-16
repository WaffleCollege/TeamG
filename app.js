// Express Server インスタンスを作成
let express = require("express");
let app = express();

//html,cssファイルを読み込む
//イベント作成画面
app.use("/create/event", express.static("event"));
app.use("/create/event",(req,res) => {
})

//イベント情報表示画面
app.use("/event/information", express.static("イベント情報用のhtml,cssが入ったファイル名"));
app.use("/event/information", (req,res) => {
})

//port番号
app.listen(3000, () => {
    console.log("Start Server!");
})