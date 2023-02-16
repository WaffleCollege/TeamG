// Express Server インスタンスを作成
let express = require("express");
let app = express();
//html,cssファイルを読み込む
//イベント作成画面
app.use("/create/event", express.static("event"));
app.use("/",(req,res) => {
})

//イベント

//port番号
app.listen(3000, () => {
    console.log("Start Server!");
})