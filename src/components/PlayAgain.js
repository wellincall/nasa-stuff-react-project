import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class PlayAgain extends Component {
  render() {

    return (
      <div className="playagainbutton">
        <button onClick={this.props.nextChallenge}>next!</button>
        <Link to="/"><button className="back">Go Back</button></Link>
      </div>
    );
  }
}
