import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "remixicon/fonts/remixicon.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  slug: string;
  query: string;
  action: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  query,
  slug,
  action,
}: PaginationProps) => {
  const [page, setPage] = useState(currentPage);
  const navigate = useNavigate();

  const handleNextPage = () => {
    if (currentPage === totalPages) return;
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  useEffect(() => {
    if (action === "searchlist") {
      navigate(`/${action}/${query}/${page}`);
      return;
    }

    navigate(`/${action}/${slug}/${query}/${page}`);
  }, [page]);

  return (
    <div className="flex items-center py-5 px-2.5 w-fit mx-auto gap-1">
      <div
        className="flex flex-row-reverse border-2 cursor-pointer gap-2 text-lg border-rose-800 px-2.5 py-0.5 text-rose-800"
        onClick={handlePrevPage}
      >
        Previus
        <i className="ri-arrow-left-line"></i>
      </div>
      <ul>
        <li className=""></li>
      </ul>
      <div
        className="flex border-2 text-lg cursor-pointer gap-2 border-rose-800 px-2.5 py-0.5 text-rose-800"
        onClick={handleNextPage}
      >
        Next
        <i className="ri-arrow-right-line"></i>
      </div>
    </div>
  );
};

export default Pagination;

