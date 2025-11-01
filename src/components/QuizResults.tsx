'use client'

import React, { useState, useEffect } from 'react';
import { Trophy, Zap, Award, TrendingUp, Target, Sparkles, Flame } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  totalXP: number;
  onPlayAgain: () => void;
  onExit: () => void;
}

export default function QuizResults({
  score,
  totalQuestions,
  totalXP,
  onPlayAgain,
  onExit
}: QuizResultsProps) {
  const [showBadges, setShowBadges] = useState(false);
  const [unlockedBadges, setUnlockedBadges] = useState<Badge[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfect = score === totalQuestions;
  const isGreat = percentage >= 80;
  const isGood = percentage >= 60;

  const allBadges: Badge[] = [
    {
      id: 'perfect',
      name: 'Perfektionist',
      icon: '👑',
      description: '100% richtig beantwortet!',
      unlocked: isPerfect
    },
    {
      id: 'genius',
      name: 'Finanz-Genie',
      icon: '🧠',
      description: 'Über 80% richtig!',
      unlocked: isGreat && !isPerfect
    },
    {
      id: 'learner',
      name: 'Wissbegierig',
      icon: '📚',
      description: 'Quiz abgeschlossen!',
      unlocked: true
    },
    {
      id: 'xp_master',
      name: 'XP Master',
      icon: '⚡',
      description: 'Über 300 XP verdient!',
      unlocked: totalXP >= 300
    },
    {
      id: 'eco_warrior',
      name: 'Öko-Krieger',
      icon: '🌱',
      description: 'ESG-Experte',
      unlocked: isGood
    }
  ];

  useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowBadges(true);
    }, 1000);

    const newBadges = allBadges.filter(b => b.unlocked);
    setUnlockedBadges(newBadges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPerformanceMessage = () => {
    if (isPerfect) return {
      title: '🎉 PERFEKT!',
      message: 'Du bist ein absolutes Finanz-Genie!',
      color: 'from-yellow-500 to-orange-500'
    };
    if (isGreat) return {
      title: '🔥 FANTASTISCH!',
      message: 'Mega Performance! Du rockst!',
      color: 'from-green-500 to-emerald-500'
    };
    if (isGood) return {
      title: '✨ SEHR GUT!',
      message: 'Starke Leistung! Weiter so!',
      color: 'from-blue-500 to-purple-500'
    };
    return {
      title: '💪 NICHT SCHLECHT!',
      message: 'Guter Start! Übung macht den Meister!',
      color: 'from-purple-500 to-pink-500'
    };
  };

  const performance = getPerformanceMessage();

  const stats = [
    { label: 'Score', value: `${score}/${totalQuestions}`, icon: Target, color: 'text-blue-400' },
    { label: 'Genauigkeit', value: `${percentage}%`, icon: TrendingUp, color: 'text-green-400' },
    { label: 'XP Verdient', value: totalXP, icon: Zap, color: 'text-yellow-400' },
    { label: 'Badges', value: unlockedBadges.length, icon: Award, color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {showConfetti && (
          <>
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute text-3xl animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                {['🎉', '⭐', '💚', '🚀', '💎', '🌟', '✨', '🏆'][Math.floor(Math.random() * 8)]}
              </div>
            ))}
          </>
        )}
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Main Result Card */}
        <div className="bg-gray-800 rounded-3xl p-8 shadow-2xl animate-scale-in">
          {/* Trophy Icon */}
          <div className="flex justify-center mb-6">
            <div className={`bg-gradient-to-r ${performance.color} p-6 rounded-full animate-bounce-slow`}>
              <Trophy className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className={`text-5xl font-bold text-center mb-2 bg-gradient-to-r ${performance.color} bg-clip-text text-transparent`}>
            {performance.title}
          </h1>
          <p className="text-xl text-gray-300 text-center mb-8">
            {performance.message}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-gray-700 p-4 rounded-xl transform hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                    <Icon className={stat.color} size={20} />
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Badges Section */}
          {showBadges && unlockedBadges.length > 0 && (
            <div className="mb-8 animate-fade-in">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="text-yellow-400 mr-2" size={20} />
                <h2 className="text-2xl font-bold text-white">Neue Badges!</h2>
                <Sparkles className="text-yellow-400 ml-2" size={20} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {unlockedBadges.map((badge, index) => (
                  <div
                    key={badge.id}
                    className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 p-4 rounded-xl text-center animate-badge-unlock border-2 border-yellow-500/50"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <h3 className="font-bold text-white text-sm mb-1">{badge.name}</h3>
                    <p className="text-xs text-gray-300">{badge.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* XP Progress Bar */}
          <div className="bg-gray-700 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-bold">Level Progress</span>
              <span className="text-green-400 font-bold">+{totalXP} XP</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-400 h-full animate-progress"
                style={{ width: `${Math.min((totalXP / 500) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              {500 - totalXP > 0 ? `Noch ${500 - totalXP} XP bis zum nächsten Level!` : 'Level erreicht! 🎉'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onPlayAgain}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold py-4 rounded-xl hover:from-green-500 hover:to-emerald-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Flame className="w-5 h-5" />
              <span>Nochmal spielen! 🔥</span>
            </button>
            <button
              onClick={onExit}
              className="w-full bg-gray-700 text-white font-bold py-4 rounded-xl hover:bg-gray-600 transition-all duration-300"
            >
              Zurück zur Übersicht
            </button>
          </div>

          {/* Share Section */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-center text-gray-400 text-sm mb-3">Teile deinen Erfolg! 🎉</p>
            <div className="flex justify-center space-x-3">
              <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition-all">
                📱
              </button>
              <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition-all">
                🐦
              </button>
              <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition-all">
                📸
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(1080deg);
            opacity: 0;
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

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

        @keyframes badge-unlock {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes progress {
          from {
            width: 0%;
          }
        }

        .animate-confetti {
          animation: confetti linear forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-badge-unlock {
          animation: badge-unlock 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          opacity: 0;
        }

        .animate-progress {
          animation: progress 1.5s ease-out;
        }
      `}</style>
    </div>
  );
}
