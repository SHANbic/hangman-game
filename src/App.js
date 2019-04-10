import React, { Component } from 'react';
import Keyboard from './Keyboard'
import './App.css';

const words = ['whisky', 'symbole', 'voiture'];
const random = Math.floor(Math.random() * words.length);
let usedLetters = [];

class App extends Component {
  
  pickWord(index) {
    let word = words[index];
    return word.toUpperCase();
  }

  hashWord(word) {
    return word.replace(/\w/g, '_ ');
  }

  spellWord(word) {
    return word.split('');
  }

  handleClick(e){
    usedLetters.push(e.target.innerText);
    console.log(usedLetters);
  }
  debug(){
   // console.log(this.state.usedLetters);
    //console.log(this.state.error);
   // console.log(this.state.randomIndex);
    //console.log(this.state.chosenWord);
    //console.log(this.state.wordspelled);
    
  }
  render() {
    return (
      <div className="app">
        <h1>Bienvenue dans notre jeu de pendu</h1>
        <p>{this.hashWord(this.pickWord(random))}</p>
        <Keyboard onClick={this.handleClick}/>
      </div>
    )
  }
}


export default App;
