"use client";

import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import MovieList from "@/components/MovieList/MovieList";
import PaginationPage from "@/components/PaginationPage/PaginationPage";
import { IMovieDetail } from "@/types/MovieDetails";

const PopularClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // simulate 2s delay
      try {
        const data = await getPopularMovies(pageNumber);
        setMovies(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, [pageNumber]);

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    setPageNumber(pageNumber > 1 ? pageNumber - 1 : 1);
  };

  return (
    <div className="mx-10">
      <PaginationPage
        pageNumber={pageNumber}
        prevPage={prevPage}
        nextPage={nextPage}
      ></PaginationPage>
      <MovieList movies={movies} loading={loading} />
      <PaginationPage
        pageNumber={pageNumber}
        prevPage={prevPage}
        nextPage={nextPage}
      ></PaginationPage>
    </div>
  );
};

export default PopularClientPage;
