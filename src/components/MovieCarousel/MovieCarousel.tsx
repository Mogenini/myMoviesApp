import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieCard from "@/components/MovieCard/MovieCard";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface MovieProps {
    movies: any[];
    loading?: boolean;
  }
  
  const MovieCarousel = ({ movies, loading }: MovieProps) => {
    const autoplayInstance = useRef(
      Autoplay({ delay: 1500, stopOnInteraction: false })
    );
  
    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplayInstance.current]}
      >
        <CarouselContent className="w-full h-auto">
          {Array.from({ length: movies.length }).map((_, index) => (
            <CarouselItem key={index} className="basis-sm">
              <div className="p-1">
                <Card>
                  <Link
                    key={movies[index].id}
                    href={{
                      pathname: `/movie/${movies[index].id}`,
                      query: { from: "popular" },
                    }}
                  >
                    <CardContent className="items-center">
                      <MovieCard
                        title={movies[index].title}
                        voteAverage={movies[index].vote_average}
                        posterPath={movies[index].poster_path}
                        releaseYear={movies[index].release_date}
                        description={movies[index].overview}
                        size="recommendation"
                      />
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  };
  
  export default MovieCarousel;