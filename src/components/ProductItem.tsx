import numeral from "numeral";
import { Product } from "store/types/products";
import styled from "styled-components";
import { generateFlex } from "styles/utils";

interface Props {
  product: Product;
  inCart: boolean;
  handleCart: (item_no: number) => void;
}

function ProductItem({ product, inCart, handleCart }: Props) {
  return (
    <Container>
      <ImageWrap>
        <ImagePositioner>
          <img src={product.detail_image_url} alt={product.item_name} />
        </ImagePositioner>
      </ImageWrap>

      <Name>{product.item_name}</Name>

      <Price>
        {numeral(product.price).format("0,0")}
        {"원"}
        {product.availableCoupon === false && (
          <span>{"(쿠폰 사용 불가 상품)"}</span>
        )}
      </Price>
      <Score>
        <span>{"\u2661"}</span> {product.score}
      </Score>
      <CartButton
        type="button"
        onClick={() => handleCart(product.item_no)}
        inCart={inCart}
      >
        {inCart ? "빼기" : "담기"}
      </CartButton>
    </Container>
  );
}

export default ProductItem;

const Container = styled.li`
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
  ${generateFlex("center", "flex-start")}
  width: 100%;
  min-height: 42px;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Price = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;

  & > span {
    display: inline-block;
    padding: 0 4px;
    font-size: 12px;
    font-weight: normal;
    color: #d4d4d4;
  }
`;

const Score = styled.div`
  ${generateFlex("center", "flex-start")}
  width: 100%;
  font-size: 14px;
  margin-bottom: 10px;
  & > span {
    font-size: 20px;
    padding-right: 2px;
  }
`;

const CartButton = styled.button<{ inCart: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 30px;
  border: 1px solid #333;

  background-color: ${(props) => (props.inCart ? "#fff" : "#333")};
  color: ${(props) => (props.inCart ? "#333" : "#fff")};

  cursor: pointer;
`;
