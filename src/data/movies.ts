/**
 * Dataset of movies with genres and info.
 * In a real app, this might come from TMDB API.
 */

export interface Movie {
  id: number;
  title: string;
  genres: string[];
  year: number;
  rating: number;
  description: string;
  image?: string;
}

export type Emotion = 'happy' | 'sad' | 'angry' | 'neutral' | 'excited' | 'relaxed';

export const moodToGenres: Record<Emotion, string[]> = {
  happy: ['Comedy', 'Romance', 'Animation', 'Family'],
  sad: ['Drama', 'Music', 'Romance'],
  angry: ['Action', 'Thriller', 'Crime'],
  neutral: ['Adventure', 'Sci-Fi', 'Mystery', 'Documentary'],
  excited: ['Action', 'Sci-Fi', 'Musical', 'Adventure'],
  relaxed: ['Animation', 'Nature', 'Documentary', 'Fantasy']
};

export const movies: Movie[] = [
  // Happy
  { id: 1, title: 'The Grand Budapest Hotel', genres: ['Comedy', 'Drama'], year: 2014, rating: 8.1, description: 'The adventures of Gustave H, a legendary concierge at a famous hotel and Zero Moustafa, the lobby boy who becomes his most trusted friend.' },
  { id: 2, title: 'Toy Story 4', genres: ['Animation', 'Adventure', 'Comedy'], year: 2019, rating: 7.7, description: 'When a new toy called "Forky" joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy.' },
  { id: 3, title: 'La La Land', genres: ['Romance', 'Comedy', 'Musical'], year: 2016, rating: 8.0, description: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations.' },
  
  // Sad
  { id: 4, title: 'Schindler\'s List', genres: ['Drama', 'History'], year: 1993, rating: 9.0, description: 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce.' },
  { id: 5, title: 'Manchester by the Sea', genres: ['Drama'], year: 2016, rating: 7.8, description: 'A depressed uncle is asked to take care of his teenage nephew after the boy\'s father dies.' },
  { id: 6, title: 'The Pursuit of Happyness', genres: ['Drama', 'Biography'], year: 2006, rating: 8.0, description: 'A struggling salesman takes custody of his son as he\'s poised to begin a life-changing professional career.' },

  // Angry/Intense
  { id: 7, title: 'Mad Max: Fury Road', genres: ['Action', 'Adventure', 'Sci-Fi'], year: 2015, rating: 8.1, description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland.' },
  { id: 8, title: 'John Wick', genres: ['Action', 'Crime', 'Thriller'], year: 2014, rating: 7.4, description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.' },
  { id: 9, title: 'The Dark Knight', genres: ['Action', 'Crime', 'Drama'], year: 2008, rating: 9.0, description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.' },

  // Neutral/Thoughtful
  { id: 10, title: 'Interstellar', genres: ['Adventure', 'Drama', 'Sci-Fi'], year: 2014, rating: 8.7, description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.' },
  { id: 11, title: 'The Social Network', genres: ['Biography', 'Drama'], year: 2010, rating: 7.8, description: 'As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea.' },
  { id: 12, title: '12 Angry Men', genres: ['Crime', 'Drama'], year: 1957, rating: 9.0, description: 'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence.' },

  // Excited
  { id: 13, title: 'Spider-Man: Across the Spider-Verse', genres: ['Animation', 'Action', 'Adventure'], year: 2023, rating: 8.6, description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.' },
  { id: 14, title: 'Inception', genres: ['Action', 'Adventure', 'Sci-Fi'], year: 2010, rating: 8.8, description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.' },

  // Relaxed
  { id: 15, title: 'My Neighbor Totoro', genres: ['Animation', 'Family', 'Fantasy'], year: 1988, rating: 8.1, description: 'When two daughters move to the country with their father, they discover they live near a forest filled with magical creatures.' },
  { id: 16, title: 'Chef', genres: ['Comedy', 'Drama'], year: 2014, rating: 7.3, description: 'A head chef quits his restaurant job and buys a food truck in an effort to reclaim his creative promise.' }
];

export function getRecommendations(emotion: Emotion, count: number = 5): Movie[] {
  const targetGenres = moodToGenres[emotion];
  
  // Filter movies that share at least one genre with the mood
  const filtered = movies.filter(movie => 
    movie.genres.some(genre => targetGenres.includes(genre))
  );

  // Simple shuffle and slice
  return filtered.sort(() => Math.random() - 0.5).slice(0, count);
}
