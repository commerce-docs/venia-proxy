/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying it. */

import "./App.css";
import { useState } from "react";
import fetchCategories from "./fetchCategories";

function App() {
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const fetchedCategories = await fetchCategories("2");
      setCategories(fetchedCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  return (
    <div className="App">
      <button onClick={fetchData}>Fetch Categories from Venia</button>
      {categories.length > 0 && (
        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
          {categories.map(({ uid, name }) => (
            <li key={uid}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
