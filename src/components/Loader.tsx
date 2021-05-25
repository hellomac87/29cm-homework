import styled, { keyframes } from "styled-components";

function Loader() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}

export default Loader;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid #0077fe;
  border-right: 2px solid #0077fe;
  border-bottom: 2px solid #0077fe;
  border-left: 4px solid #0064d6;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;
