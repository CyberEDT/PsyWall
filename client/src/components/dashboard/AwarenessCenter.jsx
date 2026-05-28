import React, { useState, useEffect } from 'react';
import { PlayCircle, FileText, MousePointerClick, ShieldQuestion, Brain, LineChart, ArrowRight, CheckCircle, Lock, BookOpen } from 'lucide-react';
import LessonViewer from './LessonViewer';
import CurriculumViewer from './CurriculumViewer';
import { curriculumData } from '../../data/curriculum';

export default function AwarenessCenter() {
  const [courses, setCourses] = useState(() => {
    const hasConsent = localStorage.getItem('psywall_storage_consent') === 'true';
    if (hasConsent) {
      const saved = localStorage.getItem('psywall_courses_progress_v3');
      if (saved) {
        try {
          const progressMap = JSON.parse(saved);
          if (typeof progressMap === 'object' && progressMap !== null) {
            return curriculumData.map(c => ({
              ...c,
              progress: progressMap[c.id] !== undefined ? progressMap[c.id] : 0
            }));
          }
        } catch (_e) {
          return curriculumData.map(c => ({ ...c, progress: 0 }));
        }
      }
    }
    return curriculumData.map(c => ({ ...c, progress: 0 }));
  });

  useEffect(() => {
    const hasConsent = localStorage.getItem('psywall_storage_consent') === 'true';
    if (hasConsent) {
      const progressMap = {};
      courses.forEach(c => {
        progressMap[c.id] = c.progress;
      });
      localStorage.setItem('psywall_courses_progress_v3', JSON.stringify(progressMap));
    }
  }, [courses]);

  const [activeLesson, setActiveLesson] = useState(null);
  const [showCurriculum, setShowCurriculum] = useState(false);

  const handleLessonBack = (completedId) => {
    if (completedId) {
      setCourses(prev => prev.map(c => c.id === completedId ? { ...c, progress: 100 } : c));
    }
    setActiveLesson(null);
  };

  if (activeLesson) {
    return <LessonViewer lesson={activeLesson} onBack={handleLessonBack} />;
  }

  if (showCurriculum) {
    return (
      <CurriculumViewer 
        courses={courses} 
        onBack={() => setShowCurriculum(false)} 
        onSelectLesson={(course) => {
          setShowCurriculum(false);
          setActiveLesson(course);
        }}
      />
    );
  }

  // Calculate overall program progress
  const completedCount = courses.filter(c => c.progress === 100).length;
  const totalCourses = courses.length;
  const programProgress = Math.round((completedCount / totalCourses) * 100);

  return (
    <div className="space-y-8">
      
      {/* Hero Banner */}
      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-700 to-slate-900 p-8 text-white relative shadow-md">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-200 border border-white/10 mb-4">
            <BookOpen size={12} /> Reading-Based Curriculum
          </div>
          <h2 className="text-3xl font-black mb-3 leading-tight">
            Human Psychology in Cybersecurity
          </h2>
          <p className="text-indigo-100 text-sm leading-relaxed mb-8 max-w-lg">
            Master the defensive mindset. Learn how attackers exploit cognitive biases, emotional states, and social norms to bypass technical controls.
          </p>
          
          <div className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Current Program</span>
                <p className="text-sm font-semibold mt-0.5">Defensive Psychology Core (10 Modules)</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black">{programProgress || 0}%</span>
                <span className="text-xs text-indigo-200 ml-1">Completed</span>
              </div>
            </div>
            <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-white rounded-full transition-all duration-1000 ease-out" style={{ width: `${programProgress || 0}%` }}></div>
            </div>
          </div>
        </div>
        
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500 opacity-20 rounded-full blur-2xl translate-y-1/2"></div>
      </div>

      {/* Course Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900">Syllabus Modules</h3>
          <button 
            onClick={() => setShowCurriculum(true)}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors"
          >
            View Full Timeline <ArrowRight size={14} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course, index) => {
            // A course is locked if it's not the first course AND the previous course is not completed
            const isLocked = index > 0 && courses[index - 1].progress < 100;
            
            return (
              <div 
                key={course.id} 
                onClick={() => !isLocked && setActiveLesson(course)}
                className={`bg-white rounded-xl border shadow-sm transition-all flex flex-col overflow-hidden
                  ${isLocked ? 'border-gray-200 opacity-60 cursor-not-allowed' : 'border-gray-200 hover:shadow-md cursor-pointer hover:border-indigo-200 group'}
                `}
              >
                
                {/* Top area */}
                <div className="p-5 flex-1 relative">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border 
                      ${isLocked ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-blue-50 text-blue-600 border-blue-100'}
                    `}>
                      {course.type}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">
                      {isLocked && <Lock size={10} className="inline mr-1 mb-0.5" />}
                      {course.duration}
                    </span>
                  </div>
                  
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center mb-4 transition-all
                    ${isLocked ? 'bg-gray-50 border-gray-100 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-600 group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100'}
                  `}>
                    <FileText size={22} />
                  </div>
                  
                  <h4 className={`text-base font-bold leading-tight mb-2 transition-colors
                    ${isLocked ? 'text-gray-400' : 'text-gray-900 group-hover:text-indigo-600'}
                  `}>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Module {index + 1}</span>
                    {course.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-2">{course.overview}</p>
                </div>
                
                {/* Bottom area */}
                <div className={`px-5 py-3 border-t flex items-center justify-between transition-colors
                  ${isLocked ? 'border-gray-50 bg-gray-50' : 'border-gray-50 bg-gray-50/50 group-hover:bg-indigo-50/30'}
                `}>
                  {course.progress > 0 ? (
                    <div className="flex-1 mr-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] font-bold text-gray-500">{course.progress === 100 ? 'Completed' : 'In Progress'}</span>
                        <span className="text-[10px] font-bold text-gray-700">{course.progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-1000 ease-out ${course.progress === 100 ? 'bg-green-500' : 'bg-indigo-500'}`} style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                  ) : (
                    <span className={`text-[11px] font-bold ${isLocked ? 'text-gray-300' : 'text-gray-400'}`}>
                      {isLocked ? 'Locked' : 'Not started'}
                    </span>
                  )}
                  
                  <span className={`text-xs font-bold flex items-center gap-1 shrink-0
                    ${isLocked ? 'text-gray-300' : 'text-indigo-600'}
                  `}>
                    {isLocked ? 'Locked' : course.progress === 100 ? 'Review' : 'Start Reading'} 
                    {!isLocked && <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />}
                    {isLocked && <Lock size={12} />}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
