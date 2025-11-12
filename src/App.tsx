// src/App.tsx
import { useState, useEffect } from "react";
import "./index.css"; // Your Tailwind styles

// Define the type for our quiz data
interface QuizQuestion {
  question: string;
  options: { A: string; B: string; C: string };
  correctAnswer: "A" | "B" | "C";
}

type QuizState = "idle" | "loading" | "active" | "finished";

function App() {
  const [quizState, setQuizState] = useState<QuizState>("idle");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [error, setError] = useState<string | null>(null);

  // Listen for messages from the background script
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messageListener = (message: {
      type: string;
      data: QuizQuestion[];
      error: string;
    }) => {
      if (message.type === "QUIZ_GENERATED") {
        console.log("Quiz data received in React app:", message.data);
        setQuestions(message.data);
        setQuizState("active");
        setCurrentQ(0);
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

    // Cleanup
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const handleStartQuiz = () => {
    setQuizState("loading");
    setError(null);
    // Send message to background script to start the process
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

  // Render different views based on state
  const renderContent = () => {
    switch (quizState) {
      case "loading":
        return <div className="p-4 text-white">Generating quiz...</div>;

      case "active":
        return (
          <div className="p-4 text-white">
            <h3 className="font-bold text-lg mb-2">
              {questions[currentQ].question}
            </h3>
            <div className="flex flex-col gap-2">
              {(
                Object.keys(questions[currentQ].options) as ("A" | "B" | "C")[]
              ).map((key) => (
                <button
                  key={key}
                  onClick={() => handleAnswerSelect(currentQ, key)}
                  className={`border p-2 rounded w-full text-left ${
                    selectedAnswers[currentQ] === key
                      ? "bg-blue-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <strong>{key}:</strong> {questions[currentQ].options[key]}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                if (currentQ < questions.length - 1) {
                  setCurrentQ(currentQ + 1);
                } else {
                  handleSubmit();
                }
              }}
              disabled={!selectedAnswers[currentQ]}
              className="mt-4 bg-green-600 p-2 rounded w-full disabled:opacity-50"
            >
              {currentQ < questions.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
        );

      case "finished":
        return (
          <div className="p-4 text-white text-center">
            <h2 className="text-2xl font-bold">Quiz Complete!</h2>
            <p className="text-xl my-4">
              You scored {score} out of {questions.length}
            </p>
            <button
              onClick={handleRestart}
              className="mt-4 bg-blue-600 p-2 rounded w-full"
            >
              Start New Quiz
            </button>
          </div>
        );

      case "idle":
      default:
        return (
          <div className="p-4">
            <button
              onClick={handleStartQuiz}
              className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700"
            >
              Generate Quiz from this Page
            </button>
            {error && <p className="mt-4 text-red-400">{error}</p>}
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-800 text-white h-screen">
      <h1 className="text-xl font-bold p-4 bg-gray-900">Quiz Me Now</h1>
      {renderContent()}
    </div>
  );
}

export default App;
