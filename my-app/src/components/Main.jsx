/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import '../Main.css';

function Main() {
  const [questions, setQuestions] = useState([]);
  const [gameStart, setGameStart] = useState(false);
  const [showFinalResults, setFinalResults] = useState(false);
  const [money, setMoney] = useState(0);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  function shuffle(array) {
    let currentIndex = array.length; let
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const startGame = (e) => {
    e.preventDefault();
    setGameStart(true);
    fetch('https://lip2.xyz/api/millionaire.php?qType=1&count=5')
      .then((res) => res.json())
      .then((data) => {
        const result = data.data.map((el) => {
          el.answers = [el.answers[0], shuffle([...el.answers])];
          return el;
        });
        setQuestions(result);
      });
  };

  const answerClicked = (isTrue) => {
    if (isTrue) {
      setMoney(money + 100);
      setScore(score + 1);
      console.log('Верный ответ');
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
    }
  };
  const newGame = (e) => {
    e.preventDefault();
    setMoney(0);
    setScore(0);
    setFinalResults(false);
    setCurrentQuestion(0);
    fetch('https://lip2.xyz/api/millionaire.php?qType=2&count=5')
      .then((res) => res.json())
      .then((data) => {
        const result = data.data.map((el) => {
          el.answers = [el.answers[0], shuffle([...el.answers])];
          return el;
        });
        setQuestions(result);
      });
  };

  console.log(questions);

  return (
    <div className="Main">
      <div className="header">
        <h1>Мини версия, кто хочет стать миллионером</h1>
        <h2>Текущий счет:{money}</h2>
      </div>
      <button type="button" onClick={startGame}> Начать игру</button>
      {showFinalResults ? (
        <div className="final-results">
          <h1>Ваш итог:</h1>
          <h2>
            {score} из {questions.length} правильно
            <button type="button" onClick={newGame} name="new-game"> Начать заново</button>
          </h2>
        </div>
      ) : (
        <div className="question-card">
          <h3>Вопрос {currentQuestion + 1} из {questions.length}, легкий уровень</h3>
          <h2>{questions[currentQuestion]?.question}</h2>
          <ul>
            {questions[currentQuestion]?.answers[1].map((el) => (
              <li>
                <button type="button" onClick={() => answerClicked(el === questions[currentQuestion]?.answers[0])}>
                  {el}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Main;
