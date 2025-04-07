import React, { useState } from "react";
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
