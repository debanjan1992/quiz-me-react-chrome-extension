import React from "react";
import { Button, Typography, Box } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface QuizFinishedProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const QuizFinished: React.FC<QuizFinishedProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  return (
    <Box sx={{ padding: '1rem', color: 'white', textAlign: 'center' }}>
      {score / totalQuestions > 0.5 ? (
        <CheckCircleOutlineIcon sx={{ fontSize: '4rem', color: 'green' }} />
      ) : (
        <ErrorOutlineIcon sx={{ fontSize: '4rem', color: 'red' }} />
      )}
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
        Quiz Complete!
      </Typography>
      <Typography variant="h6" sx={{ marginY: '1rem', color: '#333' }}>
        You scored {score} out of {totalQuestions}
      </Typography>
      <Button
        onClick={onRestart}
        variant="contained"
        color="primary"
        sx={{ marginTop: '1rem', width: '100%' }}
      >
        Start New Quiz
      </Button>
    </Box>
  );
};

export default QuizFinished;