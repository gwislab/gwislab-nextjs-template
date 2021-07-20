import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.black};

      p, span {
        color: ${({ theme }) => theme.black};

        & code{
          color: ${({ theme }) => theme.noBlackChange};
        }
      }

      h1, h2, h3, h4, h5, h6 {
        color: ${({ theme }) => theme.black};

        & * {
          color: ${({ theme }) => theme.black};
        }
      }

      button {
        color: ${({ theme }) => theme.noBlackChange};
      }
  }
`;

export default GlobalStyles;
