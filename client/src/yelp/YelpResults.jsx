import React, { Component } from "react";
import ReactStars from "react-stars";
import { metresToKm } from "../helpers/number-formatters";

class YelpResults extends Component{

  scrollToTop = () => {
    this.yelpHeader.scrollIntoView({ behavior: "instant" });
  }

  componentDidUpdate() {
    this.scrollToTop();
  }

  sortByKey(array, key) {
    return array.sort((a, b) => a[key] - b[key]);
  }

  render(){
    const searchTerm = this.props.searchTerm[0].toUpperCase() + this.props.searchTerm.slice(1);
    const columnStyle = {height: this.props.height};

    return(
      <div className="default-flex-column-container" style={columnStyle}>
        <div className="search-category" ref={(el) => { this.yelpHeader = el; }}>
          <h3>Local {searchTerm}</h3>
        </div>
        {this.sortByKey(this.props.results, "distance").map(amenity => {
          const distance = metresToKm(amenity.distance) + " km away"
          return(
            <a className="yelp-results-link" key={amenity.id} href={amenity.url}>
              <div className="yelp-results-item">
                <header>{amenity.name}</header>
                <div className="image-container">
                  <img
                    alt={amenity.name + "image"}
                    src={amenity.image_url}
                    onError={(e) => { e.target.src = "/images/no-image.jpg" }}
                  />
                </div>
                <div className="yelp-results-info-container">
                  <div>{distance}</div>
                  <div>{amenity.location.address1}</div>
                  <div>{amenity.display_phone}</div>
                  {/* <div>{amenity.rating}</div> */}
                  <ReactStars
                    half={true}
                    edit={false}
                    size={20}
                    value={amenity.rating}
                  />
                </div>
              </div>
            </a>
          )
        })
        }
      </div>
    )
  }
}

export default YelpResults;

