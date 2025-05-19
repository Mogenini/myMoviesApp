'use client'
import { getNowPlayingMovies } from '@/services/movies/getNowPlayingMovies';
import React, { useEffect, useState } from "react";
import MovieList from '@/components/MovieList/MovieList';


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
        <MovieList movies={movies} loading={loading} titlePage={"Now-Playing"}/>
    );
}

export default NowPlayingPage
