import bodyParser from "body-parser";
import express from "express";

const PORT = Number(80);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res) => {
  res.sendStatus(200);
});

app.listen(PORT);
