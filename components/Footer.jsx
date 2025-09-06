export default function Footer() {
  return (
    <footer className="
      bg-gray-100 dark:bg-gray-900
      text-gray-800 dark:text-gray-200
      border-t border-gray-200 dark:border-gray-700
      text-center
      py-6
    ">
      <div className="font-bold">rank2college &copy; {new Date().getFullYear()}</div>
      <div className="text-sm mt-1">Predict your college from JEE Main Rank</div>
      <div className="mt-2">
        <a href="/" className="mx-2 text-blue-500 hover:underline">Home</a>
        <a href="/about" className="mx-2 text-blue-500 hover:underline">About</a>
        <a href="/faqs" className="mx-2 text-blue-500 hover:underline">FAQs</a>
      </div>
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Powered by Next.js • Designed for aspiring engineers
      </div>
    </footer>
  );
}
