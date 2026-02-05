export default function ErrorMessage({ message = 'Something went wrong', onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-8 bg-red-50 rounded-lg border-2 border-red-200">
            <div className="text-red-600 text-5xl">⚠️</div>
            <h3 className="text-xl font-semibold text-red-800">Oops!</h3>
            <p className="text-red-600 text-center">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="btn-primary mt-2"
                >
                    Try Again
                </button>
            )}
        </div>
    );
}
