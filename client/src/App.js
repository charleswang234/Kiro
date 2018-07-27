import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Callback from './Callback';
import RentalsMap from "./rentals/RentalsMap";
import RentalsGrid from "./rentals/RentalsGrid";
import NewRental from "./rentals/NewRental";
import SingleRental from "./rentals/SingleRental";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (

      <BrowserRouter>
        <div className="main-container">
          <Header />
          <Route exact path="/" component= { Home } />
          <Route exact path="/rentals/map" component={ RentalsMap }/>
          <Route exact path="/rentals/grid" component={ RentalsGrid }/>
          <Route exact path="/rentals/new" component={ NewRental }/>
          <Route path="rentals/:id" component={ SingleRental } />



          
          <Route path="/callback" component={Callback} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
