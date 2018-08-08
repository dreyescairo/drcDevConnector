import React, { Component } from "react";
import { BrowserRouter as Router, route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* imported components must have first letter Capital. */}
          <Navbar />
          <Route path="/" component={Landing} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
