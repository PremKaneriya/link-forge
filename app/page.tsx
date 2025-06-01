'use client';
import { useState } from 'react';
import { Link, Copy, Zap, Globe, Sparkles, CheckCircle } from 'lucide-react';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!longUrl) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });

      if (!res.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl mb-6 shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 leading-tight">
              Link Forge
            </h1>
            <p className="text-xl text-gray-300 font-light">
              Transform endless URLs into sleek, shareable links
            </p>
          </div>

          {/* Main Card */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 hover:bg-white/15 transition-all duration-500">
            <div className="space-y-6">
              <div className="relative group">
                <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="url"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  placeholder="Paste your long URL here..."
                  className="w-full pl-12 pr-4 py-4 bg-black/30 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-lg backdrop-blur-sm"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading || !longUrl}
                className="w-full py-4 px-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Forging Link...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Shorten URL</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm">
                <p className="text-red-300 text-center">{error}</p>
              </div>
            )}

            {/* Result */}
            {shortUrl && (
              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl border border-emerald-400/30 backdrop-blur-sm animate-fade-in">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Your Link is Ready!</h3>
                </div>
                
                <div className="flex items-center space-x-3 bg-black/30 rounded-xl p-4 group hover:bg-black/40 transition-colors">
                  <Link className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <a 
                    href={shortUrl} 
                    className="text-cyan-400 hover:text-cyan-300 font-mono text-lg flex-1 truncate transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortUrl}
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 flex-shrink-0"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm font-medium">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Instant URL shortening' },
              { icon: Globe, title: 'Global CDN', desc: 'Worldwide accessibility' },
              { icon: Sparkles, title: 'Smart Analytics', desc: 'Track link performance' }
            ].map((feature, i) => (
              <div key={i} className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
                <feature.icon className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}