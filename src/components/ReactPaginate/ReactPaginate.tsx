import ReactPaginate from "react-paginate";
import css from "../App/App.module.css";

interface ReactPaginateProps {
  total: number;
  page: number;
  onChange: (pageNum: number) => void;
}

export default function ReactPaginateComponent({
  total,
  page,
  onChange,
}: ReactPaginateProps) {
  return (
    <ReactPaginate
      pageCount={total}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
