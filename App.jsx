import React, { useState, useEffect } from 'react';
import { Play, SkipBack, SkipForward, RotateCcw, ArrowRight, Check, X } from 'lucide-react';

const LeapYearVisualizer = () => {
  const [year, setYear] = useState(2000);
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([]);
  
  // Logic states
  const isMod4 = year % 4 === 0;
  const isMod100 = year % 100 === 0;
  const isMod400 = year % 400 === 0;

  const codeLines = [
    { text: 'void main() {', indent: 0 },
    { text: 'int year = ' + year + ';', indent: 1 },
    { text: 'if (year % 4 == 0) {', indent: 1, id: 'mod4' },
    { text: 'if (year % 100 == 0) {', indent: 2, id: 'mod100' },
    { text: 'if (year % 400 == 0)', indent: 3, id: 'mod400' },
    { text: 'printf("Leap Year");', indent: 4, id: 'res1' },
    { text: 'else', indent: 3, id: 'else1' },
    { text: 'printf("NOT a Leap Year");', indent: 4, id: 'res2' },
    { text: '}', indent: 2 },
    { text: 'else', indent: 2, id: 'else2' },
    { text: 'printf("Leap Year");', indent: 3, id: 'res3' },
    { text: '}', indent: 1 },
    { text: 'else', indent: 1, id: 'else3' },
    { text: 'printf("NOT a Leap Year");', indent: 2, id: 'res4' },
    { text: '}', indent: 0 },
  ];

  // Define steps based on the logic flow
  const getSteps = () => {
    let steps = [0, 1, 2]; // Start, Var init, Check %4
    if (isMod4) {
      steps.push(3); // Check %100
      if (isMod100) {
        steps.push(4); // Check %400
        if (isMod400) {
          steps.push(5); // Result: Leap
        } else {
          steps.push(6, 7); // Else, Result: Not Leap
        }
      } else {
        steps.push(9, 10); // Else, Result: Leap
      }
    } else {
      steps.push(12, 13); // Else, Result: Not Leap
    }
    steps.push(14); // End
    return steps;
  };

  const stepsList = getSteps();
  const currentLineIndex = stepsList[step];

  const handleNext = () => {
    if (step < stepsList.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setStep(0);
  };

  useEffect(() => {
    reset();
  }, [year]);

  return (
    <div className="flex flex-col items-center p-6 bg-slate-50 min-h-screen font-sans">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">C Program Execution Trace</h2>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Input Year:</label>
            <input 
              type="number" 
              value={year} 
              onChange={(e) => setYear(parseInt(e.target.value) || 0)}
              className="bg-slate-700 text-white px-3 py-1 rounded border border-slate-600 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-slate-200">
          {/* Code Panel */}
          <div className="p-6 bg-slate-900 text-slate-300 font-mono text-sm overflow-x-auto">
            <div className="mb-4 text-slate-500 italic text-xs">// Step {step + 1} of {stepsList.length}</div>
            {codeLines.map((line, idx) => {
              const isActive = currentLineIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`py-0.5 px-2 rounded transition-colors duration-200 ${isActive ? 'bg-blue-600 text-white' : ''}`}
                  style={{ paddingLeft: `${line.indent * 1.5 + 0.5}rem` }}
                >
                  <span className="mr-4 opacity-30 select-none inline-block w-4">{idx + 1}</span>
                  {line.text}
                </div>
              );
            })}
          </div>

          {/* Logic/State Panel */}
          <div className="p-6 flex flex-col gap-6">
            <section>
              <h3 className="text-slate-500 uppercase text-xs font-bold mb-3 tracking-wider">Logic Branching</h3>
              <div className="space-y-3">
                <div className={`p-3 rounded-lg border ${isMod4 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} flex items-center justify-between`}>
                  <span className="font-medium text-sm">year % 4 == 0</span>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-white shadow-sm">
                    {year} % 4 = {year % 4} ({isMod4 ? 'TRUE' : 'FALSE'})
                  </span>
                </div>
                <div className={`p-3 rounded-lg border ${isMod4 ? (isMod100 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200') : 'bg-slate-50 border-slate-200 opacity-50'} flex items-center justify-between`}>
                  <span className="font-medium text-sm">year % 100 == 0</span>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-white shadow-sm">
                    {year} % 100 = {year % 100}
                  </span>
                </div>
                <div className={`p-3 rounded-lg border ${isMod100 ? (isMod400 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200') : 'bg-slate-50 border-slate-200 opacity-50'} flex items-center justify-between`}>
                  <span className="font-medium text-sm">year % 400 == 0</span>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-white shadow-sm">
                    {year} % 400 = {year % 400}
                  </span>
                </div>
              </div>
            </section>

            <section className="mt-auto">
              <h3 className="text-slate-500 uppercase text-xs font-bold mb-3 tracking-wider">Console Output</h3>
              <div className="bg-black text-green-400 p-4 rounded-md font-mono min-h-[80px] text-sm shadow-inner">
                {step >= stepsList.length - 2 ? (
                  <div className="animate-pulse">
                    {year} is {((isMod4 && !isMod100) || (isMod4 && isMod100 && isMod400)) ? '' : 'NOT '} a Leap Year
                  </div>
                ) : (
                  <div className="text-slate-600">Waiting for result...</div>
                )}
              </div>
            </section>

            {/* Controls */}
            <div className="flex gap-2 justify-center mt-4">
              <button onClick={handleBack} disabled={step === 0} className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-30">
                <SkipBack size={20} />
              </button>
              <button onClick={reset} className="p-2 rounded-full hover:bg-slate-100">
                <RotateCcw size={20} />
              </button>
              <button 
                onClick={handleNext} 
                disabled={step === stepsList.length - 1} 
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-all font-bold shadow-md"
              >
                {step === stepsList.length - 1 ? 'Finished' : 'Next Step'}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Educational Note */}
      <div className="mt-8 max-w-2xl text-center text-slate-600 text-sm">
        <p className="font-bold mb-2">Teaching Tip:</p>
        <p>Use 1900 (False Leap) and 2000 (True Leap) to show students the importance of the 100/400 rule. Most students struggle to understand why some years divisible by 4 aren't leap years.</p>
      </div>
    </div>
  );
};

export default LeapYearVisualizer;
