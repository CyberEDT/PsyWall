import React, { useState } from 'react';
import { ArrowLeft, Clock, BookOpen, AlertTriangle, ShieldCheck, CheckCircle, XCircle } from 'lucide-react';

export default function LessonViewer({ lesson, onBack }) {
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  const handleOptionSelect = (qIndex, oIndex) => {
    if (quizSubmitted) return;
    setAnswers({ ...answers, [qIndex]: oIndex });
  };

  const handleQuizSubmit = () => {
    if (Object.keys(answers).length !== lesson.quiz.length) return; // Must answer all

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

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Back Button */}
      <button 
        onClick={() => onBack(null)}
        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back to Curriculum
      </button>

      {/* Lesson Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700">
            {lesson.type}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
            <Clock size={14} /> {lesson.duration}
          </span>
        </div>
        
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-4 relative z-10">{lesson.title}</h1>
        <p className="text-gray-500 max-w-2xl leading-relaxed relative z-10">
          {lesson.overview}
        </p>
      </div>

      {/* Dynamic Reading Content Area */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12 shadow-sm space-y-6 mb-8">
        {lesson.sections.map((section, idx) => {
          if (section.type === 'heading') {
            return (
              <h2 key={idx} className={`text-2xl font-bold text-gray-900 ${idx !== 0 ? 'mt-10 mb-4' : 'mb-6'}`}>
                {section.content}
              </h2>
            );
          }
          if (section.type === 'paragraph') {
            return (
              <p key={idx} className="text-lg text-gray-700 leading-relaxed">
                {section.content}
              </p>
            );
          }
          if (section.type === 'bullet') {
            return (
              <ul key={idx} className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed my-4">
                {section.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          }
          if (section.type === 'alert') {
            return (
              <div key={idx} className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-indigo-900 my-8">
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
      <div className="bg-slate-50 rounded-2xl border border-gray-200 p-8 lg:p-12 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={24} className="text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Knowledge Check</h2>
        </div>
        <p className="text-gray-500 mb-8">Test your comprehension before marking this module as complete.</p>

        <div className="space-y-10">
          {lesson.quiz.map((q, qIndex) => (
            <div key={qIndex} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{qIndex + 1}. {q.question}</h3>
              <div className="space-y-3">
                {q.options.map((opt, oIndex) => {
                  const isSelected = answers[qIndex] === oIndex;
                  let optStyle = "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 cursor-pointer";
                  let Icon = null;

                  if (quizSubmitted) {
                    if (oIndex === q.answerIndex) {
                      optStyle = "border-emerald-500 bg-emerald-50 text-emerald-900";
                      Icon = CheckCircle;
                    } else if (isSelected) {
                      optStyle = "border-red-500 bg-red-50 text-red-900";
                      Icon = XCircle;
                    } else {
                      optStyle = "border-gray-200 text-gray-400 opacity-50 cursor-not-allowed";
                    }
                  } else if (isSelected) {
                    optStyle = "border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-600";
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
        <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex-1">
            {!quizSubmitted ? (
              <p className="text-sm font-bold text-gray-500">Answer all questions to complete the module.</p>
            ) : quizPassed ? (
              <div className="flex items-center gap-2 text-emerald-600 font-bold">
                <CheckCircle size={20} /> Excellent! You passed the knowledge check.
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600 font-bold">
                <AlertTriangle size={20} /> You missed some questions. Review the material and try again.
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {quizSubmitted && !quizPassed && (
              <button 
                onClick={resetQuiz}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
              >
                Retry Quiz
              </button>
            )}

            {!quizSubmitted ? (
              <button 
                onClick={handleQuizSubmit}
                disabled={Object.keys(answers).length !== lesson.quiz.length}
                className={`px-6 py-3 font-bold rounded-xl transition-all ${
                  Object.keys(answers).length === lesson.quiz.length 
                    ? 'bg-gray-900 hover:bg-black text-white shadow-md' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit Answers
              </button>
            ) : (
              <button 
                onClick={() => onBack(lesson.id)}
                disabled={!quizPassed}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  quizPassed 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Mark as Complete
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
