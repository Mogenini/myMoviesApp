import MovieCard from "../MovieCard/MovieCard";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface MovieProps {
  movies: any[];
  loading?: boolean;
}

const pageItems = [
  { path: "/my-favorites", label: "My Favorite Movies" },
  { path: "/now-playing", label: "Now Playing Movies" },
  { path: "/popular", label: "Popular Movies" },
  { path: "/top-rated", label: "Top Rated Movies" },
  { path: "/", label: "Home" },
];

const MovieList: React.FC<MovieProps> = ({ movies, loading }) => {
  const pathname = usePathname();

  return (
    <div>
      {pageItems.map(
        (item) =>
          item.path === pathname && (
            <div>
              <h3 className="text-3xl font-bold mb-6"> {item.label}</h3>
              {loading && (
                <h5 className="text-lg text-gray-500">Cargando...</h5>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies?.map((movie) => (
                  <Link
                    key={movie.id}
                    href={{
                      pathname: `/movie/${movie.id}`,
                      query: { from: "popular" },
                    }}
                  >
                    <MovieCard
                      title={movie.title}
                      voteAverage={movie.vote_average}
                      posterPath={movie.poster_path}
                      releaseYear={movie.release_date}
                      description={movie.overview}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default MovieList;
