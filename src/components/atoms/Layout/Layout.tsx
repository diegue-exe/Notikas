import React, { ReactComponentElement } from "react";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";

export const Layout = ({ children }: any) => {
  return <View style={styles.itemContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    marginTop: Constants.statusBarHeight,
    padding: 20,
    flex: 1,
  },
});