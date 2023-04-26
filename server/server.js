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
  const body = req.body;

  const userName = body.userName;

  db.select("*")
    .from("network")
    .where({ user_name: userName })
    .then((rows) => {
      const networks = [];

      rows.forEach((row) => {
        networks.push(row);
      });
      res.status(200).json(JSON.stringify(networks));
    })
    .catch((err) => {
      next(err);
    });
});

app.get("/network", (req, res, next) => {
  const body = req.body;

  const networkName = body.networkName;
  const userName = body.userName;

  db.select("*")
    .from("network")
    .where({ network_name: networkName, user_name: userName })
    .then((rows) => {
      rows.forEach((row) => {
        network.push(row);
      });

      res.status(200).json(JSON.stringify(network));
    })
    .catch((err) => {
      next(err);
    });
});

app.get("node", (req, res, next) => {
  const body = req.body;

  const userName = body.userName;
  const nodeName = body.nodeName;

  db.select("*")
    .from("node")
    .where({ user_name: userName, node_name: nodeName })
    .then((node) => {
      res.status(200).send({ node });
    })
    .catch((err) => {
      next(err);
    });
});

app.post("/updateNetwork", (req, res, next) => {
  const body = req.body;

  console.log(body);
  const userName = body.userName;
  const networkName = body.networkName;
  const data = body.data;

  db("network")
    .where({ user_name: userName, network_name: networkName })
    .update({ data: data })
    .then(() => {
      res.status(200).send("Updated notes!");
    })
    .catch((err) => {
      next(err);
    });
});
