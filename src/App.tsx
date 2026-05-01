/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Emotion, getRecommendations, Movie } from './data/movies';
import { getMoodAnalysis } from './services/geminiService';
import EmotionSelector from './components/EmotionSelector';
import MovieCard from './components/MovieCard';

export default function App() {
  const [selectedMood, setSelectedMood] = useState<Emotion | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMoodSelect = async (mood: Emotion) => {
    setSelectedMood(mood);
    setIsLoading(true);
    const movies = getRecommendations(mood, 5);
    setRecommendations(movies);
    const analysis = await getMoodAnalysis(mood, movies);
    setAiAnalysis(analysis);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-8 md:p-12 max-w-[1440px] mx-auto flex flex-col font-sans">
      {/* Engine Header */}
      <header className="flex justify-between items-end border-b border-white/10 pb-8 mb-12">
        <div>
          <h1 className="text-xs font-mono tracking-[0.4em] text-brand-accent uppercase mb-2">Project: Remo.AI v1.0.42</h1>
          <p className="text-5xl font-black tracking-tighter uppercase italic">Movie Engine</p>
        </div>
        <div className="text-right hidden md:block">
          <span className="text-[10px] font-mono opacity-30 uppercase block mb-1">System Status</span>
          <span className="text-xs font-mono text-green-500 animate-pulse">● Logic: Active / Node-Gemini-Vite</span>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-16 relative">
        {/* Left Column: Input Selection */}
        <div className="md:col-span-4 flex flex-col gap-12">
          <div>
            <EmotionSelector onSelect={handleMoodSelect} selected={selectedMood} />
          </div>

          <div className="p-6 bg-white/5 rounded-xl border border-white/10 mt-auto">
            <h5 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4">Kernel Logic Trace</h5>
            <p className="text-[11px] font-mono text-white/60 leading-relaxed overflow-x-hidden">
              <span className="text-brand-accent">if (emotion === '{selectedMood || 'null'}')</span><br/>
              &nbsp;&nbsp;genres = mood_map.get('{selectedMood || '?'}')<br/>
              &nbsp;&nbsp;results = fetch_engine(genres, limit=5)<br/>
              &nbsp;&nbsp;return AI_context(results)
            </p>
          </div>
        </div>

        {/* Right Column: Output Engine */}
        <div className="md:col-span-8 relative">
          <AnimatePresence mode="wait">
            {selectedMood ? (
              <motion.div
                key={selectedMood}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10"
              >
                <div className="mb-12">
                  <h2 className="heading-giant absolute -top-8 -left-4 z-0">
                    VIBE:{selectedMood.toUpperCase()}
                  </h2>
                  <div className="relative pt-6">
                    <h3 className="mono-label mb-2">Recommendations</h3>
                    <p className="text-xl font-medium text-white/90 max-w-2xl leading-relaxed italic">
                      {isLoading ? "Synchronizing with mood patterns..." : aiAnalysis}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {recommendations.map((movie, index) => (
                    <MovieCard key={movie.id} movie={movie} index={index} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-white/5 rounded-3xl min-h-[500px]">
                <div className="text-center">
                  <div className="text-[80px] font-black text-white/5 mb-4 select-none">IDLE</div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.6em] text-white/20">
                    Input emotion to initialize engine
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Engine Footer */}
      <footer className="mt-16 flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] gap-6">
        <div>Dataset: Local Mood Mapping (16-Ref Titles)</div>
        <div>Engine: Google Gemini Flash 3P</div>
        <div>© 2024 Emotion-Reco Kernel Logic</div>
      </footer>
    </div>
  );
}
