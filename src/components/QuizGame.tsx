'use client'

import React, { useState } from 'react';
import { Trophy, Zap, Flame, Star, Award, Heart } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  xpReward: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  funFact?: string;
}

interface QuizGameProps {
  onXPGained: (xp: number) => void;
  onComplete: (score: number, totalXP: number) => void;
}

export default function QuizGame({ onXPGained, onComplete }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [combo, setCombo] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [answerAnimation, setAnswerAnimation] = useState<'correct' | 'wrong' | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: '🌱 Was bedeutet ESG?',
      options: [
        'European Stock Guide',
        'Environmental, Social, Governance',
        'Energy Saving Goals',
        'Eco System Guide'
      ],
      correctAnswer: 1,
      xpReward: 50,
      category: 'ESG',
      difficulty: 'easy',
      funFact: '🎉 ESG hilft dir, verantwortungsvoll zu investieren!'
    },
    {
      id: 2,
      question: '💰 Was ist ein ETF?',
      options: [
        'Electronic Transfer Fund',
        'Exchange Traded Fund',
        'European Tax Form',
        'Extra Tax Fee'
      ],
      correctAnswer: 1,
      xpReward: 50,
      category: 'Investing',
      difficulty: 'easy',
      funFact: '🚀 ETFs sind perfekt für Einsteiger - diversifiziert und günstig!'
    },
    {
      id: 3,
      question: '₿ Wann wurde Bitcoin erfunden?',
      options: ['2005', '2009', '2012', '2015'],
      correctAnswer: 1,
      xpReward: 75,
      category: 'Crypto',
      difficulty: 'medium',
      funFact: '🔥 Bitcoin wurde während der Finanzkrise als Alternative geschaffen!'
    },
    {
      id: 4,
      question: '🌍 Welches Investment hat den größten CO₂-Impact?',
      options: [
        'Kohlekraftwerk-Aktien',
        'Solar-ETFs',
        'E-Auto Hersteller',
        'Windkraft-Fonds'
      ],
      correctAnswer: 1,
      xpReward: 100,
      category: 'ESG',
      difficulty: 'medium',
      funFact: '☀️ Solar-Energie reduziert CO₂-Emissionen um bis zu 90%!'
    },
    {
      id: 5,
      question: '💎 Was ist der Zinseszins-Effekt?',
      options: [
        'Zinsen auf Zinsen verdienen',
        'Doppelte Zinsen bekommen',
        'Zins-Steuer zahlen',
        'Keine Zinsen zahlen'
      ],
      correctAnswer: 0,
      xpReward: 100,
      category: 'Finance',
      difficulty: 'hard',
      funFact: '🎯 Einstein nannte es das 8. Weltwunder - lass dein Geld für dich arbeiten!'
    }
  ];

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === question.correctAnswer;
    setAnswerAnimation(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      // Combo system
      const newCombo = combo + 1;
      setCombo(newCombo);

      // Streak system
      const newStreak = streak + 1;
      setStreak(newStreak);

      // XP with combo multiplier
      const comboMultiplier = Math.floor(newCombo / 3) + 1;
      const xpGained = question.xpReward * comboMultiplier;

      setScore(score + 1);
      setTotalXP(totalXP + xpGained);
      onXPGained(xpGained);

      // Show confetti for correct answers
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);

      // Level up animation every 3 correct answers
      if (newStreak % 3 === 0) {
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 2000);
      }
    } else {
      setCombo(0);
      setHearts(hearts - 1);
    }

    // Auto-advance after 2 seconds
    setTimeout(() => {
      if (isLastQuestion) {
        onComplete(score + (isCorrect ? 1 : 0), totalXP + (isCorrect ? question.xpReward * (Math.floor((combo + 1) / 3) + 1) : 0));
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setAnswerAnimation(null);
      }
    }, 2500);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getComboText = () => {
    if (combo >= 5) return '🔥 ON FIRE!';
    if (combo >= 3) return '⚡ COMBO!';
    return null;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            >
              {['🎉', '⭐', '💚', '🚀', '💎', '🌟'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

      {/* Level Up Modal */}
      {showLevelUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-8 rounded-3xl animate-bounce-in shadow-2xl">
            <Trophy className="w-16 h-16 text-white mx-auto mb-2" />
            <h2 className="text-4xl font-bold text-white text-center">LEVEL UP!</h2>
            <p className="text-white text-center mt-2">+{streak} Streak Bonus!</p>
          </div>
        </div>
      )}

      {/* Header Stats */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-400" size={24} />
            <span className="text-white font-bold text-xl">{score}/{questions.length}</span>
          </div>

          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={i < hearts ? 'text-red-500 fill-red-500' : 'text-gray-600'}
                size={24}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-400 h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* XP and Combo Display */}
        <div className="flex justify-between mt-4">
          <div className="bg-green-900/50 px-4 py-2 rounded-full flex items-center space-x-2">
            <Zap className="text-yellow-400" size={20} />
            <span className="text-white font-bold">{totalXP} XP</span>
          </div>

          {combo > 0 && (
            <div className="bg-orange-900/50 px-4 py-2 rounded-full flex items-center space-x-2 animate-pulse">
              <Flame className="text-orange-400" size={20} />
              <span className="text-white font-bold">{combo}x Combo!</span>
            </div>
          )}

          {getComboText() && (
            <div className="bg-red-900/50 px-4 py-2 rounded-full animate-bounce">
              <span className="text-white font-bold">{getComboText()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Question Card */}
      <div className="max-w-2xl mx-auto">
        <div className={`bg-gray-800 rounded-2xl p-6 shadow-2xl transform transition-all duration-500 ${
          answerAnimation === 'correct' ? 'scale-105 ring-4 ring-green-500' :
          answerAnimation === 'wrong' ? 'scale-95 ring-4 ring-red-500' : ''
        }`}>
          {/* Question Header */}
          <div className="flex justify-between items-center mb-6">
            <span className={`text-sm font-bold ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty.toUpperCase()} • {question.category}
            </span>
            <div className="flex items-center space-x-2 bg-green-900/50 px-3 py-1 rounded-full">
              <Star className="text-yellow-400" size={16} />
              <span className="text-white text-sm font-bold">+{question.xpReward} XP</span>
            </div>
          </div>

          {/* Question */}
          <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all duration-300 transform hover:scale-102 ${
                    showCorrect
                      ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white ring-4 ring-green-400'
                      : showWrong
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white ring-4 ring-red-400'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrect && <Award className="text-white animate-bounce" size={24} />}
                    {showWrong && <span className="text-2xl">❌</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Fun Fact */}
          {showResult && question.funFact && (
            <div className="mt-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-4 rounded-xl animate-fade-in">
              <p className="text-white text-sm">{question.funFact}</p>
            </div>
          )}
        </div>

        {/* Question Counter */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Frage {currentQuestion + 1} von {questions.length}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-confetti {
          animation: confetti linear forwards;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
