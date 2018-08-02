import React, { Component } from "react";
import axios from 'axios';
import { getSingleListing } from "../ajax/listings";
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class RentalForm extends Component {
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
        unit: '',
        price: "",
        bedrooms: "",
        bathrooms: "",
        date: "",
        description: "",
      },
      imageURLs: [],
      redirect: false,
    }
    this.autocomplete = null
  }

  async componentDidMount() {
    let options = {
      componentRestrictions: { country: "CA" }
    }
    this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), options)
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
  }

  handleUploadImage = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);

    axios.post('/api/upload', data)
      .then(res => {
        let prevUrls = this.state.imageURLs;
        this.setState({
          imageURLs: [...prevUrls, res.data.file],
        })
      })
  }

  createImgTag(arr) {
    return arr.map(elm => <img key={elm} src={elm} alt="img" />)
  }

  handleChange = (e) => {
    const currData = Object.assign({}, this.state.data)
    currData[e.target.name] = e.target.value
    this.setState({ data: currData });
  }

  handlePlaceSelect = async () => {
    // Google Place Autocomplete call
    let addressObject = await this.autocomplete.getPlace()
    let address = addressObject.address_components
    let geocoder = new window.google.maps.Geocoder();
    // Google Geocode call
    geocoder.geocode({ 'address': `${addressObject.name} ${address[3].long_name} ${address[6].long_name}` }, (results, status) => {
      let currData = Object.assign({}, this.state.data, {
        street: addressObject.name || "",
        city: address[3].long_name || "",
        province: address[5].long_name || "",
        postal_code: results[0].address_components[7].long_name || "",
        lat: addressObject.geometry.location.lat(),
        lng: addressObject.geometry.location.lng(),
      })
      this.setState({ data: currData })
    })

  }

  render() {
    const { street, city, province, postal_code, lat, lng, unit, price, bedrooms, bathrooms, date, description } = this.state.data;

    return (
      <div className="new-rental-container">
        {this.state.redirect && <Redirect to="/profile" />}
        <h1>Create New Listing</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="autocomplete-container">
            <label> Input Address Here: </label>
            <TextField
              id="autocomplete"
              ref="input"
              required
            />
          </div>

          <div className="address-container">
            <TextField
              required
              label="Street Address"
              name={"street"}
              value={street}
              placeholder={"Street Address"}
              InputProps={{
                readOnly: true,
              }}
              onChange={this.handleChange} />
            <TextField
              required
              name={"city"}
              label="City"
              value={city}
              placeholder={"City"}
              InputProps={{
                readOnly: true,
              }}
              onChange={this.handleChange} />
            <TextField
              required
              name={"province"}
              label="Province"
              value={province}
              placeholder={"Province"}
              InputProps={{
                readOnly: true,
              }}
              onChange={this.handleChange} />
            <TextField
              required
              name={"postal_code"}
              label="Postal Code"
              value={postal_code}
              placeholder={"Postal Code"}
              InputProps={{
                readOnly: true,
              }}
              onChange={this.handleChange} />
            <TextField
              type="number"
              label="Unit Number"
              name="unit"
              value={unit}
              min={0}
              onChange={this.handleChange} />
          </div>

          <div className="listing-description-container">
            <TextField
              type="number"
              label="Price"
              name="price"
              value={price}
              onChange={this.handleChange}
              min="1"
              max ="10000"
              required />
            <TextField
              label="Bedrooms"
              type="number"
              name="bedrooms"
              value={bedrooms}
              onChange={this.handleChange}
              min="0"
              max="10"
              required />
            <TextField
              label="Bathrooms"
              type="number"
              name="bathrooms"
              value={bathrooms}
              onChange={this.handleChange}
              min="0"
              max="5"
              required />
            <TextField
              label="Date Available"
              type="date"
              name="date" value={date}
              onChange={this.handleChange}
              required />
            <TextField
              multiline
              required
              label="Description"
              type="text"
              name="description"
              value={description}
              onChange={this.handleChange} />
          </div>

          <div className="images-container">
            <input
              ref={(ref) => { this.uploadInput = ref; }}
              type="file" onChange={this.handleUploadImage}
              accept=".jpg, .jpeg, .png" />
          </div>
        </form>

        <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
        <button onClick={this.handleDelete}> Delete</button>
        {this.createImgTag(this.state.imageURLs)}
      </div>
    )
  }

}

export default RentalForm




