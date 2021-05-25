import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;   
    }
    body{
      background-color:#ffffff;
      font:10px 'Roboto', sans-serif;
    }

`;

export default GlobalStyle;
