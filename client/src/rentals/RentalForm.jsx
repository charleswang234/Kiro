import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import SingleImage from './SingleImage.jsx';
import TextField from '@material-ui/core/TextField';
import { fetchLandlord } from "../ajax/auth.js";
import BackgroundImage from "../BackgroundImage";

class RentalForm extends Component {
  FORM_TITLE = null;

  constructor(props) {
    super(props)
    this.state = {
      data: {
        street: '',
        city: '',
        province: '',
        postal_code: '',
        lat: 0,
        lng: 0,
        price: "",
        bedrooms: "",
        bathrooms: "",
        date: "",
        description: "",
      },
      imageURLs: [],
      redirect: false,
      edit: false,
      errors: null,
    }
    this.autocomplete = null
  }

  componentDidMount() {
    if (localStorage.JWT_TOKEN) {
      fetchLandlord({ token: localStorage.JWT_TOKEN })
        .then(res => {
          if(!res.id) {
            this.setState({redirect: true})
          }
          this.setState({ landlordId: res.id })
        })
    }
  }
  componentDidUpdate() {
    let options = {
      componentRestrictions: { country: "CA" },
      types: ['address'],
    }
    this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), options)
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
  }

  handleUploadImage = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);

    axios.post('/api/upload', data,
      { headers: { Authorization: localStorage.getItem("JWT_TOKEN") } }
    )
      .then(res => {
        let prevUrls = this.state.imageURLs;
        this.setState({
          imageURLs: [...prevUrls, res.data.file],
        })
      })
      .catch(err => {
        alert("Sorry, we only accept image files.")
      })
  }

  handleDeleteImage = (imageURL, e) => {
    e.preventDefault()
    let imagesArr = this.state.imageURLs
    let index = imagesArr.indexOf(imageURL);
    if (index > -1) {
      imagesArr.splice(index, 1);
      this.setState({ ...this.state, imageURLs: imagesArr })
    }
  }

  createImgTag(arr) {
    return arr.map((elm, i) => <SingleImage key={i} index={i} image={elm} handleDeleteImage={this.handleDeleteImage} />)
  }

  handleChange = (e) => {
    const currData = Object.assign({}, this.state.data)
    currData[e.target.name] = e.target.value
    this.setState({ data: currData });
  }

  handlePlaceSelect = async () => {
    // Google Place Autocomplete call
    let addressObject = await this.autocomplete.getPlace()
    if (!addressObject || !("address_components" in addressObject)) {
      return
    }
    let address = addressObject.address_components
    let currData = Object.assign({}, this.state.data, {
      street: addressObject.name,
      city: address[3].long_name,
      province: address[5] ? address[5].long_name : "CA",
      postal_code: address[address.length-1].long_name,
      lat: addressObject.geometry.location.lat(),
      lng: addressObject.geometry.location.lng(),
    })
    this.setState({ data: currData })

  }

  render() {
    const { street, city, province, postal_code, lat, lng, price, bedrooms, bathrooms, date, description } = this.state.data;
    if (!localStorage.JWT_TOKEN) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        {this.state.redirect && <Redirect to="/" />}
        <BackgroundImage />
        <div className="new-rental-container">
          {this.state.redirect && <Redirect to="/rentals/manage" />}
          <form className="new-listing-container" onSubmit={this.handleSubmit}>
            <h2>{this.FORM_TITLE}</h2>

            <div className="heading-container">
              <h3> Address </h3>
            </div>
            <section>
              <div className="listing-field">
                <TextField
                  id="autocomplete"
                  label="Type Address Here"
                  required
                  fullWidth
                  autoFocus
                />
              </div>

              <div className="listing-field">
                <TextField
                  required
                  fullWidth
                  label="Street Address"
                  name={"street"}
                  value={street}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={this.handleChange} />
              </div>


              <div className="listing-field">
                <TextField
                  required
                  fullWidth
                  name={"city"}
                  label="City"
                  value={city}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={this.handleChange} />
              </div>

              <div className="listing-field">
                <TextField
                  required
                  fullWidth
                  name={"province"}
                  label="Province"
                  value={province}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={this.handleChange} />
              </div>

              <div className="listing-field">
                <TextField
                  required
                  fullWidth
                  name={"postal_code"}
                  label="Postal Code"
                  value={postal_code}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={this.handleChange} />
              </div>

            </section>

            <div className="heading-container">
              <h3>Details</h3>
            </div>
            <section >

              <div className="listing-field">
                <TextField
                  inputstyle={{ fontSize: '2rem' }}
                  type="number"
                  label="Price"
                  name="price"
                  value={price}
                  onChange={this.handleChange}
                  min="1"
                  max="10000"
                  required
                />
              </div>

              <div className="listing-field">
                <TextField
                  inputstyle={{ fontSize: '2rem' }}
                  label="Bedrooms"
                  type="number"
                  name="bedrooms"
                  value={bedrooms}
                  onChange={this.handleChange}
                  min="0"
                  max="10"
                  required
                />
              </div>

              <div className="listing-field">
                <TextField
                  inputstyle={{ fontSize: '2rem' }}
                  label="Bathrooms"
                  type="number"
                  name="bathrooms"
                  value={bathrooms}
                  onChange={this.handleChange}
                  min="0"
                  max="5"
                  required
                />
              </div>

              <div className="listing-field">
                <TextField
                  inputstyle={{ fontSize: '2rem' }}
                  label="Date Available"
                  type="date"
                  name="date"
                  value={date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="listing-field">
                <TextField
                  inputstyle={{ fontSize: '2rem' }}
                  multiline
                  required
                  fullWidth
                  label="Description"
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.handleChange} />
              </div>

              <div className="heading-container">
                <h3> Images </h3>
              </div>
              <div className="listing-field">
                <div className="photos-container">
                  <div className="photo-grid-container">
                    {this.createImgTag(this.state.imageURLs)}
                  </div>
                  {this.state.imageURLs.length < 5 &&
                    <input
                      ref={(ref) => { this.uploadInput = ref; }}
                      type="file" onChange={this.handleUploadImage}
                      accept=".jpg, .jpeg, .png"
                    />
                  }
                </div>
              </div>
            </section>
            {this.state.errors && <div className="error">{this.state.errors[0]}</div>}
            <div className="submit">
              <Button variant="contained" color="primary" onClick={this.handleSubmit}>{this.state.edit ? "Submit Changes" : "Post Your Listing"}</Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default RentalForm