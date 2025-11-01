'use client'

import React, { useState } from 'react';
import { Trophy, Crown, Medal, TrendingUp, Zap, Flame, Star, Award } from 'lucide-react';

interface Player {
  id: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  badges: number;
  rank: number;
  isCurrentUser?: boolean;
  trend: 'up' | 'down' | 'same';
}

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'allTime'>('weekly');

  const players: Player[] = [
    {
      id: 1,
      name: 'Robin Klein',
      avatar: '🦊',
      xp: 4850,
      level: 12,
      streak: 15,
      badges: 8,
      rank: 1,
      trend: 'up'
    },
    {
      id: 2,
      name: 'Lea Green',
      avatar: '🌱',
      xp: 4200,
      level: 11,
      streak: 12,
      badges: 7,
      rank: 2,
      trend: 'up'
    },
    {
      id: 3,
      name: 'Max Power',
      avatar: '⚡',
      xp: 3950,
      level: 10,
      streak: 8,
      badges: 6,
      rank: 3,
      trend: 'same'
    },
    {
      id: 4,
      name: 'Du',
      avatar: '🎮',
      xp: 3200,
      level: 9,
      streak: 5,
      badges: 5,
      rank: 4,
      isCurrentUser: true,
      trend: 'up'
    },
    {
      id: 5,
      name: 'Sarah Moon',
      avatar: '🌙',
      xp: 2800,
      level: 8,
      streak: 3,
      badges: 4,
      rank: 5,
      trend: 'down'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1:
        return <Crown className="text-yellow-400" size={28} />;
      case 2:
        return <Medal className="text-gray-300" size={24} />;
      case 3:
        return <Medal className="text-orange-400" size={24} />;
      default:
        return <span className="text-2xl font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'same') => {
    if (trend === 'up') return <TrendingUp className="text-green-400" size={16} />;
    if (trend === 'down') return <TrendingUp className="text-red-400 rotate-180" size={16} />;
    return <span className="text-gray-500">—</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-full animate-pulse">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Leaderboard 🏆</h1>
          <p className="text-gray-400">Wer ist das größte Finanz-Genie?</p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex justify-center space-x-2 mb-6">
          {(['daily', 'weekly', 'allTime'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                timeframe === tf
                  ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tf === 'daily' && '📅 Heute'}
              {tf === 'weekly' && '📊 Diese Woche'}
              {tf === 'allTime' && '🌟 All-Time'}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8 items-end">
          {/* 2nd Place */}
          <div className="text-center transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-3xl p-4 pt-8">
              <div className="text-5xl mb-2">{players[1].avatar}</div>
              <Medal className="text-gray-300 mx-auto mb-2" size={32} />
              <h3 className="font-bold text-white">{players[1].name}</h3>
              <p className="text-sm text-gray-200">Level {players[1].level}</p>
            </div>
            <div className="bg-gray-700 py-4 rounded-b-xl">
              <p className="text-2xl font-bold text-white">{players[1].xp} XP</p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-t-3xl p-4 pt-12 relative">
              <Crown className="absolute top-2 left-1/2 transform -translate-x-1/2 text-yellow-200 animate-bounce" size={32} />
              <div className="text-6xl mb-2">{players[0].avatar}</div>
              <Trophy className="text-white mx-auto mb-2" size={40} />
              <h3 className="font-bold text-white text-lg">{players[0].name}</h3>
              <p className="text-sm text-white">Level {players[0].level}</p>
            </div>
            <div className="bg-yellow-600 py-4 rounded-b-xl">
              <p className="text-3xl font-bold text-white">{players[0].xp} XP</p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-t-3xl p-4 pt-6">
              <div className="text-5xl mb-2">{players[2].avatar}</div>
              <Medal className="text-orange-300 mx-auto mb-2" size={32} />
              <h3 className="font-bold text-white">{players[2].name}</h3>
              <p className="text-sm text-gray-200">Level {players[2].level}</p>
            </div>
            <div className="bg-gray-700 py-4 rounded-b-xl">
              <p className="text-2xl font-bold text-white">{players[2].xp} XP</p>
            </div>
          </div>
        </div>

        {/* Rest of Leaderboard */}
        <div className="space-y-3">
          {players.slice(3).map((player) => (
            <div
              key={player.id}
              className={`bg-gradient-to-r ${
                player.isCurrentUser
                  ? 'from-green-900/50 to-emerald-900/50 ring-2 ring-green-500'
                  : 'from-gray-800 to-gray-900'
              } rounded-xl p-4 hover:scale-102 transition-all duration-300 ${
                player.isCurrentUser ? 'animate-pulse-slow' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="w-12 text-center">
                    {getRankIcon(player.rank)}
                  </div>

                  {/* Avatar & Info */}
                  <div className="flex items-center space-x-3">
                    <div className="text-4xl">{player.avatar}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-white text-lg">{player.name}</h3>
                        {player.isCurrentUser && (
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                            Du
                          </span>
                        )}
                        {getTrendIcon(player.trend)}
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          Level {player.level}
                        </span>
                        {player.streak > 0 && (
                          <span className="flex items-center">
                            <Flame className="w-4 h-4 mr-1 text-orange-400" />
                            {player.streak} Tag Streak
                          </span>
                        )}
                        <span className="flex items-center">
                          <Award className="w-4 h-4 mr-1 text-purple-400" />
                          {player.badges} Badges
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* XP */}
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Zap className="text-yellow-400" size={20} />
                    <span className="text-2xl font-bold text-white">{player.xp}</span>
                  </div>
                  <span className="text-xs text-gray-400">XP</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Footer */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 text-center">
          <Flame className="text-orange-400 mx-auto mb-2" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">Steig in der Rangliste auf! 🚀</h3>
          <p className="text-gray-300 mb-4">
            Vervollständige tägliche Quizze und halte deinen Streak am Leben!
          </p>
          <button className="bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold px-8 py-3 rounded-xl hover:from-green-500 hover:to-emerald-400 transition-all duration-300 transform hover:scale-105">
            Quiz starten 🎮
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
