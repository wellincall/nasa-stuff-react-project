import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import $ from 'jquery'

import Game from './components/Game'
import SearchForm from './components/SearchForm'
import SearchResults from './components/SearchResults'

import './App.css';

import Header from './containers/Header'
import MainContainer from './containers/MainContainer'

export default class App extends Component {

  state = {
    images: [],
    loading: false,
    searchTerm: "",
    errorOnQuery: false
  }



//The NASA API is called and then the results go to the state
  fetchImages = (query = "") => {
    this.setState({ loading: true })
    $.ajax({
      url: `https://images-api.nasa.gov/search?q=${query}`
    }).then(json => {
      this.setState({ images: json.collection.items, loading: false, searchTerm: query })
    })
  }

  //the welcome component has the header/navbar and the button to choose to search is toggled
    render() {
      return(
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={MainContainer} />

            <Route exact path="/game" component={Game} />

            <Route
             path="/search"
             render={(props) => <SearchForm {...props} fetchImages={this.fetchImages} searchTerm={this.state.searchTerm} />}
            />
            <Route
             path="/search"
             render={
               (props) => 
                 <SearchResults {...props} 
                   getResults={this.state.images} 
                   loading={this.state.loading} 
                   searchTerm={this.state.searchTerm}
                 />
             }
            />
          </div>
        </BrowserRouter>
      )
    }

}
