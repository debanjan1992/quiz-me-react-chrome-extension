import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Your main tailwind styles

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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Quiz Me Now Settings
        </h1>

        <div className="mb-4">
          <label
            htmlFor="apiKey"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Gemini API Token
          </label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your API key"
          />
          <p className="text-xs text-gray-500 mt-1">
            Your key is saved securely in Chrome's synchronized storage.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Key
        </button>

        {status && (
          <p
            className={`mt-4 text-sm ${
              status.startsWith("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

// Standard React 18 root setup
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
