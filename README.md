# Quiz Me Now Chrome Extension

## Overview

"Quiz Me Now" is a Chrome extension designed to help users quickly create multiple-choice quizzes from any text content on a webpage. Leveraging the power of the Google Gemini API, this extension provides an interactive side panel where users can generate quizzes, answer questions, and review their scores.

## Features

- **Instant Quiz Generation**: Select any text on a webpage and generate a 4-question multiple-choice quiz based on the content.
- **Google Gemini API Integration**: Utilizes the Google Gemini API for intelligent and context-aware quiz question generation.
- **Interactive Side Panel**: All quiz interactions, including generation, answering, and score display, happen within a convenient side panel.
- **Loading Spinner**: A Material-UI loading spinner is displayed while the quiz is being generated.
- **Quiz Completion Feedback**: Visual feedback (success/failure icons) is provided upon quiz completion based on the user's score.
- **API Key Management**: Securely store your Google Gemini API key using Chrome's synchronized storage.
- **Modern UI**: Built with React and Material-UI for a clean, responsive, and user-friendly interface.

## Tech Stack

- **Frontend**: React.js
- **UI Framework**: Material-UI (MUI)
- **Build Tool**: Vite
- **Language**: TypeScript
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Browser APIs**: Chrome Extension APIs (for storage, messaging, etc.)

## How to Load the Extension in Chrome Developer Mode

Follow these steps to load and test the "Quiz Me Now" extension in your Chrome browser:

1.  **Clone the Repository** (if you haven't already):
    ```bash
    git clone <repository-url>
    cd quiz-me-now
    ```

2.  **Install Dependencies**:
    Navigate to the project root directory and install the necessary packages:
    ```bash
    npm install
    ```

3.  **Build the Extension**:
    Compile the project for production. This will create a `dist` folder containing the extension's build files.
    ```bash
    npm run build
    ```

4.  **Open Chrome Extensions Page**:
    Open your Chrome browser and type `chrome://extensions` in the address bar, then press Enter.

5.  **Enable Developer Mode**:
    On the Chrome Extensions page, toggle on the "Developer mode" switch, usually located in the top right corner.

6.  **Load Unpacked Extension**:
    Click the "Load unpacked" button that appears after enabling Developer mode.

7.  **Select the Build Folder**:
    In the file dialog that opens, navigate to your project directory and select the `dist` folder (e.g., `path/to/quiz-me-now/dist`).

8.  **Pin the Extension (Optional but Recommended)**:
    Once loaded, the "Quiz Me Now" extension icon will appear in your browser's toolbar. Click the puzzle piece icon (Extensions) and then the pin icon next to "Quiz Me Now" to keep it visible.

## Usage

1.  **Set your Gemini API Key**: Right-click on the extension icon, select "Options", and enter your Google Gemini API key.
2.  **Open the Side Panel**: Click on the extension icon to open the side panel.
3.  **Generate a Quiz**: Navigate to any webpage, select the text you want to be quizzed on, and click the "Generate Quiz from this Page" button in the side panel.
4.  **Answer Questions**: Select your answers for each question.
5.  **Review Score**: After completing the quiz, your score and a success/failure icon will be displayed.
6.  **Restart Quiz**: Click "Start New Quiz" to generate another quiz.
