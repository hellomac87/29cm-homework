import _ from "lodash";

interface Props {
  per_page: number;
  total: number;
}

const Pagination = ({ total, per_page }: Props) => {
  const pageCount = Math.ceil(total / per_page); // 몇 페이지가 필요한지 계산

  if (pageCount === 1) return null; // 1페이지 뿐이라면 페이지 수를 보여주지 않음

  const pages = _.range(1, pageCount + 1); // 마지막 페이지에 보여줄 컨텐츠를 위해 +1, https://lodash.com/docs/#range 참고

  return (
    <nav>
      {" "}
      {/* VSCode 입력: nav>ul.pagination>li.page-item>a.page-link */}
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className="page-item" style={{ cursor: "pointer" }}>
            <a>{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
