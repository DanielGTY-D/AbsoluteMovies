import 'remixicon/fonts/remixicon.css'


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onAction: () => void;
}


const Pagination = ({ currentPage, totalPages, onAction }: PaginationProps) => {




  return (
    <div className="flex items-center py-5 px-2.5 w-fit mx-auto gap-1">
      <div 
        className='flex flex-row-reverse border-2 cursor-pointer gap-2 text-lg border-rose-800 px-2.5 py-0.5 text-rose-800'
        onClick={onAction}
      >
        Previus
        <i className="ri-arrow-left-line"></i>
      </div>
      <ul>
        <li className="">

        </li>
      </ul>
      <div 
        className='flex border-2 text-lg cursor-pointer gap-2 border-rose-800 px-2.5 py-0.5 text-rose-800'
        onClick={onAction}
      >
        Next
        <i className="ri-arrow-right-line"></i>
      </div>
    </div>
  );
};

export default Pagination