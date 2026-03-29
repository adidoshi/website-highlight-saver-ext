import { Trash2, ExternalLink, Sparkles } from "lucide-react";

export const HighlightCard = ({
  highlight,
  onDelete,
  onSummarize,
  isSummarizing,
}) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <a
            href={highlight.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 truncate"
          >
            <span className="truncate">{highlight.pageTitle}</span>
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </a>
          <p className="text-xs text-gray-500 mt-1">
            {formatDate(highlight.timestamp)}
          </p>
        </div>
        <button
          onClick={() => onDelete(highlight.id)}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0"
          title="Delete highlight"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed mb-3 bg-yellow-50 p-2 rounded border-l-4 border-yellow-300">
        "{highlight.text}"
      </p>

      {highlight.summary ? (
        <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
          <p className="text-xs font-semibold text-purple-900 mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI Summary
          </p>
          <p className="text-sm text-purple-800">{highlight.summary}</p>
        </div>
      ) : (
        <button
          onClick={() => onSummarize(highlight.id, highlight.text)}
          disabled={isSummarizing}
          className="text-xs font-medium text-purple-600 hover:text-purple-800 flex items-center gap-1 hover:bg-purple-50 px-2 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-3 h-3" />
          {isSummarizing ? "Summarizing..." : "Summarize with AI"}
        </button>
      )}
    </div>
  );
};
