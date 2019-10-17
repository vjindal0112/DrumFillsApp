import React, { Component, Fragment, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './App.sass'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: null,
      isLoaded: false,
      items: []
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("https://itunes.apple.com/search?" + this.state.value);
    // fetch not working yet
    fetch("https://itunes.apple.com/search?" + this.state.value)
    .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    alert('api: ' + this.state.items);
  }

  render() {
    return (
      <Fragment>

        <h1 className="title">Bulma</h1>
        <p className="subtitle">
          Modern CSS framework based on{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox">
            Flexbox
          </a>
        </p>

        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="control">
              <input className="input" value={this.state.value} type="text" placeholder="Input" onChange={this.handleInput}/>
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
