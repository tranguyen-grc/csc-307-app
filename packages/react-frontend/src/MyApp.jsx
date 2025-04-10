import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  // character array
  const [characters, setCharacters] = useState([]);

  // passed down into Table
  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  // passed down into Form
  function updateList(person) {
    setCharacters([...characters, person]);
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
