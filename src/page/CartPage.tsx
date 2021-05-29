import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { cartSlice, fetchCart } from "store/slices/cartSlice";
import styled, { css } from "styled-components";
import Error from "components/Error";
import Loader from "components/Loader";
import useLocalStorage from "hooks/useLocalStorage";
import { CartItem } from "store/types/cart";
import { fetchCoupons } from "store/slices/couponsSlice";
import { Coupon } from "store/types/coupon";
import useOutsideClick from "hooks/useOutsideClick";

function CartPage() {
  const dispatch = useDispatch();
  const [cartItemIds, setCartItemIds] = useLocalStorage<number[]>(
    "cart_item_ids",
    []
  );
  const [checkedIds, setCheckedIds] = useState<number[]>(cartItemIds);
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const { fetching, error, data } = useSelector(
    (state: RootState) => state.cart
  );
  const { data: coupons } = useSelector((state: RootState) => state.coupons);

  useOutsideClick(selectRef, () => setOpenSelect(false));

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
    let total = 0;
    // filter checkedIds
    cartItems = cartItems.filter((cartItem) =>
      checkedIds.includes(cartItem.item_no)
    );

    const availableItems: CartItem[] = [];
    const unavailableItems: CartItem[] = [];

    for (const cartItem of cartItems) {
      if (cartItem.availableCoupon === undefined) {
        availableItems.push(cartItem);
      } else {
        unavailableItems.push(cartItem);
      }
    }

    const availableItemsTotalPrice = () => {
      let availableTotalPrice = 0;
      for (const availableItem of availableItems) {
        availableTotalPrice += availableItem.price * availableItem.amount;
      }
      if (selectedCoupon && selectedCoupon.discountAmount) {
        availableTotalPrice =
          availableTotalPrice > 0
            ? availableTotalPrice - selectedCoupon.discountAmount
            : availableTotalPrice;
      }
      if (selectedCoupon && selectedCoupon.discountRate) {
        availableTotalPrice =
          availableTotalPrice -
          availableTotalPrice * (selectedCoupon.discountRate / 100);
      }

      return availableTotalPrice;
    };

    const unavailableItemsTotalPrice = unavailableItems.reduce((acc, next) => {
      return acc + next.price * next.amount;
    }, 0);

    return availableItemsTotalPrice() + unavailableItemsTotalPrice;
  }

  function handleCheck(item_no: number) {
    const hasId = checkedIds.includes(item_no);
    if (hasId) {
      // remove
      const newCheckedIds = checkedIds.filter(
        (checkedId) => checkedId !== item_no
      );
      setCheckedIds(newCheckedIds);
    } else {
      // add
      setCheckedIds([...checkedIds, item_no]);
    }
  }

  function handleCheckAll(cartItems: CartItem[]) {
    const removeAll = checkedIds.length === cartItems.length;
    if (removeAll) {
      setCheckedIds([]);
    } else {
      const ids = cartItems.map((cartItem) => cartItem.item_no);
      setCheckedIds(ids);
    }
  }

  function handleSelectCoupon(value: Coupon | null) {
    setSelectedCoupon(value);
  }

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchCoupons());
  }, [dispatch]);

  if (fetching || !data) return <Loader />;
  if (error) return <Error />;

  const cartItems = filterByCartIds(data);
  console.log(selectedCoupon);
  return (
    <Container>
      <Title>{"CartPage"}</Title>
      <Table>
        <TableHead>
          <div>
            <input
              type="checkbox"
              checked={cartItems.length === checkedIds.length}
              onChange={() => handleCheckAll(cartItems)}
            />
          </div>

          <div>{"상품정보"}</div>
          <div>{"수량"}</div>
          <div>{"가격"}</div>
        </TableHead>
        {cartItems.map((product) => {
          const checked = checkedIds.includes(product.item_no);
          return (
            <Row key={product.item_no}>
              <ColCheckBox>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleCheck(product.item_no)}
                />
              </ColCheckBox>
              <ColInfo>
                <ColImage>
                  <img src={product.detail_image_url} alt={product.item_name} />
                </ColImage>
                <ColName>
                  {product.item_name}
                  <Price>{`${product.price.toLocaleString()}원`}</Price>
                  <br />
                  {product.availableCoupon === false && "쿠폰 사용 불가"}
                </ColName>
              </ColInfo>

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

        <CouponSelect
          onClick={() => setOpenSelect(!openSelect)}
          ref={selectRef}
        >
          <CouponSelectTitle>
            {selectedCoupon ? selectedCoupon.title : "쿠폰 선택"}
          </CouponSelectTitle>

          {openSelect && (
            <CouponList>
              <CouponItem onClick={() => handleSelectCoupon(null)}>
                {"쿠폰 선택하지 않기"}
              </CouponItem>
              {coupons?.map((coupon, index) => {
                const seleected =
                  selectedCoupon !== null &&
                  selectedCoupon.title === coupon.title;
                return (
                  <CouponItem
                    key={index}
                    onClick={() => handleSelectCoupon(coupon)}
                    selected={seleected}
                  >
                    <span>{coupon.title}</span>{" "}
                    {seleected && <span>{"\u2714"}</span>}
                  </CouponItem>
                );
              })}
            </CouponList>
          )}
        </CouponSelect>

        <TotalRow>
          {"합계 금액 : "}
          {calcTotalPrice(cartItems)}
        </TotalRow>
      </Table>
    </Container>
  );
}

export default CartPage;

const mixinColumnStyle = css`
  & > div:nth-child(1) {
    width: 5%;
  }
  & > div:nth-child(2) {
    width: 55%;
  }
  & > div:nth-child(3) {
    width: 20%;
  }
  & > div:nth-child(4) {
    width: 20%;
  }
`;

const generateFlex = (
  alignItems: "center" | "flex-start" | "flex-end" | "stretch" = "stretch",
  justifyContent:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between" = "flex-start"
) => {
  return css`
    display: flex;
    align-items: ${alignItems};
    justify-content: ${justifyContent};
  `;
};

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  padding: 20px 24px;
  margin-bottom: 3.75%;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 24px;
  font-weight: bolder;
  margin-bottom: 12px;
`;

const Table = styled.div`
  border-top: 4px solid #000;
  color: #4c4c4c;
  font-size: 12px;
`;

const TableHead = styled.div`
  ${generateFlex("stretch", "flex-start")}
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  height: 74px;
  border-bottom: 1px solid #d4d4d4;
  div {
    ${generateFlex("center", "center")}
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #000;
  }
  ${mixinColumnStyle}
`;

const Row = styled.div`
  ${generateFlex("stretch", "flex-start")}
  width: 100%;
  border-bottom: 1px solid #d4d4d4;
  ${mixinColumnStyle}
`;

const ColCheckBox = styled.div`
  ${generateFlex("center", "center")}
`;

const ColInfo = styled.div`
  ${generateFlex("center", "center")}
`;

const ColImage = styled.div`
  width: 30%;
  img {
    width: 100%;
    vertical-align: bottom;
  }
`;

const ColName = styled.div`
  width: 70%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
`;

const Price = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: normal;
  margin-top: 14px;
`;

const ColAmount = styled.div`
  ${generateFlex("center", "center")}

  width: 20%;
  font-size: 24px;
  font-weight: normal;

  border: solid #d4d4d4;
  border-width: 0 1px;
`;

const Amount = styled.div`
  ${generateFlex("center", "center")}
  display: inline-flex;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d4d4d4;
  border-width: 1px 0;
  font-size: 18px;
`;

const AmountButton = styled.button`
  ${generateFlex("center", "center")}
  width: 36px;
  height: 36px;
  font-size: 24px;
  border: 1px solid #d4d4d4;
  background: #fff;
  cursor: pointer;
  transition: background-color 0.1s ease;
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ColPrice = styled.div`
  ${generateFlex("center", "center")}
  font-size: 24px;
  font-weight: bold;
`;

const CouponSelect = styled.div`
  position: relative;
  width: 400px;
  cursor: pointer;
  margin-top: 30px;
`;

const CouponSelectTitle = styled.div`
  ${generateFlex("center", "flex-start")}
  width:100%;
  height: 45px;
  padding: 0 24px;
  border: 1px solid #d4d4d4;
  font-size: 16px;
  font-weight: bold;
`;

const CouponList = styled.ul`
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  border: solid #d4d4d4;
  border-width: 0 1px 1px;
`;

const CouponItem = styled.li<{ selected?: boolean }>`
  ${generateFlex("center", "flex-start")}
  width:100%;
  height: 45px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: ${(props) => props.selected && "bold"};
  color: ${(props) => (props.selected ? "#333" : "#d9d9d9")};
  & > span {
    margin-right: 10px;
  }
`;

const TotalRow = styled.div`
  ${generateFlex("center", "flex-end")}
  width: 100%;
  font-size: 32px;
  font-weight: bold;
`;
