let express = require("express");
let app = express();
let cors = require("cors");
let multer = require("multer");
let upload = multer();
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
app.use(bodyParser());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
let generateId = () => {
  return "" + Math.floor(Math.random() * 10000000);
};
let Mongo = require("mongodb");
let MongoClient = Mongo.MongoClient;
let ObjectId = Mongo.ObjectId;
let url =
  "mongodb+srv:fatou2:ilovejack@cluster0-31ytq.mongodb.net/test?retryWrites=true";
let dbs = undefined;
MongoClient.connect(url, (err, allDbs) => {
  console.log(err);
  dbs = allDbs;
});
app.post("/signup", upload.none(), (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let enteredPassword = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let age = req.body.age;
  let db = dbs.db("Forum");
  db.collection("users").findOne({ user: username }, (err, results) => {
    if (results === null) {
      let sessionId = generateId();
      db.collection("sessions").insertOne({
        sessionId,
        email,
        username,
        firstName,
        lastName,
        age
      });
      db.collection("users").insert({
        firstName: firstName,
        lastName: lastName,
        email: email,
        user: username,
        password: enteredPassword,
        age: age
      });
      res.cookie("sid", sessionId);
      res.send(JSON.stringify({ success: true }));
      return;
    }
    res.send(JSON.stringify({ success: false }));
  });
});
app.post("/login", upload.none(), (req, res) => {
  let username = req.body.username;
  let enteredPassword = req.body.password;
  let db = dbs.db("Forum");
  db.collection("users").findOne(
    {
      user: username,
      password: enteredPassword
    },
    (err, results) => {
      console.log("results login", results);
      if (results !== null) {
        let expectedPassword = results.password;
        let expectedUsername = results.user;
        if (
          enteredPassword === expectedPassword &&
          expectedUsername === username
        ) {
          let sessionId = generateId();
          db.collection("sessions").insertOne({
            sessionId,
            username,
            firstName: results.firstName,
            lastName: results.lastName,
            age: results.age
          });
          res.cookie("sid", sessionId);
          res.send(JSON.stringify({ success: true, results }));
        } else res.send(JSON.stringify({ success: false }));
      } else res.send(JSON.stringify({ success: false }));
    }
  );
});

app.get("/check-login", (req, res) => {
  let db = dbs.db("Forum");
  db.collection("sessions").findOne(
    { sessionId: req.cookies.sid },
    (err, results) => {
      if (results) {
        let username = results.username;
        if (username !== undefined) {
          res.send(JSON.stringify({ success: true, results }));
          return;
        }
        res.send(JSON.stringify({ success: false }));
      } else {
        res.json({ success: false });
      }
    }
  );
});

app.get("/logout", (req, res) => {
  let db = dbs.db("Forum");
  db.collection("sessions").deleteOne({ sessionId: req.cookies.sid });
  res.send(JSON.stringify({ success: true }));
});
app.post("/new-thread", upload.none(), (req, res) => {
  let newThread = req.body;
  let sessionId = req.cookies.sid;
  console.log("endpoint body here: ", req.body);
  let db = dbs.db("Forum");
  db.collection("sessions").findOne({ sessionId }, (err, results) => {
    console.log(err);
    let username = results.username;
    newThread.replies = [];
    newThread.user = username;
    db.collection("threads").insertOne(newThread);
    return res.send(JSON.stringify({ newThread, success: true }));
  });
});
app.post("/replies", upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;
  let db = dbs.db("Forum");
  let threadId = req.body.threadId;
  db.collection("sessions").findOne({ sessionId }, (err, results) => {
    console.log(err);
    let username = results.username;
    db.collection("threads").updateOne(
      { _id: ObjectId(threadId) },
      { $push: { replies: { user: username, msg: req.body.msg } } }
    );
    res.send(JSON.stringify({ success: true }));
  });
});
app.get("/thread", (req, res) => {
  let db = dbs.db("Forum");
  db.collection("threads")
    .find({})
    .toArray((err, results) => {
      console.log(err);
      res.send(JSON.stringify({ success: true, results }));
    });
});
app.post("/myAccount", (req, res) => {
  let myAccount = req.body;
  let db = dbs.db("Forum");
  db.collection("sessions").findOne(
    { sessionId: req.cookies.sid },
    (err, results) => {
      myAccount.firstName = results.firstName;
      myAccount.lastName = results.lastName;
      db.collection("account").insertOne(myAccount);
      return res.send(JSON.stringify({ success: true, myAccount }));
    }
  );
});
app.post("/sell-item", upload.none(), (req, res) => {
  let sellItem = req.body;
  let sessionId = req.cookies.sid;
  let db = dbs.db("Forum");
  db.collection("sessions").findOne({ sessionId }, (err, results) => {
    console.log(err);
    let username = results.username;
    sellItem.replies = [];
    sellItem.user = username;
    db.collection("threads").insertOne(sellItem);
    return res.send(JSON.stringify({ sellItem, success: true }));
  });
});
app.get("/detailsUser", upload.none(), (req, res) => {
  let db = dbs.db("Forum");
  db.collection("users")
    .find({})
    .toArray((err, results) => {
      res.send(JSON.stringify({ success: true, results }));
    });
});
app.post("/delete-message", upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;
  let threadId = req.body.threadId;
  let db = dbs.db("Forum");
  db.collection("sessions").findOne({ sessionId }, (err, results) => {
    console.log(err);
    let username = results.username;
    db.collection("threads").findOne(
      { _id: ObjectId(threadId) },
      (err, results) => {
        console.log(err);
        let replies = results.replies;
        let lastIndex = undefined;
        for (let i = 0; i < replies.length; i++) {
          if (replies[i].user === username) {
            lastIndex = i;
          }
        }
        if (lastIndex !== undefined) {
          replies.splice(lastIndex, 1);
          db.collection("threads").updateOne(
            { _id: ObjectId(threadId) },
            { $set: { replies: replies } }
          );
          return res.send(JSON.stringify({ success: true }));
        } else return res.send(JSON.stringify({ success: false }));
      }
    );
  });
});
app.listen(4000);
