import { Request, Response } from "express";
import { Database, SqlPassport } from "./constant";
import { table } from "./table";
import express from "express";
import mysql, { QueryError } from "mysql2";
import bodyParser from "body-parser";

const app = express();
const port = 5300;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: SqlPassport,
  database: Database,
});

db.connect((err: QueryError | null) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Connected!");
});

db.query(table, (err: Error) => {
  if (err) throw err;
});

app.post("/postItem", (req: Request, res: Response) => {
  const { title, description } = req.body;
  const sql = "INSERT INTO items (title, description) VALUES (?, ?)";
  db.query(sql, [title, description], (err: QueryError | null) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "item added" });
  });
});

app.get("/getItems", (req: Request, res: Response) => {
  db.query("SELECT * FROM items", (err: Error, results: any) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

app.get("/deleteItem/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "DELETE FROM items WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: `${id} deleted` });
  });
});

app.put("/updateItem/:id", (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { id } = req.params;
  const sql = "UPDATE items SET title = ?, description = ? WHERE id = ?";
  db.query(sql, [title, description, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: `${id} updated` });
  });
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
