import React, { Component } from 'react';
import $ from 'jquery'
  
import PlayAgain from './PlayAgain'

export default class Game extends Component {

//state tracks the current image from the api, the item trhe player guessed, attempts played, and whether the game has been played once
  state = {
    image: "",
    item: "",
    gamePlayed: false,
    gameCount: 0,
    currentReward: 7,
    totalScore: 0,
    loading: false,
    wrongGuesses: []
  }

//ajax request to get the image for the game
  getGameImage = () => {
    const spaceSearch = ["moon", "earth", "jupiter", "saturn", "pluto", "mars", "venus"]
    let randomSearchItem = spaceSearch[Math.floor(Math.random()*spaceSearch.length)];
    let randomNumber = Math.floor(Math.random()*100)
    this.setState({ loading: true })

    const url = "https://images-api.nasa.gov/search?q="

    // sending the call to the NASA API
        $.ajax({
          url: url + randomSearchItem,
          type: "GET",
          dataType : "json",
        }).then(json => {
          this.setState({
            image: json.collection.items[randomNumber].links[0].href,
            item: randomSearchItem,
            loading: false
           })
        })

  }

//the game choices are rendered
  playGame = () => {
    const spaceWords = ["moon", "earth", "jupiter", "saturn", "pluto", "mars", "venus"]
      return spaceWords.map(word =>
        <div className="guessing">
          <button 
            onClick={ e => this.guessChoice(e)} 
            id={word} 
            disabled={this.state.wrongGuesses.includes(word)}
          >{word}</button>
        </div>
      )
  }

//the player chooses one item and this function determines if it's a win
  guessChoice = (e) => {
    if (this.state.correctGuess) return

      this.setState({ gamePlayed: true })

    if (this.state.item === e.target.id) {
      this.setState({ 
        totalScore: this.state.totalScore + this.state.currentReward,
        correctGuess: true
      })
    } else {
      this.setState({ 
        currentReward: this.state.currentReward - 1,
        wrongGuesses: [...this.state.wrongGuesses, e.target.id]
      })
    }


  }

  playAgain = () => {
    this.getGameImage()
    this.setState({
      gamePlayed: false,
      gameCount: this.state.gameCount++,
      wrongGuesses: [],
      currentReward: 7,
      correctGuess: false
    })
  }

  renderGame = () => {
    return <div className="namegamebutton">{this.playGame()}</div>
  }

  renderScore = () => {
    return <div>
      <p>Current score: {this.state.totalScore}</p>
      <p>Points for correct guess: {this.state.currentReward}</p>
    </div>
  }

  lastGuessFeedback = () => {
    if (!this.state.gamePlayed) return

    if (this.state.correctGuess) {
      return <div>You got it right! It is {this.state.item} </div>
    } else {
      return <div>It is not {this.state.wrongGuesses[this.state.wrongGuesses.length - 1]} </div>
    }
  }


//ajax request after the component mounts
  componentDidMount(){
    this.getGameImage()
    this.setState({
      gameCount: this.state.gameCount++,
      wrongGuesses: [],
      currentReward: 7
    })
  }


//Renders the game image, the choices, and determines if the game is done and can be played again
  render() {

    return (

      <div className="namegame" >

        {this.renderScore()}
        {this.state.loading ? <div>Loading challenge...</div> : <div className="titlegame">Guess which one is associated with this image:</div> }
        <img src={this.state.image} id="namegameimage" />
        {this.lastGuessFeedback()}
        {this.renderGame()}

        {this.state.correctGuess? <PlayAgain nextChallenge={this.playAgain}/> : null}

      </div>
    );
  }
}
