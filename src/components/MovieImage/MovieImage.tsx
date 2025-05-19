import Config from "@/config";
import Image from "next/image";

interface IMovieCard {
    title: string;
    posterPath: string;
    releaseYear: number;
}

const MovieImage: React.FC<IMovieCard> = ({
    title,
    posterPath,
    releaseYear,
}) => {
    
    const poster = Config.IMAGE_SOURCE + posterPath;
    
    
    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto bg-white rounded-3xl shadow-xl">
                <div className="grid rounded-3xl max-w-[200px] shadow-sm bg-slate-100">
                    {/* Poster Image */}
                    <Image
                        src={poster}
                        width="200"
                        height="100"
                        className="rounded-t-xl justify-center grid object-cover"
                        alt={title}
                    />
                    <div className="p-5 z-10">
                        {/* Movie Title */}
                        <p className="h-10">{title}</p>
                        <p className="text-slate-400 pt-2 font-semibold ">
                            ({releaseYear})
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MovieImage;