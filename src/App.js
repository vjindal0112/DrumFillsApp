import React, { Component, Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import "./App.sass";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueTrack: "",
      valueArtist: "",
      error: null,
      isLoaded: false,
      items: []
    };

    this.handleInputTrack = this.handleInputTrack.bind(this);
    this.handleInputArtist = this.handleInputArtist.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputTrack(event) {
    this.setState({ valueTrack: event.target.value });
  }
  handleInputArtist(event) {
    this.setState({ valueArtist: event.target.value });
  }

  handleSubmit(event) {
    const clientID = "d8a0d3d21e3d4b77a3801bcb1c5d329e";
    const clientSecret = "d27e239c4d434344bc1891b28cd11b3b";

    event.preventDefault();
    // console.log("theaudiodb.com/api/v1/json/1/searchtrack.php?s=" + this.state.valueArtist + "&t=" + this.state.valueTrack);
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
         Authorization: 'Basic ' + (new Buffer(clientID + ':' + clientSecret).toString('base64'))
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        // client_id: clientID,
        // client_secret: clientSecret
      })
    })
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function(data) {
        console.log(data);
      });
  }
  // fetch("https://itunes.apple.com/search?term=" + this.state.valueTrack)
  // fetch("http://theaudiodb.com/api/v1/json/1/searchtrack.php?s=" + this.state.valueArtist + "&t=" + this.state.valueTrack)
  // .then(res => res.json())
  //   .then(
  //     (res) => {
  //       console.log(res.track);
  //       this.setState({
  //         isLoaded: true,
  //         items: res.track
  //       });
  //     },
  //     // Note: it's important to handle errors here
  //     // instead of a catch() block so that we don't swallow
  //     // exceptions from actual bugs in components.
  //     (error) => {
  //       this.setState({
  //         isLoaded: true,
  //         error: error
  //       });
  //     }
  //   )

  // }

  render() {
    return (
      <Fragment>
        <h1 className="title">Bulma</h1>
        <p className="subtitle">
          Modern CSS framework based on{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox">
            Flexbox
          </a>
        </p>

        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="control">
              <label>
                <input
                  className="input"
                  value={this.state.valueTrack}
                  type="text"
                  placeholder="Track"
                  onChange={this.handleInputTrack}
                />
                <input
                  className="input"
                  value={this.state.valueArtist}
                  type="text"
                  placeholder="Artist"
                  onChange={this.handleInputArtist}
                />
              </label>
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>

        <div className="field">
          <p className="control">
            <span className="select">
              <select>
                <option>Select dropdown</option>
              </select>
            </span>
          </p>
        </div>

        <div className="buttons">
          <a className="button is-primary">Primary</a>
          <a className="button is-link">Link</a>
        </div>
      </Fragment>
    );
  }
}

export default App;
