import { motion } from "motion/react";
import { Emotion } from "../data/movies";

interface EmotionSelectorProps {
  onSelect: (emotion: Emotion) => void;
  selected: Emotion | null;
}

const emotions: { type: Emotion; label: string }[] = [
  { type: 'happy', label: 'HAPPY' },
  { type: 'sad', label: 'SAD' },
  { type: 'angry', label: 'ANGRY' },
  { type: 'neutral', label: 'NEUTRAL' },
  { type: 'excited', label: 'EXCITED' },
  { type: 'relaxed', label: 'RELAXED' },
];

export default function EmotionSelector({ onSelect, selected }: EmotionSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4 block">
        Select Current State
      </label>
      {emotions.map((item) => (
        <motion.button
          key={item.type}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(item.type)}
          className={`w-full group flex items-center justify-between p-5 border rounded-lg transition-all ${
            selected === item.type 
              ? 'border-brand-accent bg-brand-accent/10 text-brand-accent shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
              : 'border-white/10 hover:border-white/30 text-white/50 hover:text-white'
          }`}
        >
          <span className="text-2xl font-black italic tracking-tighter uppercase">{item.label}</span>
          <span className={`text-xs font-mono transition-opacity ${selected === item.type ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            SELECT →
          </span>
        </motion.button>
      ))}
    </div>
  );
}
