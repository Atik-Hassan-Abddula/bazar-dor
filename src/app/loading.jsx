
export default function Loading() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

      <h2 className="mt-6 text-2xl font-bold text-gray-800">
        বাজারদর
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        আপনার জন্য তথ্য লোড হচ্ছে...
      </p>

      <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-green-600" />
      </div>
    </main>
  );
}
