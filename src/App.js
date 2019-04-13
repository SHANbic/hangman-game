import React, { Component } from 'react';
import Keyboard from './Keyboard'
import Failure from './Failure'
import './App.css';

const words = ['whisky', 'symbole', 'voiture', 'enzyme', 'capuchon'];
const random = Math.floor(Math.random() * words.length);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usedLetters: [],
      count: 5,
      fail: false,
      word: '',
      hashWord: '',
      spellWord: '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.debug = this.debug.bind(this)
  }
  pickWord(index) {
    let word = words[index];
    return word.toUpperCase();
  }

  hashWord(word) {
    return word.replace(/\w/g, '_');
  }

  spellWord(word) {
    return word.replace(/\w/g, '_').split('');
  }

  componentDidMount() {
    this.setState({
      word: this.pickWord(random),
      hashWord: this.hashWord(this.pickWord(random)),
      spellWord: this.spellWord(this.pickWord(random))
    })
  }

  verifyFail() {
    if (this.state.count === 0) this.setState({
      fail: true,
    });
  }
  handleClick(e) {
    if (!this.state.usedLetters.includes(e.target.innerText)) {
      this.setState({
        usedLetters: this.state.usedLetters.concat(e.target.innerText),
        
      })
    }
    this.verifyLetter(e.target.innerText, this.state.word, this.state.spellWord)
    this.verifyFail();
  }

  verifyLetter(letterChosen, word, foundLetters) {
    word = word.split('');
    let newCount = this.state.count;
    word.map(function(letter,index){
      if (letterChosen === letter) {
        foundLetters.splice(index,1,letterChosen);
        return foundLetters
      }
      
    })
    if(!word.includes(letterChosen)) newCount--;
    this.setState({
      hashWord : foundLetters,
      count : newCount
    })
  }
    


  debug() {
        // console.log(this.state.usedLetters);
        //console.log(this.state.error);
        //console.log(this.state.hashWord);
        console.log(this.state.word);
        console.log(this.state.spellWord);
        //console.log(this.state.usedLetters)

      }
  render() {
        return(
      <div className = "app" >
            <h1>Bienvenue dans notre jeu de pendu</h1>
        {<button onClick = {() => this.debug()
      } > debug</button >}
        <p id="hashWord">{this.state.hashWord}</p>
{ !this.state.fail ? <Keyboard onClick={this.handleClick} /> : <Failure word={this.state.word} /> }
<div className="row">
  <p>Lettres déjà jouées : <br />{this.state.usedLetters.join('-')}</p>
  <p>Tentatives restantes: {this.state.count}</p>
</div>
      </div >
    )
  }
}


export default App;