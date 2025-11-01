'use client'

import React, { useState } from 'react';
import { Brain, Star, TrendingUp, Users, MessageCircle, Leaf, Trophy, Flame, Gamepad2, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import QuizGame from './QuizGame';
import QuizResults from './QuizResults';
import Leaderboard from './Leaderboard';
import StreakSystem from './StreakSystem';

export default function GamingFinLitApp() {
  const [activeTab, setActiveTab] = useState('learn');
  const [showPremium, setShowPremium] = useState(false);
  const [xp, setXp] = useState(150);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotalQuestions, setQuizTotalQuestions] = useState(0);
  const [quizTotalXP, setQuizTotalXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak] = useState(5);

  const courses = [
    { id: 1, name: '💸 Money Basics', xp: 50, level: 'Beginner', isPremium: false, description: 'Lerne die Grundlagen des Geldes', emoji: '💰' },
    { id: 2, name: '🌱 Green Investing', xp: 100, level: 'Intermediate', isPremium: true, description: 'Nachhaltig investieren lernen', emoji: '🌿' },
    { id: 3, name: '₿ Crypto Guide', xp: 150, level: 'Advanced', isPremium: true, description: 'Bitcoin & Blockchain verstehen', emoji: '🚀' }
  ];

  const communityMembers = [
    {
      id: 1,
      name: 'Robin Klein',
      title: 'Crypto-Enthusiast & Gamer',
      bio: '20 J. Student | Gamer & Tech 📱 | Building web3 future',
      level: 'Level 8',
      xp: 2800,
      badges: ['🎯 Early Adopter', '₿ Crypto Pro', '🚀 Gamer'],
      followers: 342,
      isPremium: true
    },
    {
      id: 2,
      name: 'Lea Green',
      title: 'ESG Investor',
      bio: '19 J. | Sustainable Finance 🌱 | Impact > Returns',
      level: 'Level 6',
      xp: 1950,
      badges: ['🌍 Climate Hero', '📈 Smart Investor', '🌱 ESG Pioneer'],
      followers: 286,
      isPremium: true
    }
  ];

  const consultants = [
    { id: 1, name: 'Sarah Miller', speciality: 'ETFs & Stocks', rating: 4.9, isPremium: true },
    { id: 2, name: 'Mark Chen', speciality: 'Sustainable Investing', rating: 4.8, isPremium: false }
  ];

  const finfluencers = [
    { id: 1, name: 'Finn', handle: '@cryptofinn', followers: '10.2K', content: 'Crypto & Tech', tags: ['#Bitcoin', '#Trading', '#Web3'], isPremium: true },
    { id: 2, name: 'Lea', handle: '@greenlea', followers: '8.5K', content: 'ESG & Impact', tags: ['#Sustainable', '#GreenInvesting', '#Impact'], isPremium: true }
  ];

  const impactData = [
    { month: 'Jan', co2: 0.2 },
    { month: 'Feb', co2: 0.5 },
    { month: 'Mar', co2: 0.8 },
    { month: 'Apr', co2: 1.2 }
  ];

  const handleXPGained = (gainedXP: number) => {
    const newXP = xp + gainedXP;
    setXp(newXP);

    // Level up logic
    const newLevel = Math.floor(newXP / 500) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
    }
  };

  const handleQuizComplete = (score: number, totalXP: number) => {
    setQuizScore(score);
    setQuizTotalQuestions(5);
    setQuizTotalXP(totalXP);
    setShowQuiz(false);
    setShowQuizResults(true);
  };

  const handlePlayAgain = () => {
    setShowQuizResults(false);
    setShowQuiz(true);
  };

  const handleExitQuiz = () => {
    setShowQuizResults(false);
    setActiveTab('learn');
  };

  // If quiz is active, show quiz
  if (showQuiz) {
    return <QuizGame onXPGained={handleXPGained} onComplete={handleQuizComplete} />;
  }

  // If quiz results, show results
  if (showQuizResults) {
    return (
      <QuizResults
        score={quizScore}
        totalQuestions={quizTotalQuestions}
        totalXP={quizTotalXP}
        onPlayAgain={handlePlayAgain}
        onExit={handleExitQuiz}
      />
    );
  }

  // If leaderboard tab, show leaderboard
  if (activeTab === 'leaderboard') {
    return (
      <div>
        <div className="max-w-md mx-auto p-4 bg-black">
          <button
            onClick={() => setActiveTab('learn')}
            className="mb-4 text-white flex items-center hover:text-green-400 transition-colors"
          >
            ← Zurück
          </button>
        </div>
        <Leaderboard />
      </div>
    );
  }

  // If streak tab, show streak system
  if (activeTab === 'streak') {
    return (
      <div className="bg-black min-h-screen">
        <div className="max-w-md mx-auto p-4">
          <button
            onClick={() => setActiveTab('learn')}
            className="mb-4 text-white flex items-center hover:text-green-400 transition-colors"
          >
            ← Zurück
          </button>
        </div>
        <StreakSystem />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-black text-white min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Leaf className="text-green-400 animate-pulse" />
          <span className="font-bold text-xl">UmweltBank</span>
        </div>
        <div className="flex space-x-2">
          <div className="bg-orange-900/50 px-4 py-1 rounded-full text-sm flex items-center hover:bg-orange-800 transition-all cursor-pointer">
            <Flame className="w-4 h-4 mr-1 text-orange-400" />
            <span>{streak} 🔥</span>
          </div>
          <div className="bg-purple-900/50 px-3 py-1 rounded-full text-sm flex items-center hover:bg-purple-800 transition-all">
            <Trophy className="w-4 h-4 mr-1 text-yellow-400" />
            <span>L{level}</span>
          </div>
          <div className="bg-green-800 px-4 py-1 rounded-full text-sm hover:bg-green-700 transition-all">
            {xp} XP ⚡
          </div>
        </div>
      </header>

      <nav className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        {[
          { key: 'learn', icon: Brain, label: 'Learn' },
          { key: 'quiz', icon: Gamepad2, label: 'Quiz' },
          { key: 'streak', icon: Flame, label: 'Streak' },
          { key: 'leaderboard', icon: Trophy, label: 'Ranks' },
          { key: 'esg', icon: Leaf, label: 'ESG' },
          { key: 'community', icon: Users, label: 'Community' },
          { key: 'stats', icon: TrendingUp, label: 'Stats' },
          { key: 'finfluencer', icon: Star, label: 'Finfluencer' },
          { key: 'consultant', icon: Target, label: 'Experten' },
          { key: 'ai', icon: MessageCircle, label: 'AI' }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => {
                if (tab.key === 'quiz') {
                  setShowQuiz(true);
                } else {
                  setActiveTab(tab.key);
                }
              }}
              className={`px-3 py-2 rounded-xl whitespace-nowrap flex items-center space-x-1 transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-green-600 to-emerald-500 scale-105'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {activeTab === 'learn' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 p-4 rounded-xl mb-4 border border-green-500/30">
            <h2 className="font-bold text-lg mb-2 flex items-center">
              <Gamepad2 className="mr-2 text-green-400" />
              🎮 Gamified Learning
            </h2>
            <p className="text-sm text-gray-300 mb-3">
              Lerne spielerisch, sammle XP, steige in Levels auf und werde zum Finanz-Champion!
            </p>
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 py-3 rounded-xl font-bold hover:from-orange-500 hover:to-red-500 transition-all transform hover:scale-105"
            >
              🎯 Quiz starten & XP sammeln!
            </button>
          </div>

          {courses.map(course => (
            <button
              key={course.id}
              onClick={() => course.isPremium && setShowPremium(true)}
              className="w-full bg-gray-800 p-4 rounded-xl hover:bg-gray-700 text-left transition-all transform hover:scale-102 hover:shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{course.emoji}</div>
                  <div>
                    <h3 className="font-bold text-lg">{course.name}</h3>
                    <div className="text-gray-400 text-sm">
                      {course.level} • {course.xp} XP
                    </div>
                    <div className="text-gray-500 text-xs mt-1">
                      {course.description}
                    </div>
                  </div>
                </div>
                {course.isPremium && <Star className="text-yellow-400" size={20} />}
              </div>
            </button>
          ))}
        </div>
      )}

      {activeTab === 'esg' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-900 to-emerald-900 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <Leaf className="mr-2" /> Dein ESG Impact
            </h2>
            <p className="text-green-200 mb-4">Investiere mit echtem Umwelt-Impact</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-3xl font-bold text-green-400">1.2t</div>
                <div className="text-sm text-gray-300">CO₂ eingespart</div>
              </div>
              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-3xl font-bold text-green-400">A+</div>
                <div className="text-sm text-gray-300">ESG Rating</div>
              </div>
            </div>

            <div className="bg-black/30 p-4 rounded-xl mb-4">
              <h3 className="font-bold mb-2">Nachhaltige Investments</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">🌊 Wasserkraft ETF</span>
                  <span className="text-green-400 font-bold">+12.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">☀️ Solar Energy Fonds</span>
                  <span className="text-green-400 font-bold">+8.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">🌳 Aufforstung Bonds</span>
                  <span className="text-green-400 font-bold">+5.2%</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-green-600 to-emerald-500 py-4 rounded-xl font-bold hover:from-green-500 hover:to-emerald-400 transition-all">
              Jetzt nachhaltig investieren
            </button>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="font-bold mb-3">Impact Stories</h3>
            <div className="space-y-3">
              <div className="bg-gray-700 p-3 rounded-xl">
                <p className="text-sm text-gray-300">
                  Mit deinen Investments wurden bereits <span className="text-green-400 font-bold">150 Bäume</span> gepflanzt 🌱
                </p>
              </div>
              <div className="bg-gray-700 p-3 rounded-xl">
                <p className="text-sm text-gray-300">
                  Deine grünen Investments unterstützen <span className="text-green-400 font-bold">12 Solarprojekte</span> weltweit ☀️
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'community' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Community Leaders 🏆</h2>
          {communityMembers.map(member => (
            <div
              key={member.id}
              className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-all"
            >
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    {member.isPremium && <Star className="text-yellow-400 ml-2" size={16} />}
                  </div>
                  <p className="text-green-400">{member.title}</p>
                  <p className="text-gray-400 text-sm mt-1">{member.bio}</p>
                  <p className="text-sm text-green-300 mt-1">{member.level} • {member.followers} Follower</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {member.badges.map(badge => (
                  <span key={badge} className="bg-gray-700 px-2 py-1 rounded-full text-sm">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={() => setShowPremium(true)}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-xl mt-4"
          >
            <span className="font-bold">Connect with Community Leaders</span>
            <p className="text-sm text-gray-200">Unlock premium to chat & learn directly</p>
          </button>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="bg-gray-800 p-4 rounded-xl">
          <h2 className="font-bold text-lg mb-4">Your Learning Journey 📈</h2>
          <LineChart width={320} height={200} data={impactData}>
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white'
              }}
            />
            <Line
              type="monotone"
              dataKey="co2"
              stroke="#4ADE80"
              strokeWidth={2}
            />
          </LineChart>
        </div>
      )}

      {activeTab === 'finfluencer' && (
        <div className="space-y-4">
          {finfluencers.map(influencer => (
            <div key={influencer.id} className="bg-gray-800 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-lg">{influencer.name}</h3>
                  <p className="text-green-400">{influencer.handle}</p>
                </div>
                <div className="text-gray-400">{influencer.followers} followers</div>
              </div>
              <p className="text-gray-200 mb-2">{influencer.content}</p>
              <div className="flex flex-wrap gap-2">
                {influencer.tags.map(tag => (
                  <span key={tag} className="bg-green-900 px-2 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'consultant' && (
        <div className="space-y-4">
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Professional Consultants 👔</h2>
            <p className="text-gray-400 mb-4">Get personalized financial advice from certified experts</p>

            {consultants.map(consultant => (
              <div
                key={consultant.id}
                className={`p-4 rounded-xl mb-4 ${
                  consultant.isPremium
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                    : 'bg-gray-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{consultant.name}</h3>
                    <p className="text-sm text-gray-200">{consultant.speciality}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="text-yellow-400" size={16} />
                    <span className="ml-1">{consultant.rating}</span>
                  </div>
                </div>
                <button
                  onClick={() => consultant.isPremium && setShowPremium(true)}
                  className="mt-3 bg-black/20 px-4 py-2 rounded-full text-sm hover:bg-black/30"
                >
                  {consultant.isPremium ? 'Book Free Session' : 'Book for 49€'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="bg-gray-800 p-4 rounded-xl h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            <div className="bg-gray-700 p-3 rounded-xl max-w-[80%]">
              Hey! 👋 Was möchtest du über Finanzen lernen?
            </div>
            <div className="bg-green-600 p-3 rounded-xl max-w-[80%] ml-auto">
              Erkläre mir Bitcoin einfach!
            </div>
            <div className="bg-gray-700 p-3 rounded-xl max-w-[80%]">
              Bitcoin ist wie digitales Gold: begrenzt, wertvoll und unabhängig von Banken.
              Du kannst damit bezahlen oder es als Investment nutzen. Interesse an mehr Details? 🚀
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Stelle deine Frage..."
              className="flex-1 bg-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 p-2 rounded-xl hover:bg-green-500 transition-all">
              <MessageCircle size={24} />
            </button>
          </div>
        </div>
      )}

      {showPremium && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4">UmweltBank Premium 🌱</h2>

            <div className="bg-gray-700 p-4 rounded-xl mb-4">
              <h3 className="font-bold">Free</h3>
              <ul className="space-y-2 mt-2 text-gray-400">
                <li>• Basic courses</li>
                <li>• Public community</li>
                <li>• Limited reels</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-900 to-emerald-900 p-4 rounded-xl mb-6">
              <h3 className="font-bold">Premium Benefits</h3>
              <ul className="space-y-2 mt-2">
                <li>• Advanced sustainable investment courses</li>
                <li>• ESG scoring for investments</li>
                <li>• Chat with green tech experts</li>
                <li>• Carbon offset tracking</li>
                <li>• Weekly mentoring sessions</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold mb-2">4,95€<span className="text-sm font-normal">/month</span></div>
              <div className="text-green-400 text-sm mb-4">Student Green Deal</div>
              <button
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 py-3 rounded-xl mb-2 hover:from-green-500 hover:to-emerald-400 transition-all"
                onClick={() => setShowPremium(false)}
              >
                Start Free Trial
              </button>
              <button
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowPremium(false)}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
