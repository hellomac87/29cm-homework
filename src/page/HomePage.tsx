import { NavLink } from "react-router-dom";
import styled from "styled-components";

function HomePage() {
  return (
    <Container>
      <h1>
        {"29cm "}
        {"FE-Homework"}
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

    padding: 36px 86px;

    background-color: #333;
    color: #fff;
    font-size: 48px;

    margin-bottom: 24px;
  }
`;

const Links = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  a {
    font-size: 24px;
    padding: 0 12px;
  }
`;
