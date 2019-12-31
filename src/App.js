import React, {useState} from 'react';
import './App.css';

function App() {
  const [compSel, setCompSel] = useState('');
  const [playerSel, setPlayerSel] = useState('');
  const [result, setResult] = useState('');
  const [playerWin, setPlayerWin] = useState(0);
  const [compWin, setCompWin] = useState(0);
  const [currRound, setCurrRound] = useState(0);

  let numOfRound = 5;

  const choices = ['rock', 'paper', 'scissor']

  function computerPlay() {
    return choices[Math.floor(Math.random()*choices.length)]
  }

  function playRound(playerSelection, compSelection) {
    console.log(playerSelection, compSelection)
    const x = choices.indexOf(playerSelection);
    const y = choices.indexOf(compSelection);
    if (x === y) {
      setCurrRound(currRound + 1);
      return "Tie";
    }

    if (x-y === 1 || x-y === -2) {
      setPlayerWin(playerWin + 1);
      setCurrRound(currRound + 1);
      return "Player wins this round with " + playerSelection;
    } else if (y-x === 1 || y-x === -2) {
      setCompWin(compWin + 1);
      setCurrRound(currRound + 1);
      return "Comp wins this round with " + compSelection;
    }
  }

  function handleChange(event) {
    setPlayerSel(event.target.value)
  }

  function handleSubmit(e) {
    const comp = computerPlay()
    setCompSel(comp)
    setResult(playRound(playerSel, comp))
    e.preventDefault()
  }

  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Player choose:</label>
        <div className="radio">
          <label>
            <input type="radio" value="rock" checked={playerSel === 'rock'} onChange={e => handleChange(e)}/>
            Rock
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="paper" checked={playerSel === 'paper'} onChange={e => handleChange(e)}/>
            Paper
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="scissor" checked={playerSel === 'scissor'} onChange={e => handleChange(e)}/>
            Scissor
          </label>
        </div>
        {currRound !== numOfRound && <input type="submit" value="Submit" />}
      </form>
      {result && result !== '' && <h4>Comp choose {compSel}</h4>}
      <h4>{result}</h4>
      <h4>Current Point: Player {playerWin} - Comp {compWin}</h4>
      {currRound === numOfRound && <h4>Final Result: {playerWin === compWin ? 'Tie' : playerWin > compWin ? 'Player Win' : 'Comp Win'}</h4>}
    </div>
  );
}

export default App;
