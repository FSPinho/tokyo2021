import { Dimensions, Platform, StatusBar } from "react-native";

const STATUSBAR_DEFAULT_HEIGHT = 20;
const STATUSBAR_X_HEIGHT = 44;
const STATUSBAR_IP12_HEIGHT = 47;
const STATUSBAR_IP12MAX_HEIGHT = 47;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const IP12_WIDTH = 390;
const IP12_HEIGHT = 844;

const IP12MAX_WIDTH = 428;
const IP12MAX_HEIGHT = 926;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get("window");

let statusBarHeight = STATUSBAR_DEFAULT_HEIGHT;

if (Platform.OS === "ios" && !Platform.isPad && !Platform.isTVOS) {
  if (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) {
    statusBarHeight = STATUSBAR_X_HEIGHT;
  } else if (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) {
    statusBarHeight = STATUSBAR_X_HEIGHT;
  } else if (W_WIDTH === IP12_WIDTH && W_HEIGHT === IP12_HEIGHT) {
    statusBarHeight = STATUSBAR_IP12_HEIGHT;
  } else if (W_WIDTH === IP12MAX_WIDTH && W_HEIGHT === IP12MAX_HEIGHT) {
    statusBarHeight = STATUSBAR_IP12MAX_HEIGHT;
  }
}

export const getStatusBarHeight = () => {
  return Platform.select({
    ios: statusBarHeight,
    android: StatusBar.currentHeight,
    default: 0,
  });
};
