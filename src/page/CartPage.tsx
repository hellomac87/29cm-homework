import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import numeral from "numeral";

import { RootState } from "store";
import { TCartItem } from "store/types/cart";
import { Coupon } from "store/types/coupon";
import { cartSlice, fetchCart } from "store/slices/cartSlice";
import { fetchCoupons } from "store/slices/couponsSlice";

import useOutsideClick from "hooks/useOutsideClick";
import useLocalStorage from "hooks/useLocalStorage";

import Error from "components/Error";
import Loader from "components/Loader";
import CartItem from "components/CartItem";
import Checkbox from "components/Checkbox";

import { cartColumnStyle } from "styles/mixins";
import { generateFlex } from "styles/utils";

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
  const {
    fetching: fetchingCounpons,
    error: errorCoupons,
    data: coupons,
  } = useSelector((state: RootState) => state.coupons);

  useOutsideClick(selectRef, () => setOpenSelect(false));

  function increaseAmount(item_no: number) {
    dispatch(cartSlice.actions.increaseAmountByItemNo(item_no));
  }

  function decreaseAmount(item_no: number) {
    dispatch(cartSlice.actions.decreaseAmountByItemNo(item_no));
  }

  function filterByCartIds(cartItems: TCartItem[]) {
    return cartItems.filter((cartItem) =>
      cartItemIds.includes(cartItem.item_no)
    );
  }

  function calcTotalPrice(cartItems: TCartItem[]) {
    let total = 0;
    // filter checkedIds
    cartItems = cartItems.filter((cartItem) =>
      checkedIds.includes(cartItem.item_no)
    );

    const availableItems: TCartItem[] = [];
    const unavailableItems: TCartItem[] = [];

    // 쿠폰 사용가능 상품과 불가능 상품 분리
    for (const cartItem of cartItems) {
      if (cartItem.availableCoupon === undefined) {
        availableItems.push(cartItem);
      } else {
        unavailableItems.push(cartItem);
      }
    }

    // 쿠폰 사용가능 상품 합계 계산
    const calcAvailableCouponItemsTotalPrice = () => {
      let availableTotalPrice = 0;
      // 합계계산
      for (const availableItem of availableItems) {
        availableTotalPrice += availableItem.price * availableItem.amount;
      }
      if (selectedCoupon && selectedCoupon.discountAmount) {
        // 금액할인
        availableTotalPrice =
          availableTotalPrice > 0
            ? availableTotalPrice - selectedCoupon.discountAmount
            : availableTotalPrice;
      }
      if (selectedCoupon && selectedCoupon.discountRate) {
        // 비율할인
        availableTotalPrice =
          availableTotalPrice -
          availableTotalPrice * (selectedCoupon.discountRate / 100);
      }

      return availableTotalPrice;
    };

    // 쿠폰 사용불가 상품 합계 계산
    const calcUnavailableCouponItemsTotalPrice = () => {
      const unAvailableTotalPrice = unavailableItems.reduce((acc, next) => {
        return acc + next.price * next.amount;
      }, 0);
      return unAvailableTotalPrice;
    };

    total =
      calcAvailableCouponItemsTotalPrice() +
      calcUnavailableCouponItemsTotalPrice();

    // 소수점 버림
    total = Math.floor(total);

    return numeral(total).format("0,0");
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

  function handleCheckAll(cartItems: TCartItem[]) {
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

  function deleteCartItem(item_no: number) {
    if (window.confirm("해당 상품을 장바구니에서 삭제하시겠습니까?")) {
      const newCartItemIds = cartItemIds.filter((id: number) => id !== item_no);
      setCartItemIds(newCartItemIds);
      setCheckedIds(newCartItemIds);
    }
  }

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchCoupons());
  }, [dispatch]);

  if (fetching || fetchingCounpons || !coupons || !data) return <Loader />;
  if (error || errorCoupons) return <Error />;

  const cartItems = filterByCartIds(data);
  const noCartItems = cartItems.length < 1;

  return (
    <Container>
      <Title>{"CartPage"}</Title>
      <Table>
        <TableHead>
          <div>
            <Checkbox
              checked={cartItems.length === checkedIds.length}
              onChange={() => handleCheckAll(cartItems)}
            />
          </div>

          <div>{"상품정보"}</div>
          <div>{"수량"}</div>
          <div>{"가격"}</div>
          <div />
        </TableHead>

        {cartItems.map((cartItem) => {
          const checked = checkedIds.includes(cartItem.item_no);
          return (
            <CartItem
              cartItem={cartItem}
              key={cartItem.item_no}
              checked={checked}
              handleCheck={handleCheck}
              increaseAmount={increaseAmount}
              decreaseAmount={decreaseAmount}
              deleteCartItem={deleteCartItem}
            />
          );
        })}

        {noCartItems && (
          <NoCartItems>
            <h2>{"장바구니에 담은 상품이 없습니다."}</h2>
            <NavLink to={`/products`}>{"CONTINUE SHOPPING"}</NavLink>
          </NoCartItems>
        )}

        <CouponSelect
          onClick={() => setOpenSelect(!openSelect)}
          ref={selectRef}
        >
          <CouponSelectTitle>
            {selectedCoupon ? selectedCoupon.title : "쿠폰 선택"}
            <Arrow open={openSelect}>{"\u2303"}</Arrow>
          </CouponSelectTitle>

          {openSelect && (
            <CouponList>
              <CouponItem onClick={() => handleSelectCoupon(null)}>
                {"쿠폰 선택하지 않기"}
              </CouponItem>
              {coupons.map((coupon, index) => {
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
          {"원"}
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
  ${cartColumnStyle}
`;

const NoCartItems = styled.div`
  ${generateFlex("center", "center")};
  flex-direction: column;
  width: 100%;
  padding: 100px 0;

  border-bottom: 1px solid #000;
  text-align: center;
  color: #000;
  font-weight: 500;
  font-size: 2em;
  font-size: 2rem;

  a {
    ${generateFlex("center", "center")};
    margin-top: 45px;
    text-decoration: none;
    border: 1px solid #a0a0a0;
    color: #303033;
    width: 400px;
    height: 72px;
    font-size: 26px;
    font-weight: bolder;
  }
`;

const CouponSelect = styled.div`
  position: relative;
  width: 400px;
  cursor: pointer;
  margin-top: 30px;
`;

const CouponSelectTitle = styled.div`
  ${generateFlex("center", "space-between")}
  width:100%;
  height: 45px;
  padding: 0 24px;
  border: 1px solid #d4d4d4;
  font-size: 16px;
  font-weight: bold;
`;
const Arrow = styled.span<{ open: boolean }>`
  ${generateFlex("center", "center")}
  display: inline-flex;
  content: "\u2303";
  width: 20px;
  height: 20px;
  padding-top: 5px;
  transform: ${(props) => (props.open ? "rotate(0)" : "rotate(180deg)")};
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
