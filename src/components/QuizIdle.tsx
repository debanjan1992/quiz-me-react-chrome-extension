import React from "react";

interface QuizIdleProps {
  onStartQuiz: () => void;
  error: string | null;
}

const QuizIdle: React.FC<QuizIdleProps> = ({ onStartQuiz, error }) => {
  return (
    <div style={{ padding: '1rem' }}>
      <button
        onClick={onStartQuiz}
        style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', padding: '0.75rem', borderRadius: '0.25rem', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Generate Quiz from this Page
      </button>
      {error && <p style={{ marginTop: '1rem', color: '#ef4444' }}>{error}</p>}
    </div>
  );
};

export default QuizIdle;