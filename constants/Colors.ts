/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const primary = '#e25bff';
const secondary = '#4c51f7';
const tertiary = '#3d02bd';
const yellow = '#FFD700';

// fortnite colors
// const fortniteLightBlue = '#1db8f3'

// DATE FORMAT
// const dayInMilliseconds = 86400000;

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },

  primary: primary,
  secondary: secondary,
  tertiary: tertiary,
  yellow: yellow,

  screen: {
    padding: 10,
  }
};

export const Fonts: any = {
  size: {
    xs: 13,
    s: 15,
    m: 18,
    l: 21,
    xl: 25,
  },

  weight: {
    bold: '600',
    light: '200',
    normal: '300',
  },

  spacing: {
    soft: -.3,
    hard: -.9
  },
};

export const Boxes: any = {
  border: {
    normal: 10,
  },
};
