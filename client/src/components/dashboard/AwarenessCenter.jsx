import React, { useState, useEffect, useMemo } from 'react';
import { PlayCircle, FileText, BookOpen, ArrowRight, CheckCircle, Lock, Clock, LineChart, ShieldCheck } from 'lucide-react';
import LessonViewer from './LessonViewer';
import { curriculumData } from '../../data/curriculum';

// The unified 14-day timeline mixing real courses and interactive mock days
const courseTimeline = [
  { id: '1', day: 1, title: 'Introduction to Human Vulnerability', type: 'Reading', duration: '~8 min', isCore: true },
  { id: '2', day: 2, title: 'The Trust Mechanism & Online Behavior', type: 'Reading', duration: '~10 min', isCore: true },
  { id: '3', day: 3, title: 'Fundamentals of Social Engineering', type: 'Reading', duration: '~12 min', isCore: true },
  { id: '4', day: 4, title: 'Authority & Social Proof', type: 'Reading', duration: '~10 min', isCore: true },
  { id: '5', day: 5, title: 'Urgency, Scarcity, & Fear', type: 'Reading', duration: '~12 min', isCore: true },
  { id: '6', day: 6, title: 'Common Social Engineering Attacks', type: 'Reading', duration: '~15 min', isCore: true },
  { id: 'review_1', day: 7, title: 'Mid-Program Review', type: 'Review', duration: '~5 min', isCore: false },
  { id: '7', day: 8, title: 'Advanced Attacks (Whaling & BEC)', type: 'Reading', duration: '~15 min', isCore: true },
  { id: '8', day: 9, title: 'Behavioral Profiling & OSINT', type: 'Reading', duration: '~12 min', isCore: true },
  { id: '9', day: 10, title: 'Cyber Warfare & Deepfakes', type: 'Reading', duration: '~12 min', isCore: true },
  { id: '10', day: 11, title: 'The Insider Threat & The Human Firewall', type: 'Reading', duration: '~15 min', isCore: true },
  { id: 'lesson_ext', day: 12, title: 'Developing Defensive Reflexes', type: 'Interactive', duration: '~10 min', isCore: false },
  { id: 'sim_final', day: 13, title: 'Final Simulated Assessment', type: 'Simulation', duration: '~20 min', isCore: false },
  { id: 'cert', day: 14, title: 'Graduation & Certification', type: 'Certification', duration: '~5 min', isCore: false },
];

export default function AwarenessCenter() {
  const [progressMap, setProgressMap] = useState(() => {
    const hasConsent = localStorage.getItem('psywall_storage_consent') === 'true';
    if (hasConsent) {
      const saved = localStorage.getItem('psywall_timeline_progress');
      if (saved) {
        try {
          return JSON.parse(saved) || {};
        } catch (_e) {}
      }
    }
    return {};
  });

  useEffect(() => {
    const hasConsent = localStorage.getItem('psywall_storage_consent') === 'true';
    if (hasConsent) {
      localStorage.setItem('psywall_timeline_progress', JSON.stringify(progressMap));
    }
  }, [progressMap]);

  const [activeLessonId, setActiveLessonId] = useState(null);

  const handleLessonComplete = (completedId) => {
    setProgressMap(prev => ({ ...prev, [completedId]: 100 }));
  };

  const activeLessonData = useMemo(() => {
    if (!activeLessonId) return null;
    const timelineItem = courseTimeline.find(t => t.id === activeLessonId);
    if (!timelineItem) return null;

    if (timelineItem.isCore) {
      return { ...curriculumData.find(c => c.id.toString() === activeLessonId), timelineItem };
    } else {
      // Mock day data
      return {
        id: timelineItem.id,
        title: timelineItem.title,
        type: timelineItem.type,
        duration: timelineItem.duration,
        overview: `This is the ${timelineItem.title} module.`,
        isMock: true,
        timelineItem
      };
    }
  }, [activeLessonId]);

  if (activeLessonId && activeLessonData) {
    return (
      <LessonViewer 
        lesson={activeLessonData} 
        timeline={courseTimeline}
        progressMap={progressMap}
        onBack={() => setActiveLessonId(null)} 
        onComplete={() => handleLessonComplete(activeLessonId)}
        onNavigate={(id) => setActiveLessonId(id)}
      />
    );
  }

  // Calculate unlock states
  let nextToUnlock = null;
  const enrichedTimeline = courseTimeline.map((item, index) => {
    const progress = progressMap[item.id] || 0;
    const isCompleted = progress === 100;
    
    let isLocked = false;
    if (index > 0) {
      const prevItem = courseTimeline[index - 1];
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

  const completedCount = enrichedTimeline.filter(c => c.isCompleted).length;
  const programProgress = Math.round((completedCount / enrichedTimeline.length) * 100);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Course Hero Banner */}
      <div className="rounded-3xl overflow-hidden bg-slate-900 text-white relative shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        <div className="p-10 md:p-12 relative z-10 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-widest text-indigo-300 border border-white/10 mb-6">
            <BookOpen size={14} /> Cognitive Defense Certification
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
            Defensive Mindset Core
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-xl">
            A comprehensive 14-day program designed to rebuild your cognitive defenses against social engineering, phishing, and manipulation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button 
              onClick={() => nextToUnlock && setActiveLessonId(nextToUnlock.id)}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
            >
              <PlayCircle size={20} /> {completedCount === 0 ? 'Start Course' : 'Resume Learning'}
            </button>
            <div className="flex-1 w-full max-w-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-300">Course Progress</span>
                <span className="text-sm font-black text-indigo-400">{programProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${programProgress}%` }}></div>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-2">{completedCount} of {enrichedTimeline.length} Days Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Syllabus */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm relative">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <ShieldCheck className="text-indigo-600" /> Course Syllabus
        </h2>
        
        {/* Continuous vertical line */}
        <div className="absolute left-[66px] md:left-[74px] top-[120px] bottom-12 w-0.5 bg-slate-100"></div>
        
        <div className="space-y-6 relative z-10">
          {enrichedTimeline.map((item) => (
            <div 
              key={item.id} 
              className={`flex items-start gap-4 md:gap-6 p-4 rounded-2xl transition-all ${
                !item.isLocked && !item.isCompleted ? 'bg-indigo-50 border border-indigo-100 shadow-sm' : 'hover:bg-slate-50 border border-transparent'
              } ${item.isLocked ? 'opacity-60 grayscale' : 'cursor-pointer'}`}
              onClick={() => !item.isLocked && setActiveLessonId(item.id)}
            >
              {/* Day Badge */}
              <div className="flex flex-col items-center justify-center shrink-0 w-12 md:w-16">
                <span className={`text-[10px] font-black uppercase tracking-widest ${!item.isLocked && !item.isCompleted ? 'text-indigo-600' : 'text-slate-400'}`}>Day</span>
                <span className={`text-2xl md:text-3xl font-black ${!item.isLocked && !item.isCompleted ? 'text-indigo-600' : 'text-slate-900'}`}>{item.day}</span>
              </div>

              {/* Status Icon */}
              <div className="mt-1 md:mt-2 shrink-0 bg-white rounded-full relative z-10">
                {item.isCompleted && <CheckCircle size={24} className="text-emerald-500 fill-emerald-50" />}
                {!item.isLocked && !item.isCompleted && <div className="w-6 h-6 rounded-full border-4 border-indigo-200 flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></div></div>}
                {item.isLocked && <Lock size={20} className="text-slate-300 m-0.5" />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-2 pt-1 md:pt-1.5">
                <h3 className={`text-base md:text-lg font-bold mb-2 ${!item.isLocked && !item.isCompleted ? 'text-indigo-900' : 'text-slate-900'}`}>
                  {item.title}
                </h3>
                
                <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                    item.isCore ? 'text-indigo-600 bg-indigo-100' : 'text-purple-600 bg-purple-100'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-slate-500 flex items-center gap-1"><Clock size={12}/> {item.duration}</span>
                </div>
              </div>
              
              {/* Action button */}
              {!item.isLocked && (
                <div className="shrink-0 self-center hidden sm:block">
                  <button className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    item.isCompleted 
                      ? 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20'
                  }`}>
                    {item.isCompleted ? 'Review' : 'Start Module'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
