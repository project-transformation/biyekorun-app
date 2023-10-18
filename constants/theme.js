import {
    MD3LightTheme as DefaultTheme,
  } from 'react-native-paper';

export default {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
      // primary: "#770DD5"
    },
  };