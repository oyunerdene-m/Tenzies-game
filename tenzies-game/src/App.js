import { useEffect, useState } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import './App.css';

function App() {
	const [dice, setDice] = useState(createNewDice());
	const [tenzies, setTenzies] = useState(false);
	const [rolls, setRolls] = useState(10);

	useEffect(() => {
		const firstDie = dice[0].value;
		const isWin = dice.every((die) => firstDie === die.value && die.isHeld);
		if (isWin) setTenzies(true);
	}, [dice]);

	function createNewDice() {
		const diceArr = [];
		for (let i = 0; i < 10; i++) {
			const newDie = createNewDie();
			diceArr.push(newDie);
		}
		return diceArr;
	}

	function createNewDie() {
		return {
			id: nanoid(),
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
		};
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

	function rollDice() {
		if (!tenzies) {
			setDice((oldDice) =>
				oldDice.map((die) => {
					if (die.isHeld) {
						return die;
					} else {
						return createNewDie();
					}
				}),
			);
			setRolls(rolls - 1);
			if (rolls <= 1) {
				setTenzies(true);
			}
		} else {
			setTenzies(false);
			setDice(createNewDice());
			setRolls(10);
		}
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
			{tenzies && rolls > 0 && <Confetti />}
			<h1 className="title">Tenzies</h1>
			<h4>{rolls > 0 ? `You have ${rolls} left.` : 'Sorry you run out your roll!'}</h4>
			<p className="instructions">
				Roll until all dice are the same. Click each die to freeze it at its current value between
				rolls.
			</p>
			<div className="dice-container">{diceList}</div>
			<button className="roll-dice" onClick={rollDice}>
				{tenzies ? 'New Game' : 'Roll'}
			</button>
		</main>
	);
}

export default App;
