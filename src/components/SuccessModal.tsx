

export function SuccessModal() {
  return (
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
  );
}
