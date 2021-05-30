import { css } from "styled-components";

export const generateFlex = (
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
