import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  // character array
  const [characters, setCharacters] = useState([]);

  // passed down into Table
  function removeOneCharacter(index) {
    const characterToDelete = characters[index];

    fetch(`http://localhost:8000/users/${characterToDelete.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          const updated = characters.filter((character, i) => i !== index);
          setCharacters(updated);
          console.log("User deleted successfully.");
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // passed down into Form
  function updateList(person) {
    if (!person.name || !person.job) {
      console.error("Please fill out both the name and job fields.");
      return; // exit if fields are not filled properly
    }
    postUser(person)
      .then((newUser) => {
        console.log("Successfuly added:", newUser);
        setCharacters([...characters, newUser]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // to add user
  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }).then((res) => {
      console.log("POST response status:", res.status);
      if (res.status === 201) {
        return res.json();
      } else {
        throw new Error("User not created. Status: " + res.status);
      }
    });

    return promise;
  }

  return (
    <div className="container">
      {/* pass character array and removeOneCharacter to Table */}
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      {/* pass updateList to Form */}
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
