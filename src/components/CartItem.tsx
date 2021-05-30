import styled from "styled-components";
import numeral from "numeral";

import { TCartItem } from "store/types/cart";

import { cartColumnStyle } from "styles/mixins";
import { generateFlex } from "styles/utils";
import Checkbox from "./Checkbox";

interface Props {
  cartItem: TCartItem;
  checked: boolean;
  handleCheck: (item_no: number) => void;
  increaseAmount: (item_no: number) => void;
  decreaseAmount: (item_no: number) => void;
  deleteCartItem: (item_no: number) => void;
}

function CartItem({
  cartItem,
  checked,
  handleCheck,
  increaseAmount,
  decreaseAmount,
  deleteCartItem,
}: Props) {
  function calcPriceByAmount(price: number, amount: number) {
    const result = price * amount;
    return numeral(result).format("0,0");
  }
  return (
    <Container>
      <ColCheckBox>
        <Checkbox
          checked={checked}
          onChange={() => handleCheck(cartItem.item_no)}
        />
      </ColCheckBox>
      <ColInfo>
        <ColImage>
          <img src={cartItem.detail_image_url} alt={cartItem.item_name} />
        </ColImage>
        <ColName>
          {cartItem.item_name}
          <Price>{`${numeral(cartItem.price).format("0,0")}원`}</Price>
          <br />

          {cartItem.availableCoupon === false &&
            "해당 상품은 쿠폰 사용이 불가합니다."}
        </ColName>
      </ColInfo>

      <ColAmount>
        <AmountButton
          type="button"
          onClick={() => decreaseAmount(cartItem.item_no)}
        >
          {"\u2796"}
        </AmountButton>
        <Amount>{cartItem.amount}</Amount>
        <AmountButton
          type="button"
          onClick={() => increaseAmount(cartItem.item_no)}
        >
          {"\u2795"}
        </AmountButton>
      </ColAmount>
      <ColPrice>
        {calcPriceByAmount(cartItem.price, cartItem.amount)}
        {"원"}
      </ColPrice>
      <ColDelete>
        <span onClick={() => deleteCartItem(cartItem.item_no)}>{"\u2716"}</span>
      </ColDelete>
    </Container>
  );
}

export default CartItem;

const Container = styled.div`
  ${generateFlex("stretch", "flex-start")}
  width: 100%;
  border-bottom: 1px solid #d4d4d4;
  ${cartColumnStyle}
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
  border-right: 1px solid #d4d4d4;
`;

const ColDelete = styled.div`
  ${generateFlex("center", "center")}
  font-size: 24px;
  span {
    cursor: pointer;
  }
`;
