import React from "react";
import { Button, Typography, Box, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface QuizActiveProps {
  question: string;
  options: { A: string; B: string; C: string };
  currentQ: number;
  totalQuestions: number;
  selectedAnswer: string | undefined;
  onAnswerSelect: (option: string) => void;
  onNext: () => void;
}

const QuizActive: React.FC<QuizActiveProps> = ({
  question,
  options,
  currentQ,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
}) => {
  return (
    <Box sx={{ padding: '1rem', color: 'white' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
        {question}
      </Typography>
      <RadioGroup
        aria-labelledby="quiz-options-group"
        name="quiz-options-group"
        value={selectedAnswer}
        onChange={(event) => onAnswerSelect(event.target.value)}
      >
        {(Object.keys(options) as ("A" | "B" | "C")[]).map((key) => (
          <FormControlLabel
            key={`${currentQ}-${key}`}
            value={key}
            control={<Radio />}
            label={options[key]}
            sx={{
              width: '100%',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
              marginBottom: '0.5rem',
              backgroundColor: selectedAnswer === key ? '#e3f2fd' : 'white',
              color: '#333',
              '&:hover': {
                backgroundColor: selectedAnswer === key ? '#bbdefb' : '#f5f5f5',
              },
              marginRight: 0,
              marginLeft: 0,
              padding: '0.5rem',
            }}
          />
        ))}
      </RadioGroup>
      <Button
        onClick={onNext}
        disabled={!selectedAnswer}
        variant="contained"
        color="success"
        sx={{ marginTop: '1rem', width: '100%' }}
      >
        {currentQ < totalQuestions - 1 ? "Next" : "Submit"}
      </Button>
    </Box>
  );
};

export default QuizActive;