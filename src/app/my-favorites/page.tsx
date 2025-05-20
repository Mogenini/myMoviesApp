"use client";
import React, { useEffect, useState } from "react";
import MovieList from "@/components/MovieList/MovieList";
import { getFavoriteMovies } from "@/services/accounts/getFavoriteMovies";
import { useGuestSession } from "@/providers/GuestSessionContext";
import PaginationPage from "@/components/PaginationPage/PaginationPage";
import { IMovieDetail } from "@/types/MovieDetails";

const MyFavoritesPage = () => {
  const { guestSessionId } = useGuestSession();
  const [loading, setLoading] = useState<boolean>(false);
  
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!guestSessionId) return;
      setLoading(true);
      try {
        const data = await getFavoriteMovies(guestSessionId, pageNumber);
        setMovies(data?.results || []);
      } catch (err) {
        console.error("Error loading favorite movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [guestSessionId,pageNumber]);

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    setPageNumber(pageNumber > 1 ? pageNumber - 1 : 1);
  };

  return (
    <div>
      {loading && (
        <h5 className="text-lg text-gray-500">Loading favorites...</h5>
      )}
      {!loading && movies.length === 0 && (
        <div className="text-center mt-10 text-gray-600">
          <p className="text-xl">You don't have any favorite movies yet.</p>
          <p className="text-sm mt-2">
            Go to a movie's detail page and click "Add to Favorites" to see it
            here
          </p>
        </div>
      )}
      {!loading && movies.length > 0 && (
        <div>
          <PaginationPage
            pageNumber={pageNumber}
            prevPage={prevPage}
            nextPage={nextPage}
          />
          <MovieList movies={movies} loading={loading} />
          <PaginationPage
            pageNumber={pageNumber}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </div>
      )}
    </div>
  );
};
export default MyFavoritesPage;
