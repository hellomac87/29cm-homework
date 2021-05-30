import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useLocalStorage from "hooks/useLocalStorage";

import { RootState } from "store";
import { Product } from "store/types/products";
import { fetchProducts, productsSlice } from "store/slices/productsSlice";

import { paginate } from "utils/paginate";

import Loader from "components/Loader";
import Error from "components/Error";
import ProductHeader from "components/ProductHeader";
import ProductItem from "components/ProductItem";
import Pagination from "components/Pagination";
import { generateFlex } from "styles/utils";

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
      <ProductHeader cartCount={cartItemIds.length} />
      <List>
        {paginate<Product>(data, current_page, per_page).map((product) => {
          const inCart = cartItemIds.includes(product.item_no);
          return (
            <ProductItem
              key={product.item_no}
              product={product}
              handleCart={handleCart}
              inCart={inCart}
            />
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
  min-width: 375px;
  margin: 0 auto;
  padding: 0 12px;

  padding-bottom: 50px;
`;

const List = styled.ul`
  ${generateFlex("center", "flex-start")};
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 24px;
  @media only screen and (max-width: 768px) {
    ${generateFlex("center", "space-between")};
  }
`;
