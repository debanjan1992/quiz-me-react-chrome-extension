import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const QuizLoading: React.FC = () => {
  return (
    <div style={{ padding: '1rem', color: '#333', backgroundColor: '#f3f4f6', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress color="inherit" />
      <p style={{ fontSize: '1.125rem', fontWeight: '500', marginLeft: '1rem' }}>Generating quiz... Please wait.</p>
    </div>
  );
};

export default QuizLoading;