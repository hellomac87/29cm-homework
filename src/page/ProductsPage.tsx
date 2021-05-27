import Error from "components/Error";
import Header from "components/Header";
import Loader from "components/Loader";
import Pagination from "components/Pagination";
import useLocalStorage from "hooks/useLocalStorage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { fetchProducts, productsSlice } from "store/slices/productsSlice";
import { Product } from "store/types/products";
import styled from "styled-components";
import { paginate } from "utils/paginate";

function ProductsPage() {
  const dispatch = useDispatch();
  const [cartItemIds, setCartItemIds] = useLocalStorage<number[]>(
    "cart_item_ids",
    []
  );
  const { fetching, error, data, per_page, current_page } = useSelector(
    (state: RootState) => state.products
  );

  const onClickPagination = (pageNumber: number) => {
    dispatch(productsSlice.actions.setCurrentPage(pageNumber));
  };

  const handleCart = (item_no: number) => {
    const hasId = cartItemIds.includes(item_no);
    let newCartItemIds: number[] = [];

    if (hasId) {
      // remove
      newCartItemIds = cartItemIds.filter((id: number) => id !== item_no);
    } else {
      // add
      if (cartItemIds.length > 2) {
        alert("상품은 3개 까지만 담을 수 있습니다.");
        return;
      }
      newCartItemIds = [...cartItemIds, item_no];
    }
    setCartItemIds(newCartItemIds);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (fetching || !data) return <Loader />;
  if (error) return <Error />;

  return (
    <Container>
      <Header cartCount={cartItemIds.length} />
      <List>
        {paginate<Product>(data, current_page, per_page).map((product) => {
          const inCart = cartItemIds.includes(product.item_no);
          return (
            <ProductItem key={product.item_no}>
              <ImageWrap>
                <ImagePositioner>
                  <img src={product.detail_image_url} alt={product.item_name} />
                </ImagePositioner>
              </ImageWrap>

              <Name>{product.item_name}</Name>
              <div>{product.availableCoupon === false && "쿠폰 사용 불가"}</div>
              <Price>
                {product.price}
                {"원"}
              </Price>
              <div>{product.score}</div>
              <CartButton
                type="button"
                onClick={() => handleCart(product.item_no)}
                inCart={inCart}
              >
                {inCart ? "빼기" : "담기"}
              </CartButton>
            </ProductItem>
          );
        })}
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

  padding-bottom: 50px;
`;

const List = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;

  width: 100%;
`;

const ProductItem = styled.li`
  width: 33.333%;
  padding: 12px;
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

const CartButton = styled.button<{ inCart: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 86px;
  height: 30px;
  border: 1px solid #333;

  background-color: ${(props) => (props.inCart ? "#fff" : "#333")};
  color: ${(props) => (props.inCart ? "#333" : "#fff")};

  cursor: pointer;
`;
