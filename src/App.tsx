import React from 'react';
import './App.css';
import NavBarPr from "./Components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from "./Components/Banner";
import ImageContainer from "./Components/ImageContainer";


function App() {
  return (
    <div className="App">
      <NavBarPr />
        <Banner />
        <ImageContainer />
    </div>
  );
}

export default App;
