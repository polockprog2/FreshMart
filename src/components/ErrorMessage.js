"use client";

export default function ErrorMessage({ message = 'Something went wrong', onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center gap-6 p-12 bg-white rounded-[2.5rem] shadow-xl shadow-red-500/5 border border-red-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            <div className="text-red-500 text-6xl animate-pulse">⚠️</div>
            <div className="text-center">
                <h3 className="text-2xl font-black text-[#003B4A] mb-2 uppercase tracking-wider">Oops!</h3>
                <p className="text-gray-400 font-bold max-w-xs mx-auto">{message}</p>
            </div>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="bg-[#003B4A] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#003B4A]/90 transition-all shadow-xl shadow-[#003B4A]/10 active:scale-95"
                >
                    Try Again
                </button>
            )}
        </div>
    );
}
