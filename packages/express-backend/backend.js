import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

// allows backend to respond to calls coming from a dif origin
app.use(cors());

app.use(express.json());
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userServices
    .findUserById(id)
    .then((user) => {
      if (!user) res.status(404).send("User not found.");
      else res.send(user);
    })
    .catch((error) => res.status(500).send(error.message));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices
    .addUser(userToAdd)
    .then((savedUser) => res.status(201).json(savedUser))
    .catch((error) => res.status(400).send(error.message));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userServices
    .deleteUserById(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).send("User not found.");
      } else {
        res.status(204).send(); // success, no content
      }
    })
    .catch((err) => res.status(500).send(err.message));
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name && job) {
    userServices
      .findUsersByNameAndJob(name, job)
      .then((users) => res.json({ users_list: users }))
      .catch((err) => res.status(500).send(err.message));
  } else {
    userServices
      .getUsers(name, job)
      .then((users) => res.json({ users_list: users }))
      .catch((err) => res.status(500).send(err.message));
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
