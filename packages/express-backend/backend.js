import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

// allows backend to respond to calls coming from a dif origin
app.use(cors());

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// filter by name
const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

// filter by ID
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

// add a user
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

// delete a user by ID
const deleteUserById = (id) => {
  const user = users["users_list"].find((user) => user["id"] === id);
  if (!user) {
    return false;
  }
  const index = users["users_list"].indexOf(user);
  users["users_list"].splice(index, 1);
  return true;
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const success = deleteUserById(id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).send("User not found.");
  }
});

const findUsersByNameAndJob = (name, job) =>
  users["users_list"].find(
    (user) => user["name"] === name && user["job"] === job
  );

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  console.log("Received query parameters:", req.query);
  let result;
  if (name && job) {
    result = { users_list: findUsersByNameAndJob(name, job) };
  } else if (name) {
    result = { users_list: findUserByName(name) };
  } else {
    result = users;
  }
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
