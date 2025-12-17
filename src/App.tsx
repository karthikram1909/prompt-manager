import { useState } from 'react';
import { Send, AlertCircle, Loader2 } from 'lucide-react';

function App() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full">
              <p className="text-blue-300 text-xs font-semibold tracking-wide uppercase">
                AI Prompt Suite
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-4">
              Prompt Manager
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-lg mx-auto">
              Craft and refine your AI prompts with precision. Update, test, and optimize for perfect results.
            </p>
          </div>

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

            {showSuccess && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700 flex flex-col items-center transform animate-in zoom-in-95 duration-200">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <svg
                      className="w-12 h-12 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                        className="animate-stroke"
                        style={{ strokeDasharray: 24, strokeDashoffset: 24 }}
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
                  <p className="text-slate-300">Prompt updated</p>
                </div>
              </div>
            )}

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
        </div>
      </div>
    </div>
  );
}

export default App;
