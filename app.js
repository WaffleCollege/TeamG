// Express Server インスタンスを作成
let express = require("express");
let app = express();
const port = 3030;

//postgreSQLを使うために必要なコードです
const pg = require("pg");

// POSTで、req.bodyでJSON受け取りを可能に
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

//routerディレクトリにあるルーティング実装オブジェクトを読み込む
// const router = require('./router/index');

//express.Routerで作ったルーティング処理用のオブジェクトを利用する
// app.use('/', router);

//view engineにejsを設定する
app.set('view engine', 'ejs');


//DBを読み込む
var pool = new pg.Pool({
  database: "postgres",
  user: "postgres", //ユーザー名はデフォルト以外を利用した人は適宜変更すること
  password: "satomi1118", //PASSWORDにはPostgreSQLをインストールした際に設定したパスワードを記述。
  host: "localhost",
  port: 5432
});

//html,cssファイルを読み込む
//イベント作成画面
app.use("/create/event", express.static("event"));
app.use("/create/event",(req,res) => {
})

//イベント情報表示画面
app.use("/event/information", express.static("event_detail_info"));
app.use("/event/information", (req,res) => {
})

app.post("/createEvent/", (req,res,next) => {
  console.log(req.body);

//イベント作成画面で入力したデータをDBに格納
  var query = {
    text:
      "INSERT INTO events (departure, destination, date, numberOfPeople, time) VALUES($1, $2, $3, $4, $5)",
    values: [req.body.departure, req.body.destination, req.body.date, req.body.numberOfPeople, req.body.time]
  };

  pool.connect((err, client) => {
    if (err) {
      console.log(err);
    } else {
      // query関数の第一引数にSQL文をかく
      client
        .query(query)
        .then(() => {
          res.send("Data Added.");
        })
        .catch(e => {
          console.error(e.stack);
        });
    }
  });
});

//port番号
app.listen(3030, function(err) {
  if (err) console.log(err);
  console.log("listening at http://localhost:3030");
  });

//