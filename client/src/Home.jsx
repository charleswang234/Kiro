import React, { Component } from "react";
import landing from "./landing.mp4";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

class Home extends Component {

  componentDidMount() {
    document.title = `Kiro`
    this.forceUpdate()
  }

  render() {
    return (
      <div>
        <video autoPlay muted loop className="landing-video">
          <source src={landing} type="video/mp4" />
        </video>
        <div className="mask" />
        <div className="title">
          <h1> Welcome to Kiro </h1>
          <h2>It's better than Craigslist.</h2>
          <div id="start-button">
            <Link to="/rentals/grid">
              <Button
                variant="raised"
                size="large"
                color="primary"
                style={{
                  borderRadius: 35,
                  backgroundColor: "#C62828",
                  padding: "14px 36px",
                  fontSize: "18px"
                }}
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

