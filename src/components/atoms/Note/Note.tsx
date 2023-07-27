import React from "react";
import { View, StyleSheet } from "react-native";
import theme from "../../../theme";
import { Texto } from "../Texto/Texto";

export type Note = {
  title: string;
  notePreview: string;
};

export const Note: React.FC<Note> = ({ title, notePreview }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Texto estilo="montserratBold" size="medium">
          {title}
        </Texto>
        <Texto>{notePreview}</Texto>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    minHeight: 110,
    borderRadius: 15,
    marginBottom: 20,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    gap: 6,
  },
});