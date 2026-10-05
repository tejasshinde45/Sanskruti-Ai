import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Award, CheckCircle, XCircle, Clock, BookOpen, Heart, Brain, Map, Play, ArrowLeft, Shield, Sun, Moon, Droplet, ShieldAlert } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { masterQuizzes, getDynamicLeaderboard, QuizTopic, QuizQuestion } from '@/lib/quizData';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { useSEO } from '@/hooks/useSEO';

export default function Quizzes() {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { user, masterQuiz, getSacredTitle } = useAuthStore();
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizzesList, setQuizzesList] = useState<QuizTopic[]>(masterQuizzes);

  useSEO({
    title: 'Epics & Leaderboard',
    description: 'Test your knowledge of the Mahakavyas and accumulate eternal Karma Points. Learn about Indian epics like Ramayana and Mahabharata through interactive quizzes.',
    keywords: 'hindu mythology quiz, ramayana quiz, mahabharata quiz, karma points, sanskruti ai quizzes'
  });

  useEffect(() => {
      fetch('/api/v1/quizzes')
        .then(res => res.json())
        .then(data => {
             const mapped = data.map((q: any) => ({
                 id: q._id,
                 title: q.title,
                 description: q.description,
                 image: q.image || q.thumbnail || '/stories/krishna.png',
                 themeColor: q.themeColor || 'from-amber-600 to-yellow-800',
                 questions: q.questions.map((qn: any) => ({
                     id: qn._id || Math.random().toString(),
                     question: qn.question,
                     options: qn.options,
                     correctAnswer: qn.correct !== undefined ? qn.correct : qn.correctAnswer || 0,
                     explanation: qn.explanation
                 })),
                 badgeReward: q.badgeReward || {
                     name: 'Scholar of Dharma',
                     icon: 'Award',
                     color: 'from-amber-400 to-amber-600'
                 }
             }));
             setQuizzesList(mapped);
        })
        .catch(err => console.error("Failed to fetch quizzes", err));
  }, []);

  const dynamicLeaderboard = getDynamicLeaderboard(user, getSacredTitle());

  const handleTopicSelect = (topic: QuizTopic) => {
    setSelectedTopic(topic);
    setQuizStarted(false);
    setShowResult(false);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions([]);
  };

  const questions = selectedTopic?.questions || [];
  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);

    if (answerIndex === currentQ.correctAnswer) {
      setScore(score + 1);
    }

    setAnsweredQuestions([...answeredQuestions, answerIndex]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz finished!
        const finalScore = (answerIndex === currentQ.correctAnswer) ? score + 1 : score;
        if (user && user.id !== 'guest') {
          // calculate Karma Points
          const karmaEarned = finalScore * 20; 
          // If perfect score, master the quiz
          if (finalScore === questions.length) {
            masterQuiz(selectedTopic!.id, karmaEarned + 50); // Mastery Bonus
            toast.success(`You mastered ${selectedTopic!.title}! +${karmaEarned + 50} Karma Points`);
          } else {
            // Just award standard points
             useAuthStore.getState().addXP(karmaEarned);
             toast.success(`You earned ${karmaEarned} Karma Points!`);
          }
        }
        setShowResult(true);
      }
    }, 2000);
  };

  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 backdrop-blur-md mb-3 px-4 py-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          Punya Karma Check
        </Badge>
        <h1 className="text-5xl font-black cinzel-text text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 mb-2 drop-shadow-sm">Epics & Leaderboard</h1>
        <p className="text-muted-foreground text-lg">Test your knowledge of the Mahakavyas and accumulate eternal Karma Points.</p>
      </motion.div>

      <div className="grid xl:grid-cols-3 gap-8">
        {/* Main Interface Area */}
        <div className="xl:col-span-2">
          
          {!selectedTopic ? (
             // STATE 1: TOPIC SELECTION GRID
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid sm:grid-cols-2 gap-6"
             >
                {quizzesList.map((topic, idx) => {
                    const isMastered = user?.quizzesMastered?.includes(topic.id);
                    return (
                    <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleTopicSelect(topic)}
                        className={`group relative overflow-hidden rounded-3xl p-6 cursor-pointer border transition-all duration-500 min-h-[220px] shadow-xl hover:shadow-2xl hover:-translate-y-1
                            ${isMastered ? 'border-amber-500/50 hover:border-amber-400' : 'border-white/10 hover:border-white/30'}
                        `}
                    >
                        <div 
                            className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-105" 
                            style={{ backgroundImage: `url('${topic.image}')` }}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${topic.themeColor} opacity-20 mix-blend-color-dodge`}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                        
                        <div className="relative z-10 flex flex-col h-full justify-end">
                            <div className="flex justify-between items-start mb-auto">
                                <Badge className="bg-black/40 backdrop-blur-md text-white border-white/20">
                                    {topic.questions.length} Questions
                                </Badge>
                                {isMastered && (
                                    <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                                        <Trophy className="w-5 h-5 text-amber-500" />
                                    </div>
                                )}
                            </div>

                            <h3 className="text-3xl font-black cinzel-text text-white mb-2 group-hover:text-amber-300 transition-colors">{topic.title}</h3>
                            <p className="text-white/70 text-sm line-clamp-2">{topic.description}</p>
                            
                            {isMastered && (
                                <p className="text-amber-500 text-xs font-bold uppercase tracking-wider mt-4 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> Mastered Topic
                                </p>
                            )}
                        </div>
                    </motion.div>
                )})}
             </motion.div>
          ) : !quizStarted ? (
            // STATE 2: TOPIC LANDING PRE-QUIZ
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="p-8 glass-panel border-white/10 overflow-hidden relative shadow-2xl rounded-3xl min-h-[400px] flex flex-col justify-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10" 
                    style={{ backgroundImage: `url('${selectedTopic.image}')` }}
                />
                <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${selectedTopic.themeColor} rounded-full blur-[100px] opacity-30 pointer-events-none`}></div>
                
                <Button 
                    variant="ghost" 
                    className="absolute top-6 left-6 text-white/50 hover:text-white rounded-full bg-black/40 backdrop-blur-md"
                    onClick={() => setSelectedTopic(null)}
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>

                <div className="text-center space-y-6 relative z-10 max-w-lg mx-auto mt-8">
                  <div className="inline-block p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl mb-4 shadow-xl">
                      <h2 className="text-4xl font-black cinzel-text text-white mb-3">{selectedTopic.title}</h2>
                      <p className="text-white/70">{selectedTopic.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 shadow-sm flex flex-col items-center justify-center">
                      <p className="text-3xl font-black text-white">{selectedTopic.questions.length}</p>
                      <p className="text-[10px] text-white/50 mt-1 uppercase tracking-widest font-bold">Inquiries</p>
                    </div>
                    <div className="p-4 bg-amber-500/10 backdrop-blur-sm rounded-2xl border border-amber-500/20 shadow-sm flex flex-col items-center justify-center">
                      <p className="text-3xl font-black text-amber-500">20</p>
                      <p className="text-[10px] text-amber-500/70 mt-1 uppercase tracking-widest font-bold">Kp/Answer</p>
                    </div>
                    <div className="p-4 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 shadow-sm flex flex-col items-center justify-center">
                      <p className="text-3xl font-black text-accent"><Trophy className="w-8 h-8" /></p>
                      <p className="text-[10px] text-white/50 mt-1 uppercase tracking-widest font-bold">Bonus Badge</p>
                    </div>
                  </div>

                  <Button
                    onClick={handleStartQuiz}
                    size="lg"
                    className="w-full bg-white text-black hover:bg-amber-400 py-8 text-xl font-bold uppercase tracking-wider rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]"
                  >
                    Enter The Arena
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : showResult ? (
            // STATE 3: POST-QUIZ RESULTS
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="p-8 pb-12 glass-panel border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.1)] relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-background to-background pointer-events-none"></div>
                <div className="text-center space-y-6 relative z-10">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center p-[3px] shadow-[0_0_40px_rgba(245,158,11,0.4)] scale-in-center">
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-amber-500/20"></div>
                      <Trophy className="w-16 h-16 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-4xl font-black cinzel-text text-white mb-2">Trial Complete</h2>
                    <p className="text-amber-500/80 font-bold uppercase tracking-widest text-sm">{selectedTopic.title}</p>
                  </div>

                  <div className="max-w-md mx-auto space-y-4">
                    <div className="p-8 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
                      <p className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-2">{score}<span className="text-4xl text-white/20">/{questions.length}</span></p>
                      <p className="text-amber-500 font-bold uppercase tracking-widest text-xs">Righteous Answers</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                        <p className="text-3xl font-black text-amber-500">+{score * 20 + (score === questions.length ? 50 : 0)}</p>
                        <p className="text-[10px] text-amber-500/70 font-bold uppercase tracking-widest mt-1">Karma Gained</p>
                      </div>
                      <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-3xl font-black text-white">{Math.round((score / questions.length) * 100)}%</p>
                        <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1">Accuracy</p>
                      </div>
                    </div>

                    {score === questions.length && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-6 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 rounded-2xl border border-amber-500/40 relative overflow-hidden mt-6"
                      >
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                        <p className="font-bold text-white flex flex-col items-center gap-3 relative z-10 cinzel-text text-xl">
                          <Star className="w-8 h-8 text-amber-400 animate-spin-slow" fill="currentColor" />
                          <span>Mastery Achieved!</span>
                          <span className="text-sm font-sans text-amber-200">You earned the "{selectedTopic.badgeReward.name}" badge.</span>
                        </p>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex gap-4 justify-center mt-10">
                    <Button
                      onClick={handleStartQuiz}
                      className="bg-amber-500 hover:bg-amber-400 text-black rounded-xl px-10 py-6 font-bold"
                    >
                      <Play className="w-5 h-5 mr-2" /> Try Again
                    </Button>
                    <Button
                      onClick={() => setSelectedTopic(null)}
                      variant="outline"
                      className="rounded-xl px-10 py-6 border-white/10 hover:bg-white/10 text-white font-bold transition-all bg-black/40"
                    >
                      Library
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            // STATE 4: QUIZ PLAYING
            <Card className="p-8 glass-panel border-white/10 shadow-2xl relative overflow-hidden rounded-3xl min-h-[600px] flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-black/40">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" 
                  initial={{ width: 0 }} 
                  animate={{ width: `${progress}%` }} 
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="flex justify-between items-center mb-8 relative z-10">
                 <Badge className="bg-black/50 text-white/50 border border-white/10 px-4 py-2 uppercase tracking-widest text-[10px]">
                    Trial {currentQuestion + 1} of {questions.length}
                 </Badge>
                 <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/30 px-4 py-2 font-black">
                    {score} KP
                 </Badge>
              </div>

              <div className="flex-1 flex flex-col justify-center relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="text-center max-w-2xl mx-auto">
                      <h3 className="text-3xl lg:text-4xl font-black cinzel-text text-white leading-[1.3] drop-shadow-md">{currentQ.question}</h3>
                    </div>

                    <div className="grid gap-3 max-w-2xl mx-auto">
                      {currentQ.options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={selectedAnswer !== null}
                          className={`w-full p-6 p-4 rounded-2xl border-2 text-left transition-all text-xl font-bold shadow-lg flex items-center justify-between ${selectedAnswer === null
                            ? 'border-white/10 bg-black/40 hover:border-amber-500 hover:bg-amber-500/10 text-white'
                            : selectedAnswer === index
                              ? index === currentQ.correctAnswer
                                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                                : 'border-rose-500 bg-rose-500/20 text-rose-400'
                              : index === currentQ.correctAnswer
                                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-500'
                                : 'border-white/5 bg-black/20 opacity-40 text-white/40'
                            }`}
                        >
                          <span>{option}</span>
                          {selectedAnswer !== null && (
                            <>
                              {index === currentQ.correctAnswer && <CheckCircle className="w-7 h-7 text-emerald-500 bg-black rounded-full" />}
                              {selectedAnswer === index && index !== currentQ.correctAnswer && <XCircle className="w-7 h-7 text-rose-500 bg-black rounded-full" />}
                            </>
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {selectedAnswer !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="p-6 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl max-w-2xl mx-auto relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                        <p className="text-lg text-white/90 leading-relaxed font-medium pl-2">
                          <strong className="text-amber-500 tracking-wider uppercase mr-3 text-xs">Divine Insight:</strong> {currentQ.explanation}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Card>
          )}
        </div>

        {/* Leaderboard Area */}
        <div className="xl:col-span-1">
          <Card className="p-6 glass-panel border-white/5 bg-black/80 sticky top-6 overflow-hidden relative shadow-2xl rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <h3 className="text-2xl font-black cinzel-text text-white flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-amber-500" /> Karma Rankings
                </h3>
              </div>

              <div className="space-y-3 pb-6 border-b border-white/10">
                {dynamicLeaderboard.map((entry) => (
                  <motion.div
                    key={entry.rank}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors cursor-default
                        ${entry.name.includes('(You)') ? 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'}
                    `}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-inner 
                        ${entry.rank === 1 ? 'bg-amber-400 text-black border-2 border-amber-200' :
                        entry.rank === 2 ? 'bg-slate-300 text-black border-2 border-slate-100' :
                        entry.rank === 3 ? 'bg-orange-600 text-white border-2 border-orange-400' :
                        'bg-black/50 text-white/40 border border-white/10'
                      }`}>
                      {entry.rank}
                    </div>
                    <div className="text-2xl">{entry.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-[15px] truncate ${entry.name.includes('(You)') ? 'text-amber-400' : 'text-white/90'}`}>{entry.name}</p>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest font-black">{entry.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-amber-500 text-lg">{entry.score}</p>
                      <p className="text-[9px] text-amber-500/50 uppercase tracking-widest font-bold">KP</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="font-bold text-white/50 text-xs mb-4 uppercase tracking-widest text-center">Spiritual Elevation</h4>
                <div className="space-y-3 text-xs text-white/70 font-medium">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5"><span className="flex items-center gap-3 font-bold text-amber-400"><Trophy className="w-4 h-4" /> Maharishi</span> <span>700+ KP</span></div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5"><span className="flex items-center gap-3 font-bold text-purple-400"><Moon className="w-4 h-4" /> Rishi</span> <span>300+ KP</span></div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5"><span className="flex items-center gap-3 font-bold text-emerald-400"><Sun className="w-4 h-4" /> Jigyasu</span> <span>100+ KP</span></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
