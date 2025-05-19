'use client'
import Image from "next/image";
import Pill from "@/components/Pill/Pill";
import React, { useEffect, useState } from "react";
import { getUpcomingMovies } from "@/services/movies/getUpcomingMovies";



const Home = () => {
  const [loading, setLoading] = useState(false);
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);
  
  useEffect(() => {
      const fetchPopularMovies = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
        try {
          const data = await getUpcomingMovies();
          setUpcomingMovies(data);
        } catch (err) {
          console.error("Error loading movies: ", err);
        }
        setLoading(false);
      };
  
      fetchPopularMovies();
    }, []);

  
}

export default  Home;
