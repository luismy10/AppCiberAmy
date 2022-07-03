import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#007bff', // Green
  statusbar: '#0562c7',
  secondary: '#020203', // Gray

  // colors
  black: '#1E1F20',
  white: '#FFFFFF',
  lightGray: '#eff2f5',
  grayLight: "#bdb8b8",
  gray: '#6c757d',
  grayDark: '#343a40',
  blue: '#007bff',
  yellow: '#E09B07',
  green: "#61ab5e",

  //state
  success: "#28a745",
  danger: "#dc3545",
  warning: "#ffc107",
  info: "#009688"
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 13,
  radius: 6,
  padding: 20,

  // font sizes
  largeTitle: 50,
  h1: 21,
  h2: 19,
  h3: 17,
  h4: 15,
  h5: 13,
  h6: 11,
  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: {
    fontFamily: 'Roboto-Black',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: 'Roboto-Black', fontWeight: 'bold', fontSize: SIZES.h1, lineHeight: 30 },
  h2: { fontFamily: 'Roboto-Bold', fontWeight: 'bold', fontSize: SIZES.h2, lineHeight: 26 },
  h3: { fontFamily: 'Roboto-Bold', fontWeight: 'bold', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'Roboto-Bold', fontWeight: 'bold', fontSize: SIZES.h4, lineHeight: 18 },
  h5: { fontFamily: 'Roboto-Bold', fontWeight: 'bold', fontSize: SIZES.h5, lineHeight: 16 },
  p: { fontFamily: 'Roboto-Regular', fontSize: SIZES.h5, lineHeight: 20 },
  italic: { fontFamily: 'Roboto-Italic', fontSize: SIZES.h4, lineHeight: 22 },
  italicBold: { fontFamily: 'Roboto-BoldItalic', fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.h1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.h2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.h3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.h4,
    lineHeight: 20,
  },
  body5: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.h5,
    lineHeight: 18,
  },
  body6: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.h6,
    lineHeight: 16,
  },
  text_splash: {
    fontFamily: 'Roboto-Black',
    fontSize: SIZES.h5,
    color: COLORS.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowOffset: { width: -1, height: 3 },
    textShadowRadius: 10,
    borderColor: COLORS.secondary,
  }
};

export const STYLES = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
}

const appTheme = { COLORS, SIZES, FONTS, STYLES };

export default appTheme;
