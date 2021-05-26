import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { cartSlice, fetchCart } from "store/slices/cartSlice";
import styled from "styled-components";
import Error from "components/Error";
import Loader from "components/Loader";
import useLocalStorage from "hooks/useLocalStorage";
import { CartItem } from "store/types/cart";

function CartPage() {
  const dispatch = useDispatch();
  const [cartItemIds, setCartItemIds] = useLocalStorage<number[]>(
    "cart_item_ids",
    []
  );

  const { fetching, error, data } = useSelector(
    (state: RootState) => state.cart
  );

  function increaseAmout(item_no: number) {
    dispatch(cartSlice.actions.increaseAmountByItemNo(item_no));
  }

  function decreaseAmout(item_no: number) {
    dispatch(cartSlice.actions.decreaseAmountByItemNo(item_no));
  }

  function calcPriceByAmount(price: number, amount: number) {
    return price * amount;
  }

  function filterByCartIds(cartItems: CartItem[]) {
    return cartItems.filter((cartItem) =>
      cartItemIds.includes(cartItem.item_no)
    );
  }

  function calcTotalPrice(cartItems: CartItem[]) {
    const total = cartItems.reduce((acc, next) => {
      return acc + next.price * next.amount;
    }, 0);

    return total;
  }

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (fetching || !data) return <Loader />;
  if (error) return <Error />;

  const cartItems = filterByCartIds(data);

  return (
    <Container>
      <h1>{"CartPage"}</h1>
      <Table>
        {cartItems.map((product) => {
          return (
            <Row key={product.item_no}>
              <ColCheckBox>
                <input type="checkbox" checked={false} onChange={() => {}} />
              </ColCheckBox>
              <ColImage>
                <img src={product.detail_image_url} alt={product.item_name} />
              </ColImage>
              <ColName>
                {product.item_name}
                <Price>{product.price}</Price>
              </ColName>
              <ColAmount>
                <AmountButton
                  type="button"
                  onClick={() => decreaseAmout(product.item_no)}
                >
                  {"-"}
                </AmountButton>
                <Amount>{product.amount}</Amount>
                <AmountButton
                  type="button"
                  onClick={() => increaseAmout(product.item_no)}
                >
                  {"+"}
                </AmountButton>
              </ColAmount>
              <ColPrice>
                {calcPriceByAmount(product.price, product.amount)}
              </ColPrice>
            </Row>
          );
        })}

        <TotalRow>
          {"합계 금액 "}
          {calcTotalPrice(cartItems)}
        </TotalRow>
      </Table>
    </Container>
  );
}

export default CartPage;

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  padding-top: 20px;
  margin-bottom: 3.75%;
`;

const Table = styled.div`
  border-top: 4px solid #000;
  color: #4c4c4c;
  font-size: 12px;
`;

const TableHead = styled.div``;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const ColCheckBox = styled.div`
  width: 5%;
`;

const ColImage = styled.div`
  width: 20%;
  img {
    width: 100%;
  }
`;

const ColName = styled.div`
  width: 35%;
`;

const Price = styled.div`
  width: 100%;
`;

const ColAmount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  font-size: 24px;
  font-weight: normal;
`;

const Amount = styled.div`
  display: inline-block;
  padding: 0 12px;
`;

const AmountButton = styled.button`
  width: 32px;
  height: 32px;
  font-size: 24px;
  border: 1px solid #333;
  background: #fff;
  cursor: pointer;
  transition: background-color 0.1s ease;
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ColPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
`;

const TotalRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  font-size: 24px;
`;
