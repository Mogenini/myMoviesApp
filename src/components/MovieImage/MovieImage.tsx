import Config from "@/config";
import Image from "next/image";

interface IMovieCard {
  title: string;
  posterPath: string;
  releaseYear: Date;
}

const MovieImage: React.FC<IMovieCard> = ({
  title,
  posterPath,
  releaseYear,
}) => {
  const poster = Config.IMAGE_SOURCE + posterPath;
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto bg-transparent rounded-3xl shadow-xl">
        <div className="grid rounded-3xl max-w-[200px] bg-transparent shadow-sm">
          <Image
            src={poster}
            width="200"
            height="100"
            className="rounded-t-xl justify-center grid object-cover"
            alt={title}
          />
          <div className="pb-4 px-2">
            <p className="text-green-500 pt-2 font-semibold ">
              ({new Date(releaseYear).getFullYear()})
            </p>
            <p className="h-10">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieImage;
