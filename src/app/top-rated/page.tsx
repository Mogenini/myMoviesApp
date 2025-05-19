'use client'

import React, { useEffect, useState } from "react";

import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";

import MovieList from "@/components/MovieList/MovieList";

const TopRatedPage = () => {

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
      try {
        const data = await getTopRatedMovies();
        setMovies(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <MovieList movies={movies} loading={loading} />
  );
};

export default TopRatedPage;
