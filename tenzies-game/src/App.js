import { useState } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import './App.css';

function App() {
	const [dice, setDice] = useState(createNewDice());

	function createNewDice() {
		const diceArr = [];
		for (let i = 0; i < 10; i++) {
			const newDie = {
				id: nanoid(),
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
			};
			diceArr.push(newDie);
		}
		return diceArr;
	}

	function handleClick(id) {
		setDice((oldDice) =>
			oldDice.map((die) => {
				if (die.id === id) {
					return {
						...die,
						isHeld: !die.isHeld,
					};
				} else {
					return die;
				}
			}),
		);
	}

	const diceList = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			handleClick={() => handleClick(die.id)}
		/>
	));

	return (
		<main style={{ margin: '0 auto' }}>
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are the same. Click each die to freeze it at its current value between
				rolls.
			</p>
			<div className="dice-container">{diceList}</div>
			<button className="roll-dice">Roll</button>
		</main>
	);
}

export default App;
