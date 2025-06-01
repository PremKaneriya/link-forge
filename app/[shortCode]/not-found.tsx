// app/[shortCode]/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-black text-white mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-300 mb-4">Link Not Found</h2>
          <p className="text-gray-400 mb-8">
            The short link you're looking for doesn't exist or has expired.
          </p>
        </div>
        
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
        >
          Create New Link
        </Link>
      </div>
    </div>
  );
}