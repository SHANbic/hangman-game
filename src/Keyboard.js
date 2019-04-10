import React from 'react'


const Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const Keyboard = ({ onClick }) => (
    <div className="keyboard">
        {Alphabet.map((letter, index) => {
            return <span key={index} onClick={(e) => onClick(e)}>{letter}</span>
        })}
    </div>
)

export default Keyboard