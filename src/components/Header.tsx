

export function Header() {
  return (
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
  );
}
