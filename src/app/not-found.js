import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 bg-white text-gray-900">

      {/* 🎨 Background glowing circles - Adjusted to clean emerald/mint soft glows for light mode */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-green-500/10 blur-3xl animate-pulse" />

      {/* Main card - Cleaned up backdrop-blur for crisp light mode visibility */}
      <div className="relative backdrop-blur-xl bg-white/80 border border-gray-100 rounded-3xl p-10 md:p-14 max-w-xl w-full shadow-xl text-center">

        {/* 🎨 Icon Container - Soft rose/red accent for error warning state */}
        <div className="mx-auto w-fit mb-6 p-5 rounded-full bg-rose-500/10 border border-rose-200">
          <AlertTriangle className="w-12 h-12 text-rose-500" />
        </div>

        {/* 🎨 404 Header - Solid crisp soft-red/rose font to instantly indicate system 404 state */}
        <h1 className="text-7xl md:text-9xl font-extrabold text-rose-500">
          404
        </h1>

        {/* 🎨 Main Text Headers - Swapped text-white/slate for high-contrast slate-900 typography */}
        <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900">
          Page Not Found
        </h2>

        <p className="mt-4 text-slate-500 leading-relaxed text-sm sm:text-base">
          Looks like the page you’re searching for has vanished into the
          digital universe. It may have been moved, deleted, or never existed.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {/* 🎨 Safe Action Path Button - Updated to match your platform's gorgeous emerald green theme layout */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold shadow-md shadow-green-600/10 hover:scale-105 transition-all duration-300"
          >
            <Home size={18} />
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;