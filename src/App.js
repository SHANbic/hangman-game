import React, { Component } from 'react';
import Keyboard from './Keyboard'
import './App.css';
import PropTypes from 'prop-types'

const words = ['whisky', 'symbole', 'voiture', 'enzyme', 'capuchon', 'badigeonner', 'linguistique', 'obsidienne'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      random: Math.floor(Math.random() * words.length),
      usedLetters: [],
      count: 5,
      fail: false,
      won: false,
      word: '',
      hashWord: '',
      spellWord: '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.init = this.init.bind(this)
  }

  //création des données de la partie
  randomIndex() {
    let random = Math.floor(Math.random() * words.length);
    return random;
  }
  pickWord(index) {
    let word = words[index];
    return word.toUpperCase();
  }
  hashWord(word) {
    return word.replace(/\w/g, '_');
  }
  spellWord(word) {
    return this.hashWord(word).split('');
  }
  componentDidMount() {
    this.setState({
      random: this.randomIndex(),
      word: this.pickWord(this.state.random),
      hashWord: this.hashWord(this.pickWord(this.state.random)),
      spellWord: this.spellWord(this.pickWord(this.state.random))
    })
  }

  //gestion des évènements suite au clic sur une lettre
  handleClick(e) {
    if (!this.state.usedLetters.includes(e.target.innerText)) {
      e.currentTarget.classList.add('grey')
      this.setState({
        usedLetters: this.state.usedLetters.concat(e.target.innerText),
      })
      this.verifyLetter(e.target.innerText, this.state.word, this.state.spellWord)
      this.verifyGame(e.target.innerText);
    }
  }

  verifyLetter(letterChosen, word, foundLetters) {
    word = word.split('');
    let newCount = this.state.count;
    word.map((letter, index) => {
      if (letterChosen === letter) {
        foundLetters.splice(index, 1, letterChosen);
      }
      return foundLetters
    })
    if (!word.includes(letterChosen)) newCount--;
    this.setState({
      hashWord: foundLetters,
      count: newCount
    })
  }

  verifyGame(letter) {
    let answer = this.state.spellWord.join('');
    if (answer === this.state.word) {
      this.setState({
        won: true,
      });
    }
    else if (this.state.count === 0 && !this.state.word.includes(letter)) this.setState({
      fail: true,
      count: 0,
    });

  }

  //réinitialisation d'une partie
  init() {
    this.setState({
      random: this.newRandom(),
      usedLetters: [],
      count: 5,
      fail: false,
      won: false,
    })
    this.newWord()
  }

  newRandom() {
    return Math.floor(Math.random() * words.length);
  }

  newWord() {
    this.setState({
      word: this.pickWord(this.state.random),
      hashWord: this.hashWord(this.pickWord(this.state.random)),
      spellWord: this.spellWord(this.pickWord(this.state.random))
    })
  }

  render() {
    return (
      <div className="app" >
        <h1>Bienvenue dans notre jeu de pendu</h1>
        <p id="hashWord">{this.state.hashWord}</p>
        {!this.state.fail ? this.state.won ? <Success /> : <Keyboard onClick={this.handleClick} /> : <Failure word={this.state.word} />}
        <div className="row">
          <p>Lettres déjà jouées : <br />{this.state.usedLetters.join('-')}</p>
          {this.state.fail && <button onClick={() => this.init()}>Rejouer ?</button>}
          {this.state.won && <button onClick={() => this.init()}>Rejouer ?</button>}
          {!this.state.won && !this.state.fail ? this.state.count === 0 ? <p>Dernière tentative...</p> : <p>Tentatives restantes : {this.state.count}</p> : <p></p>}
        </div>
      </div >
    )
  }
}

const Failure = ({ word }) => (
  <div>
    <h2>Perdu, le mot à trouver était {word}</h2>
  </div>
)
const Success = () => (
  <div>
    <h2>Félicitations, vous avez gagné la partie!</h2>
  </div>
)

//Declaration des proptypes
Failure.propTypes = {
  word : PropTypes.string.isRequired
}
Keyboard.propTypes = {
  onClick : PropTypes.func.isRequired
}
export default App;