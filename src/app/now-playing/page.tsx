"use client";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import React, { useEffect, useState } from "react";
import MovieList from "@/components/MovieList/MovieList";
import PaginationPage from "@/components/PaginationPage/PaginationPage";
import { IMovieDetail } from "@/types/MovieDetails";

const NowPlayingPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // simulate 2s delay
      try {
        const data = await getNowPlayingMovies(pageNumber);
        setMovies(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchNowPlayingMovies();
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

export default NowPlayingPage;
