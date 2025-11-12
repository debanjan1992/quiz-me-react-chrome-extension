import { useState, useEffect } from "react";
import "./index.css";
import QuizHeader from "./components/QuizHeader";
import QuizIdle from "./components/QuizIdle";
import QuizLoading from "./components/QuizLoading";
import QuizActive from "./components/QuizActive";
import QuizFinished from "./components/QuizFinished";

interface QuizQuestion {
  question: string;
  options: { A: string; B: string; C: string };
  correctAnswer: "A" | "B" | "C";
}

type QuizState = "idle" | "loading" | "active" | "finished";

function App() {
  const [quizState, setQuizState] = useState<QuizState>("idle");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const messageListener = (message: {
      type: string;
      data: QuizQuestion[];
      error: string;
    }) => {
      if (message.type === "QUIZ_GENERATED") {
        console.log("Quiz data received in React app:", message.data);
        setQuestions(message.data);
        setQuizState("active");
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswers({});
        setError(null);
      } else if (message.type === "QUIZ_ERROR") {
        console.error("Quiz generation error:", message.error);
        setError(message.error);
        setQuizState("idle");
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const handleStartQuiz = () => {
    setQuizState("loading");
    setError(null);
    chrome.runtime.sendMessage({ type: "GENERATE_QUIZ" });
  };

  const handleAnswerSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  const handleSubmit = () => {
    let finalScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setQuizState("finished");
  };

  const handleRestart = () => {
    setQuizState("idle");
  };

  const renderContent = () => {
    switch (quizState) {
      case "loading":
        return <QuizLoading />;

      case "active":
        return (
          <QuizActive
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            currentQ={currentQuestion}
            totalQuestions={questions.length}
            selectedAnswer={selectedAnswers[currentQuestion]}
            onAnswerSelect={(option) =>
              handleAnswerSelect(currentQuestion, option)
            }
            onNext={() => {
              if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
              } else {
                handleSubmit();
              }
            }}
          />
        );

      case "finished":
        return (
          <QuizFinished
            score={score}
            totalQuestions={questions.length}
            onRestart={handleRestart}
          />
        );

      case "idle":
      default:
        return <QuizIdle onStartQuiz={handleStartQuiz} error={error} />;
    }
  };

  return (
    <div style={{ backgroundColor: "white", color: "#333", height: "100vh" }}>
      <QuizHeader />
      {renderContent()}
    </div>
  );
}

export default App;
