import _ from "lodash";
import styled from "styled-components";

interface Props {
  per_page: number;
  total: number;
  current_page: number;
  onClick: (pageNumber: number) => void;
}

const Pagination = ({ total, per_page, current_page, onClick }: Props) => {
  const pageCount = Math.ceil(total / per_page); // 몇 페이지가 필요한지 계산

  if (pageCount === 1) return null; // 1페이지 뿐이라면 페이지 수를 보여주지 않음

  const pages = _.range(1, pageCount + 1); // 마지막 페이지에 보여줄 컨텐츠를 위해 +1, https://lodash.com/docs/#range 참고

  return (
    <Cotainer>
      <List>
        {pages.map((page) => (
          <Page
            key={page}
            onClick={() => onClick(page)}
            active={page === current_page}
          >
            {page}
          </Page>
        ))}
      </List>
    </Cotainer>
  );
};

export default Pagination;

const Cotainer = styled.nav`
  width: 100%;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const Page = styled.li<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  font-size: 48px;
  margin: 0 8px;

  color: ${(props) => (props.active ? "#000" : "#d4d4d4")};
`;
