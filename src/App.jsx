import { useEffect, useState } from "react";
import { Highlighter, Settings } from "lucide-react";
import {
  getHighlights,
  deleteHighlight,
  updateHighlight,
} from "./utils/storage";
import { generateSummary } from "./utils/openai";
import { HighlightCard } from "./components/HighlightCard";
import { ApiKeyModal } from "./components/ApiKeyModal";

function App() {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [summarizingId, setSummarizingId] = useState(null);

  useEffect(() => {
    loadHighlights();
    loadApiKey();
  }, []);

  const loadHighlights = async () => {
    const savedHighlights = await getHighlights();
    setHighlights(savedHighlights);
    setLoading(false);
  };

  const loadApiKey = () => {
    if (typeof chrome === "undefined" || !chrome.storage?.local) return;
    chrome.storage.local.get(["openai_api_key"], (result) => {
      if (result.openai_api_key) {
        setApiKey(result.openai_api_key);
      }
    });
  };

  const handleDelete = async (id) => {
    await deleteHighlight(id);
    setHighlights(highlights.filter((h) => h.id !== id));
  };

  const handleSummarize = async (id, text) => {
    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    setSummarizingId(id);
    try {
      const summary = await generateSummary(text, apiKey);
      await updateHighlight(id, { summary });
      setHighlights(
        highlights.map((h) => (h.id === id ? { ...h, summary } : h)),
      );
    } catch (error) {
      alert(error?.message || "Failed to generate summary.");
    } finally {
      setSummarizingId(null);
    }
  };

  const handleSaveApiKey = (key) => {
    if (typeof chrome === "undefined" || !chrome.storage?.local) {
      setApiKey(key);
      setShowApiKeyModal(false);
      return;
    }
    chrome.storage.local.set({ openai_api_key: key }, () => {
      setApiKey(key);
      setShowApiKeyModal(false);
    });
  };

  if (loading) {
    return (
      <div className="w-[400px] h-[500px] bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-pulse text-purple-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-[400px] h-[500px] bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <Highlighter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Highlight Saver
              </h1>
              <p className="text-xs text-gray-500">{highlights.length} saved</p>
            </div>
          </div>
          <button
            onClick={() => setShowApiKeyModal(true)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Configure OpenAI API Key"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {highlights.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-8">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-full mb-4">
              <Highlighter className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              No highlights yet
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Select text on any webpage to see a save prompt. Your highlights
              will appear here.
            </p>
          </div>
        ) : (
          highlights.map((highlight) => (
            <HighlightCard
              key={highlight.id}
              highlight={highlight}
              onDelete={handleDelete}
              onSummarize={handleSummarize}
              isSummarizing={summarizingId === highlight.id}
            />
          ))
        )}
      </div>

      {showApiKeyModal && (
        <ApiKeyModal
          onSave={handleSaveApiKey}
          onClose={() => setShowApiKeyModal(false)}
        />
      )}
    </div>
  );
}

export default App;
