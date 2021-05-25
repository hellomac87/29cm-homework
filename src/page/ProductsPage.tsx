import Error from "components/Error";
import Loader from "components/Loader";
import Pagination from "components/Pagination";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { fetchProducts, productsSlice } from "store/slices/productsSlice";
import styled from "styled-components";
import { paginate } from "utils/paginate";

function ProductsPage() {
  const dispatch = useDispatch();

  const { fetching, error, data, per_page, current_page } = useSelector(
    (state: RootState) => state.products
  );

  const onClickPagination = (pageNumber: number) => {
    dispatch(productsSlice.actions.setCurrentPage(pageNumber));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (fetching || !data) return <Loader />;
  if (error) return <Error />;

  return (
    <Container>
      <List>
        {paginate(data, current_page, per_page).map((product) => (
          <ProductItem key={product.item_no}>
            <ImageWrap>
              <ImagePositioner>
                <img src={product.detail_image_url} alt={product.item_name} />
              </ImagePositioner>
            </ImageWrap>

            <Name>{product.item_name}</Name>
            <Price>
              {product.price}
              {"원"}
            </Price>
            <div>{product.score}</div>
          </ProductItem>
        ))}
      </List>
      <Pagination
        per_page={per_page}
        total={data.length}
        current_page={current_page}
        onClick={onClickPagination}
      />
    </Container>
  );
}

export default ProductsPage;

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  padding: 50px 0;
`;

const List = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;

  width: 100%;
`;

const ProductItem = styled.li`
  width: 20%;
  padding: 5px;
`;

const ImageWrap = styled.div`
  width: 100%;
  position: relative;
  padding-top: 100%; /* 1:1 ratio */
  overflow: hidden;
  margin-bottom: 10px;
`;

const ImagePositioner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transform: translate(50%, 50%);
  -ms-transform: translate(50%, 50%);
  transform: translate(50%, 50%);

  img {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
    height: auto;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
`;

const Name = styled.div`
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Price = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;
