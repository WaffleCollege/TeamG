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
app.use("/create/event", express.static("MVP9イベント作成"));
app.use("/create/event",(req,res) => {
})

//イベント情報表示画面
app.use("/event/information", express.static("event_detail_info"));
app.use("/event/information", (req,res) => {
})

// //イベント情報表示して確認する画面
// // app.use("/confirm/event/information/", express.static("MVP10イベント詳細確認"));
// app.get('/confirm/event/informations/', (req,res) => {
//   console.log("ここだよ！");
//   res.render('mvp9_createEvent_info');
//   console.log("ここだよ！");
// });


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

//mvp9_createEvent_info.ejsで表示させるPostgresのDBからデータをとってくる
app.get('/confirm/event/information/', (req, res, next) => {
  // データベースからデータを読み込む
  pool.connect((err, client) => {
    if (err) {
      console.log(err);
    } else {
      // query関数の第一引数にSQL文をかく
      console.log("ここだよ！");
      client.query("SELECT destination FROM events", (err, result) => {
       console.log(result.rows[0].destination);
               res.render("mvp9_createEvent_info", {
          // departure: result.rows[0].departure,
          destination: result.rows[0].destination,
          date: result.rows[0].date,
          numberOfPeople: result.rows[0].numberofpeople,
          time: result.rows[0].time

        });

        //コンソール上での確認用
        console.log(result);
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