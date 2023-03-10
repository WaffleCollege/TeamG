const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "127.0.0.1",
  database: "taxidb",
  password: "satomi1118",
  port: 5432,
});
client.connect();

const query = {
    text:"INSERT INTO taxi_information VALUES($1,$2,$3)",
    values:[1, "なでしこタクシー","https://hinomaru.tokyo/nadeshico"]
};
client
  .query(query)
  .then((res) => {
    console.log(res);
    client.end();
  })
  .catch((e) => console.error(e.stack));