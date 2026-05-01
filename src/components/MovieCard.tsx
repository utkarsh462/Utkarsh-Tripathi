import { motion } from "motion/react";
import { Movie } from "../data/movies";

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export default function MovieCard({ movie, index }: MovieCardProps) {
  // Use rating to simulate a "match" percentage for the aesthetic
  const matchPercent = Math.min(Math.round(movie.rating * 10 + Math.random() * 5), 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group flex items-center p-6 bg-white/5 border border-white/5 hover:border-brand-accent/50 rounded-lg transition-all"
    >
      <div className="text-3xl font-black text-white/10 mr-8 w-12 tabular-nums">
        {String(index + 1).padStart(2, '0')}
      </div>
      
      <div className="flex-1">
        <h4 className="text-xl font-extrabold tracking-tight group-hover:text-brand-accent transition-colors">
          {movie.title}
        </h4>
        <div className="flex items-center gap-3 mt-1">
          <p className="text-[11px] font-mono uppercase text-brand-accent/80 tracking-widest">
            {movie.genres.join(' • ')}
          </p>
          <span className="text-[10px] text-white/20 font-mono">/</span>
          <span className="text-[10px] text-white/30 font-mono uppercase">{movie.year}</span>
        </div>
      </div>

      <div className="text-right ml-4">
        <div className="inline-block px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] font-black rounded uppercase tracking-tighter">
          {matchPercent}% Match
        </div>
      </div>
    </motion.div>
  );
}
