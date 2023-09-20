/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

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
