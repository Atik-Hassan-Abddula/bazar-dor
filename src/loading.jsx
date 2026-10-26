
export default function Loading() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      {/* Animated spinner */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

        <span className="text-3xl" aria-hidden="true">
          🛒
        </span>
      </div>

      {/* Loading text */}
      <h2 className="mt-6 text-xl font-bold text-gray-800">
        বাজারদর
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        আপনার জন্য তথ্য লোড হচ্ছে...
      </p>

      {/* Animated progress bar */}
      <div className="mt-6 h-1.5 w-56 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-green-600" />
      </div>

      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </main>
  );
}
