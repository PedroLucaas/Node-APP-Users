const express = require('express');
const UserModel = require('../src/models/user.model');
const app = express();


// configure the app 
app.set('port', ('view engine', 'ejs'));
app.set("views", "./src/views");
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// HOME PAGE
app.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).send(
      `<head>
      <style>
        body {
          background-color: #5c5c5c;}
        h1, h2 {
          color: white;
          font-family: 'verdana';
          font-size: 40px;
          font-weight: bold;}
          a{
            color: white;
            font-family: 'verdana';
            font-size: 20px;
            font-weight: bold;
          }
          #a{
            color: #f33ff3;
          }
          button {
            margin: 30px 0 0 0;
            align-items: center;
            justify-content: center;
            height: 50px;
            width: 200px;
            background-color: #fff;
            font-family: verdana;
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            text-decoration: none;
            border-radius: 3px;
            border: 1px solid white;
          }
      </style>
      </head>
      <h1>Welcome to the Express App</h1>
      <h2>There are ${users.length} users in the database</h2> 
      ${users.map(user => `<a href="mailto:${user.mail}">${user.name},</a> <br>`).join('')}
      <button><a id="a"href="/new-user">Add a new user</a></button>`
      );

  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// create user
app.get("/new-user", (req, res) => {
  res.render('create.ejs');
});
app.post("/new-user", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).render('created.ejs');
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// find user by id
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
const port= 8080;
// server start
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
