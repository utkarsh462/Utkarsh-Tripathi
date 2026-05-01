import streamlit as st
import pandas as pd
import random

# 1. Page Configuration
st.set_page_config(page_title="Remo: Emotion-Based Movie Recommender", layout="centered")

# 2. Dataset Setup
@st.cache_data
def load_data():
    # Simple dataset creator
    data = {
        'id': range(1, 17),
        'title': [
            'The Grand Budapest Hotel', 'Toy Story 4', 'La La Land', 
            'Schindler\'s List', 'Manchester by the Sea', 'The Pursuit of Happyness',
            'Mad Max: Fury Road', 'John Wick', 'The Dark Knight',
            'Interstellar', 'The Social Network', '12 Angry Men',
            'Across the Spider-Verse', 'Inception', 'My Neighbor Totoro', 'Chef'
        ],
        'genres': [
            'Comedy, Romance', 'Animation, Comedy', 'Romance, Musical',
            'Drama, History', 'Drama', 'Drama, Biography',
            'Action, Sci-Fi', 'Action, Thriller', 'Action, Crime',
            'Adventure, Sci-Fi', 'Drama, Biography', 'Drama, Crime',
            'Animation, Action', 'Sci-Fi, Action', 'Animation, Family', 'Comedy, Drama'
        ]
    }
    return pd.DataFrame(data)

# 3. Logic Mapping
emotion_to_genres = {
    'Happy': ['Comedy', 'Romance', 'Animation', 'Family'],
    'Sad': ['Drama', 'History', 'Biography'],
    'Angry': ['Action', 'Thriller', 'Crime'],
    'Neutral': ['Adventure', 'Sci-Fi', 'Mystery', 'Documentary']
}

# 4. Recommendation Function
def get_recommendations(df, emotion):
    target_genres = emotion_to_genres[emotion]
    # Filter rows where genres column contains any of the target genres
    mask = df['genres'].apply(lambda x: any(genre in x for genre in target_genres))
    filtered_df = df[mask]
    
    # Return top 5 or less
    sample_size = min(len(filtered_df), 5)
    return filtered_df.sample(sample_size)

# 5. UI Implementation
st.title("🎬 Remo Movie Recommender")
st.write("Professional Emotion-Based Filtering System")

df = load_data()

# Sidebar Info
st.sidebar.header("About Project")
st.sidebar.info("This is a college portfolio project built with Streamlit and Pandas.")

# Emotion selection
emotion = st.selectbox(
    "How are you feeling right now?",
    options=['Happy', 'Sad', 'Angry', 'Neutral']
)

if st.button("Recommend Movies"):
    results = get_recommendations(df, emotion)
    
    st.subheader(f"Top Recommendations for '{emotion}' mood:")
    
    for _, row in results.iterrows():
        with st.container():
            st.markdown(f"### {row['title']}")
            st.caption(f"Genres: {row['genres']}")
            st.divider()

# Bonus: Expansion Suggestion
st.write("---")
with st.expander("🚀 Next Upgrades & Expansion"):
    st.write("""
    - **Emotion Detection**: Integrate OpenCV + DeepFace (CNN) to detect mood from your webcam automatically.
    - **Live API**: Connect to TMDB API for live movie posters and trailers.
    - **User Accounts**: Save favorites using Firebase or SQLite.
    """)
