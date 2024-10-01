import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}
export function SimplePagination({
  pageNumber,
  pages,
  route,
}: PaginationProps) {
  let pagesArray: number[] = [];
  for (let i = 1; i >= pages; i++) {
    pagesArray.push(i);
  }
  const prev = pageNumber - 1;
  const next = pageNumber + 1;
  return (
    <div>
      <div className="flex items-center gap-8 justify-center pb-6 bg-orange-500 -z-10 pt-3">
        {pageNumber !== 1 && (
          <Link
            href={`${route}?pageNumber=${prev}`}
            className="text-2xl text-white z-10 border-2 py-2 px-5"
          >
            <FaArrowLeft />
          </Link>
        )}
        {pagesArray.map((page) => (
          <Link
            href={`${route}?pageNumber=${page}`}
            className="text-lg text-black py-1 px-3 border-2"
            key={page}
          >
            {page}
          </Link>
        ))}
        {pageNumber !== pages && (
          <Link
            href={`${route}?pageNumber=${next}`}
            className="text-2xl block text-white z-10 border-2 py-2 px-5"
          >
            <FaArrowRight />
          </Link>
        )}
      </div>
    </div>
  );
}
