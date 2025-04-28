'use client'
import { getNowPlayingMovies } from '@/services/movies/getNowPlayingMovies';
import React, { useEffect, useState } from "react";



const NowPlayingPage = () => {
 
      const [loading, setLoading] = useState(false);
      const [movies, setMovies] = useState<any[]>([]);
  
      useEffect(() => {
          const fetchNowPlayingMovies = async () => {
              setLoading(true);
              await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
              try {
                  const data = await getNowPlayingMovies();
                  setMovies(data.results);
              } catch (err) {
                  console.error("Error loading movies: ", err);
              }
              setLoading(false);
          };
  
          fetchNowPlayingMovies();
      }, []);

      return (
        <div>
            <h2 className="text-xl font-bold mb-4">Client-rendered Now-Playing</h2>
            {loading && <p className="text-sm text-muted-foreground">Cargando...</p>}
            {movies.map((movie) => (
                <div key={movie.id}>
                    <h3>{movie.title}</h3>
                    
                </div>
            ))}
        </div>
    );
}

export default NowPlayingPage
