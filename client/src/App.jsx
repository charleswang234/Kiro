import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import RentalsMap from "./rentals/RentalsMap.jsx";
import RentalsGrid from "./rentals/RentalsGrid.jsx";
import NewRental from "./rentals/NewRental.jsx";
import SingleRental from "./rentals/SingleRental.jsx";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return (
      <BrowserRouter>
        <div className="main-container">
          <Header />
          <Route exact path="/" component= { Home } />
          <Route exact path="/rentals/map" component={ RentalsMap }/>
          <Route exact path="/rentals/grid" component={ RentalsGrid }/>
          <Route exact path="/rentals/:id(\d+)" component={ SingleRental } />
          <Route exact path="/rentals/new" component={ NewRental }/>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;