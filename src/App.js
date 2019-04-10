import React, { Component } from 'react';
import Keyboard from './Keyboard'
import './App.css';

const WORDS = ['whisky', 'symbole', 'voiture'];
const random = Math.floor(Math.random() * WORDS.length);

class App extends Component {
  
  pickWord(index) {
    let word = WORDS[index];
    return word;
  }

  hashWord(word) {
    return word.replace(/\w/g, '_ ');
  }

  spellWord(word) {
    return word.split('');
  }
  debug(){
   // console.log(this.state.usedLetters);
    //console.log(this.state.error);
   // console.log(this.state.randomIndex);
    //console.log(this.state.chosenWord);
    //console.log(this.state.wordSpelled);
    
  }
  render() {
    return (
      <div className="app">
        <h1>Bienvenue dans notre jeu de pendu</h1>
        {this.hashWord(this.pickWord(random))}
        <Keyboard />
      </div>
    )
  }
}


export default App;
