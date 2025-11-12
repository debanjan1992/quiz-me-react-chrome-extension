import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Button, TextField, Typography, Box } from "@mui/material";

// eslint-disable-next-line react-refresh/only-export-components
function Options() {
  const [apiKey, setApiKey] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  // Load the saved API key when the component mounts
  useEffect(() => {
    chrome.storage.sync.get(["geminiApiKey"], (result) => {
      if (result.geminiApiKey) {
        setApiKey(result.geminiApiKey);
      }
    });
  }, []);

  const handleSave = () => {
    if (!apiKey) {
      setStatus("Please enter an API key.");
      return;
    }

    // Save the key to chrome.storage.sync
    chrome.storage.sync.set({ geminiApiKey: apiKey }, () => {
      if (chrome.runtime.lastError) {
        setStatus(`Error: ${chrome.runtime.lastError.message}`);
      } else {
        setStatus("API Key saved successfully!");
        // Clear status after 3 seconds
        setTimeout(() => setStatus(""), 3000);
      }
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          maxWidth: "md",
          marginX: "auto",
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "1.5rem",
            color: "#333",
          }}
        >
          Quiz Me Now Settings
        </Typography>

        <Box sx={{ marginBottom: "1rem" }}>
          <Typography
            variant="subtitle1"
            sx={{
              display: "block",
              fontWeight: "medium",
              color: "#4b5563",
              marginBottom: "0.5rem",
            }}
          >
            Gemini API Token
          </Typography>
          <TextField
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="Enter your API key"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.375rem",
                "& fieldset": {
                  borderColor: "#d1d5db",
                },
                "&:hover fieldset": {
                  borderColor: "#9ca3af",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",
                },
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: "#6b7280",
              marginTop: "0.25rem",
              display: "block",
            }}
          >
            Your key is saved securely in Chrome's synchronized storage.
          </Typography>
        </Box>

        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            paddingY: "0.5rem",
            paddingX: "1rem",
            fontWeight: "semibold",
            "&:hover": {
              backgroundColor: "#1d4ed8",
            },
          }}
        >
          Save Key
        </Button>

        {status && (
          <Typography
            variant="body2"
            sx={{
              marginTop: "1rem",
              color: status.startsWith("Error") ? "#dc2626" : "#16a34a",
            }}
          >
            {status}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

// Standard React 18 root setup
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
