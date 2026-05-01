/**
 * Service for interacting with Google Gemini API.
 */
import { GoogleGenAI } from "@google/genai";
import { Emotion, Movie } from "../data/movies";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getMoodAnalysis(emotion: Emotion, recommendations: Movie[]) {
  try {
    const movieTitles = recommendations.map(m => m.title).join(", ");
    const prompt = `
      The user is feeling "${emotion}".
      I have recommended the following movies: ${movieTitles}.
      
      Briefly explain (in 2-3 sentences) why this selection is perfect for someone feeling "${emotion}".
      Keep the tone empathetic and encouraging. 
      Do not use markdown formatting like bold or headers.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "Selection curated to elevate your current mood with themed cinematic experiences.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating AI analysis, but enjoy these hand-picked movies for your mood!";
  }
}

export async function getMovieInsight(movie: Movie, emotion: Emotion) {
  try {
    const prompt = `
      Movie: ${movie.title}
      User Current Emotion: ${emotion}
      
      Provide a one-sentence "AI Insight" on why this specific movie is a great watch for their current ${emotion} emotion.
      Be insightful and creative.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    return "A great pick for your current headspace.";
  }
}
