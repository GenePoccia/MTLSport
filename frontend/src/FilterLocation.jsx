import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedFilterLocation extends Component {
  handleLocationChange = evt => {
    evt.preventDefault();
    let val = event.target.value;
    if (val === "undefined") val = undefined;

    this.props.dispatch({ type: "location-change", value: val });
  };

  render = () => {
    return (
      <div className="filterlocation">
        <div>Select your location : </div>
        <select name="Location" onChange={this.handleLocationChange}>
          <option value="undefined">All Locations</option>
          <option value="Ahuntsic">Ahuntsic </option>
          <option value="Anjou">Anjou</option>
          <option value="Cote-Des-Neiges">Cote-Des-Neiges</option>
          <option value="Central Montreal">Central Montreal</option>
          <option value="East-Montreal">East-Montreal</option>
          <option value="Lachine">Lachine</option>
          <option value="Lasalle">Lasalle</option>
          <option value="Hochelaga">Hochelaga</option>
          <option value="Mount-Royal">Mount-Royal</option>
          <option value="Verdun">Verdun</option>
          <option value="West-Island">West-Island</option>
          <option value="Westmount">Westmount</option>
        </select>
      </div>
    );
  };
}

let FilterLocation = connect()(UnconnectedFilterLocation);

export default FilterLocation;
