import styled from "styled-components";

interface Props {
  checked: boolean;
  onChange: () => void;
}

function Checkbox({ checked, onChange }: Props) {
  return <Container type="checkbox" checked={checked} onChange={onChange} />;
}

export default Checkbox;

const Container = styled.input`
  transform: scale(1.5);
  cursor: pointer;
`;
