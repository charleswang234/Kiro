import React, { Component } from "react";

class SingleImage extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.image !== this.props.image
  }

  render() {
    return (
      <div className="photo-grid-card">
        <div className="photo-grid-photo-container">
          <img src={this.props.image} alt="img" />
        </div>
        <div className="photo-info">
          {this.props.index === 0 &&
            <div>Main Picture</div> }
          <button className="picture-remove" onClick={(e) => this.props.handleDeleteImage(this.props.image, e)}>Remove</button><br/>
        </div>
      </div>
    )
  }
}

export default SingleImage