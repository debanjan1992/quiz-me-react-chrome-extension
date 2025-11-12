import React from "react";

const QuizHeader: React.FC = () => {
  return (
    <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', padding: '1rem', backgroundColor: '#f3f4f6', color: '#333', borderBottom: '1px solid #d1d5db' }}>
      Quiz Me Now
    </h1>
  );
};

export default QuizHeader;