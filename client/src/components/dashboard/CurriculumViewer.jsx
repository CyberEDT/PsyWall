import React from 'react';
import { ArrowLeft, CheckCircle, Circle, Lock, Clock, BookOpen, ShieldQuestion, Brain, MousePointerClick, PlayCircle, LineChart } from 'lucide-react';

export default function CurriculumViewer({ courses, onBack, onSelectLesson }) {
  // Generate a 14-day curriculum timeline
  const timeline = [
    { day: 1, title: 'Introduction to Cognitive Security', courseId: 6, status: 'completed' },
    { day: 2, title: 'The Psychology of the Rush', courseId: 1, status: 'completed' },
    { day: 3, title: 'Authority & Compliance', courseId: 2, status: 'current' },
    { day: 4, title: 'Visual Deception', courseId: 3, status: 'locked' },
    { day: 5, title: 'Behavioral Economics', courseId: 4, status: 'locked' },
    { day: 6, title: 'Simulated Phishing Assessment', courseId: 5, status: 'locked' },
    { day: 7, title: 'Mid-Program Review', type: 'Review', status: 'locked' },
    { day: 8, title: 'The Architecture of Trust', type: 'Lesson', status: 'locked' },
    { day: 9, title: 'Social Engineering on Social Media', type: 'Interactive', status: 'locked' },
    { day: 10, title: 'Deepfakes & Synthetic Media', type: 'Video', status: 'locked' },
    { day: 11, title: 'Bypassing MFA Emotionally', type: 'Lesson', status: 'locked' },
    { day: 12, title: 'Developing Defensive Reflexes', type: 'Lesson', status: 'locked' },
    { day: 13, title: 'Final Simulated Assessment', type: 'Simulation', status: 'locked' },
    { day: 14, title: 'Graduation & Certification', type: 'Review', status: 'locked' },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back to Awareness Center
      </button>

      <div className="bg-indigo-900 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-30"></div>
        <div className="relative z-10">
          <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest bg-indigo-800 text-indigo-200 mb-4 inline-block">
            Full Syllabus
          </span>
          <h1 className="text-4xl font-black tracking-tight mb-4">Defensive Mindset Core</h1>
          <p className="text-indigo-200 text-lg max-w-2xl leading-relaxed">
            A comprehensive 14-day program designed to rebuild your cognitive defenses against social engineering, phishing, and manipulation.
          </p>
          <div className="flex items-center gap-6 mt-8 text-sm font-semibold text-indigo-100">
            <span className="flex items-center gap-2"><Clock size={16} className="text-indigo-400" /> 14 Days</span>
            <span className="flex items-center gap-2"><BookOpen size={16} className="text-indigo-400" /> 12 Modules</span>
            <span className="flex items-center gap-2"><LineChart size={16} className="text-indigo-400" /> 2 Simulations</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm relative">
        {/* Continuous vertical line */}
        <div className="absolute left-[59px] top-12 bottom-12 w-0.5 bg-gray-100"></div>
        
        <div className="space-y-6 relative z-10">
          {timeline.map((item, index) => {
            // Find the actual course data if this is one of our 6 implemented courses
            const courseData = item.courseId ? courses.find(c => c.id === item.courseId) : null;
            
            // Determine dynamic status based on actual course progress
            let status = item.status;
            if (courseData) {
              if (courseData.progress === 100) status = 'completed';
              else if (courseData.progress > 0) status = 'current';
              else status = 'locked'; // We'll just say locked if not started in this strict timeline view, or 'available'
              
              // Let's make the first uncompleted course "current" and the rest "locked"
              // For simplicity, we just use the courseData progress
              if (courseData.progress === 0 && index > 0 && timeline[index-1].status === 'completed') {
                status = 'current';
              }
            }

            const isLocked = status === 'locked';
            const isCompleted = status === 'completed';
            const isCurrent = status === 'current';
            
            return (
              <div 
                key={item.day} 
                className={`flex items-start gap-6 p-4 rounded-2xl transition-all ${
                  isCurrent ? 'bg-indigo-50 border border-indigo-100 shadow-sm' : 'hover:bg-gray-50 border border-transparent'
                } ${isLocked ? 'opacity-60 grayscale' : 'cursor-pointer'}`}
                onClick={() => {
                  if (!isLocked && courseData) {
                    onSelectLesson(courseData);
                  }
                }}
              >
                {/* Day Badge */}
                <div className="flex flex-col items-center justify-center shrink-0 w-14">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isCurrent ? 'text-indigo-600' : 'text-gray-400'}`}>Day</span>
                  <span className={`text-2xl font-black ${isCurrent ? 'text-indigo-600' : 'text-gray-900'}`}>{item.day}</span>
                </div>

                {/* Status Icon */}
                <div className="mt-1 shrink-0 bg-white rounded-full relative z-10">
                  {isCompleted && <CheckCircle size={24} className="text-green-500 fill-green-50" />}
                  {isCurrent && <div className="w-6 h-6 rounded-full border-4 border-indigo-200 flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></div></div>}
                  {isLocked && <Lock size={20} className="text-gray-300 m-0.5" />}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <h3 className={`text-lg font-bold mb-1 ${isCurrent ? 'text-indigo-900' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 text-sm font-semibold">
                    {courseData ? (
                      <>
                        <span className="text-indigo-600 bg-indigo-100/50 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                          {courseData.type}
                        </span>
                        <span className="text-gray-500">{courseData.duration}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                          {item.type}
                        </span>
                        <span className="text-gray-400">~10 min</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Action button (only for current/completed available courses) */}
                {!isLocked && courseData && (
                  <div className="shrink-0 self-center hidden sm:block">
                    <button className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isCompleted 
                        ? 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20'
                    }`}>
                      {isCompleted ? 'Review' : 'Start Module'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
