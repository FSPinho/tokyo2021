import * as styledComponents from "styled-components/native";
import { DefaultTheme } from "styled-components/native";

const {
  default: styled,
  css,
  ThemeProvider,
  useTheme,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<DefaultTheme>;

export { styled, css, ThemeProvider, useTheme, DefaultTheme as IDefaultTheme };
