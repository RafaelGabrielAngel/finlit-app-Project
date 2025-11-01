'use client'

import React from 'react';
import { Flame, Calendar, Trophy, Star, Zap, Award, CheckCircle, Lock } from 'lucide-react';

interface DailyChallenge {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  icon: string;
}

export default function StreakSystem() {
  const currentStreak = 7;
  const longestStreak = 15;
  const weeklyGoal = 7;
  const completedDays = 5;

  const dailyChallenges: DailyChallenge[] = [
    {
      id: 1,
      title: '📚 Lerne etwas Neues',
      description: 'Schließe einen Kurs ab',
      xpReward: 50,
      completed: true,
      icon: '📚'
    },
    {
      id: 2,
      title: '🎯 Quiz Master',
      description: 'Erreiche 80% in einem Quiz',
      xpReward: 100,
      completed: true,
      icon: '🎯'
    },
    {
      id: 3,
      title: '🌱 ESG Explorer',
      description: 'Sieh dir ESG-Investments an',
      xpReward: 50,
      completed: false,
      icon: '🌱'
    },
    {
      id: 4,
      title: '👥 Community Connect',
      description: 'Interagiere mit der Community',
      xpReward: 75,
      completed: false,
      icon: '👥'
    }
  ];

  const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const completedDaysArray = [true, true, true, true, true, false, false];

  const totalXPToday = dailyChallenges
    .filter(c => c.completed)
    .reduce((sum, c) => sum + c.xpReward, 0);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Streak Header */}
      <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 text-9xl">🔥</div>
        <Flame className="w-20 h-20 text-white mx-auto mb-4 animate-bounce" />
        <h1 className="text-6xl font-bold text-white mb-2">{currentStreak} 🔥</h1>
        <p className="text-xl text-orange-100 mb-4">Tag Streak!</p>
        <div className="flex justify-center space-x-8 text-white">
          <div>
            <p className="text-3xl font-bold">{longestStreak}</p>
            <p className="text-sm text-orange-100">Längster Streak</p>
          </div>
          <div className="border-l border-orange-300 pl-8">
            <p className="text-3xl font-bold">{totalXPToday}</p>
            <p className="text-sm text-orange-100">XP Heute</p>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Calendar className="mr-2 text-purple-400" />
            Wöchentlicher Fortschritt
          </h2>
          <span className="text-sm text-gray-400">{completedDays}/{weeklyGoal} Tage</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-4 mb-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
            style={{ width: `${(completedDays / weeklyGoal) * 100}%` }}
          />
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className={`text-center p-3 rounded-xl transition-all duration-300 ${
                completedDaysArray[index]
                  ? 'bg-gradient-to-br from-green-600 to-emerald-500 scale-105'
                  : index === 5
                  ? 'bg-yellow-600/30 border-2 border-yellow-500 animate-pulse'
                  : 'bg-gray-700'
              }`}
            >
              <p className="text-xs text-gray-300 mb-1">{day}</p>
              {completedDaysArray[index] ? (
                <CheckCircle className="w-6 h-6 text-white mx-auto" />
              ) : index === 5 ? (
                <div className="text-2xl">🎯</div>
              ) : (
                <Lock className="w-6 h-6 text-gray-500 mx-auto" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Daily Challenges */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <Star className="mr-2 text-yellow-400" />
          Tägliche Challenges
        </h2>

        <div className="space-y-3">
          {dailyChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`p-4 rounded-xl transition-all duration-300 ${
                challenge.completed
                  ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-2 border-green-500'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`text-4xl ${challenge.completed ? 'grayscale-0' : 'grayscale opacity-50'}`}>
                    {challenge.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{challenge.title}</h3>
                    <p className="text-sm text-gray-400">{challenge.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  {challenge.completed ? (
                    <div className="bg-green-600 p-2 rounded-full">
                      <CheckCircle className="text-white" size={24} />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Zap className="text-yellow-400" size={20} />
                      <span className="text-lg font-bold text-yellow-400">+{challenge.xpReward}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streak Rewards */}
      <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <Trophy className="mr-2 text-yellow-400" />
          Streak Belohnungen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl text-center ${
            currentStreak >= 7 ? 'bg-green-600' : 'bg-gray-700/50'
          }`}>
            <div className="text-3xl mb-2">🎁</div>
            <h3 className="font-bold text-white">7 Tage</h3>
            <p className="text-sm text-gray-300">+500 Bonus XP</p>
            {currentStreak >= 7 && (
              <Award className="text-yellow-400 mx-auto mt-2" size={24} />
            )}
          </div>

          <div className={`p-4 rounded-xl text-center ${
            currentStreak >= 14 ? 'bg-green-600' : 'bg-gray-700/50'
          }`}>
            <div className="text-3xl mb-2">💎</div>
            <h3 className="font-bold text-white">14 Tage</h3>
            <p className="text-sm text-gray-300">Premium Badge</p>
            {currentStreak < 14 && (
              <Lock className="text-gray-400 mx-auto mt-2" size={20} />
            )}
          </div>

          <div className={`p-4 rounded-xl text-center ${
            currentStreak >= 30 ? 'bg-green-600' : 'bg-gray-700/50'
          }`}>
            <div className="text-3xl mb-2">👑</div>
            <h3 className="font-bold text-white">30 Tage</h3>
            <p className="text-sm text-gray-300">Legend Status</p>
            {currentStreak < 30 && (
              <Lock className="text-gray-400 mx-auto mt-2" size={20} />
            )}
          </div>
        </div>
      </div>

      {/* Motivational Card */}
      <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-2xl p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-2">
          {currentStreak < 3
            ? "Du bist auf dem richtigen Weg! 🚀"
            : currentStreak < 7
            ? "Weiter so! Du bist fast bei einer Woche! 💪"
            : currentStreak < 14
            ? "Fantastisch! Halte den Streak am Leben! 🔥"
            : "Du bist eine Legende! 👑"
          }
        </h3>
        <p className="text-gray-300">
          Komm morgen wieder, um deinen Streak fortzusetzen!
        </p>
      </div>
    </div>
  );
}
