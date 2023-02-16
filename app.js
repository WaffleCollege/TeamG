// Express Server インスタンスを作成
let express = require("express");
let app = express();
//html,cssファイルを読み込む
app.use("/", express.static("event"));
app.use("/",(req,res) => {
})

//port番号
app.listen(3000, () => {
    console.log("Start Server!");
})