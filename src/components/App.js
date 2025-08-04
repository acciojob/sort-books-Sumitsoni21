
import React from "react";
import './../styles/App.css';
import BookList from "./BookList";

const App = () => {
  return (
    <div className="app">
      {/* Do not remove the main div */}
      <BookList />
    </div>
  )
}

export default App
