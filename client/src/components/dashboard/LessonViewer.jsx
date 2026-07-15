import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, BookOpen, AlertTriangle, ShieldCheck, CheckCircle, XCircle, ChevronRight, Lock, Award, ShieldAlert, FileText } from 'lucide-react';

export default function LessonViewer({ lesson, timeline, progressMap, onBack, onComplete, onNavigate }) {
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  // Reset quiz state when lesson changes
  useEffect(() => {
    setAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(false);
  }, [lesson.id]);

  const handleOptionSelect = (qIndex, oIndex) => {
    if (quizSubmitted) return;
    setAnswers({ ...answers, [qIndex]: oIndex });
  };

  const handleQuizSubmit = () => {
    if (!lesson.quiz || Object.keys(answers).length !== lesson.quiz.length) return; 

    let passed = true;
    lesson.quiz.forEach((q, idx) => {
      if (answers[idx] !== q.answerIndex) {
        passed = false;
      }
    });

    setQuizSubmitted(true);
    setQuizPassed(passed);
  };

  const resetQuiz = () => {
    setAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(false);
  };

  const handleCompleteAndNext = () => {
    onComplete();
    
    // Auto-navigate to next if possible (convert both IDs to strings for robust comparison)
    const currentIndex = timeline.findIndex(t => t.id.toString() === lesson.id.toString());
    
    if (currentIndex !== -1 && currentIndex < timeline.length - 1) {
      const nextItem = timeline[currentIndex + 1];
      onNavigate(nextItem.id);
    } else {
      onBack();
    }
  };

  // Pre-calculate sidebar unlock states
  let nextToUnlock = null;
  const enrichedTimeline = timeline.map((item, index) => {
    const progress = progressMap[item.id] || 0;
    const isCompleted = progress === 100;
    
    let isLocked = false;
    if (index > 0) {
      const prevItem = timeline[index - 1];
      const prevProgress = progressMap[prevItem.id] || 0;
      if (prevProgress < 100) {
        isLocked = true;
      }
    }
    if (!isLocked && !isCompleted && !nextToUnlock) {
      nextToUnlock = item;
    }
    return { ...item, progress, isCompleted, isLocked };
  });

  return (
    <div className="flex h-[calc(100vh-6rem)] -mt-4 -mb-12 overflow-hidden bg-slate-50 border-t border-slate-200">
      
      {/* Sidebar Navigation (The Course Player Syllabus) */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-slate-200 shrink-0">
          <button 
            onClick={() => onBack()}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h2 className="text-lg font-black text-slate-900">Course Syllabus</h2>
          <p className="text-xs font-semibold text-slate-500">Defensive Mindset Core</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {enrichedTimeline.map((item, idx) => {
            const isActive = item.id === lesson.id;
            return (
              <div 
                key={item.id}
                onClick={() => !item.isLocked && onNavigate(item.id)}
                className={`p-3 rounded-xl flex gap-3 transition-all ${
                  isActive ? 'bg-indigo-50 border border-indigo-100 shadow-sm' : 
                  item.isLocked ? 'opacity-60 grayscale cursor-not-allowed' : 
                  'hover:bg-slate-50 border border-transparent cursor-pointer'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {item.isCompleted ? <CheckCircle size={18} className="text-emerald-500" /> :
                   item.isLocked ? <Lock size={18} className="text-slate-300" /> :
                   isActive ? <div className="w-4 h-4 mt-0.5 rounded-full border-2 border-indigo-600 bg-indigo-100 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div></div> :
                   <div className="w-4 h-4 mt-0.5 rounded-full border-2 border-slate-300"></div>}
                </div>
                <div>
                  <h4 className={`text-sm font-bold leading-tight ${isActive ? 'text-indigo-900' : 'text-slate-700'}`}>
                    Day {item.day}: {item.title}
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mt-1">{item.type} • {item.duration}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        <div className="max-w-4xl mx-auto p-6 md:p-12">
          
          <button 
            onClick={() => onBack()}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-6 lg:hidden"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>

          {/* Lesson Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                lesson.isMock ? 'bg-purple-100 text-purple-700' : 'bg-indigo-100 text-indigo-700'
              }`}>
                {lesson.type}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Clock size={14} /> {lesson.duration}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4 relative z-10">{lesson.title}</h1>
            <p className="text-slate-500 max-w-2xl text-lg leading-relaxed relative z-10">
              {lesson.overview}
            </p>
          </div>

          {/* Mock Day Renderer */}
          {lesson.isMock ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-6">
                {lesson.type === 'Review' ? <BookOpen size={40} className="text-purple-600" /> :
                 lesson.type === 'Simulation' ? <ShieldAlert size={40} className="text-purple-600" /> :
                 lesson.type === 'Certification' ? <Award size={40} className="text-amber-500" /> :
                 <FileText size={40} className="text-purple-600" />}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{lesson.title}</h2>
              <p className="text-slate-500 max-w-lg mb-10">
                {lesson.type === 'Review' ? 'Take some time to review your notes from the previous modules. Reflect on the psychological vulnerabilities discussed.' :
                 lesson.type === 'Simulation' ? 'You are about to enter a simulated environment. Apply everything you have learned to defend against multi-vector psychological attacks.' :
                 lesson.type === 'Certification' ? 'Congratulations! You have completed the Defensive Mindset Core program. You are now equipped to act as a Human Firewall.' :
                 'Participate in the interactive exercise to build your cognitive reflexes.'}
              </p>
              
              <button 
                onClick={handleCompleteAndNext}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
              >
                <CheckCircle size={20} /> {lesson.type === 'Certification' ? 'Claim Certificate & Finish' : 'Mark as Complete & Continue'}
              </button>
            </div>
          ) : (
            /* Standard Reading & Quiz Renderer */
            <>
              {/* Dynamic Reading Content Area */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-6 mb-8">
                {lesson.sections && lesson.sections.map((section, idx) => {
                  if (section.type === 'heading') {
                    return (
                      <h2 key={idx} className={`text-2xl font-bold text-slate-900 ${idx !== 0 ? 'mt-10 mb-4' : 'mb-6'}`}>
                        {section.content}
                      </h2>
                    );
                  }
                  if (section.type === 'paragraph') {
                    return (
                      <p key={idx} className="text-lg text-slate-700 leading-relaxed">
                        {section.content}
                      </p>
                    );
                  }
                  if (section.type === 'bullet') {
                    return (
                      <ul key={idx} className="list-disc pl-6 space-y-3 text-lg text-slate-700 leading-relaxed my-4">
                        {section.content.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (section.type === 'alert') {
                    return (
                      <div key={idx} className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-indigo-900 my-8 shadow-inner">
                        <h3 className="flex items-center gap-2 text-lg font-bold mb-3">
                          <ShieldCheck size={20} className="text-indigo-600" /> Important Concept
                        </h3>
                        <p className="text-base font-medium leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* End of Module Knowledge Check */}
              {lesson.quiz && lesson.quiz.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm mb-12">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={24} className="text-indigo-600" />
                    <h2 className="text-2xl font-bold text-slate-900">Knowledge Check</h2>
                  </div>
                  <p className="text-slate-500 mb-8">Test your comprehension before marking this module as complete.</p>

                  <div className="space-y-10">
                    {lesson.quiz.map((q, qIndex) => (
                      <div key={qIndex} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{qIndex + 1}. {q.question}</h3>
                        <div className="space-y-3">
                          {q.options.map((opt, oIndex) => {
                            const isSelected = answers[qIndex] === oIndex;
                            let optStyle = "border-slate-200 hover:border-indigo-300 hover:bg-white bg-white text-slate-700 cursor-pointer shadow-sm";
                            let Icon = null;

                            if (quizSubmitted) {
                              if (oIndex === q.answerIndex) {
                                optStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-none";
                                Icon = CheckCircle;
                              } else if (isSelected) {
                                optStyle = "border-red-500 bg-red-50 text-red-900 shadow-none";
                                Icon = XCircle;
                              } else {
                                optStyle = "border-slate-200 text-slate-400 opacity-50 cursor-not-allowed bg-white";
                              }
                            } else if (isSelected) {
                              optStyle = "border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-600 shadow-none";
                            }

                            return (
                              <div 
                                key={oIndex}
                                onClick={() => handleOptionSelect(qIndex, oIndex)}
                                className={`p-4 rounded-lg border transition-all flex items-center justify-between ${optStyle}`}
                              >
                                <span className="font-medium text-sm">{opt}</span>
                                {Icon && <Icon size={18} className={oIndex === q.answerIndex ? 'text-emerald-600' : 'text-red-600'} />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quiz Actions */}
                  <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    <div className="flex-1 text-center md:text-left">
                      {!quizSubmitted ? (
                        <p className="text-sm font-bold text-slate-500">Answer all questions to complete the module.</p>
                      ) : quizPassed ? (
                        <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-600 font-bold bg-emerald-50 py-2 px-4 rounded-lg border border-emerald-100 inline-flex">
                          <CheckCircle size={20} /> Excellent! You passed the knowledge check.
                        </div>
                      ) : (
                        <div className="flex items-center justify-center md:justify-start gap-2 text-red-600 font-bold bg-red-50 py-2 px-4 rounded-lg border border-red-100 inline-flex">
                          <AlertTriangle size={20} /> You missed some questions. Try again.
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                      {quizSubmitted && !quizPassed && (
                        <button 
                          onClick={resetQuiz}
                          className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors shadow-sm"
                        >
                          Retry Quiz
                        </button>
                      )}

                      {!quizSubmitted ? (
                        <button 
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(answers).length !== lesson.quiz.length}
                          className={`flex-1 md:flex-none px-6 py-3 font-bold rounded-xl transition-all ${
                            Object.keys(answers).length === lesson.quiz.length 
                              ? 'bg-slate-900 hover:bg-black text-white shadow-md' 
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          Submit Answers
                        </button>
                      ) : (
                        <button 
                          onClick={handleCompleteAndNext}
                          disabled={!quizPassed}
                          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                            quizPassed 
                              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          Continue <ChevronRight size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
