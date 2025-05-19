import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface paginationPageProps {
  pageNumber: number;
  prevPage: () => void;
  nextPage: () => void;
}

const PaginationPage = ({
  pageNumber,
  prevPage,
  nextPage,
}: paginationPageProps) => {
  return (
    <div className="pt-[10px] gap-20">
      <Pagination className="text-emerald-600 text-xl">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={prevPage} className="text-emerald-600 text-xl" />
          </PaginationItem>
          <PaginationItem className="text-emerald-600 text-xl">
            <PaginationLink href="#">{pageNumber} </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={nextPage} className="text-emerald-600 text-xl" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationPage;
