const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

app.post("/createUser", (req, res, next) => {
  const body = req.body;

  const username = body.username;
  const password = body.password;

  if (userExists(username)) {
    const err = new Error("User already exists");
    err.status = 409;
    return next(err);
  }

  db("users")
    .insert({ username: username, password: password })
    .then(() => {
      return db("users").where({ username: username }).first();
    })
    .then((user) => {
      console.log(user);
      res.status(201).json({ user });
    })
    .catch((e) => {
      console.log(e);
      next(e);
    });
});

app.post("/login", (req, res, next) => {
  const body = req.body;

  const username = body.username;
  const password = body.password;

  db.select("*")
    .from("users")
    .where({ username, username, password })
    .then((rows) => {
      if (rows.length === 0) {
        const err = new Error("Invalid username or password");
        err.status = 401;
        return next(err);
      }

      const user = rows[0];
      console.log(user);
      res.status(200).json({ user });
    })
    .catch((err) => next(err));
});

const userExists = () => {
  return false;
};

app.post("/createNetwork", (req, res, next) => {
  const body = req.body;

  console.log(body);
  const networkName = body.networkName;
  const userName = body.userName;
  const data = body.data;

  db("network")
    .insert({
      network_name: networkName,
      user_name: userName,
      data: data,
    })
    .then(() => {
      res.status(201).send("Created Network!");
    })
    .catch((err) => {
      next(err);
    });
});

app.get("/networks", (req, res, next) => {
  db.select("*")
    .from("network")
    .then((rows) => {
      res.status(200).json(JSON.stringify(rows));
    })
    .catch((err) => {
      next(err);
    });
});

app.post("/updateNetwork", (req, res, next) => {
  const body = req.body;

  const userName = body.userName;
  const networkName = body.networkName;
  const data = body.data;

  db("network")
    .where({ network_name: networkName, user_name: userName })
    .update({ data: data })
    .then(() => {
      res.status(200).send("Updated network!");
    })
    .catch((err) => {
      next(err);
    });
});

app.post("/delete", (req, res, next) => {
  const body = req.body;

  const networkName = body.networkName;
  const userName = body.userName;

  db("network")
    .where({ network_name: networkName, user_name: userName })
    .del()
    .then(function (rowsDeleted) {
      res.status(204).send(rowsDeleted + " rows deleted");
    })
    .catch(function (error) {
      console.error(error);
    });
});
