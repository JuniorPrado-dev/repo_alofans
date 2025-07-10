import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    headerBackground: string;
    headerText: string;
    border: string;
    buttonBackground: string;
    buttonText: string;
  }
}