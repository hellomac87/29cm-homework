import styled from "styled-components";
import { ReactComponent as CartIcon } from "static/svg/shopping-cart.svg";
import { useHistory } from "react-router";

interface Props {
  cartCount: number;
}

function Header({ cartCount }: Props) {
  const history = useHistory();

  return (
    <Container>
      <h1>{"29cm"}</h1>
      <CartPositioner>
        <CartInner onClick={() => history.push(`/cart`)}>
          {cartCount > 0 && <CartItemCount>{cartCount}</CartItemCount>}
          <CartIcon />
        </CartInner>
      </CartPositioner>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100px;

  h1 {
    font-size: 48px;
    font-weight: bold;
  }
`;

const CartPositioner = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

const CartInner = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;

  svg {
    display: block;
  }
`;

const CartItemCount = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
`;
