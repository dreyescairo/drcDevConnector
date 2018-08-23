import React, { Component } from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Route } from "react-router-dom";

=======
import { BrowserRouter as Router, route } from "react-router-dom";
>>>>>>> 6acfdf29959dd4367d9d16e20b2d018e729c0a00
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* imported components must have first letter Capital. */}
<<<<<<< HEAD

          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
=======
          <Navbar />
          <Route path="/" component={Landing} />
>>>>>>> 6acfdf29959dd4367d9d16e20b2d018e729c0a00
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
