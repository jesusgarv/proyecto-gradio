import React from 'react';
import './App.css';
import NavBarPr from "./Components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from "./Components/Banner";


function App() {
  return (
    <div className="App">
      <NavBarPr />
        <Banner />
    </div>
  );
}

export default App;
