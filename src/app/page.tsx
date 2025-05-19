"use client";
import Image from "next/image";
import Pill from "@/components/Pill/Pill";
import React, { useEffect, useState } from "react";
import { getUpcomingMovies } from "@/services/movies/getUpcomingMovies";
import MovieList from "@/components/MovieList/MovieList";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import { getNowPlayingMovies } from '@/services/movies/getNowPlayingMovies';

const Home = () => {
  //Upcoming Movies
  const [loading, setLoading] = useState(false);
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);

  //Popular Movies
  const [loadingPopularMovies, setLoadingPopularMovies] = useState(false);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);

  // Now playing
  const [loadingNowPlayingMovies, setLoadingNowPlayingMovies] = useState(false); 
  const [nowPlayingMovies, setNowPlayingMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // simulate 2s delay
      try {
        const data = await getUpcomingMovies(1);
        setUpcomingMovies(data);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoadingPopularMovies(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // simulate 2s delay
      try {
        const data = await getPopularMovies(1);
        setPopularMovies(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoadingPopularMovies(false);
    };

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setLoadingNowPlayingMovies(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // simulate 2s delay
      try {
        const data = await getNowPlayingMovies(1);
        setNowPlayingMovies(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoadingNowPlayingMovies(false);
    };

    fetchNowPlayingMovies();
  }, []);

  return (
    <div>
      <div>
        <h3 className="text-3xl text-emerald-800 font-bold mb-6 pt-[10px] border-b-2 border-b-emerald-950">Now Playing Movies:</h3>
        <MovieList movies={nowPlayingMovies}></MovieList>
      </div>
      <div>
        <h3 className="text-3xl text-emerald-800 font-bold mb-6 pt-[10px] border-b-2 border-b-emerald-950">Upcoming Movies:</h3>
        <MovieList movies={upcomingMovies} loading={loading}></MovieList>
        <div className="grid grid-row-1"></div>
      </div>
      <div>
        <h3 className="text-3xl text-emerald-800 font-bold mb-6 pt-[10px] border-b-2 border-b-emerald-950">Popular Movies:</h3>
        <MovieList movies={popularMovies}></MovieList>
      </div>
    </div>
  );
};

export default Home;
