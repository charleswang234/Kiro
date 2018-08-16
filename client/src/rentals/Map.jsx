import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import RentalMarker from "./RentalMarker"

const MapComponent = withScriptjs(withGoogleMap((props) => {
  const listingMarkers = props.listings.map((elem, i) => {
    const position = { lat: elem.lat, lng: elem.lng }

    //If the marker's id matches the activeInfoBoxId passed down from Rentals Map
    //then set showInfoBox to true so that it is rendered
    const showInfoBox = props.activeInfoBoxId === elem.id ? true : false;
    return (
      <RentalMarker
        key={i}
        id={elem.id}
        photo={elem.photos[0]}
        position={position}
        price={elem.price}
        bedrooms={elem.bedrooms}
        bathrooms={elem.bathrooms}
        address={elem.street + ", " + elem.city}
        toggleMarker = { props.toggleMarker }
        handleMarkerClick = { props.handleMarkerClick }
        showListingBox = { props.showListingBox }
        showInfoBox = { showInfoBox }
      />
    )
  })

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
    >
      {props.listings && listingMarkers}
    </GoogleMap>
  )
}))

export default MapComponent;