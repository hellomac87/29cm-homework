import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "static/image/29cm_logo.png";

function HomePage() {
  return (
    <Container>
      <h1>
        <img src={logo} alt={"29cm logo"} />

        {"FE-HOMEWORK"}
      </h1>

      <Links>
        <NavLink to={"/products"}>{"products"}</NavLink>
        <NavLink to={"/cart"}>{"cart"}</NavLink>
      </Links>
    </Container>
  );
}

export default HomePage;

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  h1 {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    background-color: #fff;
    color: #000;
    font-size: 18px;
    font-weight: normal;
    letter-spacing: 16px;

    margin-bottom: 36px;
    & > img {
      width: 340px;
      margin-bottom: 8px;
    }
  }
`;

const Links = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  a {
    font-size: 18px;
    padding: 0 12px;
    font-weight: lighter;
    &:active,
    &:visited {
      color: #000;
    }
  }
`;
