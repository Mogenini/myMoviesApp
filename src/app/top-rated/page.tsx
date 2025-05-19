"use client";

import React, { useEffect, useState } from "react";

import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";

import MovieList from "@/components/MovieList/MovieList";
import PaginationPage from "@/components/PaginationPage/PaginationPage";


const TopRatedPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // simulate 2s delay
      try {
        const data = await getTopRatedMovies(pageNumber);
        setMovies(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, [pageNumber]);

  const nextPage = () => {
    setPageNumber(pageNumber+1)
  }

  const prevPage = () => {
    setPageNumber((pageNumber > 1  ? pageNumber-1 : 1))
  }

  return (
    <div className="mx-10">
      <PaginationPage pageNumber={pageNumber} prevPage={prevPage} nextPage={nextPage}></PaginationPage>
      <MovieList movies={movies} loading={loading} />
      <PaginationPage pageNumber={pageNumber} prevPage={prevPage} nextPage={nextPage}></PaginationPage>
    </div>
  );
};

export default TopRatedPage;
