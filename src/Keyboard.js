import React, { Component } from 'react'

let usedLetters = [];
const Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class Keyboard extends Component {
    
    render() {
        
        return <div>
            {Alphabet.map((letter, index) => {
                return <span key={index} onClick={(e)=>usedLetters.push(e.target.innerText)}>{letter}</span>
            })}
        </div>

    }
}

export default Keyboard