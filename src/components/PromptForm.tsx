import { useState } from 'react';
import { Send, AlertCircle, Loader2 } from 'lucide-react';
import { SuccessModal } from './SuccessModal';

export function PromptForm() {
  const [prompt, setPrompt] = useState('summarize the text with 2 lines');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowSuccess(false);

    try {
      const res = await fetch('/update-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setPrompt('');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setError(data.message || 'Failed to update prompt');
      }
    } catch (err) {
      setError('Network error: Unable to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 mb-6 shadow-2xl hover:border-slate-600/50 transition-all duration-300">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="prompt"
            className="block text-sm font-semibold text-slate-200 mb-3 tracking-wide"
          >
            Your Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here... (e.g., summarize the text with 2 lines)"
            className="w-full px-5 py-4 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 resize-none hover:border-slate-600/50"
            rows={5}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-2xl hover:shadow-blue-900/50 disabled:shadow-none transform hover:scale-[1.02] active:scale-95"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Update Prompt</span>
            </>
          )}
        </button>
      </form>

      {showSuccess && <SuccessModal />}

      {error && (
        <div className="mt-6 p-5 bg-red-500/15 border border-red-500/50 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-200">Error</p>
            <p className="text-red-300/80 text-sm">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
