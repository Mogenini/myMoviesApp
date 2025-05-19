"use client";
import { useEffect, useState } from "react";
import { IMovieDetail } from "@/types/MovieDetails";
import Image from "next/image";
import { getMovieById } from "@/services/movies/getMovieById";
import { markAsFavorite } from "@/services/accounts/markAsFavorite";
import { useGuestSession } from "@/providers/GuestSessionContext";
import { useParams } from "next/navigation";
import { getMovieRecommendations } from "@/services/movies/getMovieRecomendations";
import { Card } from "@/components/ui/card";
import MovieCarousel from "@/components/MovieCarousel/MovieCarousel";

const MovieDetailPage = () => {
  //Movie
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovieDetail>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Favorites
  const [isFavorite, setIsFavorite] = useState(false);
  const { guestSessionId } = useGuestSession();

  // Recomendations
  const [movieRecommendations, setMovieRecommendations] = useState<any[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] =
    useState<boolean>(true);


  // Cargar detalles de la película
  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie", err);
        setError("Could not load movie.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Verificar si está en favoritos (localStorage)
  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const storedFavorites = localStorage.getItem("favoriteMovieIds");
    const favoriteIds: number[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];
    setIsFavorite(favoriteIds.includes(Number(id)));
  }, [id]);
  // Marcar o desmarcar como favorito
  const handleToggleFavorite = async () => {
    if (!guestSessionId || !movie) return;
    const newFavoriteState = !isFavorite;
    try {
      await markAsFavorite(movie.id, newFavoriteState, guestSessionId);
      setIsFavorite(newFavoriteState);
      const storedFavorites = localStorage.getItem("favoriteMovieIds");
      const favoriteIds: number[] = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      const updatedFavorites = newFavoriteState
        ? [...new Set([...favoriteIds, movie.id])]
        : favoriteIds.filter((id) => id !== movie.id);
      localStorage.setItem(
        "favoriteMovieIds",
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  // Llamamos recomendaciones
  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const fetchRecommendations = async () => {
      setLoadingRecommendations(true);
      try {
        const data = await getMovieRecommendations(id);
        // Save the array of results of movies, not the page info
        setMovieRecommendations(data);
      } catch (err) {
        console.error("Error fetching movie", err);
        setError("Could not load movie.");
      } finally {
        setLoadingRecommendations(false);
      }
    };
    fetchRecommendations();
  }, [id]);

  if (loading) return <div>Loading movie...</div>;

  if (error) return <div>{error}</div>;

  if (!movie) return <div>No movie found.</div>;

  return (
    <div>
      <Card className=" max-w-4xl mx-auto p-4">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex flex-col sm:flex-row gap-6">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-xl w-full sm:w-64"
              width={300}
              height={450}
            />
            <div className="flex flex-col space-y-4">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p className="italic text-slate-500 text-justify">{movie.tagline}</p>
              <p className="text-justify">{movie.overview}</p>
              <div>
                <strong>Release:</strong> {movie.release_date.toString()}
              </div>
              <div>
                <strong>Genres:</strong>{" "}
                {movie.genres.map((g) => g.name).join(", ")}
              </div>
              <div>
                <strong>Rating:</strong> {movie.vote_average.toFixed(1)}
              </div>
              <button
                onClick={handleToggleFavorite}
                className={`px-4 py-2 rounded ${
                  isFavorite
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-emerald-500 hover:bg-emerald-600-600"
                } text-white font-bold w-max`}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </Card>
      <div>
        <h3 className="text-center font-bold text-emerald-800 text-2xl py-2 ">Recomendations</h3>
        {movieRecommendations.length > 0 ? (
          <div className="w-screen p-0">
            <MovieCarousel movies={movieRecommendations}></MovieCarousel>
          </div>
        ) : (
          <div>
            <p className="text-center text-gray-500 text-xl">
              No recommendations available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default MovieDetailPage;
