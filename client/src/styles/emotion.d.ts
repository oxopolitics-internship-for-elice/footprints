import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      mainColor: string;
      subColor: string;
      thirdColor: string;
      lighterColor: string;
    };
  }
}
