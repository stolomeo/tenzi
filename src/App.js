import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import Header from "./components/Header";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [tenzi, setTenzi] = useState(false);

  const generateDice = () => {
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
    };
  };
  const createDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDice());
    }
    return newDice;
  };

  const rollDice = () => {
    if (tenzi) {
      setDice(createDice());
      setTenzi(false);
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateDice();
        })
      );
    }
  };

  const [dice, setDice] = useState(createDice());

  const toggleIsHeld = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstVal = dice[0].value;
    const allSameVal = dice.every((die) => die.value === firstVal);

    if (allHeld && allSameVal) {
      setTenzi(true);
    }
  }, [dice]);

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        toggleIsHeld={() => toggleIsHeld(die.id)}
      />
    );
  });
  return (
    <main>
      {tenzi && <Confetti />}
      <Header />
      <div className="dice-container">{diceElements}</div>
      <button className="btn-roll" onClick={rollDice}>
        {tenzi ? "New Game" : "Roll Dice"}
      </button>
    </main>
  );
}
