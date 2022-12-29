import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SearchForm extends Component {

  state = {
    query: "",
    emptyQuery: false
  }

  componentDidMount () {
    this.setState({ query: this.props.searchTerm })
  }

  // This lets the SearchImages component know to use the query here for the search action
  handleSubmit = event => {
    event.preventDefault()
    this.setState({ emptyQuery: !this.state.query})
    if (this.state.query) this.props.fetchImages(this.state.query)
  }



  // Renders a form to search
  render() {
    const errorMessage = () => {
      if (this.state.emptyQuery) {
        return <p>Celestial term cannot be empty</p>
      }
    }

    return (
      <div className="searchcontent">
        <h3 className="searchtext">Enter a Celestial Term:</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.query} onChange={event => this.setState({query: event.target.value})} />
          <Link to="/search" onClick={this.handleSubmit}><button id="searchformbutton">Submit</button></Link>
        </form>
        { errorMessage() }
      </div>
    )
  };
}

export default SearchForm
