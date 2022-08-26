/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import '../Main.css';

function Main() {
  const [questions, setQuestions] = useState([]);
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    fetch('https://lip2.xyz/api/millionaire.php?qType=1&count=5')
      .then((res) => res.json())
      // .then((data) => console.log(data.data[currentQuestion].answers[0]))
      .then((data) => setQuestions(data.data));
  }, []);

  const answerClicked = (isTrue) => {
    if (isTrue) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
    }
  };

  // useEffect(() => {
  //   console.log(cards.data[0].question);
  // }, [cards]);

  return (
    <div className="Main">
      <h1>Мини версия, кто хочет стать миллионером</h1>
      <h2>Текущий счет:{score}</h2>
      {showFinalResults ? (
        <div className="final-results">
          <h1>Ваш итог:</h1>
          <h2>
            1 из 5 правильно
            <button type="button">Начать заново</button>
          </h2>
        </div>
      ) : (
        <div className="question-card">
          <h3>Вопрос {currentQuestion + 1} из {questions.length}, легкий уровень</h3>
          <h2>{questions[currentQuestion]?.question}</h2>
          <ul>
            {questions[currentQuestion]?.answers.map((el) => (
              <li>{el}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Main;
