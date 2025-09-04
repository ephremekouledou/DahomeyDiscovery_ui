import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

const ComingSoon = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-yellow-800 to-amber-900" />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-yellow-800 to-amber-900 flex items-center justify-center relative overflow-hidden">
      {/* Étoiles animées en arrière-plan */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Cercles décoratifs */}
      <div
        className="absolute top-20 left-20 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ backgroundColor: "#f6ad25" }}
      />
      <div
        className="absolute bottom-20 right-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Icône principale avec animation */}
        <div className="mb-8 relative">
          <div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 animate-bounce"
            style={{ background: `linear-gradient(135deg, #f6ad25, #ff8c00)` }}
          >
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full animate-ping"
            style={{ backgroundColor: "#f6ad25" }}
          />
        </div>

        {/* Titre principal */}
        <h1
          className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text mb-6 animate-pulse"
          style={{
            backgroundImage: `linear-gradient(135deg, #f6ad25, #ff8c00, #ffd700)`,
            WebkitBackgroundClip: "text",
          }}
        >
          Bientôt
        </h1>

        {/* Sous-titre */}
        <h2 className="text-2xl md:text-4xl font-light text-gray-200 mb-4 opacity-90">
          Quelque chose d'extraordinaire arrive
        </h2>

        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Nous préparons une expérience unique pour vous. Restez connecté pour
          découvrir ce qui vous attend très prochainement.
        </p>

        {/* Message de statut */}
        <div className="flex items-center justify-center text-gray-400">
          <div
            className="w-2 h-2 rounded-full mr-3 animate-pulse"
            style={{ backgroundColor: "#f6ad25" }}
          />
          <span className="text-sm">En cours de développement</span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
